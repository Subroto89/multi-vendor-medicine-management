import axios from "axios";
import React from "react";
import { MdAdd, MdDelete, MdVisibility } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertisementRow = ({ advertisement, refetch }) => {
    const axiosSecure = useAxiosSecure();
  const {
    _id,
    mediPhoto,
    adDescription,
    linkedMedicineName,
    sellerEmail,
    status,
    createdAt,
  } = advertisement;

  //   Date Formation For Better Understandable-----------------------
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  // Determine status badge styling --------------------------------
  const statusBadgeClasses =
    status === "active"
      ? "bg-green-100 text-green-800"
      : status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : status === "rejected"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";


      const handleAdvertisementStatus = async (medicineId, action ) => {

        const confirm = await Swal.fire({
            title:`${action === "approve" ? "Approve" : "Reject"} Application?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }) 
        
        if(!confirm.isConfirmed) return ;


            try{
                const {data} = await axiosSecure.patch(`/advertisement/approve/reject/${medicineId}`, {
                    status: action === "approve" ? "Approved" : "Rejected" 
                });
                if(data.modifiedCount){
                    Swal.fire({
                        icon: "success",
                        title: `Advertisement has been ${action === "approve" ? "approved" : "rejected"} successfully`,
                        timer: 1500
                    })
                    refetch();
                }
                console.log(data);
            }catch(err){
                console.log(err)
            }
      }

  return (
    <tr className="hover:bg-blue-50">
      <td className="px-5 py-2">
        <img src={mediPhoto} alt="medicine photo" className="w-16 h-16" />
      </td>
      <td className="py-2 max-w-40  truncate">{adDescription}</td>
      <td className="px-5 py-2 text-center">{linkedMedicineName}</td>
      <td className="px-5 py-2">{sellerEmail}</td>
      <td className="px-5 py-2 text-center">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadgeClasses}`}
        >
          {status.replace(/_/g, " ")}
        </span>
      </td>
      <td className="px-5 py-2">{formattedDate}</td>
      <td className="px-5 py-2">
        <div className="flex items-center gap-2">
            <MdVisibility className="btn btn-outline btn-xs cursor-pointer hover:bg-blue-400"/>
          {status === "pending" || status === "Rejected" ? (
            <button onClick={()=>handleAdvertisementStatus(_id, "approve")} className="btn btn-outline btn-xs hover:bg-green-500 hover:text-white ">
              Add To Slide
            </button>
          ) : (
            <button onClick={()=>handleAdvertisementStatus(_id, "reject")} className="btn btn-outline btn-xs hover:bg-red-600 hover:text-white ">
              Remove From Slide
            </button>
          )}

          {/* 
          <MdAdd className="btn btn-outline btn-xs cursor-pointer hover:bg-green-400"/>
          <MdDelete className="btn btn-outline btn-xs cursor-pointer hover:bg-red-600 hover:text-white"/> */}
        </div>
      </td>
    </tr>
  );
};

export default AdvertisementRow;
