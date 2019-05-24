from django.shortcuts import render
from rest_framework import viewsets,generics,filters
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import TitleSerializer, LocationSerializer, TitleDetailSerializer
from .models import Title, Location
from django_filters.rest_framework import DjangoFilterBackend

class PublicTitleViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    Public API Endpoint to allow titles to be viewed
    '''
    queryset = Title.objects.all()
    serializer_class = TitleSerializer
    detail_serializer_class = TitleDetailSerializer
    filter_backends = (DjangoFilterBackend,filters.SearchFilter)
    filterset_fields = ('author','language','id')
    search_fields = ('title','author')
    # TODO add custom Available and Available-At availability & location filter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return self.detail_serializer_class
        return self.serializer_class

class LocationViewSet(viewsets.ModelViewSet):
    '''
    API Endpoint to view all available locations
    '''
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

