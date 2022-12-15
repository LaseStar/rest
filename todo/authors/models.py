from django.db import models


class Author(models.Model):
    user_name = models.CharField(max_length=128)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    # birthday_year = models.PositiveIntegerField()
    email = models.EmailField(max_length=70, blank=True, unique=True)

    def __str__(self):
        return self.user_name
