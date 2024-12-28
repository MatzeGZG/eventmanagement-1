// Core Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: UserLevel;
  xp: number;
  points: number;
  badges: Badge[];
  interests: string[];
  connections: string[];
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizer: User;
  date: Date;
  location: Location;
  category: EventCategory;
  tags: string[];
  capacity: number;
  attendees: string[];
  price: number;
  images: string[];
  status: EventStatus;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  unlockedAt?: Date;
}

// Enums
export enum UserLevel {
  NewExplorer = 'New Explorer',
  LocalConnector = 'Local Connector',
  SocialEnthusiast = 'Social Enthusiast',
  CommunityLeader = 'Community Leader',
  PassionPioneer = 'Passion Pioneer'
}

export enum EventCategory {
  Music = 'Music',
  Tech = 'Tech',
  Fitness = 'Fitness',
  Arts = 'Arts',
  Food = 'Food',
  Business = 'Business',
  Fashion = 'Fashion',
  Wellness = 'Wellness'
}

export enum BadgeTier {
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold'
}

export enum EventStatus {
  Draft = 'Draft',
  Published = 'Published',
  Cancelled = 'Cancelled',
  Completed = 'Completed'
}

export interface Location {
  address: string;
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}