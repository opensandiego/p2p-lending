from django.test import TestCase
from .factories import ProfileFactory,TitleFactory,ItemFactory
from .models import Title,Item
from django.urls import reverse
from django.test import Client 
import json

class LendingAPITestCase(TestCase):
    '''Test lending specific API endpoints '''

    def create_user(self):
        profile = ProfileFactory()
        password = "test-pass"
        user = profile.user
        user.set_password(password)
        user.save()
        c = Client() 
        return (profile,user,password,c)

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
        profile,user,password,c = self.create_user()
       
        resp = c.get(reverse("current-profile-list"))
        self.assertEqual(resp.status_code,404)

        c.login(username=user.username,password=password)
        resp = c.get(reverse("current-profile-list"))
        self.assertEqual(resp.status_code,200)
        obj = json.loads(resp.content)
        self.assertEqual(obj["name"],profile.name)

    def test_create_title_request(self):
        profile,user,password,c = self.create_user()
        title = TitleFactory()
        self.assertTrue(title.available_items().count() >= 1)

        c.login(username=user.username,password=password)
        resp = c.post(reverse("my-titles-create_titlerequest",args=(title.id,)))
        self.assertEqual(resp.status,200)
