// frontend/app/page.tsx

import { HeroSection } from './components/Hero'; // Можливо, Hero, якщо ви перейменували
import { FeaturesSection } from './components/Features'; // Можливо, Features
import { ProductsSection } from './components/Products'; // Можливо, Products
import { AboutSection } from './components/About'; // Додайте цей імпорт
import { EventsSection } from './components/Events'; 
import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';
// ІМПОРТУЄМО ТИПИ З TYPES.TS
import { LandingPageData } from './types'; 
// !!! ТУТ НЕ МАЄ БУТИ ЖОДНИХ ЛОКАЛЬНИХ ОГОЛОШЕНЬ INTERFACE !!!

// Функція для отримання даних (використовує LandingPageData з імпорту)
async function getLandingPageData(): Promise<LandingPageData | null> {
    const API_URL = 'http://localhost:8000/api/landing-page/';
    
    try {
        const response = await fetch(API_URL, { cache: 'no-store' });
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return null;
        }
        const data: LandingPageData = await response.json();
        return data;
    } catch (error) {
        console.error('Помилка під час отримання даних з API:', error);
        return null;
    }
}

// Головний компонент сторінки
export default async function Home() {
    const data = await getLandingPageData();

    if (!data) {
        return (
            <main className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h1 style={{ color: 'red' }}>❌ Помилка завантаження даних</h1>
                <p>Перевірте, чи працює ваш бекенд на `http://localhost:8000`.</p>
            </main>
        );
    }
    const contactPhone = data.contact?.phone || ''; 
    const siteSettings = data.settings;
    return (
        <main>
            {/* Навігація */}
            <nav style={{ 
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                display: 'flex', justifyContent: 'space-between', padding: '20px 40px',
                backgroundColor: 'rgba(18, 18, 18, 0.9)', backdropFilter: 'blur(5px)'
            }}>
                <h3 className="accent-text" style={{ margin: 0 }}>{data.settings?.site_name || 'StarBucks'}</h3>
                {/* ... посилання навігації ... */}
            </nav>

            {/* 1. HERO SECTION */}
            {data.hero && <HeroSection data={data.hero} />}

            {/* 2. FEATURES SECTION */}
            {data.features && data.features.length > 0 && (
                <FeaturesSection data={data.features} />
            )}
            
            <hr className="container" />
            
            {/* 3. PRODUCTS SECTION */}
            {data.products && data.products.length > 0 && (
                <ProductsSection data={data.products} />
            )}

            <hr className="container" />

            {/* 4. ABOUT SECTION (НОВЕ) */}
            {data.about && <AboutSection data={data.about} />}
            
            <hr className="container" />
            
           {/* 5. EVENTS SECTION (НОВЕ) */}
            {data.events && data.events.length > 0 && (
                <EventsSection data={data.events} />
            )}
            
            <hr className="container" />
            {/* 6. CONTACTS SECTION (НОВЕ) */}
            {data.contact && <ContactSection data={data.contact} />}
            
            <hr className="container" />
            {/* 7. FOOTER SECTION (ФІНАЛЬНИЙ КОМПОНЕНТ) */}
            {siteSettings && data.footer_links.length > 0 && (
                <Footer 
                    links={data.footer_links} 
                    settings={siteSettings} 
                    contactPhone={contactPhone} 
                />
            )}

        </main>
    );
}