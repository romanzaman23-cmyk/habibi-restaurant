import { useState, useEffect } from 'react';
import Logo from './Logo';
import { formatTel } from '../utils';
import './Header.css';

const NAV = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'menu', label: 'Menu', href: '#menu' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'contact', label: 'Contact Us', href: '#contact' },
];

export default function Header({ settings }) {
  const phone = formatTel(settings?.phone || '');
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const offset = 120;
      let current = 'home';
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = item.id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#home" className="header-logo">
          <Logo settings={settings} variant="header" />
        </a>

        <nav className="nav">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={active === item.id ? 'active' : ''}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href={phone ? `tel:${phone}` : '#contact'} className="btn-gold header-cta">
          Reserve a Table
        </a>
      </div>
    </header>
  );
}
