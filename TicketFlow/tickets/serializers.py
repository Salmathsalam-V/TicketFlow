from rest_framework import serializers
from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source='user.username',
        read_only=True
    )
    assigned_to_username = serializers.CharField(
        source='assigned_to.username',
        read_only=True
    )

    class Meta:
        model = Ticket
        fields = [
            'id',
            'title',
            'description',
            'priority',
            'status',
            'user',
            'username',
            'assigned_to',
            'assigned_to_username',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'user',
            'username',
            'created_at',
            'updated_at',
            'assigned_to_username',
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get('request')

        if request and not request.user.is_staff:
            self.fields['status'].read_only = True
            self.fields['assigned_to'].read_only = True

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                'Title cannot be empty.'
            )
        return value

    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                'Description cannot be empty.'
            )
        return value