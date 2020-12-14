from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('clientside.urls')),
    path('plot/', include('plot.api.urls')),
    path('api-auth/', include('rest_framework.urls')),
]
admin.site.site_header = 'COUNTY GOVERNMENT OF KIAMBU LANDRATES ADMINISTRATION'
