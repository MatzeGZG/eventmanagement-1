import { useState, useCallback } from 'react';

interface HelpArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

const HELP_ARTICLES: HelpArticle[] = [
  {
    id: '1',
    title: 'Getting Started with FunJetSetter',
    excerpt: 'Learn the basics of using our platform',
    content: '...',
    category: 'basics'
  },
  {
    id: '2',
    title: 'Understanding Points & Rewards',
    excerpt: 'How to earn and use points',
    content: '...',
    category: 'rewards'
  },
  {
    id: '3',
    title: 'Event Booking Guide',
    excerpt: 'How to find and book events',
    content: '...',
    category: 'events'
  }
];

export const useHelpCenter = () => {
  const [articles, setArticles] = useState<HelpArticle[]>(HELP_ARTICLES);

  const searchArticles = useCallback((query: string) => {
    if (!query) {
      setArticles(HELP_ARTICLES);
      return;
    }

    const filtered = HELP_ARTICLES.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase())
    );

    setArticles(filtered);
  }, []);

  return {
    articles,
    searchArticles
  };
};