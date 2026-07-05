export function imageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  return url;
}

export function googleMapsUrl(address) {
  if (!address) return '#contact';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function formatTel(phone) {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
}

export function formatWhatsApp(phone) {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
}

export function openWhatsApp(settings, message) {
  const wa = formatWhatsApp(settings?.whatsapp_number || settings?.phone);
  if (!wa) {
    alert('WhatsApp number not set. Please contact admin.');
    return;
  }
  const text = message || settings?.whatsapp_message || 'Hi!';
  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank');
}

export function openCall(settings) {
  const phone = formatTel(settings?.call_number || settings?.phone);
  if (!phone) {
    alert('Call number not set. Please contact admin.');
    return;
  }
  window.location.href = `tel:${phone}`;
}

export function orderDish(settings, dish) {
  const template = settings?.whatsapp_order_message || 'Hi, I want to order: {dish_name} (Rs. {price})';
  const message = template
    .replace(/\{dish_name\}/g, dish.name)
    .replace(/\{price\}/g, dish.price);
  openWhatsApp(settings, message);
}
