from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer

class ProfileViewSet(viewsets.GenericViewSet):
    '''
    API Endpoint to list current logged in user details
    '''
    def list(self,request, format=None):
        # Bail with 404 if no user is logged in
        if not request.user or not request.user.is_authenticated:
            return Response({"user":None},status=404)

        try:
            profile = Profile.objects.get(user=request.user)
            return Response( ProfileSerializer(profile).data )
        except Profile.DoesNotExist:
            # Unlikely circumstance (e.g. admin user)
            return Response({
                "user":None,
                "reason":"User is logged in, but has no profile"
            },status_code=404)


