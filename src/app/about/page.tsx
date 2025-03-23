"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { Building, Handshake, MapPin, Star, Phone } from "lucide-react";

const teamMembers = [
    { name: "Sarah Johnson", role: "CEO & Founder", photo: "/userone.jpg" },
    { name: "Michael Chen", role: "Lead Agent", photo: "/usertwo.jpg" },
    { name: "Emma Wilson", role: "Property Manager", photo: "/userthree.jpg" },
];

const values = [
    { icon: Handshake, title: "Integrity", description: "Honest transactions built on trust" },
    { icon: MapPin, title: "Local Expertise", description: "Deep knowledge of the Eko market" },
    { icon: Star, title: "Excellence", description: "Unmatched service quality standards" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-96 flex items-center justify-center"
            >
                <div className="absolute inset-0">
                    <Image
                        src="/image2.jpeg"
                        alt="Eko Realty Team"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <Building className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">About Eko Realty</h1>
                    <p className="text-xl md:text-2xl">Pioneering Real Estate Excellence Since 2012</p>
                </div>
            </motion.section>

            {/* Our Story */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-96"
                    >
                        <Image
                            src="/image2.jpeg"
                            alt="Our Office"
                            fill
                            className="object-cover rounded-lg shadow-xl"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            Founded in the heart of Lagos, Eko Realty has grown from a small local agency
                            to one of Nigeria's most trusted real estate partners. Our journey has been
                            fueled by a passion for connecting people with spaces that inspire.
                        </p>
                        <p className="text-lg text-gray-600">
                            Over the past decade, we've facilitated over 5,000 successful transactions,
                            helping families find dream homes and investors discover prime properties.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-blue-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-8 rounded-xl shadow-lg text-center"
                            >
                                <value.icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-xl"
                            >
                                <Image
                                    src={member.photo}
                                    alt={member.name}
                                    width={400}
                                    height={500}
                                    className="h-96 object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                        <p className="text-blue-200">{member.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 text-center text-white">
                <div className="absolute inset-0">
                    <Image
                        src="/ad.png"
                        alt="Contact us"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-600/90" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-2xl mx-auto px-4"
                >
                    <Phone className="h-12 w-12 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
                    <p className="text-xl mb-8">Let's start your journey with Eko Realty today</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition"
                    >
                        Schedule Consultation
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
}