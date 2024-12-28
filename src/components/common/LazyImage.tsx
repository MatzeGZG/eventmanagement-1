import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from './Skeleton';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  aspectRatio = 1,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      {inView ? (
        <>
          {!isLoaded && <Skeleton className="absolute inset-0" />}
          <img
            src={src}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            onLoad={() => setIsLoaded(true)}
            {...props}
          />
        </>
      ) : (
        <Skeleton className="absolute inset-0" />
      )}
    </div>
  );
};