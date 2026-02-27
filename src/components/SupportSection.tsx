import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Stethoscope } from 'lucide-react';
import SignUpForm from './SignUpForm';
import LeaveSiteModal from './LeaveSiteModal';

interface SupportSectionProps {
  onNavigateToEnrollment: () => void;
}

/**
 * SupportSection Component
 * Based on the provided design with a blue color palette
 */
export const SupportSection: React.FC<SupportSectionProps> = ({ onNavigateToEnrollment }) => {
  const [activeButton, setActiveButton] = useState<'yes' | 'no' | null>(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
//   const brandColor = "#0067FF";

  const handleYesClick = () => {
    setActiveButton('yes');
    setIsLeaveModalOpen(true);
  };

  const handleNoClick = () => {
    setActiveButton('no');
  };

  const handleConfirmLeave = () => {
    setIsLeaveModalOpen(false);
    onNavigateToEnrollment();
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl  mb-12 tracking-tight  text-[#006FF6] ">
          Information, Resources & Support await. <span className="font-normal">Sign up here</span>
        </h2>

        {/* Support Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F0F7FF] rounded-xl p-12 md:p-16 shadow-sm border border-[#E0EFFF] max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Circle Icon */}
            <div className="w-20 h-20 rounded-full bg-white border-2 border-[#0067FF] flex items-center justify-center shadow-sm">
              <Stethoscope size={40} className="text-[#0067FF]" />
            </div>

            {/* Question */}
            <h3 className="text-xl md:text-2xl font-bold text-[#0067FF] tracking-tight text-center">
              Are you currently prescribed FIPSAR LITE?
            </h3>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              <button 
                onClick={handleYesClick}
                className={`min-w-[140px] py-3 rounded-lg border-2 font-bold transition-all duration-200 ${
                  activeButton === 'yes' 
                    ? 'bg-[#0067FF] text-white border-[#0067FF]' 
                    : 'bg-white text-[#0067FF] border-[#0067FF]'
                }`}
              >
                Yes
              </button>
              <button 
                onClick={handleNoClick}
                className={`min-w-[140px] py-3 rounded-lg border-2 font-bold transition-all duration-200 ${
                  activeButton === 'no' 
                    ? 'bg-[#0067FF] text-white border-[#0067FF]' 
                    : 'bg-white text-[#0067FF] border-[#0067FF]'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </motion.div>

        {/* Conditional Sign Up Form */}
        {activeButton === 'no' && <SignUpForm />}

        {/* Leave Site Modal */}
        <LeaveSiteModal 
          isOpen={isLeaveModalOpen} 
          onClose={() => setIsLeaveModalOpen(false)} 
          onConfirm={handleConfirmLeave}
        />
      </div>
    </section>
  );
};

export default SupportSection;

