// frontend/app/components/FeaturesSection.tsx
import React from 'react';

// Інтерфейс відповідає FeatureSerializer
interface FeatureData {
    id: number;
    title: string;
    description: string;
    icon: string; // URL до іконки
    order: number;
}

interface FeaturesProps {
    data: FeatureData[];
}

export const FeaturesSection: React.FC<FeaturesProps> = ({ data }) => {
    
    // ВАЖЛИВО: Оскільки це компонент для відображення медіафайлів Django, 
    // вам потрібно буде налаштувати BASE_URL для зображень 
    const BASE_URL = 'http://localhost:8000'; 

    return (
        <section className="container" style={{ padding: '60px 0' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                gap: '20px', 
                backgroundColor: 'var(--card-bg)',
                padding: '40px',
                borderRadius: '15px',
                marginTop: '-10px', // Щоб секція "заходила" на Hero блок, як у дизайні
                position: 'relative',
                zIndex: 10
            }}>
                {data.map((feature) => (
                    <div key={feature.id} style={{ maxWidth: '40%', textAlign: 'center' }}>
                        {/*  */}
                        <img 
                            src={`${BASE_URL}${feature.icon}`} 
                            alt={feature.title} 
                            style={{ 
                                width: '170px', 
                                height: '150px', 
                                margin: '0 auto 10px auto',
                                objectFit: 'cover'
                            }}
                        />
                        <h3 className="accent-text" style={{ margin: '10px 0' }}>
                            {feature.title}
                        </h3>
                        <p style={{ color: '#aaa', fontSize: '0.9em' }}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};