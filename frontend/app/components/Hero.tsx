// frontend/app/components/HeroSection.tsx
import React from 'react';
// Використовуємо імпорт типів з types.ts для уникнення конфліктів
import { HeroData } from '../types'; 

interface HeroProps {
    data: HeroData;
}

// Функція для форматування чисел (9000 -> 9k+)
const formatNumber = (num: number): string => {
    if (num >= 1000) {
        // Додаємо + до кінця, як у дизайні, без пробілу
        return `${(num / 1000).toFixed(0)}k+`; 
    }
    return `${num}+`;
};

export const HeroSection: React.FC<HeroProps> = ({ data }) => {
    
    // ВАЖЛИВО: Переконайтеся, що ваш бекенд працює і обслуговує медіафайли
    const BASE_URL = 'http://localhost:8000'; 
    const imageUrl = `${BASE_URL}${data.hero_image}`; 

    return (
        <section className="container" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingTop: '100px', 
            minHeight: '80vh'
        }}>
            {/* Ліва колонка - Текст та кнопки */}
            <div style={{ maxWidth: '55%' }}>
                <h1 style={{ fontSize: '4em', margin: '0 0 10px 0' }}>
                    {data.title}
                </h1>
                <h2 className="accent-text" style={{ fontSize: '4em', margin: '0 0 20px 0' }}>
                    {data.subtitle}
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

                {/* Статистика: ТЕПЕР ПОВНА */}
                <div style={{ display: 'flex', marginTop: '30px' }}>
                    
                    {/* 1. Premium Users */}
                    <div style={{ marginRight: '30px' }}>
                        <h3 className="accent-text" style={{ margin: '0 0 5px 0', fontSize: '2em' }}>
                            {formatNumber(data.premium_users)}
                        </h3>
                        <p style={{ color: '#aaa', margin: '0' }}>Premium Users</p>
                    </div>
                    
                    {/* 2. Happy Customer (Customers) */}
                    <div style={{ marginRight: '30px' }}>
                        <h3 className="accent-text" style={{ margin: '0 0 5px 0', fontSize: '2em' }}>
                            {formatNumber(data.customers)}
                        </h3>
                        <p style={{ color: '#aaa', margin: '0' }}>Happy Customer</p>
                    </div>
                    
                    {/* 3. Awards Winning (Winning) */}
                    <div>
                        <h3 className="accent-text" style={{ margin: '0 0 5px 0', fontSize: '2em' }}>
                            {formatNumber(data.winning)}
                        </h3>
                        <p style={{ color: '#aaa', margin: '0' }}>Awards Winning</p>
                    </div>
                    
                </div>
            </div>

            {/* Права колонка - Зображення */}
            <div style={{ maxWidth: '25%' }}>
                <img 
                    src={imageUrl} 
                    alt={data.title} 
                    style={{ width: '100%', height: 'auto', transform: 'rotate(10deg) scale(1.1)' }}
                />
            </div>
        </section>
    );
};