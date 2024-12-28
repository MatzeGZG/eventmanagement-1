```typescript
import { describe, it, expect } from 'vitest';
import { SchemaValidation } from '../validation/schemaValidation';
import { generateEventSchema } from '../structuredDataTypes/EventSchema';
import { generatePlaceSchema } from '../structuredDataTypes/PlaceSchema';

describe('Schema Validation', () => {
  it('validates event schema correctly', () => {
    const validEvent = {
      title: 'Test Event',
      date: new Date(),
      location: {
        name: 'Test Venue',
        city: 'Test City',
        country: 'Test Country'
      }
    };

    const schema = generateEventSchema(validEvent);
    const errors = SchemaValidation.validateSchema(schema);
    expect(errors).toHaveLength(0);
  });

  it('validates place schema correctly', () => {
    const validPlace = {
      name: 'Test Venue',
      city: 'Test City',
      country: 'Test Country',
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    };

    const schema = generatePlaceSchema(validPlace);
    const errors = SchemaValidation.validateSchema(schema);
    expect(errors).toHaveLength(0);
  });
});
```