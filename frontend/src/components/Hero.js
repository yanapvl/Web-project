// frontend/src/components/Hero.js
import React from 'react';

// Отримуємо 'heroData' та 'getImageUrl' як "props" (властивості) від App.js
const Hero = ({ heroData, getImageUrl }) => {
  // Перевірка, чи дані взагалі є
  if (!heroData) {
    return null; // Або якийсь компонент завантаження
  }

  // Функція для форматування статистики (напр., 9000 -> 9k+)
  const formatStat = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k+';
    }
    return num + '+';
  };

  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>{heroData.title}</h1>
        <p>{heroData.subtitle}</p>
        <p>{heroData.description}</p>
        {/* ... Тут ваші кнопки ... */}
        
        <div className="stats">
          {/* Модель: premium_users, Дизайн: "9k+ Premium Users" */}
          <div>
            <h3>{formatStat(heroData.premium_users)}</h3>
            <p>Premium Users</p>
          </div>
          <div>
            <h3>{formatStat(heroData.customers)}</h3>
            <p>Happy Customer</p>
          </div>
          <div>
            <h3>{heroData.winning}+</h3>
            <p>Awards Winning</p>
          </div>
        </div>
      </div>
      
      <div className="hero-image">
        <img src={getImageUrl(heroData.hero_image)} alt={heroData.title} />
      </div>
    </section>
  );
};

export default Hero;