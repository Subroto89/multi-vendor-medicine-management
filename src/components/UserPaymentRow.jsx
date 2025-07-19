import React from 'react';

const UserPaymentRow = ({payment, index, getStatusBadgeClasses}) => {
    return (
        <tr key={payment._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {payment.transactionId || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${payment.totalAmount ? payment.totalAmount.toFixed(2) : '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {payment.orderDate ? new Date(payment.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(payment.status)}`}
                      >
                        {payment.status ? payment.status.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN'}
                      </span>
                    </td>
                  </tr>
     
    );
};

export default UserPaymentRow;