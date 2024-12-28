import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../../../contexts/ChatContext';
import { ChatRequestItem } from './ChatRequestItem';
import { RequestsHeader } from './RequestsHeader';

export const ChatRequests: React.FC = () => {
  const { requests } = useChat();
  const pendingRequests = requests.filter(req => req.status === 'pending');

  return (
    <div className="w-80 border-l border-fjs-charcoal">
      <RequestsHeader count={pendingRequests.length} />
      <div className="overflow-y-auto h-full">
        <AnimatePresence>
          {pendingRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ChatRequestItem request={request} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};