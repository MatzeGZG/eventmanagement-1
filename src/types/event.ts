import { User } from './user';
import { Location } from './location';

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

export enum EventStatus {
  Draft = 'Draft',
  Published = 'Published',
  Cancelled = 'Cancelled',
  Completed = 'Completed'
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