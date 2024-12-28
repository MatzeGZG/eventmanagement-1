import React from 'react';
import { MediaUploadButton } from '../upload/MediaUploadButton';

export const GalleryHeader: React.FC = () => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-fjs-gold">Event Moments</h2>
      <p className="text-fjs-silver mt-2">
        Share your favorite moments from our events
      </p>
    </div>
    <MediaUploadButton />
  </div>
);