import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "../../components/shared/GoogleLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import RegisterForm from "../../components/forms/RegisterForm";
import { imageUpload, saveUserToDatabase, TabTitle } from "../../utilities/utilities";


const Register = () => {
  TabTitle('Register');
  //--------------------------------------------------------------
  //  Necessary State Variables
  // --------------------------------------------------------------
  const [uploadedUserPhoto, setUploadedUserPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  //--------------------------------------------------------------
  //  React Hook Form Handler
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
  //   Form Submition Function
  //--------------------------------------------------------------------------
  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);

    try {
      // Step 1: Create User---------------------------------------
      const { user } = await createUser(data.userEmail, data.password);
      console.log(user)

      // Step 2: Update Profile------------------------------------
      const userData = {
        displayName: data.userName,
        photoURL: uploadedUserPhoto,
      };
      await updateUserProfile(userData);

      // Step 3: Show Success Message -------------------------------
      if(user.uid){
        Swal.fire({
        icon: "success",
        title: "You are registered successfully!",
        text: `Welcome, ${user.displayName}!`,
        showConfirmButton: false,
        timer: 1500,
      });
      }

      // Step 4: Save User Data To Database -------------------------
      const userDataToDb = {
        userName: data?.userName,
        userEmail: data?.userEmail,
        userPhoto: uploadedUserPhoto,
        userRole: data?.role
      }
      

      saveUserToDatabase(userDataToDb)






      //   Step 5: Navigate User to Home Page
      navigate("/");
      
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong!",
      });
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
      <GoogleLogin />
      {/* -----------------------------------------------------------
      Already Account Exist Suggestion Section
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
