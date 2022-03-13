# Import Errors
from django.db import IntegrityError
# Import Django Libraries
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
# Import DRF Libraries
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
# Import Custom Functions
from .forms import CreateUserForm, TimeForm
from .elasticsearch import log_fetching_handler, elasticsearch_information
# Create your views here.


class CreateUser(APIView):

    def post(self, request):
        form = CreateUserForm(request.data)
        if form.is_valid():
            # Try To Create User
            try:
                User.objects.create_user(
                    form.cleaned_data.get('username'),
                    form.cleaned_data.get('email'),
                    form.cleaned_data.get('password'),
                )
                return Response({"message": "User Created"}, status=201)
            except IntegrityError:
                return Response({"message": "Duplicate User"}, status=409)
            except:
                return Response({"message": "Internal Server Error"}, status=500)
        else:
            # Form Validation Fail
            return Response({"message": "Form Validation Failed, Please Check Your Inputs"}, status=500)


class UserLogin(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        try:
            # Authenticate and Log In User
            username = User.objects.get(email=email.lower()).username
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return Response({"message": "Authenticated", "username": f"{username}", "email": f"{email}"})
            else:
                return Response({"message": "Authentication Failed"}, status=401)
        except:
            # User Does Not Exist
            return Response({"message": "User Does Not Exist"}, status=500)


class UserLogout(APIView):

    def get(self, request):
        # Log Out User
        logout(request)
        return Response(status=200)


class CheckState(APIView):

    def get(self, request):
        # Return User Information if Authenticated
        if request.user.is_authenticated:
            return Response({"authenticated": True, "username": request.user.username, "email": request.user.email})
        else:
            return Response({"authenticated": False})


class RetrieveFile(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        time_result = TimeForm(request.data).validate_time()
        if not time_result['success']:
            return Response({"message": time_result['message']})
        else:
            # Information Query from Elasticsearch
            elastic_result = elasticsearch_information(request, time_result)
            if elastic_result is not None:
                # Error in obtaining log information  
                return Response(elastic_result)
            # Log Data Fetching from Elasticsearch  
            fetch_result = log_fetching_handler(request)
            if fetch_result is not None:
                # Error in loading in logs
                return Response(fetch_result)
            return Response({
                "message": "success",
                "fetched": f"{request.session['total_logs']}",
                "time": f"{request.session['time_taken']:0.2f} seconds"
            })


class GetFile(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Page Logs Stored In Request Session
            log_object = request.session['log_data']
            logs_per_request = request.session['logs_per_request']
            current_page = request.session['current_page']
            total_pages = request.session['total_pages']
            terminate = request.session['terminate']
            # Stop Sending When Pages Exhausted
            if current_page > total_pages:
                return Response({"message": "completed"})
            # Stop Sending When User Terminates
            elif terminate:
                return Response({"message": "terminated"})
            # Page Logs and Return Response
            else:
                paged_logs = Paginator(log_object, logs_per_request)
                current_data = paged_logs.page(current_page).object_list
                request.session['current_page'] += 1
                return Response(current_data)
        except KeyError:
            return Response({"message": "Log Data Does Not Exist"}, status=500)
        except:
            return Response({"message": "Internal Server Error"}, status=500)


class TerminateFile(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Stop Log Data Sending
        request.session['terminate'] = True
        return Response({"message": "terminating"})


class UpdateDefaultCountry(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Update Default Country
        request.session['default_country'] = request.data['default_country']
        return Response({"message": "updated"})
