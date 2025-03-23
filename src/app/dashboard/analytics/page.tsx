import React from "react";
import { BarChart, PieChart } from "lucide-react";

const AnalyticsPage: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <header className="mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent">
                    Analytics
                </h2>
                <p className="text-gray-600">Get insights into your data and performance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
                        <BarChart className="text-indigo-600 w-6 h-6" />
                    </div>
                    <p className="mt-2 text-gray-600">Track your sales performance over time.</p>
                    <div className="mt-4">
                        <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Bar Chart Placeholder</span>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">Customer Demographics</h2>
                        <PieChart className="text-purple-600 w-6 h-6" />
                    </div>
                    <p className="mt-2 text-gray-600">Understand your customer base better.</p>
                    <div className="mt-4">
                        <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Pie Chart Placeholder</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;