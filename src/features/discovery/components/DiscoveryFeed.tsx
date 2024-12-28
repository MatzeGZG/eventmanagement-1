import React from 'react';
import { motion } from 'framer-motion';
import { useDiscoveryFeed } from '../hooks/useDiscoveryFeed';
import { EventCard } from '../../../components/events/EventCard';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const DiscoveryFeed: React.FC = () => {
  const { 
    personalizedEvents, 
    nearbyEvents, 
    popularEvents,
    loading 
  } = useDiscoveryFeed();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Personalized Recommendations */}
      <Section
        title="For You"
        subtitle="Based on your interests"
        events={personalizedEvents}
      />

      {/* Nearby Events */}
      <Section
        title="Happening Nearby"
        subtitle="Events in your area"
        events={nearbyEvents}
      />

      {/* Popular Events */}
      <Section
        title="Trending Now"
        subtitle="Popular in the community"
        events={popularEvents}
      />
    </div>
  );
};

const Section: React.FC<{
  title: string;
  subtitle: string;
  events: any[];
}> = ({ title, subtitle, events }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-fjs-gold">{title}</h2>
      <p className="text-fjs-silver">{subtitle}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </motion.section>
);