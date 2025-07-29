
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import DataNotFound from '../../../components/shared/DataNotFound';
import {TabTitle} from '../../../utilities/utilities'

const AdminDashboardHome = () => {
  TabTitle('Admin-Home');
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();

  // Fetch website-wide sales summary data (Paid Total, Pending Total)
  const {
    data: salesSummary = { paidTotal: 0, pendingTotal: 0 }, 
    isLoading: isLoadingSales,
    error: salesError,
    refetch: refetchSales,
  } = useQuery({
    queryKey: ['adminSalesSummary'], 
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin/sales-summary');
      return data;
    },
    
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10
  });

  if (isLoadingSales) {
    return <LoadingSpinner />;
  }

  if (salesError) {
    return (
      <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold mb-2">Error Loading Sales Summary</h3>
        <p>We encountered an issue loading the website sales data: {salesError.message}</p>
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
    <div className="py-8 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard Overview</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Welcome, <span className="font-semibold text-blue-700">{user?.displayName || user?.email || 'Admin'}!</span> Here's the overall website sales performance.
        </p>

        {/* --- Website Sales Revenue Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Card for Total Paid Revenue */}
          <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Total Paid Revenue (Website)</h3>
            <p className="text-4xl font-extrabold text-green-600">${salesSummary.paidTotal.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-2">All successfully paid sales across the platform</p>
          </div>
          {/* Card for Total Pending Revenue */}
          <div className="bg-orange-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-orange-800 mb-2">Total Pending Revenue (Website)</h3>
            <p className="text-4xl font-extrabold text-orange-600">${salesSummary.pendingTotal.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-2">Cash on Delivery & unconfirmed payments across the platform</p>
          </div>
        </div>
        {/* --- End Website Sales Revenue Section --- */}

      </div>
    </div>
  );
};

export default AdminDashboardHome;
