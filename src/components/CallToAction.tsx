import React from "react";

const CallToAction = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-green-600 text-white py-20 px-8 md:px-20 lg:px-32 shadow-lg overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white bg-opacity-10 rounded-full blur-3xl -z-10"></div>

      {/* Content Section */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Find Your Dream Property Today
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Discover premium real estate opportunities with Eko Realty. Let us help you secure your next home or investment property with ease and confidence.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="/properties"
            className="bg-white text-blue-600 font-medium py-3 px-8 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300"
          >
            Explore Listings
          </a>
          <a
            href="/contact"
            className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
