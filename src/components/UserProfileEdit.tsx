"use client"

import React, { useState, useRef } from 'react';
import { Loader2, ArrowRight } from "lucide-react";
import { Camera, ArrowLeft, Building, Upload, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import PopupAlert from './PopupAlert';

const STEPS = ['Basic Information', 'Profile Details', 'Real Estate Preferences'];

const referralSources = [
  'Google Search',
  'Social Media',
  'Friend/Family',
  'Real Estate Agent',
  'Advertisement',
  'Other'
];

const userTypes = [
  { value: 'agent', label: 'Real Estate Agent' },
  { value: 'agency', label: 'Real Estate Agency' },
  { value: 'developer', label: 'Property Developer' },
  { value: 'user', label: 'Home Buyer/Renter' }
];

const platformPurposes = [
  { value: 'buying', label: 'Looking to Buy Property' },
  { value: 'selling', label: 'Want to Sell Property' },
  { value: 'renting', label: 'Seeking Rental Properties' },
  { value: 'investing', label: 'Real Estate Investment' },
  { value: 'market_research', label: 'Market Research' }
];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Profile Details
    avatar: null as File | null,
    bio: '',
    address: '',
    company: '',
    position: '',

    // Preferences
    userType: '',
    referralSource: '',
    platformPurpose: '',
    investmentRange: '',
    propertyPreferences: '',
    locationPreferences: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // Final form submission logic
    setLoading(true);
    setError("");

    try {
      const user = JSON.parse(String(localStorage.getItem("user"))); // Get user token
      const token = user?.token;
      if (!token) throw new Error("User is not authenticated.");



      const response = await axios.put(`/api/profile/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        const { statusText, data } = response.data.response;
        throw new Error(
          statusText.includes("TokenExpiredError")
            ? "Session expired..."
            : data.error || "Failed to update profile."
        );
      }

      console.log("Profile updated successfully:", response.data);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {STEPS.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}>
              {index + 1}
            </div>
            {index < STEPS.length - 1 && (
              <div className={`h-1 w-24 ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between px-2">
        {STEPS.map((step) => (
          <span key={step} className="text-sm text-gray-600">
            {step}
          </span>
        ))}
      </div>
    </div>
  );

  const renderBasicInformation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );

  const renderProfileDetails = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="block mb-4">Profile Picture</Label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Upload Photo
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about yourself..."
          className="h-32"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company (if applicable)</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>I am a</Label>
        <RadioGroup
          onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
          className="grid grid-cols-2 gap-4"
        >
          {userTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>How did you find us?</Label>
        <Select
          onValueChange={(value) => setFormData(prev => ({ ...prev, referralSource: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            {referralSources.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Primary purpose for using our platform</Label>
        <Select
          onValueChange={(value) => setFormData(prev => ({ ...prev, platformPurpose: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            {platformPurposes.map((purpose) => (
              <SelectItem key={purpose.value} value={purpose.value}>
                {purpose.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="investmentRange">Investment Range</Label>
        <Select
          onValueChange={(value) => setFormData(prev => ({ ...prev, investmentRange: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-250k">$0 - $250,000</SelectItem>
            <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
            <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
            <SelectItem value="1m+">$1,000,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyPreferences">Property Preferences</Label>
        <Textarea
          id="propertyPreferences"
          name="propertyPreferences"
          value={formData.propertyPreferences}
          onChange={handleInputChange}
          placeholder="What type of properties are you interested in? (e.g., apartments, houses, commercial)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="locationPreferences">Preferred Locations</Label>
        <Textarea
          id="locationPreferences"
          name="locationPreferences"
          value={formData.locationPreferences}
          onChange={handleInputChange}
          placeholder="Which areas are you interested in?"
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInformation();
      case 1:
        return renderProfileDetails();
      case 2:
        return renderPreferences();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-600">
              Welcome, Lets get you started..
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderProgressBar()}
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderCurrentStep()}

              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={loading} // Disable button when loading
                  className={`flex items-center gap-2 ${currentStep === STEPS.length - 1 ? 'bg-green-600' : 'bg-blue-500'
                    } text-white ml-auto ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : currentStep === STEPS.length - 1 ? (
                    'Complete Setup'
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {isSuccess && <PopupAlert message='Profile Updated Success' type='success' onClose={() => setIsSuccess(false)} />}
      {error && <PopupAlert message={error} type='error' onClose={() => setError("")} />}
    </div>
  );
};

export default OnboardingWizard;