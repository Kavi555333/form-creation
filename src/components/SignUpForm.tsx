import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import ThankYouModal from './ThankYouModal';

export const SignUpForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
//   const brandColor = "#0067FF";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.5 }}
      className="mt-12 text-left max-w-4xl mx-auto"
    >
      {/* Intro Text */}
      <div className="mb-8 text-zinc-700 text-sm md:text-base leading-relaxed">
        <p className="mb-4">
          For every stage of your treatment journey, there are resources available to you. When you sign up, you'll receive ongoing information, support and resources through email and mail on topics including:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>MAC (Mycobacterium avium complex)</li>
          <li>FIPSAR LITE</li>
          <li>Management approaches for related lung conditions such as bronchiectasis</li>
        </ul>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-zinc-200 rounded-lg p-8 md:p-12 shadow-sm">
        <p className="text-xs text-zinc-500 mb-6"><span className="text-red-600">*</span>Required fields</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">First Name<span className="text-red-600">*</span></label>
              <input type="text" className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors" />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">Last Name<span className="text-red-600">*</span></label>
              <input type="text" className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors" />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">Email<span className="text-red-600">*</span></label>
              <input type="email" className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors" />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">Phone Number<span className="text-red-600">*</span></label>
              <input type="tel" className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors" />
            </div>
            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">Address<span className="text-red-600">*</span></label>
              <input type="text" className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors" />
            </div>
            {/* Apartment */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">Apartment, suite, etc.</label>
              <input type="text" className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors" />
            </div>
            {/* City */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">City<span className="text-red-600">*</span></label>
              <input type="text" className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors" />
            </div>
            {/* State */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">State<span className="text-red-600">*</span></label>
              <select className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors bg-white appearance-none">
                <option value="">Select State</option>
                <option value="NY">New York</option>
                <option value="CA">California</option>
                {/* Add more states as needed */}
              </select>
            </div>
            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-bold text-zinc-800 mb-1">ZIP Code<span className="text-red-600">*</span></label>
              <input type="text" className="w-full border-2 border-[#0067FF]/30 rounded-md p-3 focus:border-[#0067FF] outline-none transition-colors" />
            </div>
          </div>

          {/* Diagnosis Question */}
          <div className="mt-8">
            <p className="text-sm font-bold text-zinc-800 mb-4">Have you been diagnosed with NTM/MAC lung disease?<span className="text-red-600">*</span></p>
            <div className="flex gap-8">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-5 h-5 rounded-full border-2 border-[#0067FF] flex items-center justify-center group-hover:bg-[#0067FF]/10">
                  <input type="radio" name="diagnosis" className="sr-only peer" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0067FF] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-medium text-zinc-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-5 h-5 rounded-full border-2 border-[#0067FF] flex items-center justify-center group-hover:bg-[#0067FF]/10">
                  <input type="radio" name="diagnosis" className="sr-only peer" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0067FF] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-medium text-zinc-700">No</span>
              </label>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="mt-8 flex gap-4 items-start">
            <div className="mt-1">
              <input type="checkbox" id="consent" className="w-5 h-5 border-2 border-[#0067FF] rounded cursor-pointer accent-[#0067FF]" />
            </div>
            <label htmlFor="consent" className="text-sm font-bold text-zinc-800 leading-snug cursor-pointer">
              I am over 18 years of age and consent to fipsar collecting and processing my Health Information as described below.<span className="text-red-600">*</span>
            </label>
          </div>

          {/* Sign Up Button */}
          <div className="mt-8">
            <button type="submit" className="flex items-center gap-2 bg-[#D1D5DB] hover:bg-[#0067FF] text-zinc-700 hover:text-white font-bold py-3 px-8 rounded transition-all group">
              Sign up
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Legal Text */}
        <div className="mt-12 pt-8 border-t border-zinc-100 text-[11px] text-zinc-500 leading-relaxed space-y-4">
          <p>
            I agree that Fipar may collect, use and process my Health Information, as listed below, to provide information, resources, support and other communications. 
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Health conditions, treatments, diseases, or diagnosis;</li>
            <li>Social, psychological, behavioral and medical approaches to managing health;</li>
            <li>Health-related surgeries or procedures;</li>
            <li>Use or purchase of prescribed medications;</li>
            <li>Health measurements, including vital signs, symptoms and bodily functions;</li>
            <li>Diagnoses or diagnostic testing;</li>
            <li>Data that identify me as a consumer seeking health care services; and</li>
            <li>Health-related data that have been derived or inferred from the above (collectively "Health Information")</li>
          </ul>
          <p>
            I understand that I am not required to consent to collection, use and processing of my Health Information for these purposes. However, if I do not consent, I will not be able to sign up, as collection, use and processing of my Health Information is necessary for fipsar to provide these services to me.
          </p>
        </div>
      </div>

      <ThankYouModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};


export default SignUpForm;
