import { useState, useEffect } from 'react';
import { Feedback } from '../types/issues';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      // Mock data - replace with actual API call
      const mockFeedback: Feedback[] = [
        {
          id: '1',
          content: 'Would love to see a dark mode option in the app',
          category: 'Feature Request',
          userName: 'Sarah Wilson',
          upvotes: 15,
          createdAt: new Date(Date.now() - 86400000),
          status: 'under_review'
        },
        {
          id: '2',
          content: 'The new event creation flow is much better!',
          category: 'Positive Feedback',
          userName: 'Mike Chen',
          upvotes: 8,
          createdAt: new Date(Date.now() - 172800000),
          status: 'acknowledged'
        }
      ];

      setFeedback(mockFeedback);
      setLoading(false);
    };

    fetchFeedback();
  }, []);

  return { feedback, loading };
};