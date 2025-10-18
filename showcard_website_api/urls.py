"""
URL configuration for showcard_website_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from landing import views  # ← ВИПРАВЛЕНО! Без ..

router = DefaultRouter()
router.register(r'hero', views.HeroSectionViewSet, basename='hero')
router.register(r'features', views.FeatureViewSet, basename='features')
router.register(r'products', views.ProductViewSet, basename='products')
router.register(r'about', views.AboutSectionViewSet, basename='about')
router.register(r'events', views.EventViewSet, basename='events')
router.register(r'contacts', views.ContactViewSet, basename='contacts')
router.register(r'footer-links', views.FooterLinkViewSet, basename='footer-links')
router.register(r'settings', views.SiteSettingsViewSet, basename='settings')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/landing-page/', views.landing_page_data, name='landing-page'),
]

# Для медіа файлів в режимі розробки
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)