import { supabase } from '../../../lib/supabase';
import { Message, ChatRoom, ChatRequest } from '../types';

export const chatService = {
  // Room operations
  async getRooms(): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select(`
        *,
        chat_memberships!inner(*)
      `)
      .eq('chat_memberships.user_id', supabase.auth.user()?.id);

    if (error) throw error;
    return data;
  },

  async createRoom(room: Partial<ChatRoom>): Promise<ChatRoom> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .insert([room])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Message operations
  async getMessages(roomId: string, limit = 50): Promise<Message[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async sendMessage(message: Partial<Message>): Promise<Message> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Chat request operations
  async getChatRequests(): Promise<ChatRequest[]> {
    const { data, error } = await supabase
      .from('chat_requests')
      .select('*')
      .or(`sender_id.eq.${supabase.auth.user()?.id},recipient_id.eq.${supabase.auth.user()?.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async sendChatRequest(request: Partial<ChatRequest>): Promise<ChatRequest> {
    const { data, error } = await supabase
      .from('chat_requests')
      .insert([request])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateChatRequest(requestId: string, status: 'accepted' | 'declined'): Promise<void> {
    const { error } = await supabase
      .from('chat_requests')
      .update({ status })
      .eq('id', requestId);

    if (error) throw error;
  },

  // Real-time subscriptions
  subscribeToMessages(roomId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}`
      }, payload => {
        callback(payload.new as Message);
      })
      .subscribe();
  },

  subscribeToRequests(callback: (request: ChatRequest) => void) {
    const userId = supabase.auth.user()?.id;
    return supabase
      .channel('chat_requests')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_requests',
        filter: `recipient_id=eq.${userId}`
      }, payload => {
        callback(payload.new as ChatRequest);
      })
      .subscribe();
  }
};