import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navigation'
import PropertyListingPage from '@/components/PropertyPage'
import PropertyPageHero from '@/components/PropertyPageHero'
import React from 'react'

function PropertyList() {
  return (
    <div>
      <Navbar />
      <PropertyPageHero />
      <PropertyListingPage />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default PropertyList