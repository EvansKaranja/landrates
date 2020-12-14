from django.contrib import admin
from .models import Plot,MpesaPayments,LandratesPayments
# Register your models here.
admin.site.register(Plot)
admin.site.register(MpesaPayments)
admin.site.register(LandratesPayments)
