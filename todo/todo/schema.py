import graphene
from graphene_django import DjangoObjectType
from notes.models import TODO
from authors.models import Author


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"

class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = "__all__"

class Query(graphene.ObjectType):
    all_todo = graphene.List(TODOType)
    all_author = graphene.List(AuthorType)
    author_by_id = graphene.Field(AuthorType, id=graphene.Int(required=True))
    todo_by_author_name = graphene.List(TODOType, name=graphene.String(required=True))

    def resolve_all_todo(root, info):
        return TODO.objects.all()

    def resolve_all_author(root, info):
        return Author.objects.all()

    def resolve_author_by_id(root, info, id):
        try:
            return Author.objects.get(pk=id)
        except Author.DoesNotExist:
            return None

    def resolve_todo_by_author_name(root, info, name):
        todo = TODO.objects.all()
        if name:
            todo = todo.filter(author__name=name)



schema = graphene.Schema(query=Query)
