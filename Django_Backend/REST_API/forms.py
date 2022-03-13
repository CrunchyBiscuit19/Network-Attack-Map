from time import time
from django import forms


class CreateUserForm(forms.Form):
    username = forms.CharField(required=True, max_length=20)
    email = forms.EmailField(required=True)
    password = forms.CharField(required=True, max_length=16, min_length=8)


class TimeForm(forms.Form):
    start_time = forms.DateTimeField(required=True)
    end_time = forms.DateTimeField(required=True)

    def validate_time(self):
        time_object = {"success": False, "start_time": None,
                       "end_time": None, "message": "", "all_logs": False}
        # Set to all logs if no time filter is provided
        if self.data['start_time'] == None and self.data['end_time'] == None:
            time_object.update({"success": True, "all_logs": True})
        # Test if time is valid and sequential
        elif self.is_valid():
            if self.cleaned_data['start_time'] < self.cleaned_data['end_time']:
                time_object.update(
                    {"success": True, "start_time": self.data['start_time'], "end_time": self.data['end_time']})
            else:
                time_object.update(
                    {"success": True, "start_time": self.data['end_time'], "end_time": self.data['start_time']})
        # Time supplied is not valid
        else:
            time_object.update({"message": "invalid time"})
        return time_object
