import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { TabTitle } from '../../../utilities/utilities';
// import DataNotFound from '../../../components/shared/DataNotFound';

const SellerDashboardHome = () => {
  TabTitle('Seller-Dashboard Home');
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch sales summary data (Paid Total, Pending Total)
  const {
    data: salesSummary = { paidTotal: 0, pendingTotal: 0 }, // Default values to prevent errors if data is null
    isLoading: isLoadingSales,
    error: salesError,
    refetch: refetchSales, // Function to manually refetch data
  } = useQuery({
    queryKey: ['sellerSalesSummary', user?.email], 
    queryFn: async () => {
      if (!user?.email) {
        return { paidTotal: 0, pendingTotal: 0 }; // Return default if no user email
      }
      
      // This endpoint should return an object like { paidTotal: number, pendingTotal: number }
      const { data } = await axiosSecure.get(`/seller/sales-summary/${user.email}`);
      return data;
    },
    enabled: !!user?.email, // Only run this query if user.email is truthy
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Data stays in cache for 10 minutes
  });

  if (isLoadingSales) {
    return <LoadingSpinner />;
  }
  console.log(salesSummary)

  if (salesError) {
    return (
      <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold mb-2">Error Loading Sales Summary</h3>
        <p>We encountered an issue loading your sales data: {salesError.message}</p>
        <button 
          onClick={() => refetchSales()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4"> {/* Removed outer container styling as it will be handled by the main dashboard layout */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Sales Overview</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Welcome, <span className="font-semibold text-blue-700">{user?.displayName || user?.email}!</span> Here's an overview of your sales.
      </p>

      {/* --- Sales Revenue Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Card for Total Paid Revenue */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Total Paid Revenue</h3>
          <p className="text-4xl font-extrabold text-blue-600">${salesSummary.paidTotal.toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-2">All successfully paid sales</p>
        </div>
        {/* Card for Total Pending Revenue */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">Total Pending Revenue</h3>
          <p className="text-4xl font-extrabold text-yellow-600">${salesSummary.pendingTotal.toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-2">Cash on Delivery & unconfirmed payments</p>
        </div>
      </div>
      {/* --- End Sales Revenue Section --- */}
    </div>
  );
};

export default SellerDashboardHome;
