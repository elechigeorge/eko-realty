"use client"

import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-blue-500 to-green-600 text-white py-20 text-center"
            >
                <div className="flex justify-center mb-4">
                    <ShieldCheck size={48} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-xl text-blue-100">Your privacy is important to us</p>
            </motion.div>

            {/* Policy Content */}
            <div className="max-w-4xl mx-auto py-10 px-6 bg-white rounded-lg shadow my-2">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-4 text-gray-700">At Eko Realty, we are committed to protecting your personal information and your right to privacy.</p>
                
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="mb-4 text-gray-700">We collect personal data such as your name, email, and phone number when you interact with our website.</p>
                
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4 text-gray-700">Your information helps us provide better services, including personalized property recommendations.</p>
                
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="mb-4 text-gray-700">We take appropriate security measures to protect your data from unauthorized access.</p>
                
                <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
                <p className="text-gray-700">If you have any questions about this policy, please contact us at info@ekorealty.com.</p>
            </div>
        </div>
    );
}
