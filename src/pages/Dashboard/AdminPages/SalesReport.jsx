import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../components/shared/DataNotFound";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaFileCsv,
  FaFilePdf,
  FaFileExcel,
  FaFilter,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesReportPdfDocument from "../../../components/SalesReportPdfDocument";
import { TabTitle } from "../../../utilities/utilities";

const AdminSalesReportPage = () => {
  TabTitle("Sales Report");

  const axiosSecure = useAxiosSecure();

  // State for date range filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: reportData = { salesReport: [], totalCount: 0 },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "adminSalesReport",
      startDate,
      endDate,
      currentPage,
      itemsPerPage,
    ],
    queryFn: async () => {
      let url = "/admin/sales-report";
      const params = new URLSearchParams();

      if (startDate) {
        params.append("startDate", startDate.toISOString());
      }
      if (endDate) {
        // Ensure endDate includes the entire day
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        params.append("endDate", endOfDay.toISOString());
      }

      params.append("page", currentPage);
      params.append("limit", itemsPerPage);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const { data } = await axiosSecure.get(url);
      return data;
    },
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 5,
  });

  const { salesReport, totalCount } = reportData;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Function to handle CSV export
  const exportToCSV = () => {
    if (salesReport.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Data",
        text: "No data available to export.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      icon: "warning",
      title: "Exporting Current Page",
      text: 'This will export only the sales records currently displayed on this page. For a full report, a dedicated "Export All" feature would be needed (often involves a separate backend endpoint).',
      showCancelButton: true,
      confirmButtonText: "Continue Export",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
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

        const csvRows = salesReport.map((record) => {
          return [
            `"${record._id}"`,
            `"${record.itemName}"`,
            `"${record.sellerEmail || "N/A"}"`,
            `"${record.userEmail || "N/A"}"`,
            record.quantity,
            record.priceAtAddToCart
              ? record.priceAtAddToCart.toFixed(2)
              : "0.00",
            record.totalPricePerItem
              ? record.totalPricePerItem.toFixed(2)
              : "0.00",
            `"${
              record.paymentStatus
                ? record.paymentStatus.replace(/_/g, " ").toUpperCase()
                : "UNKNOWN"
            }"`,
            `"${
              record.orderDate
                ? new Date(record.orderDate).toLocaleDateString()
                : "N/A"
            }"`,
            `"${record.transactionId || "N/A"}"`,
          ].join(",");
        });

        const csvContent = [headers.join(","), ...csvRows].join("\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `sales_report_page_${currentPage}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        Swal.fire({
          icon: "success",
          title: "CSV Generated!",
          text: "The current page of the sales report has been downloaded as a CSV.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  // Pagination handler functions
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold mb-2">
          Error Loading Sales Report
        </h3>
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

  return (
    <div
      className=" px-4 min-h-screen"
      
    >
      <div
        className="max-w-7xl mx-auto px-2 shadow-xl max-h-[calc(100vh-10px)] overflow-auto"
       
      >
        <h1
          className="text-3xl font-bold mb-6 text-center pt-16 pb-4 md:pt-8 md:pb-0"
          style={{ color: "#1F2937" }}
        >
          Website Sales Report
        </h1>
        <p className="text-lg text-center mb-8" style={{ color: "#4B5563" }}>
          Total sales records found:{" "}
          <span className="font-semibold" style={{ color: "#1D4ED8" }}>
            {totalCount}
          </span>
        </p>

        {/* Date Range Filter and Export Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Date Pickers */}
          <div className="flex items-center gap-3 text-gray-600">
            <FaFilter style={{ color: "#4B5563" }} />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="px-1 md:px-4 py-2 w-30 md:w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-1 md:px-4 py-2 w-30 md:w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
            <button
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setCurrentPage(1);
                refetch();
              }}
              className="px-4 py-2 rounded-md transition-colors"
              style={{ backgroundColor: "#E5E7EB", color: "#374151" }}
            >
              Clear
            </button>
          </div>

          {/* Export Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
            >
              <FaFileCsv /> CSV
            </button>

            {salesReport.length > 0 ? (
              <PDFDownloadLink
                document={
                  <SalesReportPdfDocument
                    salesReport={salesReport}
                    totalCount={totalCount}
                    startDate={startDate}
                    endDate={endDate}
                  />
                }
                fileName={`sales_report_page_${currentPage}.pdf`}
              >
                {({ blob, url, loading, error: pdfError }) => (
                  <button
                    className="px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                    style={{ backgroundColor: "#DC2626", color: "#FFFFFF" }}
                    disabled={loading} // Disable button while PDF is generating
                  >
                    <FaFilePdf /> {loading ? "Generating PDF..." : "PDF"}
                  </button>
                )}
              </PDFDownloadLink>
            ) : (
              <button
                className="px-4 py-2 rounded-md transition-colors flex items-center gap-2 opacity-50 cursor-not-allowed"
                style={{ backgroundColor: "#DC2626", color: "#FFFFFF" }}
                disabled
              >
                <FaFilePdf /> PDF
              </button>
            )}
          </div>
        </div>

        {salesReport.length > 0 ? (
          <div
            className="overflow-auto rounded-lg shadow-lg table-to-pdf"
            style={{
              // backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
            }}
          >
            <table
              className="min-w-full"
              style={{
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <thead
                style={{
                  backgroundColor: "#F9FAFB",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Order ID
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Medicine Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Seller Email
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Buyer Email
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Price/Unit
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Total Price
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Payment Status
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Order Date
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "#FFFFFF" }}>
                {salesReport.map((saleRecord, index) => (
                  <tr
                    key={`${saleRecord._id}-${saleRecord.medicineId}-${index}`}
                    style={{ borderBottom: "1px solid #E5E7EB" }}
                  >
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                      style={{ color: "#1F2937" }}
                    >
                      {saleRecord._id}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      style={{ color: "#374151" }}
                    >
                      {saleRecord.itemName}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      style={{ color: "#374151" }}
                    >
                      {saleRecord.sellerEmail || "N/A"}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      style={{ color: "#374151" }}
                    >
                      {saleRecord.userEmail || "N/A"}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-center"
                      style={{ color: "#374151" }}
                    >
                      {saleRecord.quantity}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      style={{ color: "#374151" }}
                    >
                      $
                      {saleRecord.priceAtAddToCart
                        ? saleRecord.priceAtAddToCart.toFixed(2)
                        : "0.00"}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-semibold"
                      style={{ color: "#047857" }}
                    >
                      $
                      {saleRecord.totalPricePerItem
                        ? saleRecord.totalPricePerItem.toFixed(2)
                        : "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-left">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        style={{
                          backgroundColor:
                            saleRecord.paymentStatus === "paid"
                              ? "#D1FAE5"
                              : saleRecord.paymentStatus === "pending_cod"
                              ? "#FEF3C7"
                              : "#F3F4F6",
                          color:
                            saleRecord.paymentStatus === "paid"
                              ? "#065F46"
                              : saleRecord.paymentStatus === "pending_cod"
                              ? "#92400E"
                              : "#1F2937",
                        }}
                      >
                        {saleRecord.paymentStatus
                          ? saleRecord.paymentStatus
                              .replace(/_/g, " ")
                              .toUpperCase()
                          : "UNKNOWN"}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      style={{ color: "#374151" }}
                    >
                      {saleRecord.orderDate
                        ? new Date(saleRecord.orderDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      style={{ color: "#374151" }}
                    >
                      {saleRecord.transactionId || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <DataNotFound message="No sales records found for the selected criteria." />
        )}

        {/*  Pagination Controls */}
        {totalCount > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 px-4 py-3 bg-white rounded-lg shadow-md">
            {/* Items Per Page Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border-gray-600 text-gray-700"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            {/* Page Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaAngleLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2) ? (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  (page === currentPage - 3 || page === currentPage + 3) && (
                    <span key={page} className="px-2 text-gray-500">
                      ...
                    </span>
                  )
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaAngleRight />
              </button>
            </div>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages} ({totalCount} items)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSalesReportPage;
