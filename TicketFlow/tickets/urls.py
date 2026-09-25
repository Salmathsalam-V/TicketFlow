from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet

router = DefaultRouter()

router.register('tickets', TicketViewSet, basename='ticket') # router basically Take this TicketViewSet and automatically create the standard REST URLs(get,post,put,etc) for it.

urlpatterns = [
    path('', include(router.urls)),
]