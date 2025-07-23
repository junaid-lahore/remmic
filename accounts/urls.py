from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Signup API
    path('signup/', RegisterView.as_view(), name='signup'),

    # JWT Login - Get Access & Refresh Tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # JWT Token Refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
