from .models import Author
from rest_framework.serializers import ModelSerializer


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.user_name = validated_data.get('user_name', instance.user_name)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)

        instance.save()
        return instance
