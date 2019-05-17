from django.core.management.base import BaseCommand, CommandError
from lending.factories import TitleFactory
from lending.models import Title
from django.conf import settings
import requests

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
        TitleFactory.create_batch(n)

        if options.get("loans-and-requests",False):
            print("TODO generate loans and requests")


