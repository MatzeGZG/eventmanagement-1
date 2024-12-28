import React, { useRef, useCallback } from 'react';

interface FileInputProps {
  onFileSelect: (file: File) => Promise<void>;
}

export const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await onFileSelect(file);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [onFileSelect]);

  return (
    <input
      ref={inputRef}
      type="file"
      accept="image/*,video/*"
      onChange={handleChange}
      className="hidden"
    />
  );
};