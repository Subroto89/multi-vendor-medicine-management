import { MdCategory } from "react-icons/md";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { imageUpload } from "../../utilities/utilities";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AddCategoryForm = ({ handleCategoryModal }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //--------------------------------------------------------------
  //  Necessary State Variables
  // --------------------------------------------------------------
  const [uploadedCategoryPhoto, setUploadedCategoryPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const categoryPhoto = watch("categoryPhoto");

  useEffect(() => {
    const uploadFile = async () => {
      if (categoryPhoto && categoryPhoto.length > 0) {
        setUploadedCategoryPhoto(null);
        setPhotoUploadError(null);
        setUploadingPhoto(true);
        try {
          const imageUrl = await imageUpload(categoryPhoto[0]);
          setUploadedCategoryPhoto(imageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedCategoryPhoto(null);
        } finally {
          setUploadingPhoto(false);
        }
      }
    };
    uploadFile();
  }, [categoryPhoto]);

  const onSubmit = async (data) => {
    data.categoryPhoto = uploadedCategoryPhoto;
    data.createdBy = user?.email;

    try {
      const { data: info } = await axiosSecure.post("/save-category", data);

      if (info.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Category Added Successfully",
          timer: 1500,
        });
        handleCategoryModal();
      } else {
        Swal.fire("Category Addition Failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-8">
      <form
        className="flex flex-col gap-3 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-3">
          <div className=" space-y-3">
            <InputField
              label="Category Name"
              name="catName"
              type="text"
              placeholder="Enter the category name"
              icon={MdCategory}
              register={register}
              errors={errors}
              validationRules={{
                required: "Category Name is required",
                minLength: {
                  value: 5,
                  message: "Category Name must be at least 5 characters long",
                },
              }}
            />

            <InputField
              label=""
              name="categoryPhoto"
              type="file"
              placeholder="Select the category photo"
              icon={FaUpload}
              register={register}
              errors={errors}
              validationRules={{
                required: "category photo is required",
                validate: (value) => {
                  if (value.length === 0) return "Please upload a photo";
                  const file = value[0];
                  const validTypes = ["image/jpeg", "image/png", "image/gif"];
                  if (!validTypes.includes(file.type)) {
                    return "Only JPEG, PNG, and GIF files are allowed";
                  }
                  if (file.size > 2 * 1024 * 1024) {
                    return "File size must be less than 2MB";
                  }
                  return true;
                },
              }}
            />
          </div>

          <div className="w-28 h-24 rounded-md overflow-hidden border-2 border-gray-300 mb-1 mt-5 flex items-center justify-end">
            {uploadedCategoryPhoto ? (
              <img
                src={uploadedCategoryPhoto}
                alt="User Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center pr-2">
                {uploadingPhoto ? (
                  <PuffLoader size={56} />
                ) : (
                  <MdCategory size={40} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------------
                Action Button For Adding Category & Cancel Button
                -------------------------------------------------------------- */}

        <div>
          <button
            disabled={isSubmitting || uploadingPhoto}
            type="submit"
            className="btn bg-green-500 rounded-lg w-full"
          >
            {uploadingPhoto ? (
              <h2 className="text-green-500">Photo Uploading ...</h2>
            ) : (
              "Add Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
