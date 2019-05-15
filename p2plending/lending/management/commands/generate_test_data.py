from django.core.management.base import BaseCommand, CommandError
from lending.factories import TitleFactory

class Command(BaseCommand):
    help = 'Generates test data for lending database. WARNING this will ADD data'

    def add_arguments(self, parser):
        parser.add_argument('num-titles', nargs=1, type=int, default=100)

    def handle(self, *args, **options):
        # TODO fuzz nicer title names and user names and images
        TitleFactory.create_batch(size=options['num-titles'][0])
        