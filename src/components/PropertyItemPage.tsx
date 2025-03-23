"use client";

import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Share2,
  Heart,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  BedDouble,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SimilarProperties from './SimilarProperties';


interface PropertyItemPageProps {
  property: any; // Replace with your property type
}

const PropertyItemPage: React.FC<PropertyItemPageProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.pictures.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.pictures.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white pt-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row md:justify-between gap-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-200 mb-4">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-100 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{`${property.locality}, ${property.state}`}</span>
                </div>
                <div className="text-sm">
                  Posted {format(new Date(property.createdAt), 'MMM dd, yyyy')}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-blue-200">
                  ₦{property.price.toLocaleString()}
                  {property.priceAppend && (
                    <span className="text-sm text-gray-200 font-normal">
                      {property.priceAppend}
                    </span>
                  )}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={property.listedBy.profile.avatar || '/placeholder-avatar.jpg'}
                  alt={property.listedBy.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{property.listedBy.name}</p>
                  <p className="text-sm text-gray-200  uppercase">{property.listedBy.profile.userType}</p>
                </div>
              </div>
              {/* <p>Member Since</p> */}
              {/* <p className="text-sm text-gray-500">Member since {format(new Date(property.listedBy.joinedAt), 'MMM yyyy')}</p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area (80%) */}
          <div className="lg:w-4/5">
            {/* Image Carousel */}
            <div className="relative aspect-video mb-8 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={property.pictures[currentImageIndex]}
                alt={`Property image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.pictures.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {property.bedroom && (
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-medium">{property.bedroom}</p>
                    </div>
                  </div>
                )}
                {property.bathroom && (
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-medium">{property.bathroom}</p>
                    </div>
                  </div>
                )}
                {property.areaSize && (
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Area Size</p>
                      <p className="font-medium">{property.areaSize} sqm</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-600">{property.description}</p>
              </div>
            </div>

            {/* Similar Properties */}
            <div className="mb-8">
                <SimilarProperties property={property} />
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">Contact {property.listedBy.name}</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                </div>
                <Input type="tel" placeholder="Your Phone Number" />
                <Textarea 
                  placeholder="I'm interested in this property. Please contact me."
                  rows={4}
                />
                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Agent
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar (20%) */}
          <div className="lg:w-1/5 space-y-6">
            {/* Sponsored Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Sponsored Listings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Map through sponsored properties */}
                <div>
                  <p>Listing Details</p>
                </div>
              </CardContent>
            </Card>

            {/* Top States */}
            <Card>
              <CardHeader>
                <CardTitle>Popular States</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'].map((state) => (
                    <div
                      key={state}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                      <span>{state}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* VTU Advertisement */}
            <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Buy Airtime & Data</h3>
                <p className="text-sm mb-4">Get instant airtime and data for all networks at the best prices!</p>
                <Button variant="secondary" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buy Now On Doublelink
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItemPage;