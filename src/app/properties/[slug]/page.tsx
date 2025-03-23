'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navigation';
import PropertyItemPage from '@/components/PropertyItemPage';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { AlertTriangle, Loader2 } from 'lucide-react';
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

interface PropertyPageProps {
  params: {
    slug: string;
  };
}

export default function PropertyItem({ params }: PropertyPageProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        // Fetch from your API endpoint
        const response = await axios.get(`/api/properties`);
        const foundProperty = response.data.find(
          (prop: Property) => prop.slug === params.slug
        );
        
        if (foundProperty) {
          setProperty(foundProperty);
          
          // Update view count
          try {
            await axios.post(`/api/properties/view/${foundProperty.id}`);
          } catch (viewError) {
            console.error('Error updating view count:', viewError);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-blue-100 to-white">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-blue-100 to-blue-500 text-gray-700">
          <AlertTriangle className="w-16 h-16 text-red-500" />
          <h1 className="text-2xl font-semibold mt-4">{`Property Not Found, or Has been removed!`}</h1>
          <p className="text-gray-100 mt-2">
            Please check your input or return to the home page.
          </p>
          <Link
            href={`/properties`}
            className="mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-all"
          >
            Go to Home
          </Link>
        </div>
        <CallToAction />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PropertyItemPage property={property} />
      <CallToAction />
      <Footer />
    </>
  );
}