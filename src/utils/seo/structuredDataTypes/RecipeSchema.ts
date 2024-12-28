```typescript
export const generateRecipeSchema = (recipe: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: recipe.title,
  image: recipe.image,
  description: recipe.description,
  author: {
    '@type': 'Person',
    name: recipe.author.name
  },
  datePublished: recipe.publishDate,
  prepTime: recipe.prepTime,
  cookTime: recipe.cookTime,
  totalTime: recipe.totalTime,
  recipeYield: recipe.servings,
  recipeIngredient: recipe.ingredients,
  recipeInstructions: recipe.instructions.map((step: string) => ({
    '@type': 'HowToStep',
    text: step
  })),
  recipeCategory: recipe.category,
  recipeCuisine: recipe.cuisine,
  nutrition: recipe.nutrition && {
    '@type': 'NutritionInformation',
    calories: recipe.nutrition.calories,
    servingSize: recipe.nutrition.servingSize
  }
});
```