import React from 'react';
import HeroSection from './dashComponent/HeroSection';
import Cards from './dashComponent/cards';
import SampleReview from './dashComponent/SampleReview';
import Footer from '../footer';

export default function UserDashboard() {
  return (
    <div className="max-w-full mx-auto px-4"> {/* Maximum full width */}
      <HeroSection />
      <Cards />
      <SampleReview />
      <Footer />
    </div>
  )
}
