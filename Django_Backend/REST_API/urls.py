from django.urls import path
from rest_framework import routers
from . import views

urlpatterns = [
    path('files/logs/', views.GetFile.as_view(), name='get_file'),
    path('auth/login/', views.UserLogin.as_view(), name='api_login'),
    path('auth/logout/', views.UserLogout.as_view(), name='api_logout'),
    path('auth/check/', views.CheckState.as_view(), name='check_login_state'),
    path('user/create/', views.CreateUser.as_view(), name='create_user'),
    path('files/retrieve/', views.RetrieveFile.as_view(), name='retrieve_file'),
    path('files/terminate/', views.TerminateFile.as_view(), name='terminate_file'),
    path('files/defaultCty/', views.UpdateDefaultCountry.as_view(),
         name='update_default_country')
]
