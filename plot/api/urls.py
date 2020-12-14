from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_plot, name="get_plot"),
    path('plots', views.get_plots, name="get_plots"),
    path('pay/', views.make_payments, name="pay"),
    path('mpesa/', views.LNMtransact, name="mpesa"),

]