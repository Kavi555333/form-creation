import  { useState } from 'react';
import './App.css'
import EnrollmentPage from './components/EnrollmentPage';
import FeedbackModal from './components/FeedbackModal'
import Header from './components/Header'
import SupportSection from './components/SupportSection'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'enrollment'>('home');

  // if (currentPage === 'enrollment') {
  //   return <EnrollmentPage onBack={() => setCurrentPage('home')} />;
  // }
  return (
    <>
      <FeedbackModal/>

 {currentPage === 'enrollment' ? (
        <EnrollmentPage onBack={() => setCurrentPage('home')} />
      ) :(
      <>
      <Header/>
      <main>
      <SupportSection onNavigateToEnrollment={() => setCurrentPage('enrollment')}/>
        </main>
      
      </>
      
      )}


      
    </>
  )
}

export default App
