"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import {
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
  Loader2
} from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Slider
} from '@/components/ui/slider';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PropertyCard } from './PropertCard'; // We'll create this next

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
  propertyType: string;
}

interface Filters {
  search: string;
  purpose: string;
  priceRange: [number, number];
  bedrooms: string;
  propertyType: string;
  location: string;
}

// Loading component for Suspense fallback
const PropertyListingLoader = () => (
  <div className="min-h-screen flex justify-center items-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="text-gray-600">Loading properties...</p>
    </div>
  </div>
);

// Main content component separated to use hooks safely
const PropertyListingContent = () => {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    purpose: 'all',
    priceRange: [0, 1000000000],
    bedrooms: 'all',
    propertyType: 'all',
    location: 'all'
  });

  const itemsPerPage = 9;
  const propertyTypes = ['Apartment', 'House', 'Land', 'Commercial'];
  const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'];
  const bedroomOptions = ['1', '2', '3', '4', '5+'];

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties && filteredProperties.slice(startIndex, endIndex);

  const applyFilters = () => {
    let results = [...properties];

    if (filters.search) {
      results = results.filter(property =>
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.locality.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.purpose !== 'all') {
      results = results.filter(property => property.purpose === filters.purpose);
    }

    if (filters.propertyType !== 'all') {
      results = results.filter(property => property.propertyType === filters.propertyType);
    }

    if (filters.location !== 'all') {
      results = results.filter(property => property.state === filters.location);
    }

    if (filters.bedrooms !== 'all') {
      results = results.filter(property =>
        property.bedroom === parseInt(filters.bedrooms)
      );
    }

    results = results.filter(property =>
      property.price >= filters.priceRange[0] &&
      property.price <= filters.priceRange[1]
    );

    setFilteredProperties(results);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);

      const type = searchParams.get("type") || "";
      const location = searchParams.get("location") || "";
      const propertyType = searchParams.get("propertyType") || "";
      const priceRange = searchParams.get("priceRange") || "";
      const bedroom = searchParams.get("bedroom") || "";

      // API request with search filters
      let url = `/api/properties`;
      const queryParams = new URLSearchParams();

      if (type) queryParams.append("type", type);
      if (location) queryParams.append("location", location);
      if (propertyType && propertyType !== "") queryParams.append("propertyType", propertyType);
      if (priceRange && priceRange !== "") queryParams.append("priceRange", priceRange);
      if (bedroom && bedroom !== "") queryParams.append("bedroom", bedroom);

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }

      setLoading(false);
    };

    fetchProperties();
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-3 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search properties..."
              className="pl-10 w-full"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <SlidersHorizontal size={20} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Purpose</label>
                    <Select
                      value={filters.purpose}
                      onValueChange={(value) => setFilters({ ...filters, purpose: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                        <SelectItem value="sell">For Sale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <Slider
                      defaultValue={[0, 1000000000]}
                      max={1000000000}
                      step={1000000}
                      onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
                    /> 
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>₦{filters.priceRange[0].toLocaleString()}</span>
                      <span>₦{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Add more filter options */}
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex gap-1 border rounded-lg p-1">
              <Button
                variant={layout === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setLayout('grid')}
              >
                <LayoutGrid size={20} />
              </Button>
              <Button
                variant={layout === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setLayout('list')}
              >
                <List size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(filters).map(([key, value]) => {
            if (value !== 'all' && value !== '' && key !== 'priceRange') {
              return (
                <div
                  key={key}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <span>{`${key}: ${value}`}</span>
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => setFilters({ ...filters, [key]: 'all' })}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Property Grid/List */}
        <div className={`grid gap-6 ${layout === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
          }`}>
          {loading ? (
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
            ))
          ) : (
            currentProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                layout={layout}
              />
            ))
          )}
          {loading && !currentProperties.length && <p className="col-span-full text-center">Loading properties...</p>}
          {!loading && !currentProperties.length && <p className="col-span-full text-center">No properties found matching your criteria.</p>}
        </div>

        {/* Pagination */}
        {!loading && filteredProperties.length > 0 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component with Suspense boundary
const PropertyListingPage = () => {
  return (
    <Suspense fallback={<PropertyListingLoader />}>
      <PropertyListingContent />
    </Suspense>
  );
};

export default PropertyListingPage;