from django.core.management.base import BaseCommand, CommandError
from lending.factories import TitleFactory
from lending.factories import LocationFactory
from lending.factories import LoanFactory
from lending.factories import ItemFactory
from lending.factories import ProfileFactory
from lending.models import Title
from django.conf import settings
import requests
import factory

class Command(BaseCommand):
    help = 'Generates test data for lending database. WARNING this will ADD data'

    def add_arguments(self, parser):
        parser.add_argument('num-titles', nargs=1, type=int, default=100)
        parser.add_argument('--loans-and-requests',
                action="store_true",
                help="flag to indicate to generate active loans and requests",
        )

    def handle(self, *args, **options):
        if not settings.DEBUG:
            print("WARNING: you are not in DEBUG mode, are you sure you want to continue? Y/N")
            if input().lower() != "y":
                print("aborting")
                return
   
        if Title.objects.all().exists():
            print("WARNING: you have titles in your database. Do you want to generate more? Y/N")
            if input().lower() != "y":
                print("aborting")
                return

        l = LocationFactory(name="Branch Library")
        n = options['num-titles'][0]
        x = TitleFactory.create_batch(n,item='')
        print(x[0])
        if options.get("loans_and_requests", False):   #Keep this as an underscore or it breaks
            q = ProfileFactory.create_batch(n)
            for y in range(n):
                title=x[y]
                owner=q[y]
                LoanFactory.create_batch(1,item=factory.SubFactory(ItemFactory, title=title,owner=owner),borrower=owner)
            #TODO: Figure out if you need to decouple number of loans from titles and if so, find out how and implement
            #TODO: Figure out why it keeps erroring out when I delete stuff
        else:
            for z in range(n):
                title = x[z]
                print(title)
                ItemFactory.create_batch(1, title=title)


