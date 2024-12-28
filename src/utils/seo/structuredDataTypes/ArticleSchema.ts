```typescript
export const generateArticleSchema = (article: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.publishDate,
  dateModified: article.updateDate,
  author: {
    '@type': 'Person',
    name: article.author.name
  },
  publisher: {
    '@type': 'Organization',
    name: 'FunJetSetter',
    logo: {
      '@type': 'ImageObject',
      url: 'https://static.wixstatic.com/media/f0f1ef_35d3520d058641e589b7d91f6c211beb.jpg'
    }
  }
});
```