import { AppError } from '../../../utils/errorHandling';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];

export const validateMediaFile = (file: File): string[] => {
  const errors: string[] = [];

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push('File size exceeds 10MB limit');
  }

  // Check file type
  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

  if (!isImage && !isVideo) {
    errors.push(`Unsupported file type. Allowed types: ${[...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES].join(', ')}`);
  }

  return errors;
};

export const getMediaDimensions = async (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new AppError('Failed to load image', 'MEDIA_LOAD_ERROR'));
    };

    img.src = url;
  });
};

export const compressImage = async (file: File, maxWidth = 1920): Promise<Blob> => {
  const { width, height } = await getMediaDimensions(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new AppError('Canvas context not available', 'MEDIA_COMPRESSION_ERROR');
  }

  // Calculate new dimensions maintaining aspect ratio
  let newWidth = width;
  let newHeight = height;

  if (width > maxWidth) {
    newWidth = maxWidth;
    newHeight = (height * maxWidth) / width;
  }

  canvas.width = newWidth;
  canvas.height = newHeight;

  // Draw and compress image
  const img = new Image();
  img.src = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new AppError('Failed to compress image', 'MEDIA_COMPRESSION_ERROR'));
          }
        },
        'image/jpeg',
        0.8
      );
    };

    img.onerror = () => reject(new AppError('Failed to load image for compression', 'MEDIA_COMPRESSION_ERROR'));
  });
};