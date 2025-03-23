import React from 'react';
import PropertyRequest from '@/components/PropertyRequest';
import Navbar from '@/components/Navigation';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

function PropertyRequestPage() {
  return (
    <div>
        <Navbar />
        <PropertyRequest />
        <CallToAction />
        <Footer />
    </div>
  )
}

export default PropertyRequestPage