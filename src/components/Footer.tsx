import React from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Bell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-5 md:px-10 lg:px-10">
      {/* Newsletter Signup */}
      <div className="mb-12 ">
        <h3 className="text-3xl font-semibold mb-4 text-center md:text-left">Sign Up for Our Newsletter</h3>
        <p className="text-gray-400 mb-6 text-center md:text-left">
           Stay updated with the latest property listings, market trends, and exclusive offers.
        </p>
        <form className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="flex space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all">
            <span>Subscribe</span><Bell className="" /> 
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Property Types */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Property Types</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Residential Properties</li>
            <li>Commercial Properties</li>
            <li>Luxury Homes</li>
            <li>Rental Apartments</li>
            <li>Land for Sale</li>
          </ul>
        </div>

        {/* Top States */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Top States</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Lagos</li>
            <li>Abuja</li>
            <li>Port Harcourt</li>
            <li>Kano</li>
            <li>Ibadan</li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>123 Eko Realty Avenue, Lagos, Nigeria</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-500" />
              <span>+234 812 345 6789</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <span>info@ekorealty.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Links */}
        <div className="flex gap-4">
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-500 transition-all"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-500 transition-all"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-500 transition-all"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-500 transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright Section */}
        <p className="text-gray-400 mt-6 md:mt-0 text-center md:text-right">
          © {new Date().getFullYear()} Eko Realty. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
