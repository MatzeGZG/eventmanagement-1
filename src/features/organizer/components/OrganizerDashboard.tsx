import React from 'react';
import { useStore } from '../../../store';
import { OrganizerDescription } from './description/OrganizerDescription';
import { AnalyticsSummary } from './analytics/AnalyticsSummary';
import { EventList } from './events/EventList';
import { RegistrationFormBuilder } from './registration/RegistrationFormBuilder';
import { ReminderSettings } from './reminders/ReminderSettings';
import { CollaboratorManagement } from './collaboration/CollaboratorManagement';
import { PointsSpendingSection } from './points/PointsSpendingSection';
import { OrganizerGamification } from './gamification/OrganizerGamification';
import { useOrganizerStats } from '../hooks/useOrganizerStats';

export const OrganizerDashboard: React.FC = () => {
  const user = useStore(state => state.user);
  const { stats, analytics } = useOrganizerStats();

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your events, track performance, and grow your community
        </p>
      </div>

      <OrganizerDescription />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnalyticsSummary stats={stats} analytics={analytics} />
      </div>

      <div className="space-y-8">
        <OrganizerGamification />
        <PointsSpendingSection />
        <EventList />
        <RegistrationFormBuilder />
        <ReminderSettings />
        <CollaboratorManagement />
      </div>
    </div>
  );
};