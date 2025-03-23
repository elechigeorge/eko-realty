import CallToAction from "@/components/CallToAction";
import FeaturedListing from "@/components/FeaturedListing";
import FinestProperties from "@/components/FinestSelectionLagos";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowTo from "@/components/HowTo";
import InfoPage from "@/components/InfoSection";
import Navbar from "@/components/Navigation";
import Collection from "@/components/PropertyType";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
        <div className="">
          <Navbar />
          <Hero />
          <FinestProperties />
          <InfoPage />
          <Collection />
          <FeaturedListing />
          <HowTo />
          <Testimonial />
          <CallToAction />
          <Footer />
        </div>

  );
}
