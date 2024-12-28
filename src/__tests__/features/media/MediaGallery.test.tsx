```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MediaGallery } from '../../../features/media/components/MediaGallery';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('MediaGallery', () => {
  const mockMedia = [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      author: 'Test User',
      likes: 10,
      comments: 5,
      timestamp: new Date()
    }
  ];

  it('renders media items', () => {
    renderWithProviders(<MediaGallery />);
    expect(screen.getByText('Event Moments')).toBeInTheDocument();
  });

  it('handles media upload', async () => {
    renderWithProviders(<MediaGallery />);
    const uploadButton = screen.getByText(/share moment/i);
    
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByTestId('file-input');
    
    await userEvent.upload(input, file);
    expect(screen.getByText(/uploading/i)).toBeInTheDocument();
  });

  it('filters media by type', async () => {
    renderWithProviders(<MediaGallery />);
    const filterButton = screen.getByText(/filter/i);
    
    await userEvent.click(filterButton);
    await userEvent.click(screen.getByText(/images/i));
    
    expect(screen.getByText(/images only/i)).toBeInTheDocument();
  });
});
```