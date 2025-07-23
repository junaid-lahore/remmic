from django.contrib import admin
from .models import User

@admin.register(User)
class userAdmin(admin.ModelAdmin):
    list_display = ('email', 'get_full_name', 'is_active', 'is_staff')  # jitne fields chahen add kar lo

    def get_full_name(self, obj):
        return obj.name  # ya jis tarah aapka data structure ho

    get_full_name.short_description = 'Full Name'
