from .models import Project, TODO
from rest_framework.serializers import ModelSerializer


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ('project_name', 'project_link', 'project_authors')
        # fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
