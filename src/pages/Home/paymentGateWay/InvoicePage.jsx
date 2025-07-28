import React from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Container from "../../../components/shared/Container";
import DataNotFound from "../../../components/shared/DataNotFound";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePdfDocument from "../../../components/InvoicePdfDocument";

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = location.state?.orderData;

  if (!orderData) {
    Swal.fire({
      icon: "info",
      title: "No Order Found",
      text: "Redirecting to home...",
      timer: 3000,
      showConfirmButton: false,
    }).then(() => navigate("/"));
    return <DataNotFound message="No invoice data available." />;
  }

  const {
    userName,
    userEmail,
    shippingAddress,
    items,
    totalAmount,
    paymentMethod,
    transactionId,
    orderDate,
    status,
  } = orderData;

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <div className="flex justify-end mb-4">
            <PDFDownloadLink
              document={<InvoicePdfDocument orderData={orderData} />} // Pass orderData to your PDF component
              fileName={`Invoice-${transactionId || "order"}.pdf`}
            >
              {({ blob, url, loading, error }) => (
                <button
                  className="px-5 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                  disabled={loading} // Disable button while PDF is generating
                >
                  {loading ? "Generating PDF..." : "Download as PDF"}
                </button>
              )}
            </PDFDownloadLink>
          </div>

          <div className="bg-white p-6 text-black">
            {/* Invoice Header */}
            <div className="text-center mb-6">
              <img
                src="https://placehold.co/150x50/007bff/ffffff?text=Your+Logo"
                alt="Logo"
                className="mx-auto mb-2"
              />
              <h1 className="text-3xl font-bold">INVOICE</h1>
              <p className="text-sm">
                #INV-{transactionId?.slice(0, 10).toUpperCase()}
              </p>
            </div>

            {/* User and Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="font-semibold mb-1">Invoice To:</h2>
                <p>{userName}</p>
                <p>{userEmail}</p>
                <p>{shippingAddress.fullName}</p>
                <p>{shippingAddress.addressLine1}</p>
                {shippingAddress.addressLine2 && (
                  <p>{shippingAddress.addressLine2}</p>
                )}
                <p>
                  {shippingAddress.city}, {shippingAddress.zipCode}
                </p>
                <p>{shippingAddress.country}</p>
              </div>
              <div className="text-right">
                <p>
                  <strong>Date:</strong> {new Date(orderDate).toLocaleString()}
                </p>
                <p>
                  <strong>Payment:</strong> {paymentMethod.replace(/_/g, " ")}
                </p>
                <p>
                  <strong>Status:</strong> {status.replace(/_/g, " ")}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <table className="w-full mb-6 text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Company</th>
                  <th className="border p-2 text-center">Qty</th>
                  <th className="border p-2 text-center">Price</th>
                  <th className="border p-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">
                      {item.itemName} ({item.itemGenericName})
                    </td>
                    <td className="border p-2">{item.company}</td>
                    <td className="border p-2 text-center">{item.quantity}</td>
                    <td className="border p-2 text-center">
                      ${item.priceAtAddToCart.toFixed(2)}
                    </td>
                    <td className="border p-2 text-center">
                      ${item.totalPricePerItem.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="text-right text-lg font-semibold">
              Grand Total: ${totalAmount.toFixed(2)}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Thank you for your purchase!</p>
              <p>Contact us for support.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InvoicePage;
