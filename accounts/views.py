from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSignupSerializer
from rest_framework.permissions import AllowAny
from django.shortcuts import render, redirect
from .models import User
from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
def logout_view(request):
    logout(request)
    return redirect('login')


def signup_view(request):
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        password = request.POST['password']

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already taken.")
        else:
            User.objects.create_user(name=name, email=email, password=password)
            messages.success(request, "Account created successfully!")
            return redirect('login')  # make sure you have this route

    return render(request, 'signup.html')


def home(request):
    return render(request, 'index.html')
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Anyone can access this view

    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "Logged in successfully.")
            return redirect('home')  # اپنی homepage یا dashboard کی طرف redirect کریں
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, 'login.html')
def home(request):
    return render(request, 'index.html')  # Make sure file is in templates folder
def get_started_view(request):
    if request.method == 'POST':
        # کوئی logic لگا سکتے ہیں یہاں پر
        print("User clicked Get Started")
        return redirect('home')  # یا کسی اور page پر redirect کریں
    return redirect('home')