from django.urls import re_path
from .views import department_api, employee_api, save_file

from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    re_path(r'^department/$', department_api),
    re_path(r'^department/([0-9]+)$', department_api),
    re_path(r'^employee/$', employee_api),
    re_path(r'^employee/([0-9]+)$', employee_api),
    re_path(r'^employee/save_file$', save_file),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
