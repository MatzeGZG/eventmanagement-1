export const extractLocation = (query: string): string | undefined => {
  const locationMatch = query.match(/in ([A-Za-z\s]+)(?=\s|$)/i);
  return locationMatch ? locationMatch[1].trim() : undefined;
};