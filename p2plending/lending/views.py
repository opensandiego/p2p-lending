from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TitleSerializer
from .models import Title


class TitleViewSet(viewsets.ModelViewSet):
    '''
    API Endpoint to allow titles to be viewed
    '''
    queryset = Title.objects.all()
    serializer_class = TitleSerializer

