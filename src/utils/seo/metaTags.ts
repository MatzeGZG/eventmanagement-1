import { Event } from '../../types/event';

export const generateMetaTags = (data?: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) => {
  const defaults = {
    title: 'FunJetSetter - Discover Amazing Events',
    description: 'Find and join exclusive events, connect with like-minded people, and unlock unique experiences.',
    image: 'https://static.wixstatic.com/media/f0f1ef_35d3520d058641e589b7d91f6c211beb.jpg',
    url: window.location.href
  };

  const meta = { ...defaults, ...data };

  return {
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#D4AF37' },
      
      // OpenGraph
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: meta.image },
      { property: 'og:url', content: meta.url },
      { property: 'og:type', content: 'website' },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:image', content: meta.image }
    ]
  };
};

export const generateEventStructuredData = (event: Event) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date.toISOString(),
    location: {
      '@type': 'Place',
      name: event.location.address,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.city,
        addressCountry: event.location.country
      }
    },
    image: event.images[0],
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'USD',
      availability: event.attendees.length < event.capacity ? 'InStock' : 'SoldOut'
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer.name
    }
  };
};