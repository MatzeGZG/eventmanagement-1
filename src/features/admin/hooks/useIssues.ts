import { useState, useEffect } from 'react';
import { Issue } from '../types/issues';

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      // Mock data - replace with actual API call
      const mockIssues: Issue[] = [
        {
          id: '1',
          title: 'Search functionality intermittent',
          description: 'Users reporting search results not loading consistently',
          status: 'in_progress',
          priority: 'high',
          reportedBy: 'System Monitor',
          createdAt: new Date(Date.now() - 3600000),
          updatedAt: new Date()
        },
        {
          id: '2',
          title: 'Image upload failing',
          description: 'Some users unable to upload event images',
          status: 'open',
          priority: 'medium',
          reportedBy: 'User Support',
          createdAt: new Date(Date.now() - 7200000),
          updatedAt: new Date()
        }
      ];

      setIssues(mockIssues);
      setLoading(false);
    };

    fetchIssues();
  }, []);

  return { issues, loading };
};