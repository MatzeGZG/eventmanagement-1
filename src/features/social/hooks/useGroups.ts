```typescript
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';

export const useGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const loadGroups = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          members:group_members(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const groupsWithCounts = data.map(group => ({
        ...group,
        memberCount: group.members[0].count
      }));

      setGroups(groupsWithCounts);
    } catch (error) {
      console.error('Error loading groups:', error);
      showToast('Failed to load groups', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const joinGroup = useCallback(async (groupId: string) => {
    try {
      const { error } = await supabase
        .from('group_members')
        .insert([{ group_id: groupId }]);

      if (error) throw error;

      showToast('Successfully joined group!', 'success');
      awardPoints(25); // Award points for joining a group
      loadGroups(); // Refresh groups list
    } catch (error) {
      showToast('Failed to join group', 'error');
    }
  }, [showToast, awardPoints, loadGroups]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  return {
    groups,
    loading,
    joinGroup,
    refresh: loadGroups
  };
};
```