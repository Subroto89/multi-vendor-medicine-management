import React from "react";

const AdminPaymentManagementRow = ({
  payment,
  index,
  handleAcceptPayment,
  getStatusBadgeClasses,
}) => {
  return (
    <tr key={payment._id || index} className="hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-4 py-4 max-w-12 truncate whitespace-nowrap text-sm text-gray-700">
        {payment.transactionId || "N/A"}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
        {payment.userEmail || "N/A"}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
        ${payment.totalAmount ? payment.totalAmount.toFixed(2) : "0.00"}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
        {payment.paymentMethod
          ? payment.paymentMethod.replace(/_/g, " ").toUpperCase()
          : "N/A"}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
        {payment.orderDate
          ? new Date(payment.orderDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A"}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(
            payment.paymentStatus
          )}`}
        >
          {payment.status
            ? payment.status.replace(/_/g, " ").toUpperCase()
            : "UNKNOWN"}
        </span>
      </td>
      <td className="sticky right-0 px-4 py-4  whitespace-nowrap text-sm text-center bg-white">
        {payment.paymentMethod === "cash_on_delivery" &&
          payment.status === "pending_cod" ? (
            <button
              onClick={() => handleAcceptPayment(payment._id)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              // No direct isLoading state from useMutation, button will be enabled after click
            >
              Accept Payment
            </button>
          ):(<button className="px-4 py-2 bg-gray-500 text-white rounded-md">Accepted</button>)}
      </td>
    </tr>
  );
};

export default AdminPaymentManagementRow;
