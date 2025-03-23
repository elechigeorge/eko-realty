"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "cookies-next";


// Add proper type for your user object
interface User {
  id: string;
  // ... other user properties
}

interface Profile {
  // ... your profile properties
}


export default function UserProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [userId, setUserId] = useState('');


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        // Get user from cookies
        const userCookie = getCookie("user");
        if (!userCookie) {
          throw new Error("User not authenticated");
        }

        // Parse and validate user data
        const user: User = JSON.parse(userCookie as string);
        setUserId(user.id);
        console.log(user);
        if (!user?.id) {
          throw new Error("Invalid user data");
        };

        

        // Fetch profile
        const response = await axios.get<Profile>(`/api/profile/${user.id}`);
        setProfile(response.data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


    fetchProfile();
  }, []);

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
  );

  if (error) return (
    <div>
      <h2>Error fetching profile</h2>
      <p>{error}</p>
    </div>
  )

  if (!profile) return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Update Your Profile
          <span className="text-blue-500">.</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Create your professional profile to get personalized property recommendations
          and connect with real estate professionals.
        </p>
        <div>
          <Link href={`/dashboard/profile/${userId}`} className="bg-gradient-to-r from-blue-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Create Profile
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-green-600 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                <img
                  src={profile.avatar || '/image2.jpeg'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-lg opacity-90">{profile.position} at {profile.company}</p>
              </div>
            </div>
          </div>

          {/* Profile Body */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Personal Info Section */}
            <div className="space-y-6">
              <Section title="Personal Information">
                <InfoItem label="Email" value={profile.email} />
                <InfoItem label="Phone" value={profile.phone} />
                <InfoItem label="Address" value={profile.address} />
              </Section>

              <Section title="Professional Details">
                <InfoItem label="Company" value={profile.company} />
                <InfoItem label="Position" value={profile.position} />
                <InfoItem label="User Type" value={profile.userType} />
              </Section>
            </div>

            {/* Preferences Section */}
            <div className="space-y-6">
              <Section title="Preferences">
                <InfoItem
                  label="Investment Range"
                  value={profile.investmentRange || "Not specified"}
                />
                <InfoItem
                  label="Property Preferences"
                  value={profile.propertyPreferences || "None"}
                />
                <InfoItem
                  label="Location Preferences"
                  value={profile.locationPreferences || "Anywhere"}
                />
              </Section>

              <Section title="About">
                <p className="text-gray-600 leading-relaxed">
                  {profile.bio || "No bio provided"}
                </p>
              </Section>
            </div>
          </div>

          {/* Action Footer */}
          <div className="border-t p-6 bg-gray-50">
            <div className="flex justify-end gap-4">
              <Link href={`/dashboard/profile/${profile.userId}`} className="bg-gradient-to-r from-blue-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b pb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800 text-right max-w-[60%] text-wrap">
      {value || "N/A"}
    </span>
  </div>
);