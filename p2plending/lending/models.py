from django.db import models
from django.contrib.auth.models import User
from django.conf.global_settings import LANGUAGES 
from django.utils.timezone import now
import uuid

MEDIA_TYPES = ( ("book","Book"), ("periodical","Periodical") )
ITEM_STATUS = ( 
    ("available","Available"), 
    ("on-loan","On Loan"), 
    ("unavailable","Unavailable"), 
    ("private","Private Loan") 
)
LOAN_STATUS = (
    ("requested","Requested"),
    ("available","Available for Borrower Pickup"),
    ("on-loan","On Loan"),
    ("returned","Returned / Availabe for Lender Pickup"),
    ("complete","Returned to Lender"),
    ("lost","Item Lost"),
    ("return-issue","Item Returned in poor quality"),
)
REQUEST_STATUS = (
    ("requested","Requested"),
    ("canceled", "Canceled"),
    ("complete", "Completed"),
)
NOTIFY_BY = (("email","email"),("sms","sms"))

class Location(models.Model):
    name = models.CharField(max_length=255) 
    lat = models.FloatField()
    lng = models.FloatField()

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.SET_NULL,null=True) 
    preferred_language = models.CharField(max_length=16,choices=LANGUAGES,blank=True,null=True)  
    library_card = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=64,blank=True)
    email = models.EmailField(null=True,blank=True)
    notify_by = models.CharField(max_length=8,choices=NOTIFY_BY,blank=True,null=True)
    primary_location = models.ForeignKey(Location,on_delete=models.SET_NULL,null=True)


    def __str__(self):
        return "%s (%s)" % (self.name, self.library_card)

    def items_on_loan(self):
        return self.loan_set.filter(status="on-loan")

    def titles_requested(self):
        return self.titlerequest_set.filter(status="requested")

class Title(models.Model):
    language = models.CharField(max_length=16,choices=LANGUAGES,blank=True,null=True)  
    title = models.CharField(max_length=255)
    cover_image = models.ImageField(null=True,upload_to='covers/%Y/%m/%d/',blank=True)
    media_type = models.CharField(max_length=8,choices=MEDIA_TYPES)
    description = models.TextField(blank=True)
    meta_data = models.TextField(blank=True)

    def available_items(self):
        return self.item_set.filter(status="available")

    def __str__(self):
        return "%s (%s - %s)" % (self.title,self.media_type,self.language)
   
class Item(models.Model):
    guid = models.CharField(max_length=255,blank=True)
    title = models.ForeignKey(Title,on_delete=models.CASCADE)   
    owner = models.ForeignKey(Profile,on_delete=models.CASCADE)
    status = models.CharField(max_length=16,choices=ITEM_STATUS,default="available")
    date_added = models.DateTimeField(blank=True)

    def save(self,*args,**kwargs):
        if not self.guid:
            self.guid = uuid.uuid4().hex
        if not self.date_added:
            self.date_added = now()
        super(Item,self).save(*args,**kwargs)

    def __str__(self):
        return "%s (%s) [%s]" % (self.title, self.guid, self.status)
      
class Loan(models.Model):
    borrower = models.ForeignKey(Profile,on_delete=models.SET_NULL,null=True)
    item = models.ForeignKey(Item,on_delete=models.SET_NULL,null=True)
    start_date = models.DateTimeField()
    due_date = models.DateTimeField()
    renewal_of = models.ForeignKey("self",blank=True,null=True,on_delete=models.SET_NULL)
    status = models.CharField(max_length=16,choices=LOAN_STATUS,default="requested")
 
class TitleRequest(models.Model):
    requester = models.ForeignKey(Profile,on_delete=models.SET_NULL,null=True)  
    title = models.ForeignKey(Title,on_delete=models.CASCADE)
    request_date = models.DateTimeField()
    loan = models.ForeignKey(Loan,blank=True,null=True,on_delete=models.SET_NULL)
    status = models.CharField(max_length=255,default="pending",choices=REQUEST_STATUS)


