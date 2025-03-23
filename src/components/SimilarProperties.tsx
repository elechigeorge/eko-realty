"use client"

import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertCard';
import { Loader2 } from 'lucide-react';

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

function SimilarProperties({ property }: { property: Property }) {
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties/similar/${property.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch similar properties');
        }
        
        const data = await response.json();
        setSimilarProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching similar properties:', err);
      } finally {
        setLoading(false);
      }
    };

    if (property?.id) {
      fetchSimilarProperties();
    }
  }, [property?.id]);

  if (loading) {
    return (
      <div className="py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Similar Properties</h2>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Similar Properties</h2>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Unable to load similar properties
        </div>
      </div>
    );
  }

  if (similarProperties.length === 0) {
    return (
      <div className="py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Similar Properties</h2>
        <div className="bg-gray-50 p-4 rounded-lg text-gray-600 text-center">
          No similar properties found
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Similar Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map((prop) => (
          <PropertyCard 
            key={prop.id} 
            property={prop} 
            layout="grid" 
          />
        ))}
      </div>
    </div>
  );
}

export default SimilarProperties;