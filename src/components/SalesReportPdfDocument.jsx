import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#F3F4F6', // Light gray background
    padding: 30,
    fontFamily: 'Helvetica', // Default font
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#1F2937', // Dark gray
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B5563', 
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    borderBottomColor: '#000', // Stronger border for header
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#F9FAFB', // Light background for header
    padding: 6, // Reduced padding for more columns
  },
  tableCol: {
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 6, // Reduced padding
  },
  tableCellHeader: {
    fontSize: 7, // Smaller font for header
    fontWeight: 'bold',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  tableCell: {
    fontSize: 6, // Even smaller font for data
    color: '#374151',
  },
  // Define column widths - these must sum to 100%
  colWidths: {
    orderId: '10%',
    medicineName: '14%',
    sellerEmail: '12%',
    buyerEmail: '12%',
    quantity: '5%',
    pricePerUnit: '7%',
    totalPrice: '8%',
    paymentStatus: '8%',
    orderDate: '8%',
    transactionId: '16%', 
  },
  // Specific styles for certain columns if needed
  qtyCol: { textAlign: 'center' },
  priceCol: { textAlign: 'right' },
  totalPriceCol: { textAlign: 'right', fontWeight: 'bold', color: '#047857' },
  statusBadge: {
    fontSize: 5, 
    paddingVertical: 1,
    paddingHorizontal: 3,
    borderRadius: 9999, 
    alignSelf: 'flex-start', 
    textAlign: 'center', 
  },
  statusPaid: { backgroundColor: '#D1FAE5', color: '#065F46' },
  statusPending: { backgroundColor: '#FEF3C7', color: '#92400E' },
  statusUnknown: { backgroundColor: '#F3F4F6', color: '#1F2937' },
  footer: {
    fontSize: 8,
    textAlign: 'center',
    marginTop: 20,
    color: '#6B7280',
  }
});


const SalesReportPdfDocument = ({ salesReport, totalCount, startDate, endDate }) => {
  const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString() : 'N/A';
  const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString() : 'N/A';

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}> 
        <Text style={styles.header}>Website Sales Report</Text>
        <Text style={styles.subHeader}>
          {startDate || endDate ? `Filtered from ${formattedStartDate} to ${formattedEndDate}. ` : ''}
          Total records: {totalCount}
        </Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, { width: styles.colWidths.orderId }]}>
              <Text style={styles.tableCellHeader}>Order ID</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.medicineName }]}>
              <Text style={styles.tableCellHeader}>Medicine Name</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.sellerEmail }]}>
              <Text style={styles.tableCellHeader}>Seller Email</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.buyerEmail }]}>
              <Text style={styles.tableCellHeader}>Buyer Email</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.quantity }]}>
              <Text style={styles.tableCellHeader}>Qty</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.pricePerUnit }]}>
              <Text style={styles.tableCellHeader}>Price/Unit</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.totalPrice }]}>
              <Text style={styles.tableCellHeader}>Total Price</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.paymentStatus }]}>
              <Text style={styles.tableCellHeader}>Status</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.orderDate }]}>
              <Text style={styles.tableCellHeader}>Order Date</Text>
            </View>
            <View style={[styles.tableColHeader, { width: styles.colWidths.transactionId }]}>
              <Text style={styles.tableCellHeader}>Transaction ID</Text>
            </View>
          </View>

          {/* Table Rows */}
          {salesReport.map((saleRecord, index) => (
            <View style={styles.tableRow} key={`${saleRecord._id}-${saleRecord.medicineId}-${index}`}>
              <View style={[styles.tableCol, { width: styles.colWidths.orderId }]}>
                <Text style={styles.tableCell}>{saleRecord._id}</Text>
              </View>
              <View style={[styles.tableCol, { width: styles.colWidths.medicineName }]}>
                <Text style={styles.tableCell}>{saleRecord.itemName}</Text>
              </View>
              <View style={[styles.tableCol, { width: styles.colWidths.sellerEmail }]}>
                <Text style={styles.tableCell}>{saleRecord.sellerEmail || 'N/A'}</Text>
              </View>
              <View style={[styles.tableCol, { width: styles.colWidths.buyerEmail }]}>
                <Text style={styles.tableCell}>{saleRecord.userEmail || 'N/A'}</Text>
              </View>
              <View style={[styles.tableCol, styles.qtyCol, { width: styles.colWidths.quantity }]}>
                <Text style={styles.tableCell}>{saleRecord.quantity}</Text>
              </View>
              <View style={[styles.tableCol, styles.priceCol, { width: styles.colWidths.pricePerUnit }]}>
                <Text style={styles.tableCell}>${saleRecord.priceAtAddToCart ? saleRecord.priceAtAddToCart.toFixed(2) : '0.00'}</Text>
              </View>
              <View style={[styles.tableCol, styles.totalPriceCol, { width: styles.colWidths.totalPrice }]}>
                <Text style={styles.tableCell}>${saleRecord.totalPricePerItem ? saleRecord.totalPricePerItem.toFixed(2) : '0.00'}</Text>
              </View>
              <View style={[styles.tableCol, { width: styles.colWidths.paymentStatus }]}>
                <Text
                  style={[
                    styles.statusBadge,
                    saleRecord.paymentStatus === 'paid' ? styles.statusPaid :
                    saleRecord.paymentStatus === 'pending_cod' ? styles.statusPending :
                    styles.statusUnknown
                  ]}
                >
                  {saleRecord.paymentStatus ? saleRecord.paymentStatus.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN'}
                </Text>
              </View>
              <View style={[styles.tableCol, { width: styles.colWidths.orderDate }]}>
                <Text style={styles.tableCell}>
                  {saleRecord.orderDate ? new Date(saleRecord.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }) : 'N/A'}
                </Text>
              </View>
              <View style={[styles.tableCol, { width: styles.colWidths.transactionId }]}>
                <Text style={styles.tableCell}>{saleRecord.transactionId || 'N/A'}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>Generated by Medi-Mart Sales Report System on {new Date().toLocaleDateString()}</Text>
      </Page>
    </Document>
  );
};

export default SalesReportPdfDocument;
