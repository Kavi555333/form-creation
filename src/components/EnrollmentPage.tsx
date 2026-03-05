
// ################################## Patient Enrollment Form #############################


import React from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

interface EnrollmentPageProps {
  onBack: () => void;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onBack }) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // ── Validation ──────────────────────────────────────
    const errors: string[] = [];
    if (!data.firstName) errors.push('Patient First Name');
    if (!data.lastName)  errors.push('Patient Last Name');
    if (!data.dob)       errors.push('Date of Birth');
    if (!data.gender)    errors.push('Gender');
    if (!data.city)      errors.push('City');
    if (!data.state)     errors.push('State');
    if (!data.zip)       errors.push('ZIP Code');
    if (!data.phone)     errors.push('Mobile Phone');
    if (!data.language)  errors.push('Preferred Contact Language');

    if (errors.length > 0) {
      Swal.fire({
        title: 'Validation Error',
        html: `<div class="text-left">Please provide:<ul class="list-disc list-inside mt-2 text-red-600 font-medium">${
          errors.map(err => `<li>${err}</li>`).join('')
        }</ul></div>`,
        icon: 'error',
        confirmButtonColor: '#0067FF',
        confirmButtonText: 'Fix Errors',
        customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-lg px-8 py-3 font-bold' },
      });
      return;
    }

    // ── Show loading ─────────────────────────────────────
    Swal.fire({
      title: 'Submitting...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // ── POST to backend → Snowflake ──────────────────────
    try {
      const response = await fetch('https://backend-form-creation.onrender.com/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Thank You!',
          text: result.message || 'Your enrollment request has been received successfully.',
          icon: 'success',
          confirmButtonColor: '#0067FF',
          confirmButtonText: 'Close',
          customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-lg px-8 py-3 font-bold' },
        }).then(() => {
          form.reset();
          onBack();
        });
      } else {
        Swal.fire({
          title: 'Submission Failed',
          text: result.error || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonColor: '#0067FF',
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Network Error',
        text: 'Could not connect to server. Please check your connection.',
        icon: 'error',
        confirmButtonColor: '#0067FF',
      });
      console.error('Enrollment error:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F5F7FA] py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <img
            src="https://www.fipsar.com/assets/img/Fipsar-logo.jpg"
            alt="Fipsar Logo"
            className="h-16 md:h-24 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-sm border border-zinc-200 rounded-sm p-8 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-zinc-600 italic text-sm mb-4">
              Fipsar Lite Support Program Enrollment Form
            </h2>
            <p className="text-zinc-800 font-bold text-sm leading-relaxed max-w-2xl mx-auto">
              Fipsar Lite Support offers a dedicated support team to answer questions.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-12">
            <section>
              <h3 className="text-zinc-700 font-bold text-lg border-b border-zinc-100 pb-2 mb-8 uppercase tracking-wide">
                Patient Information
              </h3>

              <div className="space-y-8">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">
                      Patient Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="firstName" type="text"
                      className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all"
                    />
                    <span className="text-[10px] text-zinc-400 mt-1 block">Patient First Name</span>
                  </div>
                  <div className="flex flex-col justify-end">
                    <input
                      name="lastName" type="text"
                      className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all"
                    />
                    <span className="text-[10px] text-zinc-400 mt-1 block">Patient Last Name</span>
                  </div>
                </div>

                {/* DOB */}
                <div className="max-w-xs">
                  <label className="block text-zinc-800 font-bold mb-2">
                    DOB <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="dob" type="text" placeholder="MM-DD-YYYY"
                      className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Date</span>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-zinc-800 font-bold mb-4">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <div className="space-y-3">
                    {['Male', 'Female', 'Non-binary', 'Unknown'].map((gender) => (
                      <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center group-hover:border-[#0067FF]">
                          <input type="radio" name="gender" value={gender.toLowerCase()} className="sr-only peer" />
                          <div className="w-3 h-3 rounded-full bg-[#0067FF] opacity-0 peer-checked:opacity-100 transition-all" />
                        </div>
                        <span className="text-zinc-600 text-sm">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Address Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">City <span className="text-red-600">*</span></label>
                    <input name="city" type="text" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">State <span className="text-red-600">*</span></label>
                    <select name="state" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all bg-white appearance-none">
                      <option value="">Please Select</option>
                      <option value="NY">New York</option>
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">ZIP <span className="text-red-600">*</span></label>
                    <input name="zip" type="text" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-zinc-800 font-bold mb-2">Mobile Phone <span className="text-red-600">*</span></label>
                    <input name="phone" type="text" placeholder="(000) 000-0000" className="w-full border border-zinc-300 rounded-sm p-3 focus:border-[#0067FF] outline-none transition-all" />
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-zinc-800 font-bold mb-4">
                    Preferred Contact Language <span className="text-red-600">*</span>
                  </label>
                  <div className="space-y-3">
                    {['English', 'Spanish', 'Other'].map((lang) => (
                      <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center group-hover:border-[#0067FF]">
                          <input type="radio" name="language" value={lang.toLowerCase()} className="sr-only peer" />
                          <div className="w-3 h-3 rounded-full bg-[#0067FF] opacity-0 peer-checked:opacity-100 transition-all" />
                        </div>
                        <span className="text-zinc-600 text-sm">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="pt-12 border-t border-zinc-100">
              <p className="text-[10px] text-zinc-500 font-bold leading-relaxed">
                © 2026 Fipsar Incorporated. All Rights Reserved.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-8">
              <button type="button" onClick={onBack}
                className="mr-4 px-8 py-3 text-zinc-500 font-bold hover:text-zinc-800 transition-all">
                Back
              </button>
              <button type="submit"
                className="bg-[#0067FF] hover:bg-[#0056D6] text-white font-bold py-3 px-12 rounded shadow-lg transition-all">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EnrollmentPage;


