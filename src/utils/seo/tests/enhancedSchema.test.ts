```typescript
import { describe, it, expect } from 'vitest';
import { EnhancedSchemaValidation } from '../validation/enhancedSchemaValidation';
import { generateArticleSchema } from '../structuredDataTypes/ArticleSchema';
import { generateProductSchema } from '../structuredDataTypes/ProductSchema';

describe('Enhanced Schema Validation', () => {
  describe('Article Schema', () => {
    it('validates complete article schema', () => {
      const article = {
        title: 'Test Article',
        description: 'Test Description',
        image: 'https://example.com/image.jpg',
        publishDate: '2024-02-14',
        updateDate: '2024-02-15',
        author: {
          name: 'John Doe'
        }
      };

      const schema = generateArticleSchema(article);
      const errors = EnhancedSchemaValidation.validateSchema(schema);
      expect(errors).toHaveLength(0);
    });

    it('detects missing required fields', () => {
      const article = {
        title: 'Test Article',
        author: {} // Missing name
      };

      const schema = generateArticleSchema(article);
      const errors = EnhancedSchemaValidation.validateSchema(schema);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('author: Missing required field: name');
    });
  });

  describe('Product Schema', () => {
    it('validates complete product schema', () => {
      const product = {
        name: 'Test Product',
        description: 'Test Description',
        image: 'https://example.com/image.jpg',
        price: 99.99,
        inStock: true,
        rating: {
          value: 4.5,
          count: 100
        }
      };

      const schema = generateProductSchema(product);
      const errors = EnhancedSchemaValidation.validateSchema(schema);
      expect(errors).toHaveLength(0);
    });
  });
});
```