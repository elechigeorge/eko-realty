"use client"

import { Mail, Phone, MapPin, Send, Building } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-blue-500 to-green-600 text-white py-20 text-center"
            >
                <Building className="h-12 w-12 mx-auto mb-4" />
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Eko Realty</h1>
                <p className="text-xl text-blue-100">We're here to help you find your dream property</p>
            </motion.div>

            {/* Contact Info */}
            <div className="max-w-4xl mx-auto py-10 px-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                            <Mail className="text-blue-600" />
                            <span>info@ekorealty.com</span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                            <Phone className="text-blue-600" />
                            <span>+234 123 456 7890</span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                            <MapPin className="text-blue-600" />
                            <span>123 Eko Avenue, Lagos, Nigeria</span>
                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        <Image src="/image2.jpeg" alt="Contact us" width={500} height={50} className="rounded-lg shadow" />
                    </motion.div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Get In Touch</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
                    <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg h-32"></textarea>
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
                    >
                        <Send />
                        <span>Send Message</span>
                    </motion.button>
                </form>
            </div>
        </div>
    );
}
