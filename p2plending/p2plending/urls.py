from django.contrib import admin
from django.urls import path
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic.base import TemplateView
from .views import get_csrf

urlpatterns = [
    path('', TemplateView.as_view(template_name="base.html")),
    path('admin/', admin.site.urls),
    path('api/v1/', include('lending.urls')),
    path('api-csrf/', get_csrf),
#    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-auth/', include('rest_auth.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


