from django.contrib import admin
from django.urls import path, include
from django.urls import path




urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),  # signup = /api/signup/, login = /api/login/
]
