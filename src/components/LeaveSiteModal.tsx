import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LeaveSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LeaveSiteModal: React.FC<LeaveSiteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
          className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-[#0067FF]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-[#0067FF] transition-colors"
          >
            <X size={24} />
          </button>

          <div className="p-10 text-center">
            {/* Main Text */}
            <h2 className="text-3xl font-medium text-[#0067FF] leading-tight mb-4">
              You are about to leave <br />
              <span className="font-bold">Fipsar</span>
            </h2>

            {/* Subtext */}
            <p className="text-zinc-600 mb-10">
              Thank you for visiting.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {/* Cancel Button */}
              <button 
                onClick={onClose}
                className="flex items-center bg-[#0067FF] hover:bg-[#0056D6] text-white rounded overflow-hidden transition-all shadow-md"
              >
                <span className="px-6 py-2.5 font-bold border-r border-white/20">Cancel</span>
                {/* <span className="px-2 py-2.5 bg-black/10">
                  <ChevronRight size={18} />
                </span> */}
              </button>

              {/* OK Button */}
              <button 
                onClick={onConfirm}
                className="flex items-center bg-[#0067FF] hover:bg-[#0056D6] text-white rounded overflow-hidden transition-all shadow-md"
              >
                <span className="px-8 py-2.5 font-bold border-r border-white/20">OK</span>
                {/* <span className="px-2 py-2.5 bg-black/10">
                  <ChevronRight size={18} />
                </span> */}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeaveSiteModal;

