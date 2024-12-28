```typescript
import { schemaRules } from './schemaRules';

export class EnhancedSchemaValidation {
  static validateSchema(schema: any): string[] {
    const errors: string[] = [];
    const type = schema['@type'];

    if (!type) {
      errors.push('Missing @type');
      return errors;
    }

    const rules = schemaRules[type];
    if (!rules) return errors;

    // Check required fields
    rules.required?.forEach(field => {
      if (!schema[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    // Check recommended fields
    rules.recommended?.forEach(field => {
      if (!schema[field]) {
        errors.push(`Warning: Missing recommended field: ${field}`);
      }
    });

    // Validate nested objects
    Object.entries(rules.nested || {}).forEach(([key, nestedRules]) => {
      if (schema[key]) {
        const nestedErrors = this.validateNestedObject(schema[key], nestedRules);
        errors.push(...nestedErrors.map(e => `${key}: ${e}`));
      }
    });

    return errors;
  }

  private static validateNestedObject(obj: any, rules: any): string[] {
    const errors: string[] = [];

    rules.required?.forEach(field => {
      if (!obj[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    return errors;
  }
}
```