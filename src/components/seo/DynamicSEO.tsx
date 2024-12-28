import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from './SEOHead';
import { useStore } from '../../store';
import { generateEventStructuredData } from '../../utils/seo/structuredData';

export const DynamicSEO: React.FC = () => {
  const location = useLocation();
  const user = useStore(state => state.user);
  const events = useStore(state => state.events);

  const getMetaData = () => {
    const path = location.pathname;

    if (path.startsWith('/events/')) {
      const eventId = path.split('/')[2];
      const event = events.find(e => e.id === eventId);
      if (event) {
        return {
          title: `${event.title} | FunJetSetter`,
          description: event.description,
          image: event.images[0],
          structuredData: generateEventStructuredData(event)
        };
      }
    }

    if (path === '/profile' && user) {
      return {
        title: `${user.name}'s Profile | FunJetSetter`,
        description: `View ${user.name}'s events and connections`,
        image: user.avatar
      };
    }

    return {
      title: 'FunJetSetter - Discover Amazing Events',
      description: 'Find and join exclusive events, connect with like-minded people, and unlock unique experiences.'
    };
  };

  return <SEOHead {...getMetaData()} />;
};