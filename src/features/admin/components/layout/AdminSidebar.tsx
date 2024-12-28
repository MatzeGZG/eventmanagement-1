import React from 'react';
import { Home, Users, Calendar, Image, Shield, Settings, BarChart2 } from 'lucide-react';
import { AdminSidebarItem } from './AdminSidebarItem';

export const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-fjs-charcoal min-h-screen border-r border-fjs-gold/10">
      <nav className="p-4 space-y-2">
        <AdminSidebarItem icon={<Home />} label="Dashboard" active />
        <AdminSidebarItem icon={<Users />} label="Users" />
        <AdminSidebarItem icon={<Calendar />} label="Events" />
        <AdminSidebarItem icon={<Image />} label="Media" />
        <AdminSidebarItem icon={<BarChart2 />} label="Analytics" />
        <AdminSidebarItem icon={<Shield />} label="Moderation" />
        <AdminSidebarItem icon={<Settings />} label="Settings" />
      </nav>
    </aside>
  );
};