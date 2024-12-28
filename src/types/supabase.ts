export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          surname: string | null;
          email: string;
          level: string;
          xp: number;
          points: number;
          badges: any[];
          interests: string[];
          connections: string[];
          created_at: string;
          updated_at: string;
          privacy_settings: {
            profileVisibility: 'public' | 'friends' | 'private';
            allowMessagesFrom: 'everyone' | 'friends' | 'none';
            showOnlineStatus: boolean;
            allowTagging: boolean;
            showLocation: boolean;
          };
        };
        Insert: {
          id: string;
          first_name: string;
          surname?: string | null;
          email: string;
          level?: string;
          xp?: number;
          points?: number;
          badges?: any[];
          interests?: string[];
          connections?: string[];
          privacy_settings?: {
            profileVisibility: 'public' | 'friends' | 'private';
            allowMessagesFrom: 'everyone' | 'friends' | 'none';
            showOnlineStatus: boolean;
            allowTagging: boolean;
            showLocation: boolean;
          };
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
    };
  };
}