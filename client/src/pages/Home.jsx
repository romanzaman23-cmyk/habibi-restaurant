import { useState, useEffect } from 'react';
import { fetchContent } from '../api';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MenuGrid from '../components/MenuGrid';
import DeliveryBanner from '../components/DeliveryBanner';
import SpecialDishes from '../components/SpecialDishes';
import About from '../components/About';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';
import PageBackground from '../components/PageBackground';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0e1a' }}>
        <p style={{ color: '#f5c518', fontSize: '1.2rem' }}>Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0e1a', gap: '12px' }}>
        <p style={{ color: '#f5c518', fontSize: '1.2rem' }}>Could not load website</p>
        <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Make sure server is running: npm run dev</p>
      </div>
    );
  }

  const { settings, menuCategories, specialDishes } = data;

  return (
    <>
      <PageBackground settings={settings} />
      <Header settings={settings} />
      <Hero settings={settings} />
      <MenuGrid categories={menuCategories} />
      <DeliveryBanner settings={settings} />
      <SpecialDishes dishes={specialDishes} settings={settings} />
      <About settings={settings} />
      <CtaBanner settings={settings} />
      <Footer settings={settings} />
      <FloatingContact settings={settings} />
    </>
  );
}
