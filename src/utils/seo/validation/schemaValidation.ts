```typescript
export class SchemaValidation {
  static validateSchema(schema: any): string[] {
    const errors: string[] = [];

    // Required fields
    if (!schema['@context']) errors.push('Missing @context');
    if (!schema['@type']) errors.push('Missing @type');

    // Type-specific validation
    switch (schema['@type']) {
      case 'Event':
        if (!schema.name) errors.push('Event missing name');
        if (!schema.startDate) errors.push('Event missing startDate');
        break;
      case 'Place':
        if (!schema.name) errors.push('Place missing name');
        if (!schema.address) errors.push('Place missing address');
        break;
      case 'Organization':
        if (!schema.name) errors.push('Organization missing name');
        if (!schema.url) errors.push('Organization missing url');
        break;
    }

    // Validate nested schemas
    Object.entries(schema).forEach(([key, value]) => {
      if (value && typeof value === 'object' && value['@type']) {
        errors.push(...this.validateSchema(value));
      }
    });

    return errors;
  }
}
```