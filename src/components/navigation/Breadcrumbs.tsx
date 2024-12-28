import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{ label: string; href?: string }>;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="py-2">
    <ol className="flex items-center space-x-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-fjs-silver mx-2" />
          )}
          {item.href ? (
            <a 
              href={item.href}
              className="text-fjs-silver hover:text-fjs-gold transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-fjs-gold">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);