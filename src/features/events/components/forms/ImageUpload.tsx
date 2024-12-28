```tsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { useMediaUpload } from '../../../media/hooks/useMediaUpload';

interface ImageUploadProps {
  onImagesSelected: (urls: string[]) => void;
  maxImages?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesSelected,
  maxImages = 5
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadMedia } = useMediaUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedImages.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map(file => uploadMedia(file));
      const results = await Promise.all(uploadPromises);
      
      const newUrls = results
        .filter(result => result.success && result.mediaUrl)
        .map(result => result.mediaUrl!);

      setSelectedImages(prev => [...prev, ...newUrls]);
      onImagesSelected([...selectedImages, ...newUrls]);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    onImagesSelected(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {selectedImages.map((url, index) => (
          <div key={url} className="relative aspect-square">
            <img
              src={url}
              alt={`Event image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {selectedImages.length < maxImages && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-fjs-charcoal rounded-lg hover:border-fjs-gold transition-colors"
          >
            <Upload className="w-6 h-6 text-fjs-gold mb-2" />
            <span className="text-sm text-fjs-silver">
              {uploading ? 'Uploading...' : 'Add Image'}
            </span>
          </motion.button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
```