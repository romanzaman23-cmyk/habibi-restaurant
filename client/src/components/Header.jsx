import { useState, useEffect } from 'react';
import Logo from './Logo';
import { formatTel, openWhatsApp } from '../utils';
import './Header.css';

const NAV = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'menu', label: 'Menu', href: '#menu' },
  { id: 'specials', label: 'Specials', href: '#specials' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Header({ settings }) {
  const phone = formatTel(settings?.phone || '');
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const offset = 120;
      let current = 'home';
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= offset) current = item.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#home" className="header-logo" onClick={closeMenu}>
          <Logo settings={settings} variant="header" />
        </a>

        <nav className="nav" aria-label="Main navigation">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={active === item.id ? 'active' : ''}
              aria-current={active === item.id ? 'page' : undefined}
              onClick={() => { setActive(item.id); closeMenu(); }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="btn-gold btn-whatsapp header-cta hide-mobile"
            onClick={() => openWhatsApp(settings)}
          >
            Order on WhatsApp
          </button>
          <a href={phone ? `tel:${phone}` : '#contact'} className="btn-outline header-call hide-mobile">
            Call Now
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={active === item.id ? 'active' : ''}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <button type="button" className="btn-gold btn-whatsapp" onClick={() => { openWhatsApp(settings); closeMenu(); }}>
            Order on WhatsApp
          </button>
          <a href={phone ? `tel:${phone}` : '#contact'} className="btn-outline" onClick={closeMenu}>
            Call {settings?.phone || 'Now'}
          </a>
        </nav>
      </div>
      {menuOpen && <div className="mobile-overlay" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
}
