"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Guide", href: "/guide" },
    { name: "Properties", href: "/properties" },
    { name: "Property Request", href: "/propertyrequest" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 
              className={`text-3xl font-bold tracking-tighter ${
                isScrolled 
                  ? "bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent hover:opacity-80"
                  : "text-white hover:text-gray-200"
              } transition-all duration-300`}
            >
              Eko Realty
            </h1>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:opacity-75 focus:outline-none`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-gray-200"
                } ${
                  pathname === item.href ? "border-b-2 border-current" : ""
                } text-lg tracking-wide hover:scale-105 transform`}
              >
                {item.name}
              </Link>
            ))}
            <Link href={`/auth`} className="bg-green-600 flex px-4 py-2 rounded-lg text-gray-100 hover:bg-blue-500 transition transition-all duration-500 space-x-2"><span>Login</span><LogIn /></Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className={`pt-2 pb-3 space-y-1 ${
            isScrolled ? "bg-white" : "bg-black bg-opacity-50"
          }`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    : "text-white hover:text-gray-200 hover:bg-black hover:bg-opacity-50"
                } ${
                  pathname === item.href ? "border-l-4 border-current" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;