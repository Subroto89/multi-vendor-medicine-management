import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../components/shared/DataNotFound";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// FaFileCsv, FaFileExcel, FaAngleLeft, FaAngleRight for pagination and export
import {
  FaFileCsv,
  FaFilePdf,
  FaFileExcel,
  FaFilter,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import Swal from "sweetalert2"; // SweetAlert2 for better alerts

// Import jsPDF and html2canvas for PDF generation
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminSalesReportPage = () => {
  const axiosSecure = useAxiosSecure();

  // State for date range filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  // Ref for the table element to be exported as PDF
  const tableRef = useRef(null);

  // Fetch sales report data
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
      // Backend should return an object like { salesReport: [...], totalCount: N }
      return data;
    },
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 5,
  });

  // Extract salesReport (paginated data) and totalCount from the fetched reportData
  const { salesReport, totalCount } = reportData;
  // Total number of pages based on totalCount and itemsPerPage
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Function to handle PDF export with enhanced error reporting and debugging
  const exportToPDF = async () => {
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

    // Warning for pagination-limited export
    Swal.fire({
      icon: "warning",
      title: "Exporting Current Page",
      text: 'This will export only the sales records currently displayed on this page. For a full report, a dedicated "Export All" feature would be needed (often server-side PDF generation).',
      showCancelButton: true,
      confirmButtonText: "Continue Export",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!tableRef.current) {
          Swal.fire({
            icon: "error",
            title: "Export Error",
            text: "Table element not found for PDF export. Please ensure the table is rendered.",
          });
          return;
        }

        // Temporarily disable scrollbar to ensure full content is captured
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        try {
          const input = tableRef.current;
          const canvas = await html2canvas(input, {
            scale: 2, // Increase scale for better resolution
            useCORS: true, // Enable CORS if your images/resources are from different origins
            logging: false, // Set to false for cleaner console, set true for debugging html2canvas issues
            backgroundColor: "#FFFFFF", // Explicitly set background color for canvas capture to avoid transparency issues
          });

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm

          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save(`sales_report_page_${currentPage}.pdf`);
          Swal.fire({
            icon: "success",
            title: "PDF Generated!",
            text: "The current page of the sales report has been downloaded as a PDF.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error during PDF export:", error);
          Swal.fire({
            icon: "error",
            title: "PDF Export Failed",
            text: `Failed to generate PDF. Please try again. Error: ${
              error.message || "Unknown error"
            }`,
          });
        } finally {
          // Re-enable scrollbar
          document.body.style.overflow = originalOverflow;
        }
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
      className="py-8 px-4"
      style={{ backgroundColor: "#F3F4F6", minHeight: "100vh" }}
    >
      <div
        className="max-w-7xl mx-auto rounded-lg shadow-xl p-6 md:p-8"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h1
          className="text-3xl font-bold mb-6 text-center"
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
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
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
              onClick={exportToPDF}
              className="px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              style={{ backgroundColor: "#DC2626", color: "#FFFFFF" }}
            >
              <FaFilePdf /> PDF
            </button>
          </div>
        </div>

        {salesReport.length > 0 ? (
          <div
            ref={tableRef}
            className="overflow-x-auto rounded-lg shadow-lg table-to-pdf"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
            }}
          >
            <table
              className="min-w-full"
              style={{
                backgroundColor: "#FFFFFF",
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

        {/* ADDED: Pagination Controls */}
        {totalCount > 0 && ( // Only show pagination if there are records
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-4 py-3 bg-white rounded-lg shadow-md">
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
              {/* Render a few page numbers around the current page for better UX */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
                // Show first, last, and pages within 2 of current page, with ellipsis
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
                  // Show ellipsis for skipped pages, but only once for a block of skipped pages
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
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSalesReportPage;
