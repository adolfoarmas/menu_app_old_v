from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False


    #def has_object_permission(self, request, view, obj):
        # """ Permissions to UPDATE,  DELETE granted if the user logged in created the instance"""
        # if request.method in permissions.SAFE_METHODS:
        #     return True  
        #In this case we do not need to validate this
        # return obj.created_by == request.user