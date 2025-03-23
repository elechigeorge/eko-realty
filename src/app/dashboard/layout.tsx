"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Assuming you're using react-router
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { deleteCookie, getCookie } from "cookies-next";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useRouter();

  useEffect(() => {
    const user = getCookie('user');

    if (!user) {
      // If there's no user, log the user out
      handleLogout();
      return;
    }
    
  }, [navigate]);

  const handleLogout = () => {
    deleteCookie("user");
     navigate.push("/auth"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
