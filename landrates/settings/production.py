import dj_database_url
from .base import *
SECRET_KEY = 'zzz&)1n2fy!x$d#+w+onuf3w%1*&4apcj=m0*!elrdbx&0pg8&'
DEBUG = True
ALLOWED_HOSTS = ['nairobiparkingsystem.herokuapp.com']
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DATABASES = {
    'default': {}
}

db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)
DATABASES['default']['ENGINE'] = 'django.contrib.gis.db.backends.postgis'

GDAL_LIBRARY_PATH = os.getenv('GDAL_LIBRARY_PATH')
GEOS_LIBRARY_PATH = os.getenv('GEOS_LIBRARY_PATH')

CORS_REPLACE_HTTPS_REFERER = True
HOST_SCHEME = "https://"
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_SECONDS = 1000000
SECURE_FRAME_DENY = True
