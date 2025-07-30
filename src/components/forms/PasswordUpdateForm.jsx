import React from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaKey } from "react-icons/fa";
import { BounceLoader } from "react-spinners";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth"; 
import InputField from "./InputField"; 

const PasswordUpdateForm = () => {
  // --------------------------------------------------------------
  // Necessary State Variables and Hooks
  // --------------------------------------------------------------
  const { user, loading, setLoading,     userPasswordUpdate } = useAuth(); 
 

  const {
    register,
    handleSubmit,
    reset,
    watch, 
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword"); 

  // --------------------------------------------------------------
  // Form Submission Handler
  // --------------------------------------------------------------
  const onSubmit = async (data) => {
    const { newPassword } = data;

    try {
        await userPasswordUpdate(user, newPassword);
        Swal.fire({
            icon: 'success',
            title: 'Password Updated!',
            text: 'Your password has been successfully updated',
            timer: 1500,
            showConfirmButton: false
        })
        setLoading(false);
        reset();
    } catch (error) {
      console.error("Error updating password:", error);
      
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: `An error occurred: ${error.response?.data?.message || error.message || 'Please try again.'}`,
      });
      setLoading(false)
    }
  };

  
  if (loading) {
    return <div className="flex justify-center items-center h-40"><BounceLoader color="#36d7b7" /></div>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
        <FaLock /> Change Password
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <InputField
          label="Current Password"
          name="currentPassword"
          type="password"
          placeholder="Enter your current password"
          icon={FaKey}
          register={register}
          errors={errors}
          validationRules={{
            required: "Current password is required",
          }}
        />

        {/* New Password */}
        <InputField
          label="New Password"
          name="newPassword"
          type="password"
          placeholder="Enter your new password"
          icon={FaLock}
          register={register}
          errors={errors}
          validationRules={{
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
            // Add more complexity rules if desired (e.g., regex for uppercase, number, symbol)
            // pattern: {
            //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            //   message: "Must include uppercase, lowercase, number, and special character",
            // },
          }}
        />

        {/* Confirm New Password */}
        <InputField
          label="Confirm New Password"
          name="confirmNewPassword"
          type="password"
          placeholder="Confirm your new password"
          icon={FaLock}
          register={register}
          errors={errors}
          validationRules={{
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? <BounceLoader size={24} color="#fff" /> : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdateForm;
