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

const UserDashboardHome = () => {
  TabTitle("Dashboard Home");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userSpendingByCategory = [],
    isLoading: isLoadingSpending,
    error: spendingError,
    refetch: refetchSpending,
  } = useQuery({
    queryKey: ["userSpendingByCategory", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const { data } = await axiosSecure.get(
        `/user/spending-by-category/${user.email}`
      );
      return data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  // Calculate total spending for display
  const totalSpending = userSpendingByCategory.reduce(
    (sum, item) => sum + item.value,
    0
  );

  if (isLoadingSpending) {
    return <LoadingSpinner />;
  }

  if (spendingError) {
    return (
      <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold mb-2">
          Error Loading Dashboard Data
        </h3>
        <p>
          We encountered an issue loading your spending data:{" "}
          {spendingError.message}
        </p>
        <button
          onClick={() => refetchSpending()}
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
    <div className="px-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center mt-8 md:mt-0">
          Your Dashboard
        </h1>
        <p className="text-lg text-gray-600 text-center mb-2">
          Welcome,
          <span className="font-semibold text-blue-700">
            {user?.displayName || user?.email}!
          </span>{" "}
          Here's an overview of your activity.
        </p>

        {/* --- Total Spending Summary --- */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center mb-2">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Total Spending Across All Orders
          </h3>
          <p className="text-4xl font-extrabold text-green-600">
            ${totalSpending.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Sum of all your paid orders
          </p>
        </div>

        {/* --- Spending Distribution by Category Pie Chart --- */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[400px] mt-2">
          <h3 className="text-xl md:text-2xl font-semibold text-indigo-800 mb-3">
            Your Spending by Medicine Category
          </h3>
          {userSpendingByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userSpendingByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {userSpendingByCategory.map((entry, index) => (
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
              No spending data available yet. Make your first purchase!
            </div>
          )}
        </div>
        {/* --- End Spending Distribution by Category Pie Chart --- */}
      </div>
    </div>
  );
};

export default UserDashboardHome;
