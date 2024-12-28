import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Facebook, Instagram, Linkedin } from 'lucide-react';
import { SocialScanningService } from '../../services/socialScanningService';
import { useToast } from '../../../../hooks/useToast';

export const SocialScanningButton: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const { showToast } = useToast();

  const handleScan = async (provider: 'facebook' | 'instagram' | 'linkedin') => {
    setScanning(true);
    try {
      const profile = await SocialScanningService.scanProfile(provider);
      await SocialScanningService.updateUserPreferences(profile);
      showToast('Profile preferences updated from social media!', 'success');
    } catch (error) {
      showToast('Failed to scan social profile', 'error');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium"
        disabled={scanning}
      >
        <Sparkles className="w-5 h-5 mr-2" />
        {scanning ? 'Scanning...' : 'Auto-Discover Preferences'}
      </motion.button>

      <div className="absolute right-0 mt-2 w-48 py-2 bg-fjs-charcoal rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
        <SocialButton
          icon={Facebook}
          label="Scan Facebook"
          onClick={() => handleScan('facebook')}
        />
        <SocialButton
          icon={Instagram}
          label="Scan Instagram"
          onClick={() => handleScan('instagram')}
        />
        <SocialButton
          icon={Linkedin}
          label="Scan LinkedIn"
          onClick={() => handleScan('linkedin')}
        />
      </div>
    </div>
  );
};

const SocialButton: React.FC<{
  icon: React.FC<any>;
  label: string;
  onClick: () => void;
}> = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center px-4 py-2 text-fjs-silver hover:text-fjs-gold hover:bg-black/20"
  >
    <Icon className="w-4 h-4 mr-2" />
    <span className="text-sm">{label}</span>
  </button>
);