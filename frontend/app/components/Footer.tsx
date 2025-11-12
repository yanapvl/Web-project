// frontend/app/components/Footer.tsx
import React from 'react';
import { FooterLinkData, SiteSettingsData } from '../types'; 

// Об'єднуємо всі пропси для зручності
interface FooterProps {
    links: FooterLinkData[];
    settings: SiteSettingsData;
    contactPhone: string; // Телефон беремо з ContactData, але передаємо напряму
}

// Функція для групування посилань за категорією
const groupLinksByCategory = (links: FooterLinkData[]) => {
    return links.reduce((acc, link) => {
        // Приводимо категорію до формату "Main" -> "Main"
        const categoryKey = link.category.charAt(0).toUpperCase() + link.category.slice(1);
        
        if (!acc[categoryKey]) {
            acc[categoryKey] = [];
        }
        acc[categoryKey].push(link);
        return acc;
    }, {} as Record<string, FooterLinkData[]>);
};

export const Footer: React.FC<FooterProps> = ({ links, settings, contactPhone }) => {
    const groupedLinks = groupLinksByCategory(links);

    // Відображаємо лише ті категорії, які є в дизайні
    const categoriesToShow = ['Main', 'We make', 'Products', 'Events'];

    return (
        <footer style={{ 
            backgroundColor: 'var(--bg-dark)', 
            padding: '60px 0 20px 0', 
            borderTop: '1px solid #333' 
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                    
                    {/* ЛІВА ЧАСТИНА: Назва сайту та телефон */}
                    <div style={{ maxWidth: '300px' }}>
                        <h3 className="accent-text" style={{ margin: '0 0 10px 0', fontSize: '1.5em' }}>
                            {settings.site_name}
                        </h3>
                        
                        {/* Телефон з секції контактів */}
                        <p style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                            {contactPhone}
                        </p>
                    </div>

                    {/* ПРАВА ЧАСТИНА: Навігаційні посилання */}
                    <div style={{ display: 'flex', gap: '50px' }}>
                        {categoriesToShow.map((category) => (
                            <div key={category}>
                                {/* Заголовок категорії */}
                                <h4 style={{ color: 'var(--text-light)', margin: '0 0 15px 0' }}>
                                    {category}
                                </h4>
                                {/* Список посилань */}
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {groupedLinks[category]?.map((link) => (
                                        <li key={link.id} style={{ marginBottom: '8px' }}>
                                            <a 
                                                href={link.url} 
                                                style={{ color: '#aaa', textDecoration: 'none' }}
                                            >
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Нижня частина футера (copyright/scroll to top) */}
                <div style={{ borderTop: '1px solid #333', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    {/* Імітація кнопки "нагору" */}
                    <div style={{ 
                        width: '30px', height: '30px', 
                        borderRadius: '50%', 
                        border: '1px solid var(--text-light)', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer'
                    }}>
                        ↑
                    </div>
                </div>
            </div>
        </footer>
    );
};