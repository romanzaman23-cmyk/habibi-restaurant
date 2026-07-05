import { useEffect } from 'react';
import { formatTel } from '../utils';

function setMeta(name, content, property = false) {
  if (!content) return;
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function buildDescription(settings) {
  const city = settings?.seo_city || settings?.address?.split(',').pop()?.trim() || 'Pakistan';
  const name = settings?.site_name || 'Habibi Restaurant';
  const subtitle = settings?.hero_subtitle || 'Authentic Pakistani cuisine';
  return `${name} — ${subtitle}. Order online via WhatsApp. Home delivery available in ${city}. Call ${settings?.phone || ''} or visit us today.`;
}

function buildKeywords(settings) {
  const city = settings?.seo_city || settings?.address?.split(',').pop()?.trim() || '';
  const name = settings?.site_name || 'Habibi Restaurant';
  return [
    name,
    `restaurant ${city}`,
    `Pakistani food ${city}`,
    'biryani',
    'BBQ',
    'karahi',
    'food delivery',
    'order food WhatsApp',
    city && `${name} ${city}`,
  ].filter(Boolean).join(', ');
}

export default function SeoHead({ settings }) {
  useEffect(() => {
    if (!settings) return;

    const name = settings.site_name || 'Habibi Restaurant';
    const desc = buildDescription(settings);
    const url = window.location.origin + window.location.pathname;
    const image = settings.logo?.startsWith('http')
      ? settings.logo
      : settings.hero_image_1?.startsWith('http')
        ? settings.hero_image_1
        : `${url}/og-default.jpg`;

    document.title = `${name} | Authentic Pakistani Restaurant${settings.seo_city ? ` in ${settings.seo_city}` : ''}`;
    document.documentElement.lang = 'en';

    setMeta('description', desc);
    setMeta('keywords', buildKeywords(settings));
    setMeta('robots', 'index, follow');
    setMeta('author', name);
    setMeta('geo.region', 'PK');
    setMeta('geo.placename', settings.seo_city || settings.address || 'Pakistan');

    setMeta('og:title', document.title, true);
    setMeta('og:description', desc, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', url, true);
    setMeta('og:image', image, true);
    setMeta('og:locale', 'en_PK', true);
    setMeta('og:site_name', name, true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', document.title);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', image);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name,
      description: desc,
      url,
      image,
      telephone: formatTel(settings.phone),
      email: settings.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.address,
        addressCountry: 'PK',
      },
      servesCuisine: ['Pakistani', 'BBQ', 'Biryani', 'Karahi'],
      priceRange: '$$',
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday'], opens: '12:00', closes: '00:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Wednesday', 'Thursday'], opens: '12:00', closes: '00:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '12:00', closes: '01:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '12:00', closes: '23:00' },
      ],
      sameAs: [settings.facebook, settings.instagram, settings.youtube, settings.tiktok].filter(
        (u) => u && !['https://facebook.com', 'https://instagram.com', 'https://youtube.com', 'https://tiktok.com'].includes(u),
      ),
      potentialAction: {
        '@type': 'OrderAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://wa.me/${(settings.whatsapp_number || settings.phone || '').replace(/\D/g, '')}`,
          actionPlatform: ['https://schema.org/MobileWebPlatform'],
        },
      },
    };

    let script = document.getElementById('restaurant-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'restaurant-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [settings]);

  return null;
}
