import React, { Suspense } from 'react';
import { Loader } from 'lucide-react';

// Lazy load the map component
const MapComponent = React.lazy(() => import('./MapComponent'));

export const LazyMap: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <Suspense 
      fallback={
        <div className="h-[600px] flex items-center justify-center bg-black">
          <Loader className="w-8 h-8 text-fjs-gold animate-spin" />
        </div>
      }
    >
      <MapComponent>{children}</MapComponent>
    </Suspense>
  );
};