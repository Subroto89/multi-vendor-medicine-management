import React from "react";
import { MdOutlineClose } from "react-icons/md";

const BannerAdModal = ({ handleBannerAdModal, particularBannerAd }) => {
  const {
    mediPhoto,
    adDescription,
    linkedMedicineName,
    linkedMedicineGenericName,
    sellerEmail,
    sellerName,
    status,
    createdAt,
  } = particularBannerAd;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative w-3/4 h-3/4 rounded-lg bg-gray-50 p-16">
        <MdOutlineClose
          onClick={handleBannerAdModal}
          size={24}
          className="absolute right-10 top-6 border border-gray-600 rounded-md text-gray-600 hover:bg-red-600 hover:text-white"
        />
        <div className="flex items-center gap-4">
          <div>
            <img src={mediPhoto} />
          </div>
          <div className="text-gray-600">
            <h2 className="font-extrabold text-3xl text-center">
              {linkedMedicineName}
            </h2>
            <p className="mt-4 mb-6">{adDescription}</p>
            <p className="mt-4 mb-6"><span className="font-bold mr-2">Generic Name:</span>{linkedMedicineGenericName}</p>
            <p>
              <span className="font-bold mr-2">Seller Email:</span>
              {sellerEmail}
            </p>
            <p>
              <span className="font-bold mr-2">Seller Name:</span>
              {sellerName}
            </p>
            <p>
              <span className="font-bold mr-2">Advertisement Status:</span>
              {status}
            </p>
            <p><span className="font-bold mr-2">Applied On:</span>
              {new Date(createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAdModal;
