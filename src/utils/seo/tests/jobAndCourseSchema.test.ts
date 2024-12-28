```typescript
import { describe, it, expect } from 'vitest';
import { generateJobSchema } from '../structuredDataTypes/JobSchema';
import { generateCourseSchema } from '../structuredDataTypes/CourseSchema';
import { SchemaValidation } from '../validation/schemaValidation';

describe('Job and Course Schemas', () => {
  describe('Job Schema', () => {
    it('generates valid job schema', () => {
      const job = {
        title: 'Software Engineer',
        description: 'We are looking for...',
        postedDate: '2024-02-14',
        validThrough: '2024-03-14',
        employmentType: 'FULL_TIME',
        company: {
          name: 'Tech Corp',
          website: 'https://techcorp.com'
        },
        location: {
          city: 'San Francisco',
          country: 'USA'
        },
        salary: {
          currency: 'USD',
          min: 100000,
          max: 150000,
          period: 'YEAR'
        }
      };

      const schema = generateJobSchema(job);
      const errors = SchemaValidation.validateSchema(schema);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Course Schema', () => {
    it('generates valid course schema', () => {
      const course = {
        title: 'Advanced Web Development',
        description: 'Learn modern web...',
        provider: {
          name: 'Tech Academy',
          website: 'https://techacademy.com'
        },
        code: 'WEB-301',
        mode: 'online',
        duration: 'P12W',
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        price: 999,
        currency: 'USD',
        credential: 'Certificate',
        skills: ['React', 'Node.js', 'TypeScript']
      };

      const schema = generateCourseSchema(course);
      const errors = SchemaValidation.validateSchema(schema);
      expect(errors).toHaveLength(0);
    });
  });
});
```