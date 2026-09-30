from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login_view'),
    path('logout/', views.logout_view, name='logout_view'),
    path('current-user/', views.current_user, name='current_user'),
    path('register/', views.register_view, name='register_view'),
    path('change-password/',views.change_password,name='change-password'),
]