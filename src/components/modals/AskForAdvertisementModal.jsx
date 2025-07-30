import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import AskForAdModalForm from "../forms/AskForAdModalForm";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utilities/utilities";
import Container from "../shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AskForAdvertisementModal = ({ handleIsAddModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
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
    handleSubmit,

    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  //-------------------------------------------------------------------------
  //  Watching The Photo Input Field By medicinePhotoFile
  //--------------------------------------------------------------------------
  const medicinePhotoFile = watch("medicineAdvertisementPhoto");

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
    const onSubmit = async (data) => {
      data.mediPhoto = uploadedMedicinePhoto;
      // Submited For Adding In Database
      try{
        const {data:response} = await axiosSecure.post('/add-advertisement', data);
        if(response.insertedId){
           Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Medicine Added Successfully",
                  timer: 1500,
                });
                refetch();
                handleIsAddModal();

        }else{
           Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Something wrong!",
                  timer: 1500,
                });
        }
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-hidden">
      <div className="w-[400px] h-[500px] overflow-scroll bg-gray-300 text-gray-800 rounded-lg">
        {/* --------------------------------------------------------------------
           Ask For Advertisement Modal Header
                -------------------------------------------------------------------- */}
        <div className="sticky top-0 inset-x-0 z-1000 flex items-center justify-between bg-green-500 px-4 py-2">
          <h2 className="text-xl font-bold text-white">
            Add For New Advertisement
          </h2>
          <IoCloseSharp
            onClick={handleIsAddModal}
            size={26}
            className="border border-white rounded-md hover:bg-red-500 hover:text-white"
          />
        </div>

        {/* --------------------------------------------------------------------
                Ask For Advertisement Modal Form
                -------------------------------------------------------------------- */}
        <Container>
          <AskForAdModalForm
            handleIsAddModal={handleIsAddModal}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors} 
            isSubmitting={isSubmitting}
            uploadedMedicinePhoto={uploadedMedicinePhoto}
            uploadingMedicinePhoto={uploadingMedicinePhoto}
            photoUploadError={photoUploadError}
          />
        </Container>
      </div>
    </div>
  );
};

export default AskForAdvertisementModal;
