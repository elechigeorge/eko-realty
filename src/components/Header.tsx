"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faPlusCircle,
  faBars,
  faUser,
  faCog,
  faCreditCard,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    deleteCookie("user");
    router.push("/auth");
  };

  return (
    <header
      className={`flex items-center justify-between p-4 bg-white shadow-md ${
        isSticky ? "sticky top-0 right-0 z-20 animate-slideDown" : "relative"
      }`}
    >
      {/* Site Name */}
      <div className="flex items-center">
        <button className="lg:hidden p-2 mr-4 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
        </button>
        <div className="my-2">
          <h2 className="text-2xl font-bold bg-gradient-to-b from-blue-100 to-blue-500 bg-clip-text text-transparent">
            Eko Realty
          </h2>
        </div>
      </div>

      {/* Icons on the Right */}
      <div className="flex items-center space-x-4">
        <Link
          href={`/dashboard/listing/create`}
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-gray-100 hover:text-gray-50 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="w-5 h-5" /> New Property
        </Link>
        
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
        </button>
        
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-700">JD</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                href="/dashboard/listing/create"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faCog} className="w-4 h-4 mr-2" />
                Create New
              </Link>
              
              <Link
                href="/dashboard/subscription"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 mr-2" />
                Subscription
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;