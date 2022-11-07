from .models import Author
from rest_framework.serializers import ModelSerializer


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ('user_name', 'firstname', 'lastname', 'email')
        # fields = '__all__'
