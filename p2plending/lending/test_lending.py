from django.test import TestCase
from .factories import ProfileFactory,TitleFactory,ItemFactory

class LendingTestCase(TestCase):

    def test_titles(self):
        title = TitleFactory()
        self.assertEqual(title.available_items().count(),1)  
    
        #item = ItemFactory(title=title)
        #self.assertEqual(title.available_items().count(),1)  
       
    
