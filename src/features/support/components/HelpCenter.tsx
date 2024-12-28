import React from 'react';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, Mail } from 'lucide-react';
import { useHelpCenter } from '../hooks/useHelpCenter';

export const HelpCenter: React.FC = () => {
  const { articles, searchArticles } = useHelpCenter();

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type="text"
          placeholder="Search help articles..."
          onChange={(e) => searchArticles(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickLink
          icon={Book}
          title="Getting Started"
          description="Learn the basics of FunJetSetter"
        />
        <QuickLink
          icon={MessageCircle}
          title="Live Chat"
          description="Chat with our support team"
        />
        <QuickLink
          icon={Mail}
          title="Contact Us"
          description="Send us an email"
        />
      </div>

      {/* Help Articles */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-fjs-gold">Popular Articles</h2>
        <div className="grid gap-4">
          {articles.map((article) => (
            <motion.button
              key={article.id}
              whileHover={{ x: 4 }}
              className="text-left p-4 bg-fjs-charcoal rounded-lg hover:bg-black/20"
            >
              <h3 className="font-medium text-white mb-1">{article.title}</h3>
              <p className="text-sm text-fjs-silver">{article.excerpt}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface QuickLinkProps {
  icon: React.FC<any>;
  title: string;
  description: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 bg-fjs-charcoal rounded-lg"
  >
    <Icon className="w-6 h-6 text-fjs-gold mb-2" />
    <h3 className="font-medium text-white mb-1">{title}</h3>
    <p className="text-sm text-fjs-silver">{description}</p>
  </motion.div>
);