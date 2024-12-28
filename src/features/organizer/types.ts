export interface OrganizerStats {
  totalEvents: number;
  totalAttendees: number;
  averageRating: number;
  successRate: number; // % of events with >80% attendance
  pointsEarned: number;
}

export interface AttendeeAnalytics {
  demographics: {
    ageGroups: Record<string, number>;
    locations: Record<string, number>;
    interests: Record<string, number>;
  };
  engagement: {
    rsvpRate: number;
    attendanceRate: number;
    reviewRate: number;
  };
  trends: {
    popularTimes: Record<string, number>;
    popularCategories: Record<string, number>;
  };
}

export interface RegistrationField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'checkbox' | 'number' | 'date';
  required: boolean;
  options?: string[]; // For select fields
  placeholder?: string;
}

export interface EventReminder {
  id: string;
  eventId: string;
  type: 'confirmation' | 'reminder' | 'followUp';
  scheduledFor: Date;
  sent: boolean;
  template: string;
}