"use client";

import { useState } from "react";
import { Search, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertyFormData {
    fullname: string;
    email: string;
    phone: string;
    title: string;
    purpose: string;
    state: string;
    locality: string;
    address: string;
    propertyType: string;
    subType: string;
    description: string;
    budget: number;
    bedroom: string;
    bathroom: string;
    toilet: string;
    areaSize: string;
    features: string[];
    amenities: string[];
}

const propertyRequests: PropertyFormData[] = [
    {
        fullname: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        title: "Luxury Apartment Request",
        purpose: "Buy",
        state: "Lagos",
        locality: "Victoria Island",
        address: "123 Palm Street",
        propertyType: "Apartment",
        subType: "Luxury",
        description: "Looking for a modern 3-bedroom luxury apartment.",
        budget: 50000000,
        bedroom: "3",
        bathroom: "2",
        toilet: "3",
        areaSize: "200 sqm",
        features: ["Balcony", "Parking"],
        amenities: ["Swimming Pool", "Gym"],
    },
];

export default function PropertyRequestsList() {
    const [search, setSearch] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<PropertyFormData | null>(null);

    const filteredRequests = propertyRequests.filter((request) =>
        request.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Property Requests</h2>
            <div className="flex items-center gap-2 mb-4">
                <Input
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <Button className="bg-green-600 text-white px-4 py-2 flex items-center gap-1">
                    <Search size={16} /> Search
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Full Name</th>
                            <th className="p-3 text-left">Budget</th>
                            <th className="p-3 text-left">Location</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="p-3">{request.title}</td>
                                <td className="p-3">{request.fullname}</td>
                                <td className="p-3">${request.budget.toLocaleString()}</td>
                                <td className="p-3">{request.state}, {request.locality}</td>
                                <td className="p-3">
                                    <Button
                                        className="bg-green-600 text-white px-3 py-1 flex items-center gap-1"
                                        onClick={() => setSelectedRequest(request)}
                                    >
                                        <Eye size={16} /> View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 max-w-2xl transform transition-all scale-95 hover:scale-100">
                        <div className="flex justify-between items-center mb-6 border-b pb-3">
                            <h3 className="text-2xl font-semibold text-blue-500">{selectedRequest.title}</h3>
                            <button onClick={() => setSelectedRequest(null)} className="text-gray-500 hover:text-gray-700 transition">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-3 text-gray-700">
                            <p><strong className="text-gray-900">Full Name:</strong> {selectedRequest.fullname}</p>
                            <p><strong className="text-gray-900">Email:</strong> {selectedRequest.email}</p>
                            <p><strong className="text-gray-900">Phone:</strong> {selectedRequest.phone}</p>
                            <p><strong className="text-gray-900">Budget:</strong> <span className="text-green-600 font-semibold">${selectedRequest.budget.toLocaleString()}</span></p>
                            <p><strong className="text-gray-900">Location:</strong> {selectedRequest.state}, {selectedRequest.locality}</p>
                            <p><strong className="text-gray-900">Description:</strong> {selectedRequest.description}</p>
                            <p><strong className="text-gray-900">Features:</strong> <span className="text-blue-600">{selectedRequest.features.join(", ")}</span></p>
                            <p><strong className="text-gray-900">Amenities:</strong> <span className="text-green-600">{selectedRequest.amenities.join(", ")}</span></p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setSelectedRequest(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
