```typescript
export const generateCourseSchema = (course: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.title,
  description: course.description,
  provider: {
    '@type': 'Organization',
    name: course.provider.name,
    sameAs: course.provider.website
  },
  courseCode: course.code,
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: course.mode,
    duration: course.duration,
    startDate: course.startDate,
    endDate: course.endDate,
    price: course.price,
    priceCurrency: course.currency
  },
  educationalCredentialAwarded: course.credential,
  teaches: course.skills
});
```