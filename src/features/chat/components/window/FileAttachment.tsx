```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { File, Download, X } from 'lucide-react';
import { formatBytes } from '../../../../utils/format';

interface FileAttachmentProps {
  file: File;
  onRemove?: () => void;
  preview?: boolean;
}

export const FileAttachment: React.FC<FileAttachmentProps> = ({
  file,
  onRemove,
  preview = false
}) => {
  const isImage = file.type.startsWith('image/');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      {isImage && preview ? (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="max-w-[200px] max-h-[200px] object-cover"
          />
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full
                       text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
          <File className="w-8 h-8 text-fjs-gold" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{file.name}</p>
            <p className="text-xs text-fjs-silver">{formatBytes(file.size)}</p>
          </div>
          {onRemove ? (
            <button
              onClick={onRemove}
              className="p-1 text-fjs-silver hover:text-red-500 rounded-full
                       hover:bg-black/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button className="p-1 text-fjs-silver hover:text-fjs-gold rounded-full
                           hover:bg-black/20 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};
```