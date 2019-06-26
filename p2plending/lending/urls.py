from django.urls import include, path
from rest_framework import routers
from . import views,authenticated_views

router = routers.DefaultRouter()
router.register(r'titles', views.PublicTitleViewSet, 'titles')
router.register(r'locations', views.LocationViewSet, 'locations')
router.register(r'available-languages', views.LanguagesViewSet, 'available-languages' )
router.register(r'current/profile', authenticated_views.ProfileViewSet, 'current-profile' )
router.register(r'current/borrowing', authenticated_views.BorrowedLoanViewSet, 'borrowed-loans' )
router.register(r'current/lending', authenticated_views.OwnerLoanViewSet, 'owner-loans' )
router.register(r'request-title', authenticated_views.RequestTitleViewSet, 'request-title' )

urlpatterns = [
    path('', include(router.urls)),
]

