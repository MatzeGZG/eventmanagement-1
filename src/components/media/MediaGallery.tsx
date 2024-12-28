```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Video, Heart, MessageCircle } from 'lucide-react';
import { MediaItem } from './MediaItem';
import { MediaUploadButton } from './MediaUploadButton';
import { useStore } from '../../store';

export const MediaGallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Mock data - In production, this would come from your backend
  const mediaItems = [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      author: 'Sarah Wilson',
      likes: 243,
      comments: 18,
      location: 'Tech Meetup NYC'
    },
    {
      id: '2',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329',
      author: 'Mike Chen',
      likes: 567,
      comments: 42,
      location: 'Startup Weekend'
    },
    {
      id: '3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
      author: 'Emma Davis',
      likes: 189,
      comments: 23,
      location: 'Workshop Series'
    },
    {
      id: '4',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
      author: 'John Smith',
      likes: 342,
      comments: 28,
      location: 'Networking Event'
    }
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-fjs-gold">Event Moments</h2>
            <p className="text-fjs-silver mt-2">
              Share your favorite moments from our events
            </p>
          </div>
          <MediaUploadButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaItems.map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
```