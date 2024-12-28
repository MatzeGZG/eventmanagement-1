```typescript
import { describe, it, expect } from 'vitest';
import { generateMetaTags } from '../metaTags';
import { generateSocialTags } from '../socialTags';

describe('Meta Tags Generation', () => {
  it('generates correct meta tags', () => {
    const data = {
      title: 'Test Title',
      description: 'Test Description',
      image: 'https://example.com/image.jpg'
    };

    const metaTags = generateMetaTags(data);
    expect(metaTags.title).toBe(data.title);
    expect(metaTags.meta).toContainEqual({
      name: 'description',
      content: data.description
    });
  });

  it('generates correct social tags', () => {
    const data = {
      title: 'Test Title',
      description: 'Test Description',
      image: 'https://example.com/image.jpg',
      url: 'https://example.com'
    };

    const socialTags = generateSocialTags(data);
    expect(socialTags['og:title']).toBe(data.title);
    expect(socialTags['twitter:image']).toBe(data.image);
  });
});
```