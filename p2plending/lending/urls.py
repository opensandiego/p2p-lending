from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'titles', views.TitleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

