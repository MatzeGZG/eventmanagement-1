import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Discover events, people, and experiences..."
}) => (
  <motion.div 
    className="relative group"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-fjs-gold transition-colors group-hover:text-fjs-light-gold" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className="w-full pl-14 pr-4 py-4 bg-black/80 text-white rounded-xl 
                 border-2 border-fjs-gold/50 focus:border-fjs-gold
                 shadow-lg shadow-fjs-gold/10 focus:shadow-fjs-gold/20
                 backdrop-blur-sm text-lg transition-all
                 placeholder:text-fjs-silver/50"
    />
    
    {/* Animated focus ring */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fjs-gold via-fjs-light-gold to-fjs-gold
                    opacity-0 group-hover:opacity-10 transition-opacity -z-10" />
  </motion.div>
);