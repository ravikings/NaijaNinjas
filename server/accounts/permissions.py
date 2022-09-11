from rest_framework import permissions
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class IsRunner(permissions.BasePermission):
    """
    Custom permission to only allow runner have access to view.
    """

    def has_permission(self, request, view):

        if request.user.is_a_runner:
            return True


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow runner have access to view.
    """

    def has_permission(self, request, view, obj):

        return obj.owner == request.user


class CanApproveTask(permissions.BasePermission):
    """
    Custom permission to only task created.
    """

    def has_permission(self, request, view, obj):

        if not request.user.is_a_runner:
            return request.user == obj.payment_author


class ProViewActiveTaskTimeline(permissions.BasePermission):
    """
    Custom permission to only allow runner have access to view.
    """

    def has_permission(self, request, view, obj):

        if request.user.is_a_runner:

            return obj.bidder_profile.author == request.user