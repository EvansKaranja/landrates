from .base import *
SECRET_KEY = 'zzz&)1n2fy!x$d#+w+onuf3w%1*&4apcj=m0*!elrdbx&0pg8&'
DEBUG = True
ALLOWED_HOSTS = ['127.0.0.1', 'b533457ea1ed.ngrok.io']
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'landratesprj',
        'USER': 'postgres',
        'HOST': 'localhost',
        'PASSWORD': 'mohges',
        'PORT': '5432',
    }
}
