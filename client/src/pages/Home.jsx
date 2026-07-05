import { useState, useEffect } from 'react';
import { fetchContent } from '../api';
import SeoHead from '../components/SeoHead';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import MenuGrid from '../components/MenuGrid';
import DeliveryBanner from '../components/DeliveryBanner';
import SpecialDishes from '../components/SpecialDishes';
import About from '../components/About';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';
import PageBackground from '../components/PageBackground';
import './Home.css';

function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-label="Loading">
      <div className="skeleton-header" />
      <div className="skeleton-hero">
        <div className="skeleton-line wide" />
        <div className="skeleton-line" />
        <div className="skeleton-btn" />
      </div>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageSkeleton />;

  if (!data) {
    return (
      <div className="page-error">
        <h1>Could not load website</h1>
        <p>Please refresh the page or try again later.</p>
      </div>
    );
  }

  const { settings, menuCategories, menuItems, specialDishes } = data;

  return (
    <>
      <a href="#home" className="skip-link">Skip to content</a>
      <SeoHead settings={settings} />
      <PageBackground settings={settings} />
      <Header settings={settings} />
      <main>
        <Hero settings={settings} />
        <TrustBar />
        <MenuGrid categories={menuCategories} menuItems={menuItems} settings={settings} />
        <DeliveryBanner settings={settings} />
        <SpecialDishes dishes={specialDishes} settings={settings} />
        <About settings={settings} />
        <CtaBanner settings={settings} />
      </main>
      <Footer settings={settings} />
      <FloatingContact settings={settings} />
    </>
  );
}
