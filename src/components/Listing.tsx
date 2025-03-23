"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

interface PropertyType {
  id: string;
  title: string;
  status: string;
  price: string;
  address: string;
  locality: string;
  state: string;
  slug: string;
  createdAt: string;
  leads?: number;
  views: number;
  pictures: string[];
  active?: boolean;
  activeMessage?: string;
}

const ListingsPage = () => {
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [properties, setProperties] = useState<{
    active: PropertyType[];
    inactive: PropertyType[];
  }>({
    active: [],
    inactive: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Get user data from cookie
        const userCookie = getCookie("user");
        
        if (!userCookie) {
          throw new Error("User not authenticated");
        }
        
        // Parse the user cookie to get the user ID
        const userData = JSON.parse(decodeURIComponent(userCookie as string));
        const userId = userData.id;
        
        if (!userId) {
          throw new Error("User ID not found");
        }

        // Fetch properties from the API
        const response = await axios.get(`/api/properties/me/${userId}`);
        
        // Process the fetched properties
        const fetchedProperties = response.data;
        
        // Separate active and inactive properties
        const activeProperties = fetchedProperties.filter((prop: PropertyType) => 
          prop.active === true || prop.status === "sold" || prop.status === "for sale" || prop.status === "for rent"
        );
        
        const inactiveProperties = fetchedProperties.filter((prop: PropertyType) => 
          prop.active === false || prop.status === "inactive"
        );

        setProperties({
          active: activeProperties,
          inactive: inactiveProperties
        });
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Format date string from ISO to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) + ":" + date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Generate PID from slug
  const generatePID = (slug: string) => {
    return slug.substring(0, 5).toUpperCase();
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-6 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("active")}
          className={`pb-2 font-semibold text-lg ${
            activeTab === "active"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          } transition-colors duration-300`}
        >
          Active Listings ({properties.active.length})
        </button>
        <button
          onClick={() => setActiveTab("inactive")}
          className={`pb-2 font-semibold text-lg ${
            activeTab === "inactive"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          } transition-colors duration-300`}
        >
          Inactive Listings ({properties.inactive.length})
        </button>
      </div>

      {/* Listing Cards */}
      {properties[activeTab].length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">
            {activeTab === "active" 
              ? "You don't have any active listings yet." 
              : "You don't have any inactive listings."}
          </p>
          {activeTab === "active" && (
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
              Create New Listing
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {properties[activeTab].map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={property.pictures[0] || "/home.jpeg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Status */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 truncate">
                    {property.title}
                  </h2>
                  <span
                    className={`text-sm font-semibold px-4 py-2 rounded-sm ${
                      property.status === "sold"
                        ? "text-green-600 bg-green-100"
                        : property.status === "for sale" || property.status === "for rent"
                          ? "text-blue-600 bg-blue-100"
                          : "text-red-600 bg-red-100"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>

                {/* Address */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {property.address || `${property.locality}, ${property.state}`}
                </p>

                {/* Price */}
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ₦ {property.price}
                </p>

                {/* PID and Added Date */}
                <div className="text-sm text-gray-500 mb-4">
                  <p>
                    <span className="font-semibold">PID:</span> {generatePID(property.slug)}
                  </p>
                  <p>
                    <span className="font-semibold">Added:</span> {formatDate(property.createdAt)}
                  </p>
                </div>

                {/* Leads and Views */}
                <div className="flex space-x-6 text-sm text-gray-500 mb-4">
                  <p>
                    <span className="font-semibold">Leads:</span> {property.leads || 0}
                  </p>
                  <p>
                    <span className="font-semibold">Views:</span> {property.views || 0}
                  </p>
                </div>

                {/* Call-to-Action for Active Listings */}
                {activeTab === "active" && (
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                    Get 20 times more clients on this property
                  </button>
                )}

                {/* Note for Inactive Listings */}
                {activeTab === "inactive" && property.activeMessage && (
                  <p className="text-sm text-red-500 mt-4">{property.activeMessage}</p>
                )}
                
                {activeTab === "inactive" && !property.activeMessage && (
                  <p className="text-sm text-red-500 mt-4">
                    This property is not visible on the website because it has been marked as inactive.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;