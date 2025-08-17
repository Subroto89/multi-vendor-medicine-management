import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../components/shared/DataNotFound"; // Keep if you use it elsewhere
import { TabTitle } from "../../../utilities/utilities";
import { useTheme } from "../../../context/ThemeContext";

// Recharts Imports
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const AdminDashboardHome = () => {
  TabTitle("Admin-Home");

  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch website-wide sales summary data (Paid Total, Pending Total)
  const {
    data: salesSummary = { paidTotal: 0, pendingTotal: 0 },
    isLoading: isLoadingSales,
    error: salesError,
    refetch: refetchSales,
  } = useQuery({
    queryKey: ["adminSalesSummary"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/sales-summary");
      return data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  // NEW: Fetch sales distribution by category
  const {
    data: categorySales = [],
    isLoading: isLoadingCategorySales,
    error: categorySalesError,
    refetch: refetchCategorySales,
  } = useQuery({
    queryKey: ["adminCategorySales"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/sales-by-category");
      return data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoadingSales || isLoadingCategorySales) {
    return <LoadingSpinner />;
  }

  if (salesError || categorySalesError) {
    return (
      <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold mb-2">
          Error Loading Dashboard Data
        </h3>
        <p>We encountered an issue loading some data:</p>
        {salesError && (
          <p className="mt-1">Sales Summary: {salesError.message}</p>
        )}
        {categorySalesError && (
          <p className="mt-1">Category Sales: {categorySalesError.message}</p>
        )}
        <button
          onClick={() => {
            refetchSales();
            refetchCategorySales();
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Define colors for the pie chart segments
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d0ed57",
  ];

  // Function to render custom labels on the pie chart slices
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      className={`min-h-screen`}
    >
      <div className={`w-full min-h-screen mx-aut p-6 md:p-8 ${theme==="dark" ? "dark-bg" : "bg-secondary"}`}>
        <h1 className={`text-3xl font-bold mb-4 text-center mt-8 md:mt-0 ${theme==="dark" ? "var(--text-color)" : "text-gray-800"}`}>
          Admin Dashboard Overview
        </h1>
        <p className={`text-lg text-center mb-8 ${theme==="dark" ? "var(--text-color)" : "text-gray-600"}`}>
          Welcome,{" "}
          <span className={`font-semibold ${theme==="dark" ? "text-amber-500" : "text-blue-700"}`}>
            {user?.displayName || user?.email || "Admin"}!
          </span>{" "}
          Here's the overall website sales performance.
        </p>

        {/* --- Website Sales Revenue Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Card for Total Paid Revenue */}
          <div className={` p-6 rounded-lg shadow-md flex flex-col items-center justify-center ${theme==="dark" ? "category-card" : "bg-green-50 text-green-800"}`}>
            <h3 className="text-xl font-semibold mb-2">
              Total Paid Revenue (Website)
            </h3>
            <p className="text-4xl font-extrabold">
              ${salesSummary.paidTotal.toFixed(2)}
            </p>
            <p className="text-sm mt-2">
              All successfully paid sales across the platform
            </p>
          </div>
          {/* Card for Total Pending Revenue */}
          <div className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center  ${theme==="dark" ? "category-card" : "bg-orange-50 text-orange-800"}`}>
            <h3 className="text-xl font-semibold  mb-2">
              Total Pending Revenue (Website)
            </h3>
            <p className="text-4xl font-extrabold">
              ${salesSummary.pendingTotal.toFixed(2)}
            </p>
            <p className="text-sm mt-2">
              Cash on Delivery & unconfirmed payments across the platform
            </p>
          </div>
        </div>
        {/* --- End Website Sales Revenue Section --- */}

        {/* --- Sales Distribution by Category Pie Chart --- */}
        <div className={`${theme==="dark" ? "category-card" : "bg-blue-50 text-blue-800"} p-6 rounded-lg shadow-md flex flex-col items-center justify-center`}>
          <h3 className="text-xl md:text-2xl font-semibold mb-3">
            Sales Distribution by Medicine Category
          </h3>
          {categorySales.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySales}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categorySales.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <DataNotFound message="No sales data available for categories yet." />
          )}
        </div>
        {/* --- End Sales Distribution by Category Pie Chart --- */}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
