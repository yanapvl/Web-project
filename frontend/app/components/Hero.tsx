// frontend/app/components/HeroSection.tsx
import React from 'react';

// Інтерфейс відповідає HeroSectionSerializer
interface HeroData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    hero_image: string; // URL до зображення
    premium_users: number;
    customers: number;
    winning: number;
}

interface HeroProps {
    data: HeroData;
}

// Функція для форматування чисел (9000 -> 9k+)
const formatNumber = (num: number, suffix: string): string => {
    if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}k+ ${suffix}`;
    }
    return `${num} ${suffix}`;
};


export const HeroSection: React.FC<HeroProps> = ({ data }) => {
    // Враховуючи, що у вас в дизайні є "New Cafe by StarBucks", 
    // ми використовуємо title та subtitle
    const brandName = "StarBucks"; 
    
    // ВАЖЛИВО: Оскільки це компонент для відображення медіафайлів Django, 
    // вам потрібно буде налаштувати BASE_URL для зображень (наприклад, 'http://localhost:8000')
    const BASE_URL = 'http://localhost:8000'; 
    const imageUrl = `${BASE_URL}${data.hero_image}`; 

    return (
        <section className="container" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingTop: '80px', 
            minHeight: '80vh'
        }}>
            {/* Ліва колонка - Текст та кнопки */}
            <div style={{ maxWidth: '50%' }}>
                <h1 style={{ fontSize: '4em', margin: '0 0 10px 0' }}>
                    {data.title}
                </h1>
                <h2 className="accent-text" style={{ fontSize: '4em', margin: '0 0 20px 0' }}>
                    by {brandName}
                </h2>
                
                <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                    {data.description}
                </p>

                {/* Кнопки */}
                <div style={{ margin: '30px 0' }}>
                    <button className="btn btn-primary" style={{ marginRight: '15px' }}>
                        Select a coffee
                    </button>
                    <button className="btn btn-secondary">
                        More
                    </button>
                </div>

                {/* Статистика */}
                <div style={{ display: 'flex', marginTop: '40px' }}>
                    <div style={{ marginRight: '40px' }}>
                        <h3 style={{ margin: '0 0 5px 0' }}>
                            {formatNumber(data.premium_users, 'Premium Users')}
                        </h3>
                        <p style={{ color: '#aaa', margin: '0' }}>Premium Users</p>
                    </div>
                    {/* ... інші поля customers та winning ... */}
                </div>
            </div>

            {/* Права колонка - Зображення */}
            <div style={{ maxWidth: '45%' }}>
                {/*  - Цей тег імітує зображення з дизайну */}
                <img 
                    src={imageUrl} 
                    alt={data.title} 
                    style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                />
            </div>
        </section>
    );
};