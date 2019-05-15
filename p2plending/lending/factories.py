import factory
from django.contrib.auth.models import User
from .models import Location,Profile,Title,Item,Loan,TitleRequest
from django.utils.timezone import now

class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
    is_active = True
    is_staff = False  
    username = factory.Sequence(lambda n: 'user_{0}'.format(n))

class LocationFactory(factory.DjangoModelFactory):
    class Meta:
        model = Location
    name = factory.Sequence(lambda n: 'location_{0}'.format(n))
    lat = 32.7832636 
    lng = -117.1712191 

class ProfileFactory(factory.DjangoModelFactory):
    class Meta:
        model = Profile 
    user = factory.SubFactory(UserFactory)
    preferred_language = "en"
    primary_location = factory.SubFactory(LocationFactory)
    library_card = factory.Sequence(lambda n: 'LIB%08i' % n)
    name =  factory.Sequence(lambda n: 'User{0} Name'.format(n))
    email =  factory.Sequence(lambda n: 'user{0}@example.com'.format(n))
    phone =  factory.Sequence(lambda n: '555-555-%04i' % n)
    notify_by = "email"

class ItemFactory(factory.DjangoModelFactory):
    class Meta:
        model = Item    
    guid = factory.Sequence(lambda n: 'GUID%08i' % n)
    owner = factory.SubFactory(ProfileFactory)
    status = "available"
    date_added = now()

class TitleFactory(factory.DjangoModelFactory):
    class Meta:
        model = Title
    title = factory.Sequence(lambda n: 'Title-{0}'.format(n))
    media_type = "book"
    description = factory.Sequence(lambda n: 'Description {0}'.format(n))
    cover_image = None
    meta_data = "{}"
    item = factory.RelatedFactory(ItemFactory,"title")


