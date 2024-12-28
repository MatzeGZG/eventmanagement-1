```typescript
export const generateReviewSchema = (review: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating,
    bestRating: '5'
  },
  author: {
    '@type': 'Person',
    name: review.author.name
  },
  itemReviewed: {
    '@type': 'Event',
    name: review.event.title
  }
});
```