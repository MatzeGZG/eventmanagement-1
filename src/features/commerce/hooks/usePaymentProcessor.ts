```typescript
import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { PaymentMethod, PaymentRequest } from '../types';
import { useToast } from '../../../hooks/useToast';
import { AuditLogger } from '../../../utils/security/auditLogger';

export const usePaymentProcessor = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const processPayment = useCallback(async (request: PaymentRequest): Promise<string> => {
    setLoading(true);
    try {
      // Log payment attempt
      await AuditLogger.log('payment_attempt', {
        amount: request.amount,
        currency: request.currency
      });

      // Process payment through Stripe
      const { data: { sessionId }, error } = await supabase
        .functions.invoke('create-payment', {
          body: { ...request }
        });

      if (error) throw error;

      // Log successful payment
      await AuditLogger.log('payment_success', {
        sessionId,
        amount: request.amount
      });

      showToast('Payment processed successfully', 'success');
      return sessionId;

    } catch (error) {
      await AuditLogger.log('payment_error', { error }, 'error');
      showToast('Payment processing failed', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    processPayment
  };
};
```