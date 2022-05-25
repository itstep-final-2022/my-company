from django.urls import re_path
from .views import department_api, employee_api, save_file


urlpatterns = [
    re_path(r'^department/$', department_api),
    re_path(r'^department/([0-9]+)$', department_api),
    re_path(r'^employee/$', employee_api),
    re_path(r'^employee/([0-9]+)$', employee_api),
    re_path(r'^employee/save_file$', save_file),
]
