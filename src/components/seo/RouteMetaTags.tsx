import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStore } from '../../store';
import { generateMetaTags } from '../../utils/seo/metaTags';
import { generateSocialTags } from '../../utils/seo/socialTags';
import { generateEventStructuredData } from '../../utils/seo/structuredData';

export const RouteMetaTags: React.FC = () => {
  const location = useLocation();
  const events = useStore(state => state.events);

  const getRouteMetadata = () => {
    const path = location.pathname;
    const defaultMeta = {
      title: 'FunJetSetter',
      description: 'Discover amazing events and connect with like-minded people',
      image: 'https://static.wixstatic.com/media/f0f1ef_35d3520d058641e589b7d91f6c211beb.jpg'
    };

    // Route-specific metadata
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

    return defaultMeta;
  };

  const metadata = getRouteMetadata();
  const metaTags = generateMetaTags(metadata);
  const socialTags = generateSocialTags({
    ...metadata,
    url: window.location.href,
    type: metadata.structuredData ? 'event' : 'website'
  });

  return (
    <Helmet>
      <title>{metadata.title}</title>
      {Object.entries(metaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      {Object.entries(socialTags).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      {metadata.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(metadata.structuredData)}
        </script>
      )}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};