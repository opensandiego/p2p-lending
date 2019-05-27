from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Location,Profile,Title,Item,Loan,TitleRequest

class TitleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Title
        fields = ('id','title','author','publish_year','language','cover_image','media_type','description')

class TitleDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Title  
        fields = ('title','language','cover_image','media_type','description')

    def to_representation(self, obj):
        result = super(TitleDetailSerializer,self).to_representation(obj)
        result['active_items'] = obj.active_items().count()
        result['available_items'] = obj.available_items().count()
        result['queued_requests'] = obj.queued_requests().count()
        return result

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ("name","lat","lng")
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (  'name',
                    'preferred_language',
                    'library_card',
                    'phone',
                    'email',
                    'notify_by',
                    'primary_location',
        )

    def to_representation(self, instance):
        ret = super().to_representation(instance) 
        ret['username'] = instance.user.username
        ret['active_requests'] = instance.titles_requested().count()
        ret['active_loans'] = instance.items_on_loan().count() 
        ret['lender_items'] = instance.lender_items_by_status()
        return ret


