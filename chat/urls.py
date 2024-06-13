from django.urls import path

from .views import *


urlpatterns = [
    path('message/', ChatAPIView.as_view()),
]