import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../components/shared/DataNotFound";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserPaymentRow from "../../../components/UserPaymentRow";
import ReviewModal from "../../../components/modals/ReviewModal";
import { useState } from "react";
import {TabTitle} from "../../../utilities/utilities";

const UserPaymentHistory = () => {
  TabTitle('Payment History');
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleReviewModal = () => {
    setIsReviewModal(!isReviewModal);
  };

  const handleOrderDetails = (particularOrder) => {
    setOrderDetails(particularOrder);
  };

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userPaymentHistory = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const { data } = await axiosSecure.get(
        `/user-payment-history/${user?.email}`
      );
      return data;
    },
  });

  // Determine status badge styling
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
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
    <div className="px-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl pt-14 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Payment History
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Total payments:{" "}
          <span className="font-semibold text-blue-700">
            {userPaymentHistory.length}
          </span>
        </p>

        {userPaymentHistory.length > 0 ? (
          <div className="max-h-[calc(100vh-190px)] overflow-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Give Review
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userPaymentHistory.map((payment, index) => (
                  <UserPaymentRow
                    payment={payment}
                    index={index}
                    getStatusBadgeClasses={getStatusBadgeClasses}
                    handleReviewModal={handleReviewModal}
                    handleOrderDetails={handleOrderDetails}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <DataNotFound message="No payment history found for your account." />
        )}
      </div>

      {/* -------------------------------------------------------------------------------------------------------------
      Review Modal
      ------------------------------------------------------------------------------------------------------------- */}
      {isReviewModal && (
        <ReviewModal
          handleReviewModal={handleReviewModal}
          orderDetails={orderDetails}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default UserPaymentHistory;
