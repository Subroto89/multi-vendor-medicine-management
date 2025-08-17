import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Removed useMutation
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../components/shared/DataNotFound";
import Swal from "sweetalert2"; // For user feedback
import AdminPaymentManagementRow from "../../../components/AdminPaymentManagementRow";
import { TabTitle } from "../../../utilities/utilities";
import {useTheme} from "../../../context/ThemeContext";


const AdminPaymentManagement = () => {
  TabTitle('Payment Management');
  const {theme} = useTheme()
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); // Get query client for invalidation

  // State to manage the filter for payment status
  const [filterStatus, setFilterStatus] = useState("pending_cod"); // 'all', 'pending_cod', 'paid'

  // Fetch payment information for admin
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["adminPayments", filterStatus],
    queryFn: async () => {
      let url = "/admin/payments";
      if (filterStatus !== "all") {
        url += `?status=${filterStatus}`;
      }
      const { data } = await axiosSecure.get(url);
      return data;
    },
  });

  // Handler for "Accept Payment" button click (now without useMutation)
  const handleAcceptPayment = async (orderId) => {
    Swal.fire({
      title: "Confirm Payment Acceptance?",
      text: "Are you sure you want to mark this payment as Paid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept it!",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      // Made the callback async
      if (result.isConfirmed) {
        try {
          // Send PATCH request to update the payment status to 'paid'
          const { data } = await axiosSecure.patch(
            `/admin/payments/${orderId}/status`,
            {
              paymentStatus: "paid", // New status for the payment
              orderStatus: "completed", // Optionally update the overall order status
            }
          );

          Swal.fire({
            icon: "success",
            title: "Payment Accepted!",
            text: data.message || "Payment status updated to Paid.",
            timer: 1500,
            showConfirmButton: false,
          });
          queryClient.invalidateQueries(["adminPayments"]);
        } catch (err) {
          console.error(
            "Error accepting payment:",
            err.response?.data || err.message
          );
          Swal.fire({
            icon: "error",
            title: "Failed to Accept Payment",
            text:
              err.response?.data?.message ||
              "An error occurred while updating payment status.",
          });
        }
      }
    });
  };

  // Determine status badge styling
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending_cod": // Use the specific pending status from your backend
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full min-h-screen">
      
      <div className={`w-full mx-auto   px-6 md:px-8 pb-4 min-h-screen ${theme==="dark" ? "dark-bg" : "bg-secondary"}`}>
        <h1 className={`text-3xl font-bold mb-6 pt-6 text-center ${theme==="dark" ? "text-white" : "text-gray-800"}`}>
          Payment Management
        </h1>
        <div className="flex items-center justify-between my-0">
          <p className="text-lg text-center mb-8">
            Total Record Found:
            <span className="font-semibold">
              {payments.length}
            </span>
          </p>

          {/* Filter Dropdown */}
          <div className="flex justify-center mb-8">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-2 rounded-lg font-semibold border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Payments</option>
              <option value="pending_cod">Pending Payments</option>
              <option value="paid">Paid Payments</option>
            </select>
          </div>
        </div>

        {payments.length > 0 ? (
          <div className={`max-h-[calc(100vh-100px)] overflow-auto rounded-lg shadow-lg border border-gray-200 ${theme==="dark" ? "category-card" : "bg-secondary"}`}>
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className={`bg-gray-50 top-0 sticky ${theme==="dark" ? "category-card text-white" : "bg-secondary text-gray-600"}`}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                    User Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                    Order Date
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                    Payment Status
                  </th>
                  <th className="sticky right-0 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment, index) => (
                  <AdminPaymentManagementRow
                    payment={payment}
                    index={index}
                    handleAcceptPayment={handleAcceptPayment}
                    getStatusBadgeClasses={getStatusBadgeClasses}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <DataNotFound message="No payment records found for the selected filter." />
        )}
      </div>
    </div>
  );
};

export default AdminPaymentManagement;
