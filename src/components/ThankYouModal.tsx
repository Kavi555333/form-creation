import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ 
  isOpen, 
  onClose, 
  title = "Thank You!", 
  message = "Your information has been successfully submitted. We appreciate your interest in FIPSAR LITE." 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-100"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-[#0067FF] transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-8 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#F0F7FF] rounded-full flex items-center justify-center">
                <CheckCircle2 size={48} className="text-[#0067FF]" />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">
              {title}
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-8">
              {message}
            </p>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="w-full bg-[#0067FF] hover:bg-[#0056D6] text-white font-bold py-3 rounded-xl shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ThankYouModal;
