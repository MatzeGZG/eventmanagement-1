import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { SearchResult } from '../types';
import { formatDate } from '../../../utils/date';

interface SearchSuggestionsProps {
  suggestions: SearchResult[];
  loading?: boolean;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  loading
}) => {
  if (loading) {
    return (
      <div className="p-4 text-center text-fjs-silver">
        Finding perfect matches...
      </div>
    );
  }

  if (!suggestions?.length) {
    return (
      <div className="p-4 text-center text-fjs-silver">
        No matches found. Try adjusting your search.
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {suggestions.map(({ event, score }) => (
        <div
          key={event.id}
          className="p-4 hover:bg-fjs-charcoal transition-colors cursor-pointer border-b border-fjs-charcoal last:border-b-0"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-fjs-gold font-semibold mb-2">
                {event.title}
              </h3>
              <div className="space-y-1">
                <EventDetail icon={<Calendar className="w-4 h-4" />} text={formatDate(event.date)} />
                <EventDetail icon={<MapPin className="w-4 h-4" />} text={`${event.location.city}, ${event.location.country}`} />
                <EventDetail icon={<Users className="w-4 h-4" />} text={`${event.attendees.length} / ${event.capacity} attendees`} />
              </div>
              <EventTags tags={event.tags} />
            </div>
            <RelevanceScore score={score} />
          </div>
        </div>
      ))}
    </div>
  );
};

const EventDetail: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center text-sm text-white">
    <span className="mr-2">{icon}</span>
    {text}
  </div>
);

const EventTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="mt-2 flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className="px-2 py-1 text-xs font-medium rounded-full bg-fjs-dark-gold text-white"
      >
        {tag}
      </span>
    ))}
  </div>
);

const RelevanceScore: React.FC<{ score: number }> = ({ score }) => (
  <div className="px-2 py-1 bg-fjs-charcoal rounded-full">
    <span className="text-xs font-medium text-fjs-gold">
      {Math.round(score * 100)}% match
    </span>
  </div>
);