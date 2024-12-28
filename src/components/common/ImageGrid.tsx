```tsx
import React from 'react';
import { ProgressiveImage } from './ProgressiveImage';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface ImageGridProps {
  images: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
  columns?: number;
  gap?: number;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  columns = 3,
  gap = 4
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className={`grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 }}
        >
          <ProgressiveImage
            src={image.src}
            alt={image.alt}
            className="rounded-lg"
            aspectRatio={1}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
```