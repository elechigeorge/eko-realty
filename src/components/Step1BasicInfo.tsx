"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faHouse, faMapMarkedAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import statesData from '../utils/stateandlocalities.json';
import propertyData from '../utils/propertytypes.json';
import { useEffect, useState } from "react";

const Step1BasicInfo = ({ formData, onChange, onNext }: any) => {
    const [localities, setLocalities] = useState<string[]>([]);
    const [subTypes, setSubTypes] = useState<string[]>([]);

    // Update localities when state changes
    useEffect(() => {
        const selectedState = statesData.statesAndLocalities.find(
            (item) => item.state === formData.state
        );
        setLocalities(selectedState ? selectedState.localities : []);
    }, [formData.state]);

    // Update Sub Property Types when state changes
    useEffect(() => {
        const selectedTypes = propertyData.propertyType.find(
            (item) => item.propertyType === formData.propertyType
        );
        setSubTypes(selectedTypes ? selectedTypes.subType : []);
    }, [formData.propertyType]);

    return (
        <div className="space-y-6">
            {/* Title */}
            <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faBuilding} className="text-blue-500 w-6 h-6" />
                <input
                    type="text"
                    name="title"
                    placeholder="Property Title"
                    value={formData.title}
                    onChange={(e) => onChange("title", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Purpose */}
            <div>
                <h3 className="font-bold text-gray-700">Purpose</h3>
                <div className="flex items-center space-x-4">
                    {["sell", "rent", "shortlet"].map((purpose) => (
                        <label
                            key={purpose}
                            className={`px-4 py-2 border rounded-lg cursor-pointer ${formData.purpose === purpose
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            <input
                                type="radio"
                                name="purpose"
                                value={purpose}
                                checked={formData.purpose === purpose}
                                onChange={(e) => onChange("purpose", e.target.value)}
                                className="hidden"
                            />
                            {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
                        </label>
                    ))}
                </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
                <h3 className="font-bold text-gray-700">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <div className="flex justify-center items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="text-green-500 w-6 h-6"
                        />
                        <select
                            name="state"
                            value={formData.state}
                            onChange={(e) => onChange("state", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select State</option>
                            {statesData.statesAndLocalities.map((stateData) => (
                                <option key={stateData.state} value={stateData.state}>
                                    {stateData.state}
                                </option>
                            ))}

                            {/* Add more states */}
                        </select>
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faMapMarkedAlt}
                            className="text-green-500 w-6 h-6"
                        />
                        <select
                            name="locality"
                            value={formData.locality}
                            onChange={(e) => onChange("locality", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={!localities.length} // Disable if no localities
                        >
                             {localities.map((locality) => (
                                <option key={locality} value={locality}>
                                    {locality}
                                </option>
                            ))}
                            {/* Add more states */}
                        </select>
                    </div>
                </div>

                <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={(e) => onChange("address", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Property Type */}
            <div>
                <h3 className="font-bold text-gray-700">Property Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <div className="flex justify-center items-center space-x-2">
                        <FontAwesomeIcon icon={faHouse} className="text-blue-500 w-6 h-6"/>
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={(e) => onChange("propertyType", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Property Type</option>
                            {propertyData.propertyType.map((propertyData) => (
                                <option key={propertyData.propertyType} value={propertyData.propertyType}>
                                    {propertyData.propertyType}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                        <FontAwesomeIcon icon={faHouse} className="text-blue-500 w-6 h-6"/>
                        <select
                            name="subType"
                            value={formData.subType}
                            onChange={(e) => onChange("subType", e.target.value)}
                            disabled={!subTypes.length} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Property Sub-Type</option>
                            {subTypes.map((subType) => (
                                <option key={subType} value={subType}>
                                    {subType}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            {/* Next Button */}
            <button
                onClick={onNext}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                Next
            </button>
        </div>
    );
};

export default Step1BasicInfo;
