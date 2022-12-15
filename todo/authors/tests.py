import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import AuthorModelViewSet
from notes.views import ProjectModelViewSet
from .models import Author
from notes.models import Project


class TestAuthorModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors')
        view = AuthorModelViewSet.as_view({'get':'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_create_quest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors',
                               {'user_name':'user','first_name':'user','last_name':'user','email':'user@user.com'},
                               format='json'
                               )
        view = AuthorModelViewSet.as_view({'post':'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors',
                                {'user_name': 'user', 'first_name': 'user', 'last_name': 'user',
                                'email': 'user@user.com'},
                                format='json'
                                )
        admin = User.objects.create_superuser('admin','admin@admin.com','admin')
        force_authenticate(request, admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        # author = Author.objects.create(user_name='user', first_name='user', last_name='user', email='user@user.com')
        author = mixer.blend(Author, user_name='user')
        client = APIClient()
        response = client.get(f'/api/authors/{author.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_quest(self):
        author = Author.objects.create(user_name='user', first_name='user', last_name='user', email='user@user.com')
        client = APIClient()
        response = client.put(f'/api/authors/{author.id}/',
                              {'user_name':'new_user',
                               'first_name':'new_user',
                               'last_name':'new_user',
                               'email':'new@new.com'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        author = Author.objects.create(user_name='user', first_name='user', last_name='user', email='user@user.com')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        client.login(username='admin', password='admin')
        response = client.put(f'/api/authors/{author.id}/',
                              {'user_name': 'new_user',
                               'first_name': 'new_user',
                               'last_name': 'new_user',
                               'email': 'new@new.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        author = Author.objects.get(id=author.id)
        self.assertEqual(author.user_name, 'new_user')
        self.assertEqual(author.first_name, 'new_user')
        self.assertEqual(author.last_name, 'new_user')
        self.assertEqual(author.email, 'new@new.com')
        client.logout()

class TestMath(APISimpleTestCase):
    def test_sqrts(self):
        import math
        self.assertEqual(math.sqrt(4), 2)

class TestBookViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        author = Author.objects.create(user_name='user', first_name='user', last_name='user', email='user@user.com')
        project = Project.objects.create(project_name='fist', project_link='www.git.com', project_authors=author)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        self.client.lofin(username='admin', password='admin')
        response = self.client.put(f'/api/projects/{project.id}', {'project_name':'second',
                                                                   'project_link':'www.mail.ru',
                                                                   'project_authors':project.project_authors.id
                                                                   })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.project_name,'second')
