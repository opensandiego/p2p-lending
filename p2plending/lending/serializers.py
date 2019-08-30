from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Location,Profile,Title,Item,Loan,TitleRequest,Loan

class TitleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Title
        fields = ('id','title','author','publish_year','language','cover_image','media_type','description')

class TitleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title  
        fields = ('title','language','cover_image','media_type','description')

    def to_representation(self, obj):
        result = super(TitleDetailSerializer,self).to_representation(obj)
        result['active_items'] = obj.active_items().count()
        result['available_items'] = obj.available_items().count()
        result['queued_requests'] = obj.queued_requests().count()
        return result

class LocationSerializer(serializers.ModelSerializer):
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
                    'email_notifications',
                    'email_notifications',
                    'email_notifications',
                    'primary_location',
        )

    def to_representation(self, instance):
        ret = super().to_representation(instance) 
        ret['username'] = instance.user.username
        ret['active_requests'] = instance.titles_requested().count()
        ret['active_loans'] = instance.items_on_loan().count() 
        ret['lender_items'] = instance.lender_items_by_status()
        ret['is_lender'] = instance.lender_items().exists()
        return ret

# We separate borrower and owner serializers as we will make sure
# not to expose the details of a loan to either party
class BorrowerLoanSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Loan
        fields = ('id','start_date','due_date','status')

    def to_representation(self, obj):
        result = super(BorrowerLoanSerializer,self).to_representation(obj)
        result['title'] = TitleSerializer(obj.item.title).data
        return result

class OwnerLoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ('id','item','start_date','due_date','status')

    def to_representation(self, obj):
        result = super(OwnerLoanSerializer,self).to_representation(obj)
        result['title'] = TitleSerializer(obj.item.title).data
        return result

class TitleRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleRequest
        fields = ('id','request_date','status')

    def to_representation(self, obj):
        result = super(TitleRequestSerializer,self).to_representation(obj)
        result['title'] = TitleSerializer(obj.title).data
        result['queue_position'] = obj.queue_position()
        return result



