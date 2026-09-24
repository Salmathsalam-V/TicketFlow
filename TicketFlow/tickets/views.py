from http.client import HTTPResponse
from django.shortcuts import render

# Create your views here.
def create_ticket(request):
    if request.method == 'POST':
        # Handle ticket creation logic here
        return HTTPResponse("Ticket created successfully.")