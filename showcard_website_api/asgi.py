"""
ASGI config for showcard_website_api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "showcard_website_api.settings")

application = get_asgi_application()
