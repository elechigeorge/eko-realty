"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  MapPin,
  BedDouble,
  Bath,
  Square,
} from "lucide-react";
import Link from "next/link";
import propertyData from "../utils/properties.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const PropertyCard = ({ property }: { property: any }) => {
  const formatPrice = (price: any) => {
    if (isNaN(price)) return "Price on Request";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
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
          {property.purpose === "sell"
            ? "For Sale"
            : property.purpose === "rent"
            ? "For Rent"
            : property.purpose.charAt(0).toUpperCase() + property.purpose.slice(1)}
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
              <span className="text-sm text-gray-500 font-normal">
                {property.priceAppend}
              </span>
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

const FeaturedListing = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-300 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Discover Our Featured Listings<span className="text-green-600">.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Explore our curated selection of premium properties in Lagos's most
            sought-after locations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {propertyData.properties.map((property) => (
            <Link href={`/properties/${property.slug}`} key={property.id}>
              <PropertyCard property={property} />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedListing;

