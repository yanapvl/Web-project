// frontend/app/types.ts

// Базовий інтерфейс
export interface CommonData { id: number; }

// Секція 1: Hero
export interface HeroData extends CommonData { 
    title: string; 
    subtitle: string; 
    description: string; 
    hero_image: string; 
    premium_users: number; 
    customers: number; 
    winning: number; 
}

// Секція 2: Features
export interface FeatureData extends CommonData { 
    title: string; 
    description: string; 
    icon: string; 
    order: number; 
}

// Секція 3: Products
export interface ProductData extends CommonData { 
    name: string; 
    description: string; 
    price: string; 
    volume: number; 
    image: string; 
    is_available: boolean; 
    is_featured: boolean; 
}

// Секція 4: About
export interface AboutSectionData extends CommonData { 
    title: string; 
    highlight_word: string; 
    description: string; 
    image_left: string; 
    image_right: string; 
}

// Секція 5: Events (на основі EventSerializer)
export interface EventData extends CommonData {
    title: string;
    description: string;
    image: string;
    card_size: 'small' | 'medium' | 'large';
}

// Секція 6: Contacts (на основі ContactSerializer)
export interface ContactData extends CommonData {
    phone: string;
    description: string;
    address_image: string | null;
}

// Секція 7: Footer (на основі FooterLinkSerializer)
export interface FooterLinkData extends CommonData {
    category: string;
    title: string;
    url: string;
    order: number;
}

// Секція 8: Settings (на основі SiteSettingsSerializer)
export interface SiteSettingsData extends CommonData {
    site_name: string;
    logo: string;
    meta_title: string;
    meta_description: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
}

// Головний тип, що об'єднує всі дані з ендпоінту /api/landing-page/
export interface LandingPageData {
    hero: HeroData | null;
    features: FeatureData[];
    products: ProductData[];
    about: AboutSectionData | null;
    events: EventData[];
    contact: ContactData | null;
    footer_links: FooterLinkData[];
    settings: SiteSettingsData | null;
}