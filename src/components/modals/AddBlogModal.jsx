import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import InputField from "../forms/InputField";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import {imageUpload} from "../../utilities/utilities"
import AddBlogForm from "../forms/AddBlogForm";
import Swal from "sweetalert2";

const AddBlogModal = ({ handleAddBlogModal }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //--------------------------------------------------------------
  //  Necessary State Variables For Medicine Photo Upload
  // --------------------------------------------------------------
  const [uploadedBlogPhoto, setUploadedBlogPhoto] = useState(null);
  const [uploadingBlogPhoto, setUploadingBlogPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);



  //--------------------------------------------------------------
  //  React Hook Form Handler
  // -------------------------------------------------------------

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();




    //-------------------------------------------------------------------------
  //  Watching The Photo Input Field By medicinePhotoFile
  //--------------------------------------------------------------------------
  const blogPhoto = watch("blogPhoto");

  //-------------------------------------------------------------------------
  //   Medicine Photo Uploade Function - Depends on the medicinePhotoFile
  //--------------------------------------------------------------------------
  useEffect(() => {
    const uploadFile = async () => {
      if (blogPhoto && blogPhoto.length > 0) {
        setUploadedBlogPhoto(null);
        setPhotoUploadError(null);
        setUploadingBlogPhoto(true);
        try {
          const imageUrl = await imageUpload(blogPhoto[0]);
          setUploadedBlogPhoto(imageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedBlogPhoto(null);
        } finally {
          setUploadingBlogPhoto(false);
        }
      }
    };
    uploadFile();
  }, [blogPhoto]);


  const onSubmit = async (data) => {
    
    data.blogPhoto = uploadedBlogPhoto;
    data.author = {
      
      authorEmail: user?.email,
      authorName: user?.displayName
    };
    try{
         const { data: response } = await axiosSecure.post("/add-blog", data);
    if (response.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Blog Added Successfully",
        timer: 1500,
      });
      handleAddBlogModal();
    //   refetch();
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
      <div className="relative w-9/12 h-11/12 rounded-lg bg-gray-50 p-6 text-gray-700">
        <button
          onClick={handleAddBlogModal}
          className="absolute top-6 right-6 border border-gray-500 p-1 rounded-md hover:bg-red-600 hover:text-white"
        >
          <MdClose />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Blog Info</h2>

        {/* ----------------------------------------------------------------------------
                Form For Blog Adding
                ---------------------------------------------------------------------------- */}
                <AddBlogForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            uploadedBlogPhoto={uploadedBlogPhoto}
            uploadingBlogPhoto={uploadingBlogPhoto}
            photoUploadError={photoUploadError}
            handleAddBlogModal={handleAddBlogModal}
          />
      </div>
    </div>
  );
};

export default AddBlogModal;
