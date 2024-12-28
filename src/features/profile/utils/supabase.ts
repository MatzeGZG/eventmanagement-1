import { createClient } from '@supabase/supabase-js';
import { EnhancedProfile } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const createSupabaseProfile = async (profile: Partial<EnhancedProfile>) => {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: profile.id,
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      social_links: profile.socialLinks,
      privacy_settings: profile.privacySettings,
      travel_preferences: profile.travelPreferences,
      setup_complete: profile.setupComplete,
      updated_at: new Date().toISOString()
    });

  if (error) {
    throw new Error(`Failed to save profile: ${error.message}`);
  }
};

export const getSupabaseProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data;
};