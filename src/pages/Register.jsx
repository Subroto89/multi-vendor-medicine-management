import { useForm } from "react-hook-form";
import RegisterForm from "../components/forms/RegisterForm";
import { useEffect, useState } from "react";
import { imageUpload } from "../utilities/utilities";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router";
import GoogleLogin from "../components/shared/GoogleLogin";
import useAuth from "../hooks/useAuth";

const Register = () => {
  //--------------------------------------------------------------
  //  Necessary State Variables
  // --------------------------------------------------------------
  const [uploadedUserPhoto, setUploadedUserPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);


  const {createUser, updateUserProfile} = useAuth();
  //--------------------------------------------------------------
  //  React Hook Form Handling
  // --------------------------------------------------------------
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");
  const profilePhotoFile = watch("profilePhoto");

  //-------------------------------------------------------------------------
  //   Image Uploade Function - Depends on the profilePhotoFile
  //--------------------------------------------------------------------------

  useEffect(() => {
    const uploadFile = async () => {
      if (profilePhotoFile && profilePhotoFile.length > 0) {
        setUploadedUserPhoto(null);
        setPhotoUploadError(null);
        setUploadingPhoto(true);
        try {
          const imageUrl = await imageUpload(profilePhotoFile[0]);
          setUploadedUserPhoto(imageUrl);
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

  //-------------------------------------------------------------------------
  //   Form Submit Function
  //--------------------------------------------------------------------------
  const onSubmit = async(data) => {
    console.log("Form Data Submitted:", data);
    
    try{
        const result = await createUser(data.userEmail, data.password);
        const userData = {
            displayName: data.name,
            photoURL: uploadedUserPhoto
        }
        await updateUserProfile(userData)
        console.log(result)
    }catch(err){
        console.log(err)
    }
    
  };
  // ###########################################################################
  return (
    <div className="border border-white rounded-lg shadowlg m-4 p-4 bg-gradient-to-bl from-[#1F5591] to-[#80A5AB] opacity-70">
      <div className="flex gap-3">
        <FaUserPlus size={60} />
        <h2 className="text-4xl font-bold mb-8 pt-2">Register</h2>
      </div>
      {/* -----------------------------------------------------------
      RegisterForm Component
      This Component Contains All the Input Fields & Submit Button
      ----------------------------------------------------------- */}
      <RegisterForm
        register={register}
        watch={watch}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        uploadedUserPhoto={uploadedUserPhoto}
        uploadingPhoto={uploadingPhoto}
        photoUploadError={photoUploadError}
        password={password}
      />

      <div className="divider px-20">OR</div>
      {/* -----------------------------------------------------------
      Google Login Button
      ----------------------------------------------------------- */}
      <GoogleLogin/>
      {/* -----------------------------------------------------------
      Already Account Exist Section
      ----------------------------------------------------------- */}
      <p className="text-center mt-1">
        Already have an account?
        <Link to="/auth/joinUs">
          <span className="text-white font-sm link"> Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Register;
