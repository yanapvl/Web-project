// frontend/app/components/EventsSection.tsx
import React from 'react';
import { EventData } from '../types'; // Імпортуємо тип з уніфікованого джерела

interface EventsProps {
    data: EventData[];
}

// ВАЖЛИВО: Налаштуйте BASE_URL
const BASE_URL = 'http://localhost:8000'; 

// Функція для визначення стилів сітки на основі розміру картки
const getGridStyles = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
        case 'medium':
            return { gridColumn: 'span 2' }; // Картка займає дві колонки (як "TWO COFFEE FOR 1 PRICE")
        case 'large':
            return { gridColumn: 'span 3' }; // Якщо буде потрібна велика картка
        case 'small':
        default:
            return { gridColumn: 'span 1' }; // Картка займає одну колонку
    }
};

export const EventsSection: React.FC<EventsProps> = ({ data }) => {
    return (
        <section className="container" style={{ padding: '80px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '3em', margin: '0 0 10px 0' }}>
                        Наші нові <span className="accent-text">Події</span>
                    </h2>
                    <p style={{ color: '#aaa' }}>
                        
                    </p>
                </div>
            </div>

            {/* Контейнер сітки для подій (використовуємо 4 колонки) */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '20px' 
            }}>
                {data.map((event) => (
                    <div 
                        key={event.id} 
                        style={{ 
                            ...getGridStyles(event.card_size), // Застосовуємо стилі розміру
                            backgroundImage: `url(${BASE_URL}${event.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '10px',
                            minHeight: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '20px',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Затемнення для кращої читабельності тексту */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            zIndex: 1,
                            borderRadius: '10px',
                        }}></div>

                        {/* Вміст картки */}
                        <div style={{ zIndex: 2 }}>
                            <h3 style={{ margin: 0, fontSize: event.card_size === 'medium' ? '1.5em' : '1.2em' }}>
                                {event.title.toUpperCase()}
                            </h3>
                            {event.description && <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>{event.description}</p>}
                        </div>

                        {/* Кнопка "More" */}

                    </div>
                ))}
            </div>
        </section>
    );
};