from rest_framework import viewsets,status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .models import Profile,Loan,TitleRequest,Title
from .serializers import ProfileSerializer,BorrowerLoanSerializer,OwnerLoanSerializer,TitleRequestSerializer,TitleSerializer
from rest_framework.decorators import action


class ProfileAuthViewMixin(object):
    def get_profile(self):
        if not self.request.user or not self.request.user.is_authenticated:
            return None
        try:
            profile = Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            return None
        return profile 

class ProfileViewSet(viewsets.GenericViewSet,ProfileAuthViewMixin):
    '''
    API Endpoint to list current logged in user details
    '''
    def list(self,request, format=None):
        profile = self.get_profile()
    
        if profile == None:
            return Response({"user":None},status=status.HTTP_404_NOT_FOUND)

        return Response( ProfileSerializer(profile).data )

class BorrowedLoanViewSet(viewsets.GenericViewSet,ProfileAuthViewMixin):
    '''Items that have been borrowed by the requesting user'''

    def get_queryset(self):
        profile = self.get_profile()
        if profile == None:
            return Loan.objects.none() 
        return Loan.objects.filter(borrower=profile,status="on-loan") 

    def list(self,request,format=None):
        borrowed_loans = self.get_queryset()

        return Response( BorrowerLoanSerializer(borrowed_loans, many=True).data ) 

class OwnerLoanViewSet(viewsets.GenericViewSet,ProfileAuthViewMixin):
    '''Items owned by the requesting user that are on loan'''

    def get_queryset(self):
        profile = self.get_profile()
        if profile == None:
            return Loan.objects.none() 
        return Loan.objects.filter(item__owner=profile,status="on-loan") 

    def list(self,request,format=None):
        owner_loans = self.get_queryset()
        return Response( OwnerLoanSerializer(owner_loans, many=True, context={'request':request}).data )


class UsersTitleRequestsViewSet(viewsets.GenericViewSet,ProfileAuthViewMixin):
    def get_queryset(self):
        profile = self.get_profile()
        if profile == None:
            return TitleRequest.objects.none()
        return TitleRequest.objects.filter(requester=profile,status="requested") 

    def list(self,request,format=None):
        my_requests = self.get_queryset()
        return Response( TitleRequestSerializer(my_requests, many=True, context={'request':request}).data )

class AuthenticatedTitleViewSet(viewsets.GenericViewSet,ProfileAuthViewMixin):
    serializer_class = TitleSerializer

    def get_queryset(self):
        return Title.objects.all()

    @action(detail=True,methods=['post'])
    def create_titlerequest(self, request, *args, **kwargs):
        profile = self.get_profile()
        title = self.get_object()

        if profile == None:
            return Response({"user":None},status=status.HTTP_404_NOT_FOUND)
        return Response(TitleRequestSerializer(title.create_request(profile)).data, status=status.HTTP_201_CREATED)


