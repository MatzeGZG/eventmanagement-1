```typescript
export const generatePlaceSchema = (location: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: location.name,
  address: {
    '@type': 'PostalAddress',
    addressLocality: location.city,
    addressCountry: location.country,
    streetAddress: location.address
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude
  }
});
```