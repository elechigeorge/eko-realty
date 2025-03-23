"use client";
import { useState, useEffect } from "react";
import { Search, Home, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";


const Hero = () => {
    const router = useRouter();
    const [searchType, setSearchType] = useState("sale");
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [location, setLocation] = useState("");
    const locations = ["Ikeja", "Lekki", "Abuja", "Port Harcourt", "Ibadan", "Enugu", "Owerri"];
    const [fadeIn, setFadeIn] = useState(true);
    const [propertyType, setPropertyType] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);


    const handleSearch = () => {
        const query = new URLSearchParams({
            type: searchType,
            location,
            propertyType,
            priceRange,
            bedroom,
        }).toString();

        router.push(`/properties?${query}`);
    };

    useEffect(() => {
        const locationInterval = setInterval(() => {
            setFadeIn(false);

            setTimeout(() => {
                setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % locations.length);
                setFadeIn(true);
            }, 500); // Transition duration
        }, 2000); // Change location every 2 seconds

        return () => clearInterval(locationInterval);
    }, []);

    const propertyTypes = [
        "Any Type",
        "Apartment",
        "House",
        "Villa",
        "Land",
        "Office",
        "Commercial",
    ];

    const priceRanges = [
        "Any Price",
        "₦100k - ₦500k",
        "₦500k - ₦1M",
        "₦1M - ₦5M",
        "₦5M - ₦10M",
        "₦10M+",
    ];

    const bedrooms = [
        "Any Beds",
        "Studio",
        "1",
        "2",
        "3",
        "4",
        "5+",
    ];

    return (
        <div className="relative h-full pt-20 md:pt-0 md:h-[80vh] min-h-[600px] w-full">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/home.jpeg')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
            </div>

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-5">
                {/* Hero Text */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-teal-400 bg-clip-text text-transparent animate-fade-in">
                        Explore Properties that Suits
                    </h1>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent mb-4 animate-fade-in">Your Lifestyle in <span
                        className={`text-blue-500 transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {locations[currentLocationIndex]}
                    </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Find homes, lands, exhibition centers, shortlets, and more in prime locations across Nigeria. Your perfect property is just a click away.
                    </p>
                </div>


                {/* Search Container */}
                <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto w-full">
                    {/* Search Type Toggles */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {["sale", "rent", "shortlet", "land"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setSearchType(type)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${searchType === type
                                    ? "bg-blue-500 text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Main Search Input */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter a location or property name..."
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                            <Search className="w-5 h-5" />
                            Search
                        </button>
                    </div>

                    {/* Advanced Search Options */}
                    <div className="mt-4">
                        <button
                            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}

                            className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm"
                        >
                            Advanced Search
                            <ChevronDown className={`w-4 h-4 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isAdvancedOpen && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <select
                                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                >
                                    {propertyTypes.map((type) => (
                                        <option key={type}>{type}</option>
                                    ))}
                                </select>

                                <select
                                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                >
                                    {priceRanges.map((range) => (
                                        <option key={range}>{range}</option>
                                    ))}
                                </select>

                                <select
                                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                    value={bedroom}
                                    onChange={(e) => setBedroom(e.target.value)}
                                >
                                    {bedrooms.map((bed) => (
                                        <option key={bed}>{bed}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {/* Popular Searches */}
                <div className="text-center mt-6">
                    <p className="text-gray-300 mb-2">Popular Searches:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {["Lekki", "Ikoyi", "Victoria Island", "Ajah"].map((location) => (
                            <button
                                key={location}
                                className="px-4 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-all"
                            >
                                {location}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;