import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 33,
    marginBottom: 5,
    alignSelf: "center",
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  invoiceNumber: {
    fontSize: 10,
    color: "#4B5563",
  },
  detailsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 10,
  },
  detailColumn: {
    width: "48%",
  },
  detailHeading: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1F2937",
  },
  detailText: {
    fontSize: 9,
    marginBottom: 2,
    color: "#374151",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20,
    borderStyle: "solid",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#D1D5DB",
    borderBottomColor: "#6B7280",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#F3F4F6",
    padding: 8,
    textAlign: "center",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
    textAlign: "center",
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#4B5563",
    textTransform: "uppercase",
  },
  tableCell: {
    fontSize: 8,
    color: "#374151",
  },
  // Specific column widths for the invoice table
  itemCol: { width: "35%", textAlign: "left" },
  companyCol: { width: "20%" },
  qtyCol: { width: "10%" },
  priceCol: { width: "15%" },
  totalCol: { width: "20%", fontWeight: "bold", color: "#047857" },

  totalSection: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  footer: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 30,
    color: "#6B7280",
  },
});

const InvoicePdfDocument = ({ orderData }) => {
  // Ensure orderData is available
  if (!orderData) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.headerSection}>No Invoice Data Available</Text>
        </Page>
      </Document>
    );
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

  const formattedOrderDate = new Date(orderDate).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const logoUrl = "https://placehold.co/150x50/007bff/ffffff?text=Your+Logo"; // Your logo URL

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Invoice Header */}
        <View style={styles.headerSection}>
          <Image src={logoUrl} style={styles.logo} />
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.invoiceNumber}>
            #INV-{transactionId?.slice(0, 10).toUpperCase() || "N/A"}
          </Text>
        </View>

        {/* User and Invoice Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailHeading}>Invoice To:</Text>
            <Text style={styles.detailText}>{userName || "N/A"}</Text>
            <Text style={styles.detailText}>{userEmail || "N/A"}</Text>
            <Text style={styles.detailText}>
              {shippingAddress?.fullName || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              {shippingAddress?.addressLine1 || "N/A"}
            </Text>
            {shippingAddress?.addressLine2 && (
              <Text style={styles.detailText}>
                {shippingAddress.addressLine2}
              </Text>
            )}
            <Text style={styles.detailText}>
              {shippingAddress?.city || "N/A"},{" "}
              {shippingAddress?.zipCode || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              {shippingAddress?.country || "N/A"}
            </Text>
          </View>
          <View style={[styles.detailColumn, { textAlign: "right" }]}>
            <Text style={styles.detailText}>
              <Text style={styles.detailHeading}>Date:</Text>{" "}
              {formattedOrderDate}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailHeading}>Payment Method:</Text>{" "}
              {paymentMethod ? paymentMethod.replace(/_/g, " ") : "N/A"}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailHeading}>Status:</Text>{" "}
              {status ? status.replace(/_/g, " ") : "N/A"}
            </Text>
          </View>
        </View>

        {/* Order Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, styles.itemCol]}>
              <Text style={styles.tableCellHeader}>Item</Text>
            </View>
            <View style={[styles.tableColHeader, styles.companyCol]}>
              <Text style={styles.tableCellHeader}>Company</Text>
            </View>
            <View style={[styles.tableColHeader, styles.qtyCol]}>
              <Text style={styles.tableCellHeader}>Qty</Text>
            </View>
            <View style={[styles.tableColHeader, styles.priceCol]}>
              <Text style={styles.tableCellHeader}>Price</Text>
            </View>
            <View style={[styles.tableColHeader, styles.totalCol]}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>

          {/* Table Rows */}
          {items &&
            items.map((item, idx) => (
              <View style={styles.tableRow} key={idx}>
                <View style={[styles.tableCol, styles.itemCol]}>
                  <Text style={styles.tableCell}>
                    {item.itemName || "N/A"} ({item.itemGenericName || "N/A"})
                  </Text>
                </View>
                <View style={[styles.tableCol, styles.companyCol]}>
                  <Text style={styles.tableCell}>{item.company || "N/A"}</Text>
                </View>
                <View style={[styles.tableCol, styles.qtyCol]}>
                  <Text style={styles.tableCell}>{item.quantity || 0}</Text>
                </View>
                <View style={[styles.tableCol, styles.priceCol]}>
                  <Text style={styles.tableCell}>
                    $
                    {item.priceAtAddToCart
                      ? item.priceAtAddToCart.toFixed(2)
                      : "0.00"}
                  </Text>
                </View>
                <View style={[styles.tableCol, styles.totalCol]}>
                  <Text style={styles.tableCell}>
                    $
                    {item.totalPricePerItem
                      ? item.totalPricePerItem.toFixed(2)
                      : "0.00"}
                  </Text>
                </View>
              </View>
            ))}
        </View>

        {/* Total */}
        <Text style={styles.totalSection}>
          Grand Total: ${totalAmount ? totalAmount.toFixed(2) : "0.00"}
        </Text>

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your purchase!
          {"\n"}
          Contact us for support.
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePdfDocument;
