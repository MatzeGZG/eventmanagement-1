```typescript
export class SchemaValidator {
  static validate(schema: any): boolean {
    // Required fields check
    if (!schema['@context'] || !schema['@type']) {
      console.error('Schema missing required fields');
      return false;
    }

    // Type-specific validation
    switch (schema['@type']) {
      case 'Event':
        return this.validateEvent(schema);
      case 'Person':
        return this.validatePerson(schema);
      case 'Review':
        return this.validateReview(schema);
      default:
        return true;
    }
  }

  private static validateEvent(schema: any): boolean {
    return !!(schema.name && schema.startDate);
  }

  private static validatePerson(schema: any): boolean {
    return !!schema.name;
  }

  private static validateReview(schema: any): boolean {
    return !!(schema.reviewRating && schema.author);
  }
}
```