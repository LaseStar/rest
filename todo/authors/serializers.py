from .models import Author
from rest_framework.serializers import ModelSerializer


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ('user_name', 'first_name', 'last_name', 'email')
        # fields = '__all__'
