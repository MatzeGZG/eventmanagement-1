import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';

export const useGroupDiscovery = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: null,
    memberCount: null,
    sortBy: 'popular'
  });
  
  const user = useStore(state => state.user);
  const { showToast } = useToast();

  const loadGroups = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          members:group_members(count),
          categories:group_categories(name)
        `)
        .order('member_count', { ascending: false });

      if (error) throw error;

      // Calculate relevance score based on user interests
      const groupsWithScore = data.map(group => ({
        ...group,
        relevanceScore: calculateRelevanceScore(group, user)
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

      setGroups(groupsWithScore);
    } catch (error) {
      console.error('Error loading groups:', error);
      showToast('Failed to load groups', 'error');
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  const searchGroups = useCallback(async (query: string) => {
    if (!query) {
      loadGroups();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('groups')
        .select()
        .textSearch('name', query)
        .order('member_count', { ascending: false });

      if (error) throw error;
      setGroups(data);
    } catch (error) {
      showToast('Search failed', 'error');
    }
  }, [loadGroups, showToast]);

  const updateFilters = useCallback((newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const calculateRelevanceScore = (group: any, user: any): number => {
    if (!user?.interests) return 0;

    // Calculate interest overlap
    const interestOverlap = group.categories.filter((cat: any) =>
      user.interests.includes(cat.name)
    ).length;

    // Calculate member network overlap
    const networkOverlap = group.members.filter((member: any) =>
      user.connections.includes(member.user_id)
    ).length;

    // Weight factors
    const interestWeight = 0.6;
    const networkWeight = 0.4;

    return (
      (interestOverlap * interestWeight) +
      (networkOverlap * networkWeight)
    );
  };

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  return {
    groups,
    loading,
    filters,
    searchGroups,
    updateFilters,
    refresh: loadGroups
  };
};