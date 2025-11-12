from rest_framework import serializers
from .models import (
    HeroSection, Feature, Product, AboutSection,
    Event, Contact, FooterLink, SiteSettings
)


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = [
            'id', 'title', 'subtitle', 'description', 'hero_image',
            'premium_users', 'customers', 'winning', 'is_active'
        ]


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'title', 'description', 'icon', 'order']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'volume', 
            'image', 'is_available', 'is_featured'
        ]


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = [
            'id', 'title', 'highlight_word', 'description',
            'image_left', 'image_right'
        ]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'image', 'card_size']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'phone', 'description', 'address_image']


class FooterLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLink
        fields = ['id', 'category', 'title', 'url', 'order']


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            'id', 'site_name', 'logo', 'meta_title', 'meta_description',
            'facebook_url', 'instagram_url', 'twitter_url'
        ]


class LandingPageSerializer(serializers.Serializer):
    """Комплексний серіалайзер для всієї landing page"""
    hero = HeroSectionSerializer(read_only=True)
    features = FeatureSerializer(many=True, read_only=True)
    products = ProductSerializer(many=True, read_only=True)
    about = AboutSectionSerializer(read_only=True)
    events = EventSerializer(many=True, read_only=True)
    contact = ContactSerializer(read_only=True)
    footer_links = FooterLinkSerializer(many=True, read_only=True)
    settings = SiteSettingsSerializer(read_only=True)
    
