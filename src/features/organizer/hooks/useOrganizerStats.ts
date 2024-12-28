import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../../../store';
import { OrganizerStats, AttendeeAnalytics } from '../types';

export const useOrganizerStats = () => {
  const [stats, setStats] = useState<OrganizerStats>({
    totalEvents: 0,
    totalAttendees: 0,
    averageRating: 0,
    successRate: 0,
    pointsEarned: 0
  });

  const [analytics, setAnalytics] = useState<AttendeeAnalytics>({
    demographics: {
      ageGroups: {},
      locations: {},
      interests: {}
    },
    engagement: {
      rsvpRate: 0,
      attendanceRate: 0,
      reviewRate: 0
    },
    trends: {
      popularTimes: {},
      popularCategories: {}
    }
  });

  const events = useStore(state => state.events);
  const user = useStore(state => state.user);

  const calculateStats = useCallback(() => {
    if (!user) return;

    const userEvents = events.filter(event => event.organizer.id === user.id);
    
    const totalAttendees = userEvents.reduce((sum, event) => 
      sum + event.attendees.length, 0
    );

    const successfulEvents = userEvents.filter(event =>
      event.attendees.length >= event.capacity * 0.8
    ).length;

    setStats({
      totalEvents: userEvents.length,
      totalAttendees,
      averageRating: 4.5, // Mock data - would come from reviews
      successRate: userEvents.length ? successfulEvents / userEvents.length : 0,
      pointsEarned: user.points
    });

    // Calculate analytics (mock data for demonstration)
    setAnalytics({
      demographics: {
        ageGroups: {
          '18-24': 30,
          '25-34': 45,
          '35-44': 15,
          '45+': 10
        },
        locations: {
          'New York': 40,
          'Los Angeles': 30,
          'Chicago': 20,
          'Other': 10
        },
        interests: {
          'Tech': 35,
          'Business': 25,
          'Arts': 20,
          'Other': 20
        }
      },
      engagement: {
        rsvpRate: 0.75,
        attendanceRate: 0.85,
        reviewRate: 0.60
      },
      trends: {
        popularTimes: {
          'Morning': 20,
          'Afternoon': 35,
          'Evening': 45
        },
        popularCategories: {
          'Workshops': 40,
          'Networking': 35,
          'Conferences': 25
        }
      }
    });
  }, [events, user]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  return { stats, analytics };
};