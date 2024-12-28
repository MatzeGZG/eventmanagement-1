```typescript
export const schemaRules = {
  JobPosting: {
    required: ['title', 'description', 'datePosted', 'hiringOrganization', 'jobLocation'],
    recommended: ['validThrough', 'employmentType', 'baseSalary'],
    nested: {
      hiringOrganization: {
        required: ['name']
      },
      jobLocation: {
        required: ['address']
      },
      baseSalary: {
        required: ['currency', 'value']
      }
    }
  },
  Course: {
    required: ['name', 'description', 'provider'],
    recommended: ['courseCode', 'hasCourseInstance', 'teaches'],
    nested: {
      provider: {
        required: ['name']
      },
      hasCourseInstance: {
        required: ['startDate', 'courseMode']
      }
    }
  },
  // ... existing rules ...
};
```