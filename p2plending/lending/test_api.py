from django.test import TestCase
from .factories import ProfileFactory,TitleFactory,ItemFactory
from .models import Title,Item
from django.urls import reverse
from django.test import Client 
import json

class LendingAPITestCase(TestCase):
    '''Test lending specific API endpoints '''

    def test_title_list(self):
        # Generic "make sure the lights are on" test on rest_framework api
        # no need to do this for every CRUD api endpoint
        TitleFactory.create_batch(5)
        resp = self.client.get(reverse("titles-list"))
        self.assertEqual(resp.status_code,200)

        obj = json.loads(resp.content)
        self.assertEqual(len(obj),5)

    def test_profile_api(self):
        '''verify we get logged-in user's profile data, or a 404'''
        profile = ProfileFactory()
        password = "test-pass"
        user = profile.user
        user.set_password(password)
        user.save()
        c = Client() 
       
        resp = c.get(reverse("current-profile-list"))
        self.assertEqual(resp.status_code,404)

        c.login(username=user.username,password=password)
        resp = c.get(reverse("current-profile-list"))
        self.assertEqual(resp.status_code,200)
        obj = json.loads(resp.content)
        self.assertEqual(obj["name"],profile.name)

