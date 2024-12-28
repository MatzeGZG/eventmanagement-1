```typescript
export const generateProductSchema = (product: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'USD',
    availability: product.inStock ? 'InStock' : 'OutOfStock'
  },
  aggregateRating: product.rating && {
    '@type': 'AggregateRating',
    ratingValue: product.rating.value,
    reviewCount: product.rating.count
  }
});
```