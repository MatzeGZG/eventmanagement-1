```typescript
export const generatePersonSchema = (user: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: user.name,
  description: user.bio,
  image: user.avatar,
  memberOf: {
    '@type': 'Organization',
    name: 'FunJetSetter'
  }
});

export const generateEventListSchema = (events: any[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: events.map((event, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Event',
      name: event.title,
      description: event.description,
      startDate: event.date,
      location: {
        '@type': 'Place',
        name: event.location.address,
        address: {
          '@type': 'PostalAddress',
          addressLocality: event.location.city,
          addressCountry: event.location.country
        }
      }
    }
  }))
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});
```