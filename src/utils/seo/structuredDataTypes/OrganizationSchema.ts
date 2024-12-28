```typescript
export const generateOrganizationSchema = (org: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: org.name,
  description: org.description,
  logo: org.logo,
  url: org.url,
  sameAs: [
    org.socialLinks?.twitter,
    org.socialLinks?.facebook,
    org.socialLinks?.linkedin,
    org.socialLinks?.instagram
  ].filter(Boolean),
  address: org.location && {
    '@type': 'PostalAddress',
    addressLocality: org.location.city,
    addressCountry: org.location.country
  }
});
```