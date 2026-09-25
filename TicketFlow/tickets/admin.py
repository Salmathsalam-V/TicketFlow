from django.contrib import admin
from .models import Ticket


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'priority',
        'status',
        'user',
        'assigned_to',
        'created_at',
        'updated_at',
    )

    list_filter = (
        'priority',
        'status',
    )

    search_fields = (
        'title',
        'description',
        'user__username',
        'assigned_to__username',
    )