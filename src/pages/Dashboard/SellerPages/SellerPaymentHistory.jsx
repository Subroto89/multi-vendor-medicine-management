import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import DataNotFound from '../../../components/shared/DataNotFound';
import { FaEye } from 'react-icons/fa'; // For view details icon
import { TabTitle } from '../../../utilities/utilities';

const SellerPaymentHistory = () => {
  TabTitle('Payment History');
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();

  // State to manage the filter for payment status
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('pending_cod'); // 'all', 'paid', 'pending_cod'

  // Fetch seller's purchase history
  const {
    data: paymentHistory = [], // Initialize with an empty array
    isLoading,
    
  } = useQuery({
    queryKey: ['sellerPaymentHistory', user?.email, filterPaymentStatus], // Query key includes seller email and filter status
    queryFn: async () => {
      // Ensure user email is available before making the API call
      if (!user?.email) {
        return [];
      }
      let url = `/seller/payment-history/${user.email}`;
      if (filterPaymentStatus !== 'all') {
        url += `?paymentStatus=${filterPaymentStatus}`; // Add query parameter for filtering
      }
      const { data } = await axiosSecure.get(url);
      return data;
    }
  });

  // Determine status badge styling
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending_cod':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }



  return (
    <div className="py-8 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Sales History</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Total orders containing your medicines: <span className="font-semibold text-blue-700">{paymentHistory.length}</span>
        </p>

        {/* Filter Dropdown */}
        <div className="flex justify-center mb-8">
          <select
            value={filterPaymentStatus}
            onChange={(e) => setFilterPaymentStatus(e.target.value)}
            className="px-6 py-2 rounded-lg font-semibold border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Payment Statuses</option>
            <option value="pending_cod">Pending Payments</option>
            <option value="paid">Paid Payments</option>
            <option value="failed">Failed Payments</option>
          </select>
        </div>

        {paymentHistory.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your Items
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((order, index) => (
                  <tr key={order._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.customerEmail || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-left">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(order.paymentStatus)}`}
                      >
                        {order.status ? order.status.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <ul className="list-disc list-inside space-y-1">
                        {order.sellerItems.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-xs">
                            {item.itemName} (Qty: {item.quantity}) - ${item.totalPricePerItem.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {/* Example: View full order details button */}
                      <button 
                        // onClick={() => handleViewOrderDetails(order._id)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                        title="View Order Details"
                      >
                        <FaEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <DataNotFound message="No sales history found for your medicines." />
        )}
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
