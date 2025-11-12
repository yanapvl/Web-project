// frontend/app/components/AboutSection.tsx
import React from 'react';
import { AboutSectionData } from '../types'; // Припускаємо, що ми імпортуємо тип з уніфікованого джерела

interface AboutProps {
    data: AboutSectionData;
}

// ВАЖЛИВО: Налаштуйте BASE_URL
const BASE_URL = 'http://localhost:8000'; 

export const AboutSection: React.FC<AboutProps> = ({ data }) => {
    // Розділяємо заголовок на дві частини, щоб виділити ключове слово
    const [titlePart1, titlePart2] = data.title.split(data.highlight_word);

    // URL'и до зображень
    const imageLeftUrl = `${BASE_URL}${data.image_left}`;
    const imageRightUrl = `${BASE_URL}${data.image_right}`;

    return (
        <section className="container" style={{ padding: '80px 0' }}>
            <div style={{ 
                display: 'flex', 
                gap: '50px', 
                alignItems: 'center' 
            }}>
                {/* ЛІВА ЧАСТИНА: Велике зображення */}
                <div style={{ flex: 1 }}>
                    {/*  */}
                    <img 
                        src={imageLeftUrl} 
                        alt="Кав'ярня" 
                        style={{ 
                            width: '100%', 
                            height: '500px', 
                            objectFit: 'cover',
                            borderRadius: '10px'
                        }}
                    />
                </div>

                {/* ПРАВА ЧАСТИНА: Текст та мале зображення */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    
                    {/* Текст */}
                    <div style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '3em', margin: '0 0 20px 0' }}>
                            {/* Відображення заголовка з виділеним словом */}
                            {titlePart1}
                            <span className="accent-text">{data.highlight_word}</span>
                            {titlePart2}
                        </h2>
                        <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                            {data.description}
                        </p>
                    </div>

                    {/* Мале зображення */}
                    <div style={{ width: '80%', alignSelf: 'flex-end' }}>
                        {/* 

[Image of a barista making coffee]
 */}
                        <img 
                            src={imageRightUrl} 
                            alt="Бариста" 
                            style={{ 
                                width: '100%', 
                                height: '300px', 
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};