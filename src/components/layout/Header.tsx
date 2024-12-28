import React, { useState } from 'react';
import { Bell, Search, User, Calendar } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store';
import { PointsDisplay } from '../gamification/PointsDisplay';
import { SearchOverlay } from './header/SearchOverlay';
import { NotificationsDropdown } from './header/NotificationsDropdown';
import { UserDropdown } from './header/UserDropdown';
import { ChatButton } from './header/ChatButton';

type ActiveDropdown = 'none' | 'search' | 'notifications' | 'user';

export const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>('none');
  const user = useStore(state => state.user);
  const navigate = useNavigate();

  const toggleDropdown = (dropdown: ActiveDropdown) => {
    setActiveDropdown(current => current === dropdown ? 'none' : dropdown);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://static.wixstatic.com/media/f0f1ef_35d3520d058641e589b7d91f6c211beb.jpg"
              alt="FunJetSetter" 
              className="h-12 w-auto rounded-lg cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDropdown('search')}
                  className="p-2 hover:bg-fjs-charcoal rounded-full transition-colors"
                >
                  <Search className="w-6 h-6 text-fjs-gold" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/calendar')}
                  className="p-2 hover:bg-fjs-charcoal rounded-full transition-colors"
                >
                  <Calendar className="w-6 h-6 text-fjs-gold" />
                </motion.button>

                <ChatButton />

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleDropdown('notifications')}
                    className="p-2 hover:bg-fjs-charcoal rounded-full transition-colors"
                  >
                    <Bell className="w-6 h-6 text-fjs-gold" />
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === 'notifications' && (
                      <NotificationsDropdown />
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleDropdown('user')}
                    className="p-2 hover:bg-fjs-charcoal rounded-full transition-colors"
                  >
                    <User className="w-6 h-6 text-fjs-gold" />
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === 'user' && (
                      <UserDropdown onNavigate={() => setActiveDropdown('none')} />
                    )}
                  </AnimatePresence>
                </div>

                <PointsDisplay />
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-2 text-base font-medium text-black bg-gradient-to-r from-amber-200 to-amber-300 rounded-md shadow-sm hover:from-amber-300 hover:to-amber-400 transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown === 'search' && (
          <SearchOverlay onClose={() => setActiveDropdown('none')} />
        )}
      </AnimatePresence>
    </header>
  );
};