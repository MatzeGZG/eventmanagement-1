import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useStore } from '../../../store';
import { useToast } from '../../../hooks/useToast';
import { ChatRoom, Message } from '../types';

export const useChat = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentChats, setRecentChats] = useState<ChatRoom[]>([]);
  const user = useStore(state => state.user);
  const { showToast } = useToast();

  // Load recent chats
  useEffect(() => {
    if (!user) return;

    const loadChats = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_rooms')
          .select(`
            *,
            chat_memberships!inner(*)
          `)
          .eq('chat_memberships.user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setRecentChats(data);
      } catch (error) {
        console.error('Error loading chats:', error);
      }
    };

    loadChats();
  }, [user]);

  // Subscribe to new messages
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('chat_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `recipient_id=eq.${user.id}`
      }, payload => {
        setUnreadCount(prev => prev + 1);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  // Mark messages as read
  const markAsRead = useCallback(async (roomId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('chat_memberships')
        .update({ last_read_at: new Date().toISOString() })
        .eq('room_id', roomId)
        .eq('user_id', user.id);

      if (error) throw error;
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }, [user]);

  return {
    unreadCount,
    recentChats,
    markAsRead
  };
};