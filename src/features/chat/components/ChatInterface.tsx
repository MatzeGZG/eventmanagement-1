import React from 'react';
import { useChat } from '../../../contexts/ChatContext';
import { ChatSidebar } from './sidebar/ChatSidebar';
import { ChatWindow } from './window/ChatWindow';
import { ChatRequests } from './requests/ChatRequests';

export const ChatInterface: React.FC = () => {
  const { activeRoom } = useChat();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-black">
      <ChatSidebar />
      {activeRoom ? (
        <ChatWindow room={activeRoom} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-fjs-silver">
          Select a chat to start messaging
        </div>
      )}
      <ChatRequests />
    </div>
  );
};