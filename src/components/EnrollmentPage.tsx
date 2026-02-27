import React, { useState } from 'react';
import { motion } from 'motion/react';
import ThankYouModal from './ThankYouModal';

interface EnrollmentPageProps {
  onBack: () => void;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
//   const brandColor = "#0067FF";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F5F7FA] py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-12">
          <img 
            src="https://www.fipsar.com/assets/img/Fipsar-logo.jpg" 
            alt="Fipsar Logo" 
            className="h-16 md:h-24 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-sm border border-zinc-200 rounded-sm p-8 md:p-16">
          {/* Form Header */}
          <div className="text-center mb-12">
            <h2 className="text-zinc-600 italic text-sm mb-4">
              Fipsar Lite Support Program Enrollment Form
            </h2>
            <p className="text-zinc-800 font-bold text-sm leading-relaxed max-w-2xl mx-auto">
              Fipsar Lite Support offers a dedicated support team to answer questions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Patient Information Section */}
            <section>
              <h3 className="text-zinc-700 font-bold text-lg border-b border-zinc-100 pb-2 mb-8 uppercase tracking-wide">
                Patient Information
              </h3>

              <div className="space-y-8">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">Patient Name <span className="text-red-600">*</span></label>
                    <input type="text" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                    <span className="text-[10px] text-zinc-400 mt-1 block">Patient First Name</span>
                  </div>
                  <div className="flex flex-col justify-end">
                    <input type="text" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                    <span className="text-[10px] text-zinc-400 mt-1 block">Patient Last Name</span>
                  </div>
                </div>

                {/* DOB Field */}
                <div className="max-w-xs">
                  <label className="block text-zinc-800 font-bold mb-2">DOB <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="MM-DD-YYYY" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Date</span>
                </div>

                {/* Gender Field */}
                <div>
                  <label className="block text-zinc-800 font-bold mb-4">Gender</label>
                  <div className="space-y-3">
                    {['Male', 'Female', 'Non-binary', 'Unknown'].map((gender) => (
                      <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center group-hover:border-[#0067FF]">
                          <input type="radio" name="gender" className="sr-only peer" />
                          <div className="w-3 h-3 rounded-full bg-[#0067FF] opacity-0 peer-checked:opacity-100 transition-all" />
                        </div>
                        <span className="text-zinc-600 text-sm">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">City <span className="text-red-600">*</span></label>
                    <input type="text" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">State <span className="text-red-600">*</span></label>
                    <select className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all bg-white appearance-none">
                      <option value="">Please Select</option>
                      <option value="NY">New York</option>
                      <option value="CA">California</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">ZIP <span className="text-red-600">*</span></label>
                    <input type="text" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">Mobile Phone <span className="text-red-600">*</span></label>
                    <input type="text" placeholder="(000) 000-0000" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                  </div>
                </div>

                {/* Language Field */}
                <div>
                  <label className="block text-zinc-800 font-bold mb-4">Preferred Contact Language</label>
                  <div className="space-y-3">
                    {['English', 'Spanish', 'Other'].map((lang) => (
                      <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center group-hover:border-[#0067FF]">
                          <input type="radio" name="language" className="sr-only peer" />
                          <div className="w-3 h-3 rounded-full bg-[#0067FF] opacity-0 peer-checked:opacity-100 transition-all" />
                        </div>
                        <span className="text-zinc-600 text-sm">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Legal */}
            <div className="pt-12 border-t border-zinc-100">
              <p className="text-[10px] text-zinc-500 font-bold leading-relaxed">
                © 2026 Fipsar Incorporated. All Rights Reserved. 
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-8">
              <button 
                type="button"
                onClick={onBack}
                className="mr-4 px-8 py-3 text-zinc-500 font-bold hover:text-zinc-800 transition-all"
              >
                Back
              </button>
              <button 
                type="submit"
                className="bg-[#0067FF] hover:bg-[#0056D6] text-white font-bold py-3 px-12 rounded shadow-lg transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <ThankYouModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          onBack(); // Go back to home after closing the modal from enrollment
        }} 
      />
    </motion.div>
  );
};


export default EnrollmentPage;
