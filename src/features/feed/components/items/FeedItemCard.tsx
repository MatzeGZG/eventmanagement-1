import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { FeedItem } from '../../types';
import { formatDate } from '../../../../utils/date';

interface FeedItemCardProps {
  item: FeedItem;
}

export const FeedItemCard: React.FC<FeedItemCardProps> = ({ item }) => (
  <div className="bg-fjs-charcoal rounded-lg overflow-hidden">
    {item.image && (
      <div className="aspect-video relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
    )}
    
    <div className="p-6">
      <h3 className="text-xl font-semibold text-fjs-gold mb-3">{item.title}</h3>
      <p className="text-fjs-silver mb-4">{item.description}</p>
      
      {item.type === 'event' && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-fjs-silver">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(item.data.date)}
          </div>
          <div className="flex items-center text-sm text-fjs-silver">
            <MapPin className="w-4 h-4 mr-2" />
            {item.data.location.city}, {item.data.location.country}
          </div>
          <div className="flex items-center text-sm text-fjs-silver">
            <Users className="w-4 h-4 mr-2" />
            {item.data.attendees.length} / {item.data.capacity} attendees
          </div>
        </div>
      )}
    </div>
  </div>
);