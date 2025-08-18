import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { TabTitle } from "../../../utilities/utilities";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useTheme } from "../../../context/ThemeContext";

const SellerDashboardHome = () => {
  TabTitle("Seller-Dashboard Home");
  const { theme } = useTheme();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: salesSummary = { paidTotal: 0, pendingTotal: 0 },
    isLoading: isLoadingSales,
    error: salesError,
    refetch: refetchSales,
  } = useQuery({
    queryKey: ["sellerSalesSummary", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return { paidTotal: 0, pendingTotal: 0 };
      }
      const { data } = await axiosSecure.get(
        `/seller/sales-summary/${user.email}`
      );
      return data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const {
    data: sellerCategorySales = [],
    isLoading: isLoadingSellerCategorySales,
    error: sellerCategorySalesError,
    refetch: refetchSellerCategorySales,
  } = useQuery({
    queryKey: ["sellerCategorySales", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const { data } = await axiosSecure.get(
        `/seller/sales-by-category/${user.email}`
      );
      return data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoadingSales || isLoadingSellerCategorySales) {
    return <LoadingSpinner />;
  }

  if (salesError || sellerCategorySalesError) {
    return (
      <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold mb-2">
          Error Loading Dashboard Data
        </h3>
        <p>We encountered an issue loading your sales data:</p>
        {salesError && (
          <p className="mt-1">Sales Summary: {salesError.message}</p>
        )}
        {sellerCategorySalesError && (
          <p className="mt-1">
            Category Sales: {sellerCategorySalesError.message}
          </p>
        )}
        <button
          onClick={() => {
            refetchSales();
            refetchSellerCategorySales();
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
    <div className={`w-full bg-gray-100 min-h-screen`}>
      {/* Added bg-gray-100 and min-h-screen for consistent layout */}
      <div
        className={`min-h-screen w-full mx-auto shadow-xl ${
          theme === "dark" ? "dark-bg-body" : "light-bg-body"
        }`}
      >
        <div className="w-11/12 mx-auto">
          <h1
            className={`text-3xl font-bold mb-2 text-center pt-8 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Your Sales Overview
          </h1>
          <p
            className={`text-lg text-center pb-8 ${
              theme === "dark" ? "text-white" : "text-gray-600"
            }`}
          >
            Welcome,{" "}
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-amber-500" : "text-blue-700"
              }`}
            >
              {user?.displayName || user?.email}!
            </span>{" "}
            Here's an overview of your sales.
          </p>

          {/* --- Sales Revenue Section --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Card for Total Paid Revenue */}
            <div
              className={`p-6 rounded-lg flex flex-col items-center justify-center ${
                theme === "dark"
                  ? "dark-category-card"
                  : "light-category-card bg-blue-50 text-blue-600 shadow-md"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">Total Paid Revenue</h3>
              <p className="text-4xl font-extrabold">
                ${salesSummary.paidTotal.toFixed(2)}
              </p>
              <p className="text-sm mt-2">All successfully paid sales</p>
            </div>
            {/* Card for Total Pending Revenue */}
            <div
              className={`p-6 rounded-lg flex flex-col items-center justify-center ${
                theme === "dark"
                  ? "dark-category-card"
                  : "light-category-card bg-yellow-50 text-yellow-800 shadow-md"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">
                Total Pending Revenue
              </h3>
              <p className="text-4xl font-extrabold">
                ${salesSummary.pendingTotal.toFixed(2)}
              </p>
              <p className="text-sm mt-2">
                Cash on Delivery & unconfirmed payments
              </p>
            </div>
          </div>
          {/* --- End Sales Revenue Section --- */}

          {/* --- Sales Distribution by Category Pie Chart for Seller --- */}
          <div
            className={`bg-purple-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[calc(100vh-350px)] mt-3 ${theme==="dark" ? "dark-category-card" : ""}`}
          >
            <h3 className={`text-xl md:text-2xl font-semibold mb-3 ${theme==="dark" ? "text-white" : "text-purple-800"}`}>
              Your Sales Distribution by Medicine Category
            </h3>
            {sellerCategorySales.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sellerCategorySales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {sellerCategorySales.map((entry, index) => (
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
              <div className="text-gray-500 text-center">
                No sales data available for your medicine categories yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardHome;
