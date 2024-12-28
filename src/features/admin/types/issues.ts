export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  reportedBy: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  category?: string;
  resolution?: string;
}

export interface Feedback {
  id: string;
  content: string;
  category: string;
  userName: string;
  upvotes: number;
  createdAt: Date;
  status: 'new' | 'under_review' | 'acknowledged' | 'implemented';
  response?: string;
  tags?: string[];
}

export interface IssueStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  averageResolutionTime: number;
}

export interface FeedbackStats {
  total: number;
  implemented: number;
  underReview: number;
  averageResponseTime: number;
  topCategories: Record<string, number>;
}