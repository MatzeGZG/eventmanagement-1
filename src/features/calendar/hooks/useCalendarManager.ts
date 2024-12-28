import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { CustomCalendar, CalendarFilters } from '../types/customCalendar';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';

export const useCalendarManager = () => {
  const [calendars, setCalendars] = useState<CustomCalendar[]>([]);
  const [activeCalendar, setActiveCalendar] = useState<CustomCalendar | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const user = useStore(state => state.user);

  const fetchCalendars = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('custom_calendars')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setCalendars(data);
      
      // Set default calendar as active
      const defaultCalendar = data.find(cal => cal.isDefault);
      if (defaultCalendar) setActiveCalendar(defaultCalendar);
    } catch (error) {
      showToast('Failed to load calendars', 'error');
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  const createCalendar = useCallback(async (
    name: string,
    filters: CalendarFilters,
    isDefault?: boolean
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('custom_calendars')
        .insert([{
          user_id: user.id,
          name,
          filters,
          is_default: isDefault
        }])
        .select()
        .single();

      if (error) throw error;
      
      setCalendars(prev => [...prev, data]);
      if (isDefault) setActiveCalendar(data);
      
      showToast('Calendar created successfully', 'success');
      return data;
    } catch (error) {
      showToast('Failed to create calendar', 'error');
      throw error;
    }
  }, [user, showToast]);

  const updateCalendar = useCallback(async (
    id: string,
    updates: Partial<CustomCalendar>
  ) => {
    try {
      const { error } = await supabase
        .from('custom_calendars')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setCalendars(prev =>
        prev.map(cal => cal.id === id ? { ...cal, ...updates } : cal)
      );

      if (activeCalendar?.id === id) {
        setActiveCalendar(prev => prev ? { ...prev, ...updates } : prev);
      }

      showToast('Calendar updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update calendar', 'error');
      throw error;
    }
  }, [activeCalendar, showToast]);

  const deleteCalendar = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('custom_calendars')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCalendars(prev => prev.filter(cal => cal.id !== id));
      if (activeCalendar?.id === id) {
        setActiveCalendar(null);
      }

      showToast('Calendar deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete calendar', 'error');
      throw error;
    }
  }, [activeCalendar, showToast]);

  return {
    calendars,
    activeCalendar,
    loading,
    fetchCalendars,
    createCalendar,
    updateCalendar,
    deleteCalendar,
    setActiveCalendar
  };
};