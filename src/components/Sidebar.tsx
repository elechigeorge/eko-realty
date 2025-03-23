"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUser,
  faCog,
  faTimes,
  faBars,
  faBook,
  faDashboard,
  faLineChart,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getCookie } from "cookies-next";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const userData = getCookie('user')
    if (userData) {
      setUser(JSON.parse(userData as string));
    }
  }, []);

  const menuItems = [
    { icon: faDashboard, text: "Dashboard", href: "/dashboard" },
    { icon: faBook, text: "My Listing", href: "/dashboard/listing" },
    { icon: faLineChart, text: "Analytics", href: "/dashboard/analytics" },
    { icon: faAdd, text: "Create New", href: "/dashboard/listing/create" },
    { icon: faHeart, text: "Property Requests", href: "/dashboard/requests" },
    { icon: faUser, text: "Profile", href: "/dashboard/profile" },
    
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-gradient-to-r from-blue-800 to-blue-700 text-white transition-all duration-500 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-blue-700 transition transition-all duration-500">
        {/* <h1 className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}>
         <FontAwesomeIcon icon={faHome} /> Eko Realty
        </h1> */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-blue-700 transition-colors px-4 py-2"
        >
          <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center p-4 hover:bg-blue-700 transition-colors"
              >
                <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
                <span
                  className={`ml-4 ${
                    isCollapsed ? "hidden" : "block"
                  } transition-opacity duration-300`}
                >
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-blue-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div
            className={`ml-4 ${
              isCollapsed ? "hidden" : "block"
            } transition-opacity duration-300`}
          >
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-blue-300">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;