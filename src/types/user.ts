import { Badge } from './badge';

export enum UserLevel {
  NewExplorer = 'New Explorer',
  LocalConnector = 'Local Connector',
  SocialEnthusiast = 'Social Enthusiast',
  CommunityLeader = 'Community Leader',
  PassionPioneer = 'Passion Pioneer'
}

export interface User {
  id: string;
  firstName: string;
  surname?: string;
  email: string;
  avatar?: string;
  level: UserLevel;
  xp: number;
  points: number;
  badges: Badge[];
  interests: string[];
  connections: string[];
  createdAt: Date;
  online?: boolean;
  location?: string;
}