import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, MessageCircle, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'event' | 'message' | 'achievement';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

export const NotificationsDropdown: React.FC = () => {
  // Mock notifications - in production, these would come from a store or API
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'event',
      title: 'New Event Near You',
      description: 'Tech Meetup happening tomorrow in your area',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Badge Unlocked',
      description: 'You earned the "Social Butterfly" badge!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      description: 'Sarah sent you a message',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      read: false
    }
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-5 h-5" />;
      case 'message':
        return <MessageCircle className="w-5 h-5" />;
      case 'achievement':
        return <Star className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-80 bg-fjs-charcoal rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-4 border-b border-black/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-fjs-gold">Notifications</h3>
          <button className="text-sm text-fjs-silver hover:text-white">
            Mark all as read
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 border-b border-black/20 hover:bg-black/20 transition-colors ${
              !notification.read ? 'bg-black/10' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                notification.read ? 'bg-black/20' : 'bg-fjs-gold/20'
              }`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{notification.title}</h4>
                <p className="text-sm text-fjs-silver">{notification.description}</p>
                <span className="text-xs text-fjs-silver">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-black/20">
        <button className="w-full text-center text-sm text-fjs-gold hover:text-fjs-light-gold">
          View All Notifications
        </button>
      </div>
    </motion.div>
  );
};