from django.contrib import admin
from django.urls import path
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('lending.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

