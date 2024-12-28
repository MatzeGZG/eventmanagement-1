```tsx
import React from 'react';
import { Share2, Calendar, QrCode, Wallet, Mail, MapPin, Clock } from 'lucide-react';
import { Event } from '../../../types/event';
import { useEventActions } from '../hooks/useEventActions';
import { QRCodeGenerator } from './QRCodeGenerator';
import { WalletPassGenerator } from './WalletPassGenerator';
import { ShareModal } from './ShareModal';

interface EventPageProps {
  event: Event;
}

export const EventPage: React.FC<EventPageProps> = ({ event }) => {
  const { generateTicket, addToCalendar, generateWalletPass } = useEventActions();
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [showQRCode, setShowQRCode] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-fjs-charcoal rounded-xl overflow-hidden">
        {/* Event Image */}
        <div className="aspect-video relative">
          <img 
            src={event.images[0]} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-fjs-gold">{event.title}</h1>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-fjs-silver">
              <Clock className="w-5 h-5 mr-2" />
              {new Date(event.date).toLocaleString()}
            </div>
            <div className="flex items-center text-fjs-silver">
              <MapPin className="w-5 h-5 mr-2" />
              {event.location.address}
            </div>
          </div>

          <p className="text-fjs-silver">{event.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center px-4 py-2 bg-fjs-gold text-black rounded-lg"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>

            <button 
              onClick={() => addToCalendar(event)}
              className="flex items-center px-4 py-2 bg-fjs-gold text-black rounded-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Add to Calendar
            </button>

            <button 
              onClick={() => setShowQRCode(true)}
              className="flex items-center px-4 py-2 bg-fjs-gold text-black rounded-lg"
            >
              <QrCode className="w-5 h-5 mr-2" />
              Show Ticket
            </button>

            <button 
              onClick={() => generateWalletPass(event)}
              className="flex items-center px-4 py-2 bg-fjs-gold text-black rounded-lg"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Add to Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        event={event}
      />

      <QRCodeGenerator
        isOpen={showQRCode}
        onClose={() => setShowQRCode(false)}
        event={event}
      />
    </div>
  );
};
```