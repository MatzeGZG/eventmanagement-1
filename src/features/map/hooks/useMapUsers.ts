import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { User } from '../../../types/user';

export const useMapUsers = () => {
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const users = useStore(state => state.users);

  const updateVisibleUsers = useCallback((bounds: mapboxgl.LngLatBounds) => {
    if (!users?.length) return;

    const filtered = users.filter(user => {
      if (!user.location?.coordinates || !user.locationPreferences?.shareLocation) {
        return false;
      }

      const { latitude, longitude } = user.location.coordinates;
      return (
        latitude >= bounds.getSouth() &&
        latitude <= bounds.getNorth() &&
        longitude >= bounds.getWest() &&
        longitude <= bounds.getEast()
      );
    });

    setVisibleUsers(filtered);
  }, [users]);

  return {
    visibleUsers,
    updateVisibleUsers
  };
};