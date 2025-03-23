import React from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  MapPin,
  BedDouble,
  Bath,
  Square,
} from 'lucide-react';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  price: number;
  priceAppend?: string;
  purpose: 'rent' | 'sell';
  bedroom?: number;
  bathroom?: number;
  areaSize?: number;
  locality: string;
  state: string;
  pictures: string[];
  views: number;
  listedBy: {
    name: string;
  };
}

interface PropertyCardProps {
  property: Property;
  layout: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, layout }) => {
  const formatPrice = (price: number) => {
    if (isNaN(price)) return "Price on Request";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative aspect-[4/3] md:aspect-auto overflow-hidden group">
            <img
              src={property.pictures[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.purpose === "sell" ? "For Sale" : "For Rent"}
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <Link href={`/properties/${property.title.split(' ').join('-').toLowerCase()}`} className="text-xl font-semibold text-gray-800">
                {property.title}
              </Link>
              <div className="flex items-center gap-1 text-gray-600">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{property.views}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{`${property.locality}, ${property.state}`}</span>
            </div>

            <div className="flex gap-6 mb-4 text-gray-700">
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
                <p className="text-sm text-gray-600">{property.listedBy ? property.listedBy.name : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid Layout
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden group">
        <img
          src={property.pictures[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {property.purpose === "sell" ? "For Sale" : "For Rent"}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Link href={`/properties/${property.title.split(' ').join('-').toLowerCase()}`} className="text-xl font-semibold text-gray-800 line-clamp-1">
            {property.title}
          </Link>
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
          <p className="text-sm text-gray-600">{property.listedBy ? property.listedBy.name : ''}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;