// //import  { useState } from 'react';
// import './App.css'
// // import EnrollmentPage from './components/EnrollmentPage';
// // import FeedbackModal from './components/FeedbackModal'
// import Header from './components/Header'
// // import SupportSection from './components/SupportSection'
// import SignUpForm from './components/SignUpForm';

// function App() {
//   // const [currentPage, setCurrentPage] = useState<'home' | 'enrollment'>('home');

//   // if (currentPage === 'enrollment') {
//   //   return <EnrollmentPage onBack={() => setCurrentPage('home')} />;
//   // }
//   return (
//     <>
//       {/* <FeedbackModal/>

//  {currentPage === 'enrollment' ? (
//         <EnrollmentPage onBack={() => setCurrentPage('home')} />
//       ) :(
//       <>
//       <Header/>
//       <SignUpForm/>
//       <main>
//       <SupportSection onNavigateToEnrollment={() => setCurrentPage('enrollment')}/>
//         </main>
      
//       </>
      
//       )} */}

// <Header/>
//       <SignUpForm/>
      
//     </>
//   )
// }

// export default App 




// code for AWS API SETUP 
import { useState } from "react";
import "./App.css";

// 🔁 Replace this with your actual API Gateway URL after deployment
const API_GATEWAY_URL = "https://vpvrw5ywx9.execute-api.ap-south-1.amazonaws.com/prod/submit";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  diagnosedWithDisease: boolean | null;
  consentGiven: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  diagnosedWithDisease: null,
  consentGiven: false,
};

export default function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "yes",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.diagnosedWithDisease === null) {
      setErrorMessage("Please answer the disease diagnosis question.");
      return;
    }
    if (!formData.consentGiven) {
      setErrorMessage("You must provide consent to submit the form.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed.");
      }

      setSubmitStatus("success");
      setFormData(initialFormData);
    } catch (err: unknown) {
      setSubmitStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="form-container">
        <div className="success-message">
          <h2>✅ Thank You!</h2>
          <p>Your enrollment has been submitted successfully.</p>
          <button onClick={() => setSubmitStatus("idle")} className="submit-btn">
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <img src="/fipsar-logo.png" alt="Fipsar Logo" className="logo" />
        </div>
        <h1 className="form-title">Enrollment Form</h1>
        <p className="required-note">*Required fields</p>

        <form onSubmit={handleSubmit}>
          {/* Row 1: First Name + Last Name */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Email + Phone */}
          <div className="form-row">
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 3: Address + City */}
          <div className="form-row">
            <div className="form-group">
              <label>Address*</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 4: State + ZIP */}
          <div className="form-row">
            <div className="form-group">
              <label>State*</label>
              <select name="state" value={formData.state} onChange={handleChange} required>
                <option value="">Select State</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>ZIP Code*</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Disease Question */}
          <div className="form-group">
            <label>Have you been diagnosed with any disease?*</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="diagnosedWithDisease"
                  value="yes"
                  checked={formData.diagnosedWithDisease === true}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="diagnosedWithDisease"
                  value="no"
                  checked={formData.diagnosedWithDisease === false}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="form-group consent-group">
            <label>
              <input
                type="checkbox"
                name="consentGiven"
                checked={formData.consentGiven}
                onChange={handleChange}
              />
              I am over 18 years of age and consent to fipsar collecting and processing
              my Health Information as described below.*
            </label>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="error-message">⚠️ {errorMessage}</div>
          )}

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit →"}
          </button>
        </form>
      </div>
    </div>
  );
}

