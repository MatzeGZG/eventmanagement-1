import { Event } from '../../types/event';

export const generateEventStructuredData = (event: Event) => ({
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
});

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FunJetSetter',
  url: window.location.origin,
  logo: 'https://static.wixstatic.com/media/f0f1ef_35d3520d058641e589b7d91f6c211beb.jpg',
  sameAs: [
    'https://twitter.com/funjettsetter',
    'https://facebook.com/funjettsetter',
    'https://instagram.com/funjettsetter'
  ]
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FunJetSetter',
  url: window.location.origin,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${window.location.origin}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
});