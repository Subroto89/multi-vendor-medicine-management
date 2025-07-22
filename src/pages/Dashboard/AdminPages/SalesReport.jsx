import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import DataNotFound from '../../../components/shared/DataNotFound';
import DatePicker from 'react-datepicker'; // For date range selection
import 'react-datepicker/dist/react-datepicker.css'; // Styles for react-datepicker
import { FaFileCsv, FaFilePdf, FaFileExcel, FaFilter } from 'react-icons/fa'; // Icons for export and filter
import { DownloadTableExcel } from 'react-export-table-to-excel';

const AdminSalesReportPage = () => {
  const axiosSecure = useAxiosSecure();

  // State for date range filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch sales report data
  const {
    data: salesReport = [],
    isLoading,
    error,
    refetch, 
  } = useQuery({
    queryKey: ['adminSalesReport', startDate, endDate],
    queryFn: async () => {
      let url = '/admin/sales-report';
      const params = new URLSearchParams();

      if (startDate) {
        params.append('startDate', startDate.toISOString()); // Send as ISO string
      }
      if (endDate) {
        params.append('endDate', endDate.toISOString()); // Send as ISO string
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const { data } = await axiosSecure.get(url);
      return data;
    },
    staleTime: 1000 * 60 * 2, 
    cacheTime: 1000 * 60 * 5
  });

  // Function to handle CSV export
  const exportToCSV = () => {
    if (salesReport.length === 0) {
      alert("No data to export.");
      return;
    }

    const headers = [
      "Order ID",
      "Medicine Name",
      "Seller Email",
      "Buyer Email",
      "Quantity",
      "Price Per Item",
      "Total Price",
      "Payment Status",
      "Order Date",
      "Transaction ID",
    ];

    // Flatten the data for CSV: one row per medicine item in an order
    const csvRows = [];
    salesReport.forEach(order => {
      order.items.forEach(item => {
        csvRows.push([
          `"${order._id}"`, // Enclose ID in quotes to prevent Excel issues
          `"${item.itemName}"`,
          `"${item.sellerEmail}"`,
          `"${order.userEmail}"`,
          item.quantity,
          item.priceAtAddToCart.toFixed(2),
          item.totalPricePerItem.toFixed(2),
          `"${order.paymentStatus}"`,
          `"${new Date(order.orderDate).toLocaleDateString()}"`,
          `"${order.transactionId || 'N/A'}"`,
        ].join(','));
      });
    });

    const csvContent = [
      headers.join(','),
      ...csvRows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sales_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle PDF export (conceptual - requires a library like jsPDF or react-to-print)
  const exportToPDF = () => {
    alert("PDF export functionality is not yet implemented. Consider using libraries like jsPDF or react-to-print.");
    // Example with react-to-print:
    // const componentRef = useRef();
    // return (
    //   <div>
    //     <ComponentToPrint ref={componentRef} data={salesReport} />
    //     <ReactToPrint
    //       trigger={() => <button>Print to PDF</button>}
    //       content={() => componentRef.current}
    //     />
    //   </div>
    // );
  };

  // Function to handle XLSX export (conceptual - requires a library like SheetJS/xlsx)
  const exportToXLSX = () => {
    alert("XLSX export functionality is not yet implemented. Consider using libraries like SheetJS (xlsx).");
    // Example with SheetJS:
    // import * as XLSX from 'xlsx';
    // const ws = XLSX.utils.json_to_sheet(salesReport.flatMap(order => 
    //   order.items.map(item => ({
    //     'Order ID': order._id,
    //     'Medicine Name': item.itemName,
    //     'Seller Email': item.sellerEmail,
    //     'Buyer Email': order.userEmail,
    //     'Quantity': item.quantity,
    //     'Price Per Item': item.priceAtAddToCart,
    //     'Total Price': item.totalPricePerItem,
    //     'Payment Status': order.paymentStatus,
    //     'Order Date': new Date(order.orderDate).toLocaleDateString(),
    //     'Transaction ID': order.transactionId || 'N/A',
    //   }))
    // ));
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    // XLSX.writeFile(wb, "sales_report.xlsx");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold mb-2">Error Loading Sales Report</h3>
        <p>We encountered an issue loading the sales report: {error.message}</p>
        <button 
          onClick={() => refetch()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
console.log(salesReport)
  return (
    <div className="py-8 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Website Sales Report</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Total sales records found: <span className="font-semibold text-blue-700">{salesReport.length}</span>
        </p>

        {/* Date Range Filter and Export Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Date Pickers */}
          <div className="flex items-center gap-3">
            <FaFilter className="text-gray-600" />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => { setStartDate(null); setEndDate(null); refetch(); }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Export Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaFileCsv /> CSV
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FaFilePdf /> PDF
            </button>
            <button
              onClick={exportToXLSX}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <FaFileExcel /> XLSX
            </button>
          </div>
        </div>

        {salesReport.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicine Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price/Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* CORRECTED: Directly map over salesReport as it contains flattened item records */}
                {salesReport.map((saleRecord, index) => (
                  <tr key={`${saleRecord._id}-${saleRecord.medicineId}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {saleRecord._id} {/* This is the order ID */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {saleRecord.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {saleRecord.sellerEmail || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {saleRecord.userEmail || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                      {saleRecord.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${saleRecord.priceAtAddToCart.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                      ${saleRecord.totalPricePerItem.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-left">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          saleRecord.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          saleRecord.paymentStatus === 'pending_cod' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {saleRecord.paymentStatus ? saleRecord.paymentStatus.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {saleRecord.orderDate ? new Date(saleRecord.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {saleRecord.transactionId || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <DataNotFound message="No sales records found for the selected criteria." />
        )}
      </div>
    </div>
  );
};

export default AdminSalesReportPage;
