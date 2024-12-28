import React from 'react';
import { Search } from 'lucide-react';

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
  <div className="relative">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-fjs-gold" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className="w-full pl-14 pr-4 py-4 bg-black text-white rounded-xl border-2 border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold focus:border-transparent text-lg"
    />
  </div>
);