from rest_framework import viewsets, permissions 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    HeroSection, Feature, Product, AboutSection,
    Event, Contact, FooterLink, SiteSettings
)
from .serializers import (
    HeroSectionSerializer, FeatureSerializer, ProductSerializer,
    AboutSectionSerializer, EventSerializer, ContactSerializer,
    FooterLinkSerializer, SiteSettingsSerializer,
    LandingPageSerializer 
)


class HeroSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSection.objects.filter(is_active=True)
    serializer_class = HeroSectionSerializer
    permission_classes = [permissions.AllowAny] # <-- Додано: дозволити доступ усім


class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feature.objects.filter(is_active=True)
    serializer_class = FeatureSerializer
    permission_classes = [permissions.AllowAny] # <-- Додано


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny] # <-- Додано


class AboutSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutSection.objects.filter(is_active=True)
    serializer_class = AboutSectionSerializer
    permission_classes = [permissions.AllowAny] # <-- Додано


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.filter(is_active=True)
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny] # <-- Додано


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contact.objects.filter(is_active=True)
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny] # <-- Додано


class FooterLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FooterLink.objects.filter(is_active=True)
    serializer_class = FooterLinkSerializer
    permission_classes = [permissions.AllowAny] # <-- Додано


class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [permissions.AllowAny] # <-- Додано



@api_view(['GET'])
def landing_page_data(request):
    """Повертає всі дані для landing page одним запитом"""
    
    # Використовуємо .first() для полів, де у вас лише один об'єкт (наприклад, Hero, Settings)
    # Це запобігає помилкам, якщо об'єктів ще немає в базі
    hero_data = HeroSection.objects.filter(is_active=True).first()
    about_data = AboutSection.objects.filter(is_active=True).first()
    contact_data = Contact.objects.filter(is_active=True).first()
    settings_data = SiteSettings.objects.first()

    data = {
       
        'hero': HeroSectionSerializer(hero_data).data if hero_data else None,
        'features': FeatureSerializer(Feature.objects.filter(is_active=True), many=True).data,
        'products': ProductSerializer(Product.objects.filter(is_available=True), many=True).data,
        'about': AboutSectionSerializer(about_data).data if about_data else None,
        'events': EventSerializer(Event.objects.filter(is_active=True), many=True).data,
        'contact': ContactSerializer(contact_data).data if contact_data else None,
        'footer_links': FooterLinkSerializer(FooterLink.objects.filter(is_active=True), many=True).data,
        'settings': SiteSettingsSerializer(settings_data).data if settings_data else None
    }
    return Response(data)