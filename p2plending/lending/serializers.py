from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Location,Profile,Title,Item,Loan,TitleRequest

class TitleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Title
        fields = ('title','language','cover_image','media_type','description')

class TitleDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Title  
        fields = ('title','language','cover_image','media_type','description')

    def to_representation(self, obj):
        result = super(TitleDetailSerializer,self).to_representation(obj)
        result['active_items'] = obj.active_items().count()
        result['available_items'] = obj.available_items().count()
        return result

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ("name","lat","lng")
    
    