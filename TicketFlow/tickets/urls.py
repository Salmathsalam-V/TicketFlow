from django.urls import path, include
from . import views

urlpatterns = [
    path('create/', views.create_ticket, name='create_ticket'),
]