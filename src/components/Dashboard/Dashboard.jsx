import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Users" value="1,024" color="bg-blue-500" />
        <Link to="/resource">
        <Card title="Resources" value="512" color="bg-green-500" />
        </Link>
        <Card title="Status" value="12,340" color="bg-yellow-500" />
        <Link to="/employees">
        <Card title="Employee List" value="89" color="bg-red-500" />
      </Link>
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          {/* Placeholder for charts */}
          Chart coming soon...
        </div>
      </section>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-4 rounded-lg shadow-md text-white ${color}`}>
    <h3 className="text-sm uppercase">{title}</h3>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default Dashboard;
