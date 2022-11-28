from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from .models import Author
from .serializers import AuthorModelSerializer
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.renderers import BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import api_view, renderer_classes


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

    # def get_queryset(self):
    #     return Author.objects.get(id=1)


class AuthorAPIView(APIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get(self, request):
        authors = Author.objects.all()
        pk = request.query_params.get('id')
        if pk:
            authors = authors.filter(id=pk)
        serializer = AuthorModelSerializer(authors, many=True)
        return Response({"Authors": serializer.data})

    def put(self, request, pk):
        saved_author = get_object_or_404(Author.objects.all(), pk=pk)
        data = request.date.get('authors')
        serializer = AuthorModelSerializer(instance=saved_author, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            author_saved = serializer.save()

        return Response({"success": "Authors '{}' updated successfully".format(author_saved.user_name)})


# @api_view(['GET','POST'])
# @renderer_classes([JSONRenderer, BrowsableAPIRenderer])
# def get(request):
#     if request.method == 'GET':
#         author = Author.objects.all()
#         serializer = AuthorModelSerializer(author, many=True)
#         return Response({'Lase': 1})
#     elif request.method == 'POST':
#         pass
