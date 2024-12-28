```typescript
export interface StepProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  isLastStep?: boolean;
}
```