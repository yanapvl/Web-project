from django.contrib import admin
from .models import (  
    HeroSection, Feature, Product, AboutSection, 
    Event, Contact, FooterLink, SiteSettings
)


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'premium_users', 'customers', 'winning', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_active']
    
    fieldsets = (
        ('Основна інформація', {
            'fields': ('title', 'subtitle', 'description', 'hero_image', 'is_active')
        }),
        ('Статистика', {
            'fields': ('premium_users', 'customers', 'winning')
        }),
    )


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    list_editable = ['order', 'is_active']
    ordering = ['order']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'volume', 'is_available', 'is_featured', 'order', 'created_at']
    list_filter = ['is_available', 'is_featured', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['price', 'is_available', 'is_featured', 'order']
    ordering = ['order', '-created_at']
    
    fieldsets = (
        ('Основна інформація', {
            'fields': ('name', 'description', 'image')
        }),
        ('Ціна та характеристики', {
            'fields': ('price', 'volume')
        }),
        ('Налаштування', {
            'fields': ('is_available', 'is_featured', 'order')
        }),
    )


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'highlight_word', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    list_editable = ['is_active']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'card_size', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'card_size', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['card_size', 'order', 'is_active']
    ordering = ['order', '-created_at']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['phone', 'is_active']
    list_filter = ['is_active']
    search_fields = ['phone', 'description']
    list_editable = ['is_active']


@admin.register(FooterLink)
class FooterLinkAdmin(admin.ModelAdmin):
    list_display = ['category', 'title', 'url', 'order', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['title', 'url']
    list_editable = ['order', 'is_active']
    ordering = ['category', 'order']


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'updated_at']
    
    fieldsets = (
        ('Основні налаштування', {
            'fields': ('site_name', 'logo')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description')
        }),
        ('Соціальні мережі', {
            'fields': ('facebook_url', 'instagram_url', 'twitter_url')
        }),
    )
    
    def has_add_permission(self, request):
        # Дозволяємо створити тільки один запис налаштувань
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Забороняємо видаляти налаштування
        return False