import { DateRange } from '../../types';

export const extractDateRange = (query: string): DateRange | undefined => {
  const now = new Date();
  
  if (query.includes('next week')) {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 7);
    return { start, end };
  }
  
  if (query.includes('this weekend')) {
    const start = new Date();
    start.setDate(start.getDate() + (6 - start.getDay()));
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start, end };
  }
  
  if (query.includes('two weeks')) {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 14);
    return { start, end };
  }
  
  return undefined;
};