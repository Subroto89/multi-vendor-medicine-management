import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utilities/utilities";
import AddMedicineForm from "../forms/AddMedicineForm";
import { IoCloseSharp } from "react-icons/io5";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddMedicineModal = ({ handleAddMedicineModal }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user);
  //--------------------------------------------------------------
  //  Necessary State Variables For Medicine Photo Upload
  // --------------------------------------------------------------
  const [uploadedMedicinePhoto, setUploadedMedicinePhoto] = useState(null);
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
  } = useForm();

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
    data.seller = {
      sellerId: user?.uid,
      sellerEmail: user?.email,
      sellerName: user?.displayName,
      sellerPhoto: user?.photoURL,
    };

    const { data: response } = await axiosSecure.post("/add-medicine", data);
    if (response.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Medicine Added Successfully",
        timer: 1500,
      });
      handleAddMedicineModal();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Wrong!",
        timer: 1500,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center pt-16">
      <div className="relative w-[500px] h-[500px] overflow-scroll text-gray-700  bg-gray-100 rounded-lg  ">
        <div className="sticky top-0 inset-x-0 z-1000 flex items-center justify-between bg-green-500 px-4 py-2">
            <h2 className="text-xl font-bold text-white">Add New Medicine</h2>
          <IoCloseSharp
            onClick={handleAddMedicineModal}
            size={26}
            className="border border-white rounded-md hover:bg-red-500 hover:text-white"
          />
        </div>
        <div className="text-gray-800 flex flex-col gap-3 px-8 py-4">
          {/* -------------------------------------------------------------------------
      AddMedicineForm Component
      This Component Contains All the Input Fields & Submit Button
  ------------------------------------------------------------------------- */}
          <AddMedicineForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            uploadedMedicinePhoto={uploadedMedicinePhoto}
            uploadingMedicinePhoto={uploadingMedicinePhoto}
            photoUploadError={photoUploadError}
            handleAddMedicineModal={handleAddMedicineModal}
          />
        </div>
      </div>
    </div>
  );
};

export default AddMedicineModal;
