// frontend/app/components/ProductsSection.tsx
import React from 'react';
// !!! ІМПОРТУЄМО ТИП З TYPES.TS !!!
import { ProductData } from '../types'; 

interface ProductsProps {
    data: ProductData[];
}

// ВАЖЛИВО: Налаштуйте BASE_URL
const BASE_URL = 'http://localhost:8000'; 

export const ProductsSection: React.FC<ProductsProps> = ({ data }) => {
    return (
        <section className="container" style={{ padding: '80px 0' }}>
            {/* Заголовок секції */}
            <h2 style={{ fontSize: '3em', margin: '0 0 10px 0' }}>
                New Our <span className="accent-text">Products</span>
            </h2>
            <p style={{ color: '#aaa', maxWidth: '600px', marginBottom: '40px' }}>
                Have time to buy the most harmonious drinks in the new StarBucks coffee and don't forget about the discount!
            </p>

            {/* Контейнер для карток продуктів */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '25px' 
            }}>
                {data.map((product) => (
                    <div key={product.id} style={{ 
                        backgroundColor: 'var(--card-bg)', 
                        borderRadius: '10px', 
                        overflow: 'hidden',
                        padding: '20px',
                        border: product.is_featured ? '2px solid var(--accent-green)' : 'none'
                    }}>
                        {/* Зображення продукту */}
                        <img 
                            src={`${BASE_URL}${product.image}`} 
                            alt={product.name} 
                            style={{ 
                                width: '100%', 
                                height: '250px', 
                                objectFit: 'contain',
                                marginBottom: '15px'
                            }}
                        />

                        {/* Назва та опис */}
                        <h3 style={{ margin: '0 0 5px 0', color: 'var(--accent-green)' }}>
                            {product.name}
                        </h3>
                        <p style={{ color: '#aaa', fontSize: '0.9em', margin: '0 0 10px 0' }}>
                            {product.description}
                        </p>
                        
                        {/* Ціна та об'єм */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px 0' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2em', margin: 0 }}>
                                {product.price}$
                            </p>
                            <p style={{ color: '#888', margin: 0 }}>
                                {product.volume} ml
                            </p>
                        </div>

                        {/* Кнопка */}
                        <button className="btn btn-primary" style={{ width: '100%' }} disabled={!product.is_available}>
                            {product.is_available ? 'Buy Product' : 'Out of Stock'}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};