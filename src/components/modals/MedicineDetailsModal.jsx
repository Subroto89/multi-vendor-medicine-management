import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon

const MedicineDetailsModal = ({
  handleMedicineDetailsModal,
  particularMedicine,
}) => {
  const {
    mediPhoto,
    shortDescription,
    medicineName,
    categoryName,
    genericName,
    company,
    stockQuantity,
    status,
    discoutPercentage,
    createdAt,
    updatedAt,
    isApproved,
    perUnitPrice,
  } = particularMedicine;

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return "N/A";
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Helper function to format percentage
  const formatPercentage = (value) => {
    if (typeof value !== 'number') return "N/A";
    return `${value}%`;
  };

  // Helper for boolean status
  const formatApprovalStatus = (isApproved) => {
    return isApproved ? 'Approved' : 'Pending';
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      {/* Main Modal Container: Wider for landscape, controlled max-height */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl p-6 w-full max-w-5xl max-h-[90vh] shadow-2xl text-gray-800 relative flex flex-col">
        
        {/* Close Button (Top Right) */}
        <button
          onClick={handleMedicineDetailsModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-2 transition-colors duration-200"
          aria-label="Close modal"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Title Section - fixed height contribution */}
        <h2 className="text-4xl font-extrabold text-center text-teal-800 mb-6 border-b-2 border-teal-300 pb-4 flex-shrink-0">
          {medicineName || 'Medicine Details'}
        </h2>

        {/* Main Content Area: Image (Left) & Details/Description (Right) */}
        {/* Uses flex-grow and overflow-hidden to allow this section to take available height and contain internal scroll */}
        <div className="flex flex-col md:flex-row gap-8 flex-grow overflow-hidden">
          
          {/* Image Section (Left Column) - fixed height contribution */}
          <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md border border-gray-100">
            <div className="w-48 h-48 sm:w-56 sm:h-56 overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm flex-shrink-0 mb-4">
              <img
                src={mediPhoto || 'https://via.placeholder.com/256?text=No+Image'}
                alt={medicineName || "Medicine Photo"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details & Description Section (Right Column) - This is the scrollable part */}
          <div className="w-full md:w-2/3 flex-grow flex flex-col overflow-y-auto pr-2 custom-scrollbar"> {/* Added pr-2 for scrollbar space */}
            
            {/* Short Description */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6 flex-shrink-0">
              <h3 className="font-bold text-xl text-gray-700 mb-3">Description:</h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {shortDescription || 'No short description available for this medicine.'}
              </p>
            </div>

            {/* Details Grid - Gaps further reduced */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 flex-grow"> {/* Reduced gap-y and gap-x */}
              <DetailItem label="Category" value={categoryName} />
              <DetailItem label="Generic Name" value={genericName} />

              <DetailItem label="Company" value={company} />
              <DetailItem label="Unit Price" value={formatCurrency(perUnitPrice)} />

              <DetailItem label="Stock Quantity" value={stockQuantity !== undefined ? `${stockQuantity} units` : 'N/A'} />
              <DetailItem label="Status" value={status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'} colorClass={status === 'active' ? 'text-green-600' : 'text-red-600'} />

              <DetailItem label="Discount" value={formatPercentage(discoutPercentage)} />
              <DetailItem label="Approval" value={formatApprovalStatus(isApproved)} colorClass={isApproved ? 'text-green-600' : 'text-yellow-600'} />

              <DetailItem label="Created At" value={formatDate(createdAt)} colSpan="sm:col-span-2" />
              <DetailItem label="Last Updated At" value={formatDate(updatedAt)} colSpan="sm:col-span-2" />
            </div>
          </div>
        </div>

        
      </div>

      {/* Custom Scrollbar Styles (optional - add this to your main CSS file or a style block) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

// --- Reusable Detail Item Component ---
const DetailItem = ({ label, value, colSpan, colorClass }) => (
  <div className={`flex flex-col ${colSpan || ''} p-1 bg-white rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200`}> {/* Reduced p-1 */}
    <span className="font-bold text-sm text-gray-500 mb-0.5">{label}:</span> {/* Reduced mb-0.5 */}
    <span className={`text-lg font-medium ${colorClass || 'text-gray-900'}`}>{value}</span>
  </div>
);

export default MedicineDetailsModal;