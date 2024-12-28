import React from 'react';
import { AlertTriangle, MessageSquare } from 'lucide-react';
import { IssuesList } from './IssuesList';
import { FeedbackList } from './FeedbackList';
import { useIssues } from '../../hooks/useIssues';
import { useFeedback } from '../../hooks/useFeedback';

export const IssuesOverview: React.FC = () => {
  const { issues, loading: issuesLoading } = useIssues();
  const { feedback, loading: feedbackLoading } = useFeedback();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-fjs-gold" />
          <h2 className="text-xl font-semibold text-white">Platform Health</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IssuesList issues={issues} loading={issuesLoading} />
        <FeedbackList feedback={feedback} loading={feedbackLoading} />
      </div>
    </div>
  );
};