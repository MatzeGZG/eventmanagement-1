import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { SearchResult } from '../../features/search/types';
import { formatDate } from '../../utils/date';

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

  if (suggestions.length === 0) {
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
                <div className="flex items-center text-sm text-fjs-silver">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-fjs-silver">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location.city}, {event.location.country}
                </div>
                <div className="flex items-center text-sm text-fjs-silver">
                  <Users className="w-4 h-4 mr-2" />
                  {event.attendees.length} / {event.capacity} attendees
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-fjs-charcoal text-fjs-silver"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {score > 0 && (
              <div className="flex-shrink-0">
                <div className="px-2 py-1 bg-fjs-charcoal rounded-full">
                  <span className="text-xs font-medium text-fjs-gold">
                    {Math.round(score * 100)}% match
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};