import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceType } from '../../utils/responsive';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string;
}

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  height = '50vh'
}) => {
  const { isIOS } = useDeviceType();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`
              fixed bottom-0 left-0 right-0 z-50
              bg-fjs-charcoal rounded-t-2xl
              ${isIOS ? 'ios-momentum-scroll' : ''}
            `}
            style={{ maxHeight: height }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="w-12 h-1 bg-fjs-silver/20 rounded-full mx-auto my-3" />
            <div className="p-4 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};