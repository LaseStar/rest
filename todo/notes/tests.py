# import json
# from django.test import TestCase
# from rest_framework import status
# from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
# from django.contrib.auth.models import User
# from .views import AuthorModelViewSet, ProjectModelViewSet
# from .models import Author, Project
#
#
# class TestBookViewSet(APITestCase):
#
#     def test_get_list(self):
#         response = self.client.get('/api/projects/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
