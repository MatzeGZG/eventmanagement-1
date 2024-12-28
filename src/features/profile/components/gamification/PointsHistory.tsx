import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PointsTransaction {
  id: string;
  amount: number;
  description: string;
  timestamp: Date;
}

interface PointsHistoryProps {
  transactions: PointsTransaction[];
}

export const PointsHistory: React.FC<PointsHistoryProps> = ({ transactions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Points History</h3>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
          >
            <div className="flex items-center">
              {transaction.amount > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500 mr-3" />
              )}
              <div>
                <p className="text-sm font-medium text-white">
                  {transaction.description}
                </p>
                <p className="text-xs text-fjs-silver">
                  {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
            <span className={`text-sm font-medium ${
              transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {transaction.amount > 0 ? '+' : ''}{transaction.amount}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};