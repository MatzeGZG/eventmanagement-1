import React from 'react';
import { useStore } from '../../../store';
import { AdminHeader } from './layout/AdminHeader';
import { AdminSidebar } from './layout/AdminSidebar';
import { AdminStats } from './stats/AdminStats';
import { AdminContent } from './layout/AdminContent';
import { useAdminAccess } from '../hooks/useAdminAccess';

export const AdminDashboard: React.FC = () => {
  const { hasAccess, loading } = useAdminAccess();
  const user = useStore(state => state.user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminContent>
            <AdminStats />
          </AdminContent>
        </div>
      </div>
    </div>
  );
};