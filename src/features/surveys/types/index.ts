export interface Survey {
  id: string;
  title: string;
  description?: string;
  eventId: string;
  createdBy: string;
  isAnonymous: boolean;
  allowMultipleResponses: boolean;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SurveyQuestion {
  id: string;
  surveyId: string;
  text: string;
  type: 'single' | 'multiple' | 'text' | 'rating' | 'scale';
  options?: string[];
  required: boolean;
  orderIndex: number;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  userId?: string;
  answers: Record<string, any>;
  createdAt: Date;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  eventId: string;
  createdBy: string;
  isActive: boolean;
  allowMultipleVotes: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PollVote {
  id: string;
  pollId: string;
  userId: string;
  optionIndex: number;
  createdAt: Date;
}