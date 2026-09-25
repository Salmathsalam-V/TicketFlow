from http.client import HTTPResponse
from django.shortcuts import render

# Create your views here.
def create_ticket(request):
    if request.method == 'POST':
        # Handle ticket creation logic here
        return HTTPResponse("Ticket created successfully.")
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Ticket
from .serializers import TicketSerializer


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            queryset = Ticket.objects.all()
        else:
            queryset = Ticket.objects.filter(user=user)

        status_filter = self.request.query_params.get('status')
        priority_filter = self.request.query_params.get('priority')
        user_filter = self.request.query_params.get('user')

        if status_filter:
            queryset = queryset.filter(status=status_filter)

        if priority_filter:
            queryset = queryset.filter(priority=priority_filter)

        if user_filter and user.is_staff:
            queryset = queryset.filter(user_id=user_filter)

        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            status='open'
        )