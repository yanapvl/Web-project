from django.db import models
from django.core.validators import MinValueValidator


class HeroSection(models.Model):
    """Головна секція (Hero Section)"""
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    subtitle = models.CharField(max_length=200, verbose_name="Підзаголовок")
    description = models.TextField(verbose_name="Опис")
    hero_image = models.ImageField(upload_to='hero/', verbose_name="Головне зображення")
    
    # Статистика
    premium_users = models.IntegerField(default=0, verbose_name="Premium Users")
    customers = models.IntegerField(default=0, verbose_name="Customers")
    winning = models.IntegerField(default=0, verbose_name="Win/mg")
    
    is_active = models.BooleanField(default=True, verbose_name="Активна")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hero секція"
        verbose_name_plural = "Hero секції"
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Feature(models.Model):
    """Переваги (Tasty, Fast, Available)"""
    title = models.CharField(max_length=100, verbose_name="Назва")
    description = models.TextField(verbose_name="Опис")
    icon = models.ImageField(upload_to='features/', verbose_name="Іконка")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    is_active = models.BooleanField(default=True, verbose_name="Активна")

    class Meta:
        verbose_name = "Перевага"
        verbose_name_plural = "Переваги"
        ordering = ['order']

    def __str__(self):
        return self.title


class Product(models.Model):
    """Продукти (кава)"""
    name = models.CharField(max_length=200, verbose_name="Назва продукту")
    description = models.TextField(verbose_name="Опис")
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0)],
        verbose_name="Ціна"
    )
    volume = models.IntegerField(
        validators=[MinValueValidator(0)],
        verbose_name="Об'єм (ml)"
    )
    image = models.ImageField(upload_to='products/', verbose_name="Зображення")
    
    is_available = models.BooleanField(default=True, verbose_name="В наявності")
    is_featured = models.BooleanField(default=False, verbose_name="Рекомендований")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукти"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.name} - {self.price}$"


class AboutSection(models.Model):
    """Секція "We make delicious" """
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    highlight_word = models.CharField(
        max_length=100, 
        verbose_name="Виділене слово",
        help_text="Слово, яке буде зеленим (наприклад, 'delicious')"
    )
    description = models.TextField(verbose_name="Опис")
    
    image_left = models.ImageField(upload_to='about/', verbose_name="Ліве зображення")
    image_right = models.ImageField(upload_to='about/', verbose_name="Праве зображення")
    
    is_active = models.BooleanField(default=True, verbose_name="Активна")

    class Meta:
        verbose_name = "Секція About"
        verbose_name_plural = "Секції About"

    def __str__(self):
        return self.title


class Event(models.Model):
    """Події/Акції"""
    title = models.CharField(max_length=200, verbose_name="Назва події")
    description = models.TextField(blank=True, verbose_name="Опис")
    image = models.ImageField(upload_to='events/', verbose_name="Зображення")
    
    # Для різних типів карток
    CARD_SIZE_CHOICES = [
        ('small', 'Маленька'),
        ('medium', 'Середня'),
        ('large', 'Велика'),
    ]
    card_size = models.CharField(
        max_length=20, 
        choices=CARD_SIZE_CHOICES, 
        default='medium',
        verbose_name="Розмір картки"
    )
    
    is_active = models.BooleanField(default=True, verbose_name="Активна")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Подія"
        verbose_name_plural = "Події"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class Contact(models.Model):
    """Контактна інформація"""
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    description = models.TextField(verbose_name="Опис")
    address_image = models.ImageField(
        upload_to='contacts/', 
        verbose_name="Фото адреси",
        blank=True,
        null=True
    )
    
    is_active = models.BooleanField(default=True, verbose_name="Активний")

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакти"

    def __str__(self):
        return self.phone


class FooterLink(models.Model):
    """Посилання в футері"""
    CATEGORY_CHOICES = [
        ('main', 'Main'),
        ('we_make', 'We make'),
        ('products', 'Products'),
        ('events', 'Events'),
    ]
    
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES,
        verbose_name="Категорія"
    )
    title = models.CharField(max_length=100, verbose_name="Назва")
    url = models.CharField(max_length=200, verbose_name="URL")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    
    is_active = models.BooleanField(default=True, verbose_name="Активний")

    class Meta:
        verbose_name = "Посилання футера"
        verbose_name_plural = "Посилання футера"
        ordering = ['category', 'order']

    def __str__(self):
        return f"{self.category} - {self.title}"


class SiteSettings(models.Model):
    """Загальні налаштування сайту"""
    site_name = models.CharField(max_length=100, default="StarBucks", verbose_name="Назва сайту")
    logo = models.ImageField(upload_to='settings/', verbose_name="Логотип")
    
    # Meta tags для SEO
    meta_title = models.CharField(max_length=200, blank=True, verbose_name="Meta Title")
    meta_description = models.TextField(blank=True, verbose_name="Meta Description")
    
    # Соціальні мережі
    facebook_url = models.URLField(blank=True, verbose_name="Facebook")
    instagram_url = models.URLField(blank=True, verbose_name="Instagram")
    twitter_url = models.URLField(blank=True, verbose_name="Twitter")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Налаштування сайту"
        verbose_name_plural = "Налаштування сайту"

    def __str__(self):
        return self.site_name
    
    class ShowCard(models.Model):
        image = models.ImageField(upload_to='showcards/')