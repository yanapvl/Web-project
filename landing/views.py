from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    HeroSection, Feature, Product, AboutSection,
    Event, Contact, FooterLink, SiteSettings
)
from .serializers import (
    HeroSectionSerializer, FeatureSerializer, ProductSerializer,
    AboutSectionSerializer, EventSerializer, ContactSerializer,
    FooterLinkSerializer, SiteSettingsSerializer, LandingPageSerializer
)


class HeroSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSection.objects.filter(is_active=True)
    serializer_class = HeroSectionSerializer


class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feature.objects.filter(is_active=True)
    serializer_class = FeatureSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer


class AboutSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutSection.objects.filter(is_active=True)
    serializer_class = AboutSectionSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.filter(is_active=True)
    serializer_class = EventSerializer


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contact.objects.filter(is_active=True)
    serializer_class = ContactSerializer


class FooterLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FooterLink.objects.filter(is_active=True)
    serializer_class = FooterLinkSerializer


class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer


@api_view(['GET'])
def landing_page_data(request):
    """Повертає всі дані для landing page одним запитом"""
    data = {
        'hero': HeroSectionSerializer(HeroSection.objects.filter(is_active=True).first()).data,
        'features': FeatureSerializer(Feature.objects.filter(is_active=True), many=True).data,
        'products': ProductSerializer(Product.objects.filter(is_available=True), many=True).data,
        'about': AboutSectionSerializer(AboutSection.objects.filter(is_active=True).first()).data,
        'events': EventSerializer(Event.objects.filter(is_active=True), many=True).data,
        'contact': ContactSerializer(Contact.objects.filter(is_active=True).first()).data,
        'footer_links': FooterLinkSerializer(FooterLink.objects.filter(is_active=True), many=True).data,
        'settings': SiteSettingsSerializer(SiteSettings.objects.first()).data,
    }
    return Response(data)