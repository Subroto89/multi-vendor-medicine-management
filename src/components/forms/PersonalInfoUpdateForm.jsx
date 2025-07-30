import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaUpload, FaUser, FaUserEdit } from "react-icons/fa";
import { BounceLoader, PuffLoader } from "react-spinners";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InputField from "./InputField";
import { imageUpload } from "../../utilities/utilities";

const PersonalInfoUpdateForm = () => {
  // --------------------------------------------------------------
  // Necessary State Variables and Hooks
  // --------------------------------------------------------------
  const { user, loading, setLoading, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [uploadedUserPhoto, setUploadedUserPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const profilePhotoFile = watch("profilePhoto");

  // --------------------------------------------------------------
  // Effect to fetch initial user data and populate form
  // --------------------------------------------------------------
  useEffect(() => {
    const fetchAndSetUserData = async () => {
      if (user?.email) {
        try {
          const { data } = await axiosSecure.get(
            `/get-user-profile/${user.email}`
          );

          setUploadedUserPhoto(data.profilePhotoUrl || user.photoURL || null);
          reset({
            fullName: data.fullName || user.displayName || "",
            userEmail: data.userEmail || user.email || "",
            phoneNumber: data.phoneNumber || "",
          });
        } catch (error) {
          console.error("Failed to fetch user profile data:", error);
          Swal.fire("Error", "Failed to load profile data.", "error");
        } finally {
          setIsFetchingInitialData(false);
        }
      } else {
        setIsFetchingInitialData(false);
      }
    };

    if (!loading) {
      fetchAndSetUserData();
    }
  }, [user, loading, axiosSecure, reset]);

  // --------------------------------------------------------------
  // Effect to handle image upload preview and actual upload
  // --------------------------------------------------------------
  useEffect(() => {
    const uploadFile = async () => {
      if (profilePhotoFile && profilePhotoFile.length > 0) {
        const file = profilePhotoFile[0];
        setPhotoUploadError(null);

        // Basic client-side validation for file type and size
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
          setPhotoUploadError("Only JPEG, PNG, and GIF files are allowed.");
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          // 2MB limit
          setPhotoUploadError("File size must be less than 2MB.");
          return;
        }

        setUploadingPhoto(true);
        try {
          const imageUrl = await imageUpload(file);
          setUploadedUserPhoto(imageUrl);
          Swal.fire({
            icon: "success",
            title: "Photo Uploaded!",
            text: "Your new profile photo has been uploaded.",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Image upload failed:", error);
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedUserPhoto(null);
        } finally {
          setUploadingPhoto(false);
        }
      }
    };
    uploadFile();
  }, [profilePhotoFile]);

  // --------------------------------------------------------------
  // Form Submission Handler
  // --------------------------------------------------------------
  const onSubmit = async (data) => {
    if (uploadingPhoto) {
      Swal.fire(
        "Please Wait",
        "Profile photo is still uploading. Please wait.",
        "info"
      );
      return;
    }
    if (photoUploadError) {
      Swal.fire(
        "Error",
        "Please fix the photo upload error before saving.",
        "error"
      );
      return;
    }

    const updatedProfile = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      profilePhotoUrl: uploadedUserPhoto,
    };

    try {
      const res = await axiosSecure.patch(
        `/update-user-profile/${user.email}`,
        updatedProfile
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          timer: 1500,
          showConfirmButton: false,
        });
        if (
          user.displayName !== data.fullName ||
          user.photoURL !== uploadedUserPhoto
        ) {
          await updateUserProfile({
            displayName: data.fullName,
            photoURL: uploadedUserPhoto
          });
        }
        setLoading(false)
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "No new changes were made to your profile.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: `An error occurred: ${
          error.response?.data?.message || error.message
        }`,
      });
    }
  };

    if (loading || isFetchingInitialData) {
      return <div className="flex justify-center items-center h-40"><BounceLoader color="#36d7b7" /></div>;
    }

  return (
    <div>
      <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        <FaUserEdit className="text-blue-500" />
        Personal Information
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
        {/* User Name Field ---------------------------------------------------------------------------------------------------*/}
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          icon={FaUser}
          register={register}
          errors={errors}
          validationRules={{
            required: "Full Name is required",
            minLength: {
              value: 3,
              message: "Full Name must be at least 3 characters long",
            },
          }}
        />
        {/* User Email Field (Read-only) --------------------------------------------------------------------------------------*/}
        <InputField
          label="User Email"
          name="userEmail"
          type="email"
          placeholder="xyz@gmail.com"
          icon={FaEnvelope}
          register={register}
          errors={errors}
          readOnly={true}
          validationRules={{
            required: "User Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
        />
        {/* Phone Number Field ------------------------------------------------------------------------------------------------*/}
        <InputField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          placeholder="e.g., +1234567890"
          icon={FaEnvelope}
          register={register}
          errors={errors}
        />
        {/* Profile Photo Upload Field ---------------------------------------------------------------------------------------*/}
        <InputField
          label="Profile Photo"
          name="profilePhoto"
          type="file"
          placeholder="Select your profile photo"
          icon={FaUpload}
          register={register}
          errors={errors}
          validationRules={{
            validate: (value) => {
              if (value && value.length > 0) {
                const file = value[0];
                const validTypes = ["image/jpeg", "image/png", "image/gif"];
                if (!validTypes.includes(file.type)) {
                  return "Only JPEG, PNG, and GIF files are allowed";
                }
                if (file.size > 2 * 1024 * 1024) {
                  return "File size must be less than 2MB";
                }
              }
              return true;
            },
          }}
        />
        {/* User Photo Viewer Field ----------------------------------------------------------------------------------------*/}
        <div className="absolute right-2 top-6 w-20 h-24 rounded-md overflow-hidden border-2 border-gray-300 flex items-center justify-center">
          {uploadedUserPhoto ? (
            <img
              src={uploadedUserPhoto}
              alt="User Photo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              {uploadingPhoto ? (
                <PuffLoader size={50} color="#36d7b7" />
              ) : (
                <FaUser size={50} className="text-gray-400" />
              )}
            </div>
          )}
        </div>
        {photoUploadError && (
          <p className="text-red-500 text-xs mt-1">{photoUploadError}</p>
        )}
        {/* Submit Button --------------------------------------------------------------------------------------------------*/}
        <button
          type="submit"
          disabled={isSubmitting || uploadingPhoto}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <BounceLoader size={24} color="#fff" />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoUpdateForm;
