from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # Define the fields to be displayed in the User list page
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'is_staff', 'is_active')
    
    # Define the fields to be included in the User detail page (form)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Define the fields to be shown in the User change list page (columns)
    search_fields = ('username', 'email')
    ordering = ('username',)

    # Add the ability to filter users by specific fields in the admin list
    list_filter = ('is_staff', 'is_active', 'is_superuser', 'groups')

    # Add the fields to be included in the add user form
    add_fieldsets = (
        (None, {'fields': ('username', 'email', 'password1', 'password2')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

# Register the custom User model with the custom UserAdmin class
admin.site.register(User, CustomUserAdmin)
