import React from 'react';
import { Bell, Clock, Mail } from 'lucide-react';
import { useReminders } from '../../hooks/useReminders';

export const ReminderSettings: React.FC = () => {
  const {
    reminders,
    addReminder,
    removeReminder,
    updateReminder
  } = useReminders();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Automated Reminders
      </h2>

      <div className="space-y-6">
        {/* Confirmation Email */}
        <ReminderSection
          icon={<Mail />}
          title="RSVP Confirmation"
          description="Sent immediately after registration"
          template={reminders.confirmation}
          onUpdate={template => updateReminder('confirmation', template)}
        />

        {/* Reminder Email */}
        <ReminderSection
          icon={<Bell />}
          title="Event Reminder"
          description="Sent before the event"
          template={reminders.reminder}
          onUpdate={template => updateReminder('reminder', template)}
          timing={{
            value: 24,
            unit: 'hours',
            onChange: (value) => updateReminder('reminder', reminders.reminder, value)
          }}
        />

        {/* Follow-up Email */}
        <ReminderSection
          icon={<Clock />}
          title="Follow-up"
          description="Sent after the event"
          template={reminders.followUp}
          onUpdate={template => updateReminder('followUp', template)}
          timing={{
            value: 1,
            unit: 'days',
            onChange: (value) => updateReminder('followUp', reminders.followUp, value)
          }}
        />
      </div>
    </div>
  );
};

interface ReminderSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  template: string;
  onUpdate: (template: string) => void;
  timing?: {
    value: number;
    unit: string;
    onChange: (value: number) => void;
  };
}

const ReminderSection: React.FC<ReminderSectionProps> = ({
  icon,
  title,
  description,
  template,
  onUpdate,
  timing
}) => (
  <div className="border-t border-gray-200 pt-6">
    <div className="flex items-start space-x-4">
      <div className="text-indigo-600">{icon}</div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        {timing && (
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="number"
              value={timing.value}
              onChange={e => timing.onChange(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded-md px-3 py-1"
            />
            <span className="text-sm text-gray-600">{timing.unit} before</span>
          </div>
        )}

        <textarea
          value={template}
          onChange={e => onUpdate(e.target.value)}
          className="w-full h-32 border border-gray-300 rounded-md px-4 py-2"
          placeholder="Enter email template..."
        />
      </div>
    </div>
  </div>
);