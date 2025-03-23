"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  Building2,
  Hotel,
  Warehouse,
  TreePine,
  Building,
  Store,
  BedDouble,
  Eye,
  MapPin,
  Bath,
  Square,
  Home as HomeIcon
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

interface Property {
  id: string;
  title: string;
  slug: string;
  purpose: string;
  state: string;
  locality: string;
  address: string;
  propertyType: string;
  subType: string;
  pictures: string[];
  videoLink: string;
  description: string;
  price: string;
  discountedPrice: string | null;
  denomination: string;
  acceptInstallment: boolean;
  initialDeposit: string;
  monthlyInstallment: string;
  duration: string;
  priceAppend: string;
  bedroom: string;
  bathroom: string;
  toilet: string;
  areaSize: string;
  features: string[];
  amenities: string[];
  views: number;
  status: string;
  active: boolean;
  listedBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

const propertyIcons = {
  'Rental': <Home className="w-5 h-5" />,
  'Sale': <Building2 className="w-5 h-5" />,
  'Shortlet': <Hotel className="w-5 h-5" />,
  'Land': <TreePine className="w-5 h-5" />,
  'Apartment': <Building className="w-5 h-5" />,
  'Studio': <HomeIcon className="w-5 h-5" />,
  'Condo': <Warehouse className="w-5 h-5" />,
  'Shop': <Store className="w-5 h-5" />
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const PropertyCard = ({ property }: {property: any}) => {
  const formatPrice = (price: any) => {
    if (isNaN(price)) return 'Price on Request';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden group">
        <img
          src={property.pictures[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {property.purpose === 'sell' ? 'For Sale' : 
           property.purpose === 'rent' ? 'For Rent' : 
           property.purpose.charAt(0).toUpperCase() + property.purpose.slice(1)}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-600">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{property.views}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{`${property.locality}, ${property.state}`}</span>
        </div>

        <div className="flex gap-4 mb-4 text-gray-700">
          {property.bedroom && (
            <div className="flex items-center gap-1">
              <BedDouble className="w-4 h-4" />
              <span className="text-sm">{property.bedroom} Beds</span>
            </div>
          )}
          {property.bathroom && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{property.bathroom} Baths</span>
            </div>
          )}
          {property.areaSize && (
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span className="text-sm">{property.areaSize} sqm</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-blue-600 text-xl font-bold">
              {formatPrice(property.price)}
              <span className="text-sm text-gray-500 font-normal">{property.priceAppend}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{property.listedBy.name}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FinestProperties = () => {
  const [activeTab, setActiveTab] = useState('Sale');
  const[properties, setProperties] = useState([]);

  useEffect(() => {

    const fetchProperties = async () => {
      const properties = await axios.get('/api/properties');
      try {
        setProperties(properties.data);
        
      } catch (error) {
        console.error('Error loading properties:', error);
      }
    };

    fetchProperties();
  }, [properties]);

  const filteredProperties = useMemo(() => {
    const purposeMap: Record<string, 'sell' | 'rent' | 'shortlet'> = {
        Sale: 'sell',
        Rental: 'rent',
        Shortlet: 'shortlet',
      };

    return properties.filter((property: Property) => {
      if (purposeMap[activeTab]) {
        return property.purpose === purposeMap[activeTab];
      }
      return property.propertyType.toLowerCase() === activeTab.toLowerCase();
    });
  }, [activeTab]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Finest Selection in Lagos<span className="text-blue-500">.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of premium properties in Lagos's most sought-after locations
          </p>
        </motion.div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-1 min-w-max px-4">
            {Object.entries(propertyIcons).map(([type, icon]) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === type
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {icon}
                <span>{type}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProperties.map((property: Property) => (
            <Link href={`/properties/${property.slug}`} key={property.id}>
              <PropertyCard property={property} />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FinestProperties;