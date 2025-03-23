"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

import AdCard from "@/components/Ad";
import StatsCards from "@/components/StatCard";
import { getCookie } from "cookies-next";

// Register Chart.js components
Chart.register(...registerables);

const DashboardPage = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // Store the chart instance
  const [user, setUser] = useState<any>(null);


  useEffect(() => {
    const userData = getCookie('user');
    
    const user = JSON.parse(userData);
    if (user) {
      setUser(user);
    }

    console.log(user);
  }, []);


  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Destroy existing chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Listings",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: "rgba(59, 130, 246, 1)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 2,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    // Cleanup on component unmount or ref changes
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="">
      <div className="my-2">
        <h2 className="text-2xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent">
          Hello, {user?.name}
        </h2>
      </div>
      {/* Stats */}
      <StatsCards />

      {/* Listing Graph Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg my-5">
        <div className="my-2">
          <h2 className="text-2xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent">
            Listing
          </h2>
        </div>
        <div className="h-96">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Ads Section */}
      <AdCard />
    </div>
  );
};

export default DashboardPage;
