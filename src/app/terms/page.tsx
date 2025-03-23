"use client"

import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsOfServicePage() {
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
                    <FileText size={48} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                <p className="text-xl text-blue-100">Understand the rules and policies governing our services</p>
            </motion.div>

            {/* Terms Content */}
            <div className="max-w-4xl mx-auto py-10 px-6 bg-white rounded-lg shadow my-2">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-4 text-gray-700">Welcome to Eko Realty. By using our services, you agree to these terms and conditions.</p>
                
                <h2 className="text-2xl font-bold mb-4">2. Use of Services</h2>
                <p className="mb-4 text-gray-700">You agree to use our website and services in compliance with applicable laws and regulations.</p>
                
                <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
                <p className="mb-4 text-gray-700">Users must provide accurate information and respect other users on the platform.</p>
                
                <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
                <p className="mb-4 text-gray-700">Eko Realty is not responsible for any damages resulting from the use of our services.</p>
                
                <h2 className="text-2xl font-bold mb-4">5. Changes to Terms</h2>
                <p className="text-gray-700">We may update these terms periodically, and users will be notified of significant changes.</p>
            </div>
        </div>
    );
}
