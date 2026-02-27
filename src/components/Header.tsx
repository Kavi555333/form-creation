import React from 'react';
import { motion } from 'motion/react';
// import {  Menu } from 'lucide-react';

/**
 * Header Component
 * Layout: Left (Logo) | Center (Title) | Right (Actions)
 */
export const Header: React.FC = () => {
  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full h-16 bg-white/90 backdrop-blur-md border-b border-zinc-200 flex items-center px-4 md:px-8 sticky top-0 z-50"
      >
        {/* Left: Logo Only */}
        <div className="flex items-center">
          <img 
            src="https://www.fipsar.com/assets/img/Fipsar-logo.jpg" 
            alt="Fipsar Logo" 
            className="h-10 w-auto object-contain rounded"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.nav>
    </div>
  );
};

export default Header;
