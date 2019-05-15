from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TitleSerializer, LocationSerializer, TitleDetailSerializer
from .models import Title, Location


class TitleViewSet(viewsets.ModelViewSet):
    '''
    API Endpoint to allow titles to be viewed
    '''
    queryset = Title.objects.all()
    serializer_class = TitleSerializer
    detail_serializer_class = TitleDetailSerializer

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

