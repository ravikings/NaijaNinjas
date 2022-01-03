from rest_framework import permissions
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class IsRunner(permissions.BasePermission):
    """
    Custom permission to only allow runner have access to view.
    """

    def has_permission(self, request, view):

        if request.user.is_a_runner:
            return True
