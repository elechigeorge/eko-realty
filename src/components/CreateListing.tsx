"use client";

import { useState } from "react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2Details from "./Step2Details";
import Step3Media from "./Step3Media";
import PopupAlert from "./PopupAlert";
import axios from 'axios';

const ProgressForm = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        purpose: "sell",
        state: "",
        locality: "",
        address: "",
        propertyType: "",
        subType: "",
        pictures: [],
        videoLink: "",
        description: "",
        price: 0,
        denomination: "",
        acceptInstallment: false,
        initialDeposit: "",
        monthlyInstallment: "",
        duration: "",
        priceAppend: "",
        bedroom: "",
        bathroom: "",
        toilet: "",
        areaSize: "",
        features: [], // Array for features like "Serviced"
        amenities: [], // Array for selected amenities
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleNext = () => setCurrentStep((prev) => prev + 1);
    const handleBack = () => setCurrentStep((prev) => prev - 1);

    const handleInputChange = (name: string, value: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (files: any) => {
        setFormData({ ...formData, pictures: files });
      };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const user = JSON.parse(String(localStorage.getItem("user"))); // Assume token is stored in localStorage
            const token = user.token;

            const response = await axios.post("/api/properties", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data) {
                const { statusText, data } = await response.data.response;

                throw new Error(statusText.includes('TokenExpiredError') ? "Session expired..." : data.error || "Failed to create property.");
            }

            const data = await response.data;
            console.log("Property created successfully:", data);
            setIsSuccess(true);
        } catch (err: any) {
            console.error(err);
            setError(err.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg mx-auto space-y-6">

            {currentStep === 1 && (
                <Step1BasicInfo
                    formData={formData}
                    onChange={handleInputChange}
                    onNext={handleNext}
                />
            )}
            {currentStep === 2 && (
                <Step2Details
                    formData={formData}
                    onChange={handleInputChange}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
            {currentStep === 3 && (
                <Step3Media
                    formData={formData}
                    onChange={handleInputChange}
                    onImageChange={handleImageChange}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            )}
            {error && <PopupAlert message={error} type="error" onClose={() => setError('')} />}
            {isSuccess && <PopupAlert message={`Listing Created..`} type="success" onClose={() => setIsSuccess(false)} />}
        </div>
    );
};

export default ProgressForm;
