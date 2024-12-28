```typescript
import { describe, it, expect } from 'vitest';
import { generateVideoSchema } from '../structuredDataTypes/VideoSchema';
import { generateRecipeSchema } from '../structuredDataTypes/RecipeSchema';
import { SchemaValidation } from '../validation/schemaValidation';

describe('Schema Types', () => {
  describe('Video Schema', () => {
    it('generates valid video schema', () => {
      const video = {
        title: 'Test Video',
        description: 'Test Description',
        thumbnail: 'https://example.com/thumbnail.jpg',
        uploadDate: '2024-02-14',
        duration: 'PT1H30M',
        url: 'https://example.com/video.mp4',
        embedUrl: 'https://example.com/embed',
        views: 1000
      };

      const schema = generateVideoSchema(video);
      const errors = SchemaValidation.validateSchema(schema);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Recipe Schema', () => {
    it('generates valid recipe schema', () => {
      const recipe = {
        title: 'Test Recipe',
        image: 'https://example.com/recipe.jpg',
        description: 'Test Description',
        author: { name: 'John Doe' },
        publishDate: '2024-02-14',
        prepTime: 'PT30M',
        cookTime: 'PT1H',
        totalTime: 'PT1H30M',
        servings: '4',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        instructions: ['Step 1', 'Step 2'],
        category: 'Dinner',
        cuisine: 'Italian',
        nutrition: {
          calories: '500 kcal',
          servingSize: '1 portion'
        }
      };

      const schema = generateRecipeSchema(recipe);
      const errors = SchemaValidation.validateSchema(schema);
      expect(errors).toHaveLength(0);
    });
  });
});
```