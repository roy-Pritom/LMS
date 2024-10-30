"use client";

import React from "react";
import { Card } from "antd";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import "tailwindcss/tailwind.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Data for Pie and Bar charts
const pieData = {
  labels: ["Completed", "Pending", "Ongoing"],
  datasets: [
    {
      label: "Course Status",
      data: [12, 5, 7],
      backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      hoverBackgroundColor: ["#66bb6a", "#ffb74d", "#e57373"],
    },
  ],
};

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Sessions",
      data: [30, 20, 25, 35, 40],
      backgroundColor: "#1890ff",
    },
  ],
};

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome To Dashboard</h1>

      {/* Grid layout for the cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card className="shadow-md rounded-lg" title="Total Courses" bordered>
          <p className="text-3xl font-bold text-blue-500">20</p>
        </Card>
        <Card className="shadow-md rounded-lg" title="Active Courses" bordered>
          <p className="text-3xl font-bold text-green-500">15</p>
        </Card>
        <Card className="shadow-md rounded-lg" title="Total Sessions" bordered>
          <p className="text-3xl font-bold text-purple-500">50</p>
        </Card>
        <Card className="shadow-md rounded-lg" title="Upcoming Sessions" bordered>
          <p className="text-3xl font-bold text-orange-500">10</p>
        </Card>
      </div>

      {/* Grid layout for charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="shadow-md rounded-lg" title="Course Distribution">
            <div className="w-96 h-96 mx-auto">
          <Pie data={pieData} />

            </div>
        </Card>
        <Card className="shadow-md rounded-lg" title="Monthly Sessions">
          <Bar data={barData} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
