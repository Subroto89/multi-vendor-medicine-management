import React from "react";
import { MdDelete, MdVisibility } from "react-icons/md";

const MyMediAdsRow = ({ mediAd, handleAdsDelete, handleAdViewModal, handleParticularAd }) => {
  const {
    _id,
    adDescription,
    mediPhoto,
    linkedMedicineId,
    linkedMedicineName,
    linkedMedicineGenericName,
    status,
    rejectionReason,
    createdAt,
    updatedAt,
  } = mediAd;
  return (
    <tr className="min-w-full divide-y divide-gray-200 text-gray-700 text-sm font-normal hover:bg-blue-50 transition-color duration-300">
      <td className="px-5 w-12 h-12 overflow-hidden">
        <img src={mediPhoto} className="w-12 h-12 object-cover" />
      </td>
      <td className="px-5 text-center">{linkedMedicineName}</td>
      <td className="px-5 text-center">{linkedMedicineGenericName}</td>
      <td className="px-5 text-center">{status}</td>
      <td className="px-5 text-center">
        {new Date(createdAt).toLocaleDateString()}
      </td>
      <td className="px-5 text-center">
        <div className="flex items-center gap-2">
          <MdVisibility onClick={()=>{handleAdViewModal(), handleParticularAd(mediAd)}} className="btn btn-outline btn-xs hover:bg-green-500 hover:text-white" />
          <MdDelete onClick={()=>handleAdsDelete(_id)} className="btn btn-outline btn-xs hover:bg-red-500 hover:text-white" />
        </div>
      </td>
    </tr>
  );
};

export default MyMediAdsRow;
