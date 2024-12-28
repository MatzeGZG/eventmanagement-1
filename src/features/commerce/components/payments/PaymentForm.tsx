```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import { usePaymentProcessor } from '../../hooks/usePaymentProcessor';
import { PaymentMethod } from '../../types';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: Error) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency = 'USD',
  onSuccess,
  onError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const { processPayment, loading } = usePaymentProcessor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const paymentId = await processPayment({
        amount,
        currency,
        method: selectedMethod
      });
      onSuccess(paymentId);
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fjs-gold">
          Secure Payment
        </h3>
        <Lock className="w-5 h-5 text-fjs-gold" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <CreditCard className="w-5 h-5 text-fjs-gold" />
          <span className="text-white font-medium">
            {amount} {currency}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </motion.button>
      </div>
    </form>
  );
};
```