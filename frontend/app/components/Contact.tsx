// frontend/app/components/ContactSection.tsx
import React from 'react';
import { ContactData } from '../types'; 

interface ContactProps {
    data: ContactData;
}

// ВАЖЛИВО: Налаштуйте BASE_URL
const BASE_URL = 'http://localhost:8000'; 

export const ContactSection: React.FC<ContactProps> = ({ data }) => {
    
    // Перевіряємо, чи є зображення адреси, оскільки воно може бути null
    const addressImageUrl = data.address_image ? `${BASE_URL}${data.address_image}` : null;

    return (
        <section className="container" style={{ padding: '80px 0' }}>
            <div style={{ 
                display: 'flex', 
                gap: '50px', 
                alignItems: 'center',
                backgroundColor: 'var(--card-bg)', // Фон для виділення секції
                padding: '40px',
                borderRadius: '15px'
            }}>
                {/* ЛІВА ЧАСТИНА: Текст та телефон */}
                <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h2 style={{ fontSize: '3em', margin: '0 0 10px 0' }}>
                        Our <span className="accent-text">Contacts</span>
                    </h2>
                    
                    <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '40px' }}>
                        {data.description}
                    </p>

                    {/* Телефон */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Іконка телефону */}
                        <span style={{ 
                            color: 'var(--accent-green)', 
                            fontSize: '1.5em',
                            marginRight: '15px' 
                        }}>
                           📞
                        </span>
                        <p style={{ 
                            fontSize: '1.5em', 
                            fontWeight: 'bold', 
                            margin: 0,
                            color: 'var(--accent-green)'
                        }}>
                            {data.phone}
                        </p>
                    </div>
                </div>

                {/* ПРАВА ЧАСТИНА: Зображення адреси */}
                <div style={{ flex: 1 }}>
                    {addressImageUrl ? (
                        <div style={{ 
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '10px',
                        }}>
                             {/* Кутова зелена плашка "WE HAVE" */}
                            <div style={{
                                position: 'absolute',
                                top: '20px', right: '-40px',
                                background: 'var(--accent-green)',
                                color: 'var(--bg-dark)',
                                padding: '5px 40px',
                                transform: 'rotate(45deg)',
                                fontWeight: 'bold',
                                zIndex: 10
                            }}>
                                WE HAVE
                            </div>
                            
                            {/*  */}
                            <img 
                                src={addressImageUrl} 
                                alt="Адреса" 
                                style={{ 
                                    width: '100%', 
                                    height: '400px', 
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>
                    ) : (
                        <p style={{ color: '#888' }}>Зображення адреси відсутнє.</p>
                    )}
                </div>
            </div>
        </section>
    );
};