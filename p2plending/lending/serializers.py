from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Location,Profile,Title,Item,Loan,TitleRequest

class TitleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Title
        fields = ('title','language','cover_image','media_type','description')


