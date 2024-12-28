const KNOWN_CATEGORIES = [
  'music',
  'tech',
  'food',
  'art',
  'sports',
  'business',
  'fashion',
  'wellness'
];

export const extractCategories = (query: string): string[] => {
  const words = query.toLowerCase().split(' ');
  return words.filter(word => KNOWN_CATEGORIES.includes(word));
};