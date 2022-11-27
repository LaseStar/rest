from rest_framework.viewsets import ModelViewSet

from .models import Project, TODO
from .serializers import ProjectModelSerializer, TODOModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    pagination_class = TODOLimitOffsetPagination
    filterset_fields = ['todo_project', 'todo_authors']


class TODOAPIView(APIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get(self, request):
        todo = TODO.objects.all()
        pk = request.query_params.get('id')
        if pk:
            todo = todo.filter(id=pk)
        serializer = TODOModelSerializer(todo, many=True)
        return Response({"TODO": serializer.data})

    def put(self, request, pk):
        saved_todo = get_object_or_404(TODO.objects.all(), pk=pk)
        data = request.date.get('todo')
        serializer = TODOModelSerializer(instance=saved_todo, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            todo_saved = serializer.save()

        return Response({"success": "TODO '{}' updated successfully".format(todo_saved.user_name)})

    def delete(self, request, pk):
        todo = get_object_or_404(TODO.objects.all(), pk=pk)
        todo.todo_close = True
        return Response({"message": "TODO with id `{}` has benn closed".format(pk)}, status=204)


