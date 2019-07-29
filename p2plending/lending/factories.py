import factory.fuzzy
from django.contrib.auth.models import User
from .models import Location,Profile,Title,Item,Loan,TitleRequest,LANGUAGES,MEDIA_TYPES,LOAN_PERIOD,LOAN_STATUS,REQUEST_STATUS
from django.conf.global_settings import LANGUAGES 
from django.utils.timezone import now
from datetime import timedelta
import random

class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username',)
    is_active = True
    is_staff = False  
    username = factory.Sequence(lambda n: 'user_{0}'.format(n))

class LocationFactory(factory.DjangoModelFactory):
    class Meta:
        model = Location
        django_get_or_create = ('name',)
    name = factory.Sequence(lambda n: 'location_{0}'.format(n))
    lat = 32.7832636 
    lng = -117.1712191 

class ProfileFactory(factory.DjangoModelFactory):
    class Meta:
        model = Profile 
        django_get_or_create = ('user',)
    user = factory.SubFactory(UserFactory)
    preferred_language = "en"
    primary_location = factory.SubFactory(LocationFactory)
    library_card = factory.Sequence(lambda n: 'LIB%08i' % n)
    name = factory.Sequence(lambda n: fuzz_name(n))
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
    title = factory.Sequence(lambda n: fuzz_title(n))
    media_type = factory.fuzzy.FuzzyChoice([m[0] for m in MEDIA_TYPES])
    language = factory.fuzzy.FuzzyChoice(['en','es','de','fi','pa','vi'])
    description = factory.Sequence(lambda n: 'Description {0}'.format(n))
    cover_image = None
    meta_data = "{}"
    item = factory.RelatedFactory(ItemFactory,"title")
    author = factory.Sequence(lambda n: fuzz_name(n))
    publish_year = factory.fuzzy.FuzzyInteger(1700,now().year)
class LoanFactory(factory.DjangoModelFactory):
    class Meta:
        model = Loan
    borrower = factory.SubFactory(ProfileFactory)
    item = factory.SubFactory(ItemFactory)
    start_date = now()
    due_date = now()+timedelta(days=LOAN_PERIOD)
    status = random.choice([x[0] for x in LOAN_STATUS])
class TitleRequestFactory(factory.DjangoModelFactory):
    class Meta:
        model = TitleRequest
    requester = factory.SubFactory(ProfileFactory)
    title = factory.SubFactory(TitleFactory,item ='')
    loan = factory.SubFactory(LoanFactory, borrower = requester)
    request_date = now()
    status = random.choice([x[0] for x in REQUEST_STATUS])
#Todo maybe make this a factoryboy custom fuzzy attr
adj = ["Epic","Amazing","Thrilling","Subtle","Verbose","Harrowing","Hilarious"]
noun = ["Adventure","Fantasy","Mystery","History","Story","Tale","Opus","Tome"]
first = ["Mohamed","Manuel","Fatima","Mary","Santiago","Jayden","Sofia","Ximena","Noam","Maryam"]
last = ["Tremblay","Roy","Morales","Herrera","Moore","Long","Perry","Fisher"]

def fuzz_title(n):
    t = "%s %s %i" %(random.choice(adj),random.choice(noun),n)
    if random.random() > 0.75:
        t = "%s's %s" % (random.choice(first),t)
    return t

def fuzz_name(n):
    return "%s %s %i" %(random.choice(first),random.choice(last),n)


