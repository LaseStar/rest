from django.db import models
from authors.models import Author


class Project(models.Model):
    project_name = models.CharField(max_length=128)
    project_link = models.TextField()
    project_authors = models.ManyToManyField(Author)

    def __str__(self):
        return self.project_name


class TODO(models.Model):
    todo_project = models.OneToOneField(Project, on_delete=models.CASCADE)
    todo_text = models.TextField()
    todo_data_create = models.DateField()
    todo_data_update = models.DateField()
    todo_authors = models.ManyToManyField(Author)
