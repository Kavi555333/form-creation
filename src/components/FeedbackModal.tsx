import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const surveySteps = [
    {
      question: "We value your feedback and would appreciate your help by answering a few questions. All answers are confidential. Please select the option that best describes you:",
      options: [
        "I am a friend or family member of someone who has or may have  disease",
        "I am a healthcare professional or work in a healthcare office",
        "Other"
      ]
    },
    {
      question: "How did you first hear about Fipsar Lite?",
      options: [
        "From a healthcare provider",
        "Social media or online advertisement",
        "Search engine (Google, Bing, etc.)",
        "Word of mouth"
      ]
    },
    {
      question: "What brings you to the website today?",
      options: [
        "To learn more about  disease ",
        "To learn more about FipsarLite",
        "To find a specific tool or resource for my loved one/friend",
        "To learn more from people who have  disease"
      ]
    },
    {
      question: "After visiting the website, what do you plan to do next?",
      options: [
        "Talk to doctor",
        "Talk to infectious disease doctor",
        "Find a Specialist"
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < surveySteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state for next time if needed, or just keep it closed
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop - Removed onClick to prevent closing when clicking outside */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-sm shadow-2xl overflow-hidden min-h-[400px] flex flex-col"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-8 md:p-10 flex-1 flex flex-col">
            {!isFinished ? (
              <>
                {/* Header */}
                <h2 className="text-lg font-bold text-zinc-900 leading-snug mb-8 pr-8">
                  {surveySteps[currentStep].question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-10 flex-1">
                  {surveySteps[currentStep].options.map((option, index) => (
                    <label 
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-md cursor-pointer transition-all border ${
                        selectedOption === option 
                          ? 'bg-[#F3F0FF] border-[#0067FF]/20' 
                          : 'bg-[#F8F7FF] border-transparent hover:border-zinc-200'
                      }`}
                    >
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="radio" 
                          name={`feedback-option-${currentStep}`}
                          className="sr-only"
                          onChange={() => setSelectedOption(option)}
                          checked={selectedOption === option}
                        />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedOption === option ? 'border-[#0067FF]' : 'border-zinc-300'
                        }`}>
                          {selectedOption === option && (
                            <div className="w-3 h-3 rounded-full bg-[#0067FF]" />
                          )}
                        </div>
                      </div>
                      <span className="text-zinc-700 font-medium text-sm md:text-base">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-6 mt-auto">
                  <button 
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className={`px-10 py-2.5 rounded-md font-bold text-white transition-all ${
                      selectedOption 
                        ? 'bg-[#0067FF] hover:bg-[#0056D6] shadow-md' 
                        : 'bg-[#C4C4C4] cursor-not-allowed'
                    }`}
                  >
                    {currentStep === surveySteps.length - 1 ? 'Finish' : 'Next'}
                  </button>

                  {/* Progress Bar */}
                  <div className="w-full max-w-xs h-1.5 bg-zinc-100 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#0067FF] transition-all duration-300" 
                      style={{ width: `${((currentStep + 1) / surveySteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                <h2 className="text-3xl font-medium text-zinc-900 mb-12">
                  Thank you for your feedback
                </h2>
                
                <button 
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#0067FF] hover:bg-[#0056D6] text-white font-bold rounded-md shadow-lg transition-all border-2 border-[#0067FF]"
                >
                  Close survey
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FeedbackModal;


