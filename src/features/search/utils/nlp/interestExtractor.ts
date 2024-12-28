const KNOWN_INTERESTS = [
  'networking',
  'learning',
  'outdoor',
  'social',
  'creative',
  'professional'
];

export const extractInterests = (query: string): string[] => {
  const words = query.toLowerCase().split(' ');
  return words.filter(word => KNOWN_INTERESTS.includes(word));
};