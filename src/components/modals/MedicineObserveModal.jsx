import React from "react";
import { MdClose } from "react-icons/md";
import { format } from 'date-fns'; // For better date formatting

const MedicineObserveModal = ({ particularMedicine, handleMedicineObserveModal, handleMedicineStatus }) => {
  // Destructure medicine details with default values for safety
  const {
    _id,
    medicineName = "N/A",
    genericName = "N/A",
    mediPhoto, 
    shortDescription = "No description provided.",
    categoryName = "N/A",
    company = "N/A",
    createdAt, 
    perUnitPrice = "N/A",
    sellerEmail = "N/A", 
    status
  } = particularMedicine;

  // Format the creation date
  const formattedDate = createdAt ? format(new Date(createdAt), 'PPP') : 'N/A';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col text-gray-600">
        {/* Close Button */}
        <button
          onClick={handleMedicineObserveModal}
          className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 z-10"
          aria-label="Close modal"
        >
          <MdClose size={24} />
        </button>

        {/* Modal Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Medicine Details: {medicineName}
          </h2>
          <p className="text-center text-blue-100 mt-1">{genericName}</p>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Medicine Photo */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-lg border-4 border-blue-200 shadow-md bg-gray-50 flex items-center justify-center">
                <img
                  src={mediPhoto || "https://placehold.co/224x224/E0E7FF/4338CA?text=No+Image"} // Fallback image
                  alt={medicineName}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/224x224/E0E7FF/4338CA?text=Image+Error"; }}
                />
              </div>
            </div>

            {/* Medicine Details */}
            <div className="w-full md:w-2/3 text-gray-700 space-y-3">
              <p className="text-lg font-semibold text-blue-700">Description:</p>
              <p className="text-base leading-relaxed">{shortDescription}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4">
                <div>
                  <span className="font-medium text-gray-600">Category:</span> {categoryName}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Company:</span> {company}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Price per Unit:</span> ${perUnitPrice}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Seller Email:</span> {sellerEmail}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className={`font-bold ml-1 ${status === 'Approved' ? 'text-green-600' : status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {status}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Created On:</span> {formattedDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer - Action Buttons */}
        <div className="bg-gray-100 p-6 flex justify-end gap-4 rounded-b-xl border-t border-gray-200">
          
         {status === "inactive" ? (
            <button
              onClick={() => handleMedicineStatus(_id, "active")}
              className="btn btn-outline btn-xs hover:bg-green-500 hover:text-white w-32"
            >
              Approve
            </button>
          ) : (
            <button
              onClick={() => handleMedicineStatus(_id, "inactive")}
              className="btn btn-outline btn-xs hover:bg-red-600 hover:text-white w-32"
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineObserveModal;
