import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Issue } from '../../types/issues';
import { formatDistanceToNow } from 'date-fns';

interface IssuesListProps {
  issues: Issue[];
  loading: boolean;
}

export const IssuesList: React.FC<IssuesListProps> = ({ issues, loading }) => {
  if (loading) {
    return <div>Loading issues...</div>;
  }

  return (
    <div className="bg-fjs-charcoal rounded-xl p-6">
      <h3 className="text-lg font-semibold text-fjs-gold mb-4">Active Issues</h3>
      
      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <StatusIcon status={issue.status} />
                  <span className={`text-sm font-medium ${
                    issue.priority === 'high' ? 'text-red-400' :
                    issue.priority === 'medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {issue.priority.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-white font-medium mt-1">{issue.title}</h4>
                <p className="text-sm text-fjs-silver mt-1">{issue.description}</p>
              </div>
              <span className="text-xs text-fjs-silver">
                {formatDistanceToNow(issue.createdAt, { addSuffix: true })}
              </span>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-fjs-silver">
                  Reported by {issue.reportedBy}
                </span>
              </div>
              <button className="text-sm text-fjs-gold hover:text-fjs-light-gold">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'resolved':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'in_progress':
      return <Clock className="w-4 h-4 text-yellow-400" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-red-400" />;
  }
};