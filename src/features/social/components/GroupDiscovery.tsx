import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter } from 'lucide-react';
import { useGroupDiscovery } from '../hooks/useGroupDiscovery';
import { GroupCard } from './GroupCard';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const GroupDiscovery: React.FC = () => {
  const { groups, loading, searchGroups, filters, updateFilters } = useGroupDiscovery();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-fjs-gold">Discover Groups</h2>
          <p className="text-fjs-silver">Find and join communities that match your interests</p>
        </div>
        <button className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium">
          Create Group
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <input
            type="text"
            placeholder="Search groups..."
            onChange={(e) => searchGroups(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
          />
        </div>
      </div>

      {/* Group Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};