from django.test import TestCase
from django.urls import reverse
import json
from django.test import Client 
from lending.factories import UserFactory,ProfileFactory

class P2PLendingAPITestCase(TestCase):
    ''' Test API Calls and API related infrastructure. 
        
    For testing 'business rules' use the model based lending.test_lending '''

    def test_get_csrf(self):
        resp = self.client.get(reverse("get_csrf"))
        self.assertEqual(resp.status_code,200)
        obj = json.loads(resp.content)
        self.assertTrue("csrf_token" in obj)

    # TODO figure out why this csrf test is not working
    def toast_login_workflow_with_csrf(self):
        # First get a fresh token
        resp = self.client.get(reverse("get_csrf"))
        obj = json.loads(resp.content)
        csrf = obj["csrf_token"] 

        # Create a user
        u = UserFactory()
        password = "test_password"
        u.set_password(password)
        u.save()

        # Create a client that enforces csrf
        csrf_client = Client(enforce_csrf_checks=True)
        post_data = {"username":u.username, "password":password }

        # and try to login without X-CSRFToken
        resp = csrf_client.post(reverse("rest_login"),post_data)
        self.assertEqual(resp.status_code,403)
        
        # now try to login with X-CSRFToken
        resp = csrf_client.post(reverse("rest_login"),post_data,HTTP_X_CSRFTOKEN=csrf)
        self.assertEqual(resp.status_code,200)
        self.assertTrue("key" in json.loads(resp.content))


