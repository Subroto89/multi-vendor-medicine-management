import React from "react";
import { MdOutlineClose } from "react-icons/md";

const AdvertisementViewModal = ({ handleAdViewModal, particularAd }) => {
  const {
    adDescription,
    mediPhoto,
    linkedMedicineName,
    linkedMedicineGenericName,
    status,
    isApproved,
    rejectionReason,
    createdAt,
  } = particularAd;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative w-8/12 h-8/12 rounded-lg bg-gray-50 p-6 text-gray-600">
        {/* Close Button ----------------------------------------------------------------------------------------- */}
        <button
          onClick={handleAdViewModal}
          className="absolute right-10 text-gray-800 border border-gray-600 rounded-md hover:bg-red-600 hover:text-white"
        >
          <MdOutlineClose size={24} />
        </button>
        {/* Ad Info Section -------------------------------------------------------------------------------------- */}
        <div className="flex items-center gap-6">
          {/* Left Part (Medicine Photo Section) ----------------------------------------------------------------- */}
          <div>
            <div className="overflow-hidden">
              <img
                src={mediPhoto}
                alt="medicine photo"
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>
          
          {/* Righ Part (Medicine Info Section) ----------------------------------------------------------------- */}
          <div>
            <p className="text-gray-700 font-extrabold text-3xl mb-8">{linkedMedicineName}</p>
            <p><span className="font-bold pr-2">Generic Name:</span>{linkedMedicineGenericName}</p>
            
            <p><span className="font-bold pr-2">Description:</span>{adDescription}</p>

            <p><span className="font-bold pr-2">Applied on:</span>{new Date(createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })}</p>
            <p><span className="font-bold pr-2">Ad Status:</span> {status}</p>
            {isApproved && (
                <p><span className="font-bold pr-2">Rejection Reason:</span> {rejectionReason}</p>
            )}
            

          </div>
        </div>
      </div>    
    </div>
  );
};

export default AdvertisementViewModal;
