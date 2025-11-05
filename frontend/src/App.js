// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Ваші майбутні стилі

// Імпортуємо всі наші компоненти
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Products from './components/Products';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';

// URL вашого Django API
const API_BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Робимо запит до ВАШОГО ендпоінту
        const response = await fetch(`${API_BASE_URL}/api/landing-page/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log("Дані з API завантажено:", jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // Пустий масив = виконати 1 раз

  // Функція-помічник для отримання повного URL зображення
  const getImageUrl = (path) => {
    if (!path) return null; // Перевірка, чи шлях не порожній
    return `${API_BASE_URL}${path}`;
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;
  if (!data) return <div>Дані не знайдено.</div>;

  // Дані завантажено, "роздаємо" їх компонентам
  return (
    <div className="App">
      {/* data.settings містить логотип, data.footer_links - посилання */}
      <Header 
        settings={data.settings} 
      />

      {/* data.hero - це об'єкт HeroSection */}
      <Hero 
        heroData={data.hero} 
        getImageUrl={getImageUrl} 
      />

      {/* data.features - це масив [{...}, {...}] */}
      <Features 
        featuresData={data.features} 
        getImageUrl={getImageUrl} 
      />

      {/* data.about - це об'єкт AboutSection */}
      <About 
        aboutData={data.about} 
        getImageUrl={getImageUrl} 
      />

      {/* data.products - це масив продуктів */}
      <Products 
        productsData={data.products} 
        getImageUrl={getImageUrl} 
      />

      {/* data.events - це масив подій */}
      <Events 
        eventsData={data.events} 
        getImageUrl={getImageUrl} 
      />

      {/* data.contact - це об'єкт Contact */}
      <Contact 
        contactData={data.contact} 
        getImageUrl={getImageUrl} 
      />

      {/* data.footer_links - масив посилань */}
      <Footer 
        footerLinksData={data.footer_links} 
        settings={data.settings} 
        getImageUrl={getImageUrl}
      />
    </div>
  );
}

export default App;