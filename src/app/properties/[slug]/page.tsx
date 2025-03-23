import Navbar from '@/components/Navigation';
import PropertyItemPage from '@/components/PropertyItemPage';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import properties from '@/utils/properties.json';
import { AlertTriangle } from 'lucide-react';
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

export async function generateStaticParams() {
    // Generate paths for all properties (optional for static generation)
    const properties = await axios.get(`http://localhost:3000/api/properties`);
    return (properties.data as Property[]).map((property) => ({
        slug: property.slug,
    }));
}

export default async function PropertyItem({ params }: PropertyPageProps) {
    const properties = await axios.get(`http://localhost:3000/api/properties`);
    const property = (properties.data as Property[]).find(
        (prop) => prop.slug === params.slug
    );

    if (!property) {
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
        )
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
