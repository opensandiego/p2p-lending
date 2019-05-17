from django.test import TestCase
from .factories import ProfileFactory,TitleFactory,ItemFactory
from .models import Title

class LendingTestCase(TestCase):

    def test_titles(self):
        title = TitleFactory()
        self.assertEqual(title.available_items().count(),1)  
    
        #item = ItemFactory(title=title)
        #self.assertEqual(title.available_items().count(),1)  
       
    def test_create_loan(self):
        title = TitleFactory()
        self.assertEqual(title.available_items().count(),1)
        item = title.available_items()[0]
        self.assertEqual(item.status,"available")
        borrower = ProfileFactory()
        loan  = item.create_loan(borrower)
        self.assertEqual(loan.item.title,title)
        self.assertEqual(title.available_items().count(),0)

    def test_title_request_to_loan(self):
        title = TitleFactory()
        borrower = ProfileFactory(name="Borrower")

        title_request = title.create_request(borrower)
        self.assertEqual(title_request.requester,borrower)
        self.assertEqual(title_request.title,title)

        self.assertEqual(title.queued_requests()[0],title_request)
        loan = title.process_next_request()
        self.assertTrue(loan != None)
        self.assertEqual(loan.borrower,borrower)
        self.assertEqual( title.available_items().count(), 0)

        title_request = title.create_request(borrower)
        loan2 = title.process_next_request()
        self.assertEqual(loan2, None)


