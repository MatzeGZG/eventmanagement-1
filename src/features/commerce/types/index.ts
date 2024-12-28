```typescript
export type PaymentMethod = 'card' | 'paypal' | 'bank';

export interface PaymentRequest {
  amount: number;
  currency: string;
  method: PaymentMethod;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  id: string;
  status: 'succeeded' | 'failed' | 'pending';
  amount: number;
  currency: string;
  createdAt: Date;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description?: string;
  components: TemplateComponent[];
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateComponent {
  id: string;
  type: 'header' | 'content' | 'footer';
  props: Record<string, any>;
  children?: TemplateComponent[];
}
```