export interface SignupFormData {
  email: string;
  password: string;
  firstName: string;
  surname?: string;
  interests: string[];
  privacySettings: {
    profileVisibility: 'public' | 'friends' | 'private';
    allowMessagesFrom: 'everyone' | 'friends' | 'none';
    showOnlineStatus: boolean;
    allowTagging: boolean;
    showLocation: boolean;
  };
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export interface AuthState {
  loading: boolean;
  error: AuthError | null;
  user: null | {
    id: string;
    email: string;
    firstName: string;
  };
}