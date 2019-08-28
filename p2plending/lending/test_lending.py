from django.test import TestCase
from .factories import ProfileFactory,TitleFactory,ItemFactory
from .models import Title,Item

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

    def test_languages_available(self):
        title = TitleFactory.create_batch(5) 
        langs = Title.objects.available_languages()

        for l in langs:
            self.assertEqual(
                Title.objects.filter(language=l["language"]).count(),
                l["count"]
            )

    def test_lending_items(self):
        profile = ProfileFactory()
        titles = TitleFactory.create_batch(5)
        Item.objects.all().update(status='available',owner=profile)
        items = Item.objects.all()
        items[0].status = 'reserved'
        items[0].save() 
        items[1].status = 'unavailable'
        items[1].save()
        item_counts = profile.lender_items_by_status()

        expected = {"unavailable":1,"reserved":1}
        for ic in item_counts:
            if ic["status"] in expected:
                self.assertEqual(expected[ic["status"]],ic["count"])
            self.assertEqual(ic["count"],Item.objects.filter(status="available").count())


    def test_loan_process(self):
        title = TitleFactory()
        borrower = ProfileFactory(name="Borrower")

        title_request = title.create_request(borrower)
        loan = title.process_next_request()
        self.assertNotEqual(loan,None)
        self.assertEqual(loan.status,"requested")

        loan.confirm_lender_dropoff()
        self.assertEqual(loan.status,"available") 
        # TODO test that we sent a notification to the borrower

        loan.confirm_borrower_pickup()
        self.assertEqual(loan.status,"on-loan")

        loan.confirm_borrower_return()
        self.assertEqual(loan.status,"returned")
        # TODO test that we sent a notification to the lender

        loan.confirm_lender_pickup()
        self.assertEqual(loan.status,"complete")
        # Confirm that after the book is returned we remove the borrower history
        self.assertEqual(loan.borrower,None)

        title_request = title.create_request(borrower)
        loan = title.process_next_request()
        self.assertNotEqual(loan,None)
        loan.confirm_lender_dropoff()
        loan.confirm_borrower_pickup()
        loan.record_return_issue()
        self.assertEqual(loan.status,"return-issue")
        self.assertEqual(loan.borrower,None)

