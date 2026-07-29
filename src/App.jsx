import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import About from './components/About';
import Specialists from './components/Specialists';
import WhyChooseUs from './components/WhyChooseUs';
import Facilities from './components/Facilities';
import Doctors from './components/Doctors';
import Testimonials from './components/Testimonials';
import EmergencyCTA from './components/EmergencyCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="app-container" style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero onBook={() => setIsBookingModalOpen(true)} />
        <Statistics />
        <About />
        <Specialists />
        <WhyChooseUs />
        <Facilities />
        <Doctors onBook={() => setIsBookingModalOpen(true)} />
        <Testimonials />
        <EmergencyCTA />
      </main>
      
      <Footer />
      
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}

export default App;
