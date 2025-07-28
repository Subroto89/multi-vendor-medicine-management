import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utilities/utilities";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import MedicineEditForm from "../forms/MedicineEditForm";
import { FaEdit, FaTimes } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";


const MedicineEditModal = ({ handleMedicineEditModal, refetch, particularMedicine }) => {
    const {_id, medicineName, mediPhoto, genericName, shortDescription, company, itemMassUnit, perUnitPrice, discountPercentage} = particularMedicine;
    const axiosSecure = useAxiosSecure();
  //--------------------------------------------------------------
  // Necessary State Variables For Medicine Photo Upload //
  // --------------------------------------------------------------
  const [uploadedMedicinePhoto, setUploadedMedicinePhoto] = useState(mediPhoto);
  const [uploadingMedicinePhoto, setUploadingMedicinePhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);

  //--------------------------------------------------------------
  //  React Hook Form Handler
  // --------------------------------------------------------------
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({defaultValues:{
    medicineName: medicineName,
    genericName: genericName,
    shortDescription: shortDescription,
    company: company,
    itemMassUnit: itemMassUnit,
    perUnitPrice: perUnitPrice,
    discountPercentage: discountPercentage,
  }});

  //-------------------------------------------------------------------------
  //  Watching The Photo Input Field By medicinePhotoFile
  //--------------------------------------------------------------------------
  const medicinePhotoFile = watch("medicinePhoto");


  //-------------------------------------------------------------------------
    //   Medicine Photo Uploade Function - Depends on the medicinePhotoFile
    //--------------------------------------------------------------------------
    useEffect(() => {
      const uploadFile = async () => {
        if (medicinePhotoFile && medicinePhotoFile.length > 0) {
          setUploadedMedicinePhoto(null);
          setPhotoUploadError(null);
          setUploadingMedicinePhoto(true);
          try {
            const imageUrl = await imageUpload(medicinePhotoFile[0]);
            setUploadedMedicinePhoto(imageUrl);
          } catch (error) {
            console.error("Image upload failed:", error);
            setPhotoUploadError("Image upload failed. Please try again.");
            setUploadedMedicinePhoto(null);
          } finally {
            setUploadingMedicinePhoto(false);
          }
        }
      };
      uploadFile();
    }, [medicinePhotoFile]);

      //-------------------------------------------------------------------------
      //   Form Submition Function
      //--------------------------------------------------------------------------
      const onSubmit = async (data) => {
        
        data.mediPhoto = uploadedMedicinePhoto;
       
        try{
             const { data: response } = await axiosSecure.patch(`/update-medicine/${_id}`, data);
             console.log(response)
        if (response.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Medicine Added Successfully",
            timer: 1500,
          });
          handleMedicineEditModal();
          refetch();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something Wrong!",
            timer: 1500,
          });
        }
        }catch(error){
          console.log(error)
        }
    
     
      };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-6/12 h-10/12 rounded-lg p-6 bg-gray-50 text-gray-700 overflow-auto">
        
        <div className="relative font-bold text-2xl text-gray-700 text-center mb-6 flex items-center justify-center gap-3">
            <FaEdit/>Medicine Edit
            <MdOutlineClose onClick={handleMedicineEditModal} className="absolute right-0 border border-gray-500 rounded-md hover:bg-red-500 hover:text-white"/>
        </div>

       
       
      
        
         <div className="text-gray-800 flex flex-col gap-3 px-8 py-4">
          {/* -------------------------------------------------------------------------
      Medicine Edit Form Component
      This Component Contains All the Input Fields & Submit Button
  ------------------------------------------------------------------------- */}
          <MedicineEditForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            uploadedMedicinePhoto={uploadedMedicinePhoto}
            uploadingMedicinePhoto={uploadingMedicinePhoto}
            photoUploadError={photoUploadError}
            handleMedicineEditModal={handleMedicineEditModal}
          />
        </div>

      </div>
    </div>
  );
};

export default MedicineEditModal;
