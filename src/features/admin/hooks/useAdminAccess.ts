import { useState, useEffect } from 'react';
import { useStore } from '../../../store';

export const useAdminAccess = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useStore(state => state.user);

  useEffect(() => {
    const checkAccess = async () => {
      // In a real app, this would check against backend permissions
      const isAdmin = user?.level === 'PassionPioneer';
      setHasAccess(isAdmin);
      setLoading(false);
    };

    checkAccess();
  }, [user]);

  return { hasAccess, loading };
};