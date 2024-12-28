import React from 'react';
import { motion } from 'framer-motion';
import { EventGallery } from '../EventGallery';
import { NewsSection } from './NewsSection';
import { fadeInUp } from '../../../../utils/animations/variants';

interface ContentSectionsProps {
  userId?: string;
}

export const ContentSections: React.FC<ContentSectionsProps> = ({ userId }) => (
  <>
    <motion.section
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="py-12 bg-gradient-to-b from-black to-fjs-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EventGallery userId={userId} />
      </div>
    </motion.section>

    <motion.section
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.2 }}
      className="py-12 bg-fjs-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsSection userId={userId} />
      </div>
    </motion.section>
  </>
);