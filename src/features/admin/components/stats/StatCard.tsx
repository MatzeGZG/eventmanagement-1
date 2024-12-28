import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  trend
}) => {
  const isPositive = trend >= 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-fjs-charcoal rounded-xl p-6 hover:shadow-lg hover:shadow-fjs-gold/10 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-black/30 rounded-lg text-fjs-gold">
          {icon}
        </div>
        <div className={`flex items-center ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      
      <div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-fjs-silver">{label}</div>
      </div>
    </motion.div>
  );
};