import { User, UserLevel } from '../types';
import { Badge, BadgeTier } from '../types/badge';

const TEST_BADGES: Badge[] = [
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'One of the first to join FunJetSetter',
    icon: '🌟',
    tier: BadgeTier.Gold
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Connected with 50+ members',
    icon: '🦋',
    tier: BadgeTier.Silver
  },
  {
    id: 'event-enthusiast',
    name: 'Event Enthusiast',
    description: 'Attended 10+ events',
    icon: '🎉',
    tier: BadgeTier.Bronze
  }
];

export const TEST_USERS: User[] = [
  {
    id: 'test1',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@test.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    level: UserLevel.PassionPioneer,
    xp: 2000,
    points: 8500,
    badges: TEST_BADGES,
    interests: ['Networking', 'Fashion', 'Arts', 'Tech'],
    connections: ['test2', 'test3'],
    createdAt: new Date('2023-01-01')
  },
  {
    id: 'test2',
    name: 'Emma Davis',
    email: 'emma.davis@test.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    level: UserLevel.SocialEnthusiast,
    xp: 850,
    points: 3200,
    badges: [TEST_BADGES[2]],
    interests: ['Music', 'Food', 'Travel'],
    connections: ['test1'],
    createdAt: new Date('2023-03-15')
  },
  {
    id: 'test3',
    name: 'Mike Chen',
    email: 'mike.chen@test.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    level: UserLevel.LocalConnector,
    xp: 450,
    points: 1800,
    badges: [TEST_BADGES[2]],
    interests: ['Tech', 'Business', 'Sports'],
    connections: ['test1'],
    createdAt: new Date('2023-06-01')
  }
];