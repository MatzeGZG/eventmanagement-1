import React from 'react';
import { useStore } from '../../../store';
import { ProfileHeader } from './ProfileHeader';
import { ProfileGamification } from './ProfileGamification';
import { SocialConnections } from './social/SocialConnections';
import { useToast } from '../../../hooks/useToast';

export const ProfileContainer: React.FC = () => {
  const user = useStore(state => state.user);
  const { showToast } = useToast();

  if (!user) return null;

  const handleConnect = (userId: string) => {
    showToast('Connection request sent!', 'success');
  };

  const handleMessage = (userId: string) => {
    showToast('Opening chat...', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <ProfileHeader user={user} />
      <ProfileGamification />
      <SocialConnections
        connections={user.connections}
        onConnect={handleConnect}
        onMessage={handleMessage}
      />
    </div>
  );
};