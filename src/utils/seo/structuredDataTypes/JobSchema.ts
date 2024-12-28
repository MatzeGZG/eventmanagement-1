```typescript
export const generateJobSchema = (job: any) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  datePosted: job.postedDate,
  validThrough: job.validThrough,
  employmentType: job.employmentType,
  hiringOrganization: {
    '@type': 'Organization',
    name: job.company.name,
    sameAs: job.company.website
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: job.location.city,
      addressCountry: job.location.country
    }
  },
  baseSalary: {
    '@type': 'MonetaryAmount',
    currency: job.salary.currency,
    value: {
      '@type': 'QuantitativeValue',
      minValue: job.salary.min,
      maxValue: job.salary.max,
      unitText: job.salary.period
    }
  }
});
```