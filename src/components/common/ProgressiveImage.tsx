import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  aspectRatio?: number;
  sizes?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  placeholderColor = '#1A1A1A',
  aspectRatio = 16/9,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState('');

  // Generate tiny placeholder
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = placeholderColor;
      ctx.fillRect(0, 0, 10, 10);
      setBlurDataUrl(canvas.toDataURL());
    }
  }, [placeholderColor]);

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    const widths = [320, 640, 960, 1280, 1920];
    return widths
      .map(width => {
        const url = new URL(src);
        url.searchParams.set('w', width.toString());
        return url.toString() + ' ' + width + 'w';
      })
      .join(', ');
  };

  return (
    <div 
      className="relative overflow-hidden"
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      {/* Blur-up placeholder */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${blurDataUrl})`,
          filter: 'blur(20px)',
          transform: 'scale(1.2)'
        }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
      />

      {/* Main image */}
      <motion.img
        src={src}
        srcSet={generateSrcSet()}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
};