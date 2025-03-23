"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';

// First, add a proper TypeScript interface for your form data
interface PropertyFormData {
    fullname: string;
    email: string;
    phone: string;
    title: string;
    purpose: string;
    state: string;
    locality: string;
    address: string;
    propertyType: string;
    subType: string;
    description: string;
    budget: number;
    bedroom: string;
    bathroom: string;
    toilet: string;
    areaSize: string;
    features: string[];  // Explicitly typed as string array
    amenities: string[];  // Explicitly typed as string array
  }


const PropertyRequestPage = () => {

  
  // Then use this interface in your useState declaration
  const [formData, setFormData] = useState<PropertyFormData>({
    fullname: "",
    email: "",
    phone: "",
    title: "",
    purpose: "sell",
    state: "",
    locality: "",
    address: "",
    propertyType: "",
    subType: "",
    description: "",
    budget: 0,
    bedroom: "",
    bathroom: "",
    toilet: "",
    areaSize: "",
    features: [],  // This will now be properly typed as string[]
    amenities: [], // This will now be properly typed as string[]
  });
  const propertyTypes = ["Residential", "Commercial", "Industrial", "Land"];
  const subTypes = {
    Residential: ["Apartment", "House", "Villa", "Duplex", "Penthouse"],
    Commercial: ["Office Space", "Shop", "Warehouse", "Showroom"],
    Industrial: ["Factory", "Workshop", "Storage Facility"],
    Land: ["Residential Plot", "Commercial Plot", "Agricultural Land"]
  };
  const amenitiesList = ["Pool", "Gym", "Parking", "Security", "Garden"];
  const featuresList = ["Serviced", "Furnished", "Renovated", "Smart Home"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-green-600 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Home size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Submit Property Request</h1>
          <p className="text-xl text-blue-100">
            Let us help you find your perfect property
          </p>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12 -mt-16 max-w-5xl"
      >
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Personal Info Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-500">
              <ChevronRight className="text-green-600" />
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />
              </div>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="w-full">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Request Title"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Property Details Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-500">
              <ChevronRight className="text-green-600" />
              Property Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="w-full">
                <select
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value, subType: "" })}
                >
                  <option value="">Property Type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="w-full">
                <select
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.subType}
                  onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
                  disabled={!formData.propertyType}
                >
                  <option value="">Property Sub-Type</option>
                  {formData.propertyType && subTypes[formData.propertyType as keyof typeof subTypes]?.map(subType => (
                    <option key={subType} value={subType}>{subType}</option>
                  ))}
                </select>
              </div>
              
              <div className="w-full">
                <select
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                >
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              
              <div className="w-full">
                <input
                  type="number"
                  placeholder="Budget"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                />
              </div>
              
              <div className="w-full">
                <input
                  type="text"
                  placeholder="State"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
              
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Locality"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                />
              </div>
              
              <div className="md:col-span-2 w-full">
                <input
                  type="text"
                  placeholder="Full Address"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Bedrooms"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.bedroom}
                  onChange={(e) => setFormData({ ...formData, bedroom: e.target.value })}
                />
              </div>
              
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Bathrooms"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.bathroom}
                  onChange={(e) => setFormData({ ...formData, bathroom: e.target.value })}
                />
              </div>
              
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Toilets"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.toilet}
                  onChange={(e) => setFormData({ ...formData, toilet: e.target.value })}
                />
              </div>
              
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Area Size (sqm)"
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.areaSize}
                  onChange={(e) => setFormData({ ...formData, areaSize: e.target.value })}
                />
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <h3 className="font-medium">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {featuresList.map(feature => (
                    <label key={feature} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-green-600 rounded"
                        checked={formData.features.includes(feature)}
                        onChange={(e) => {
                          const newFeatures = e.target.checked
                            ? [...formData.features, feature]
                            : formData.features.filter(f => f !== feature);
                          setFormData({ ...formData, features: newFeatures });
                        }}
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <h3 className="font-medium">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {amenitiesList.map(amenity => (
                    <label key={amenity} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-green-600 rounded"
                        checked={formData.amenities.includes(amenity)}
                        onChange={(e) => {
                          const newAmenities = e.target.checked
                            ? [...formData.amenities, amenity]
                            : formData.amenities.filter(a => a !== amenity);
                          setFormData({ ...formData, amenities: newAmenities });
                        }}
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2 w-full">
                <textarea
                  placeholder="Property Description"
                  rows={4}
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
            type="submit"
          >
            Submit Request
            <ArrowRight size={20} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PropertyRequestPage;