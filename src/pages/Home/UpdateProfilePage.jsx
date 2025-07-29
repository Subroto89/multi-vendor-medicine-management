import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Container from "../../components/shared/Container";
import { FaUserEdit, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import { TabTitle } from "../../utilities/utilities";

const UpdateProfilePage = () => {
  TabTitle("Update Profile");

  const { user, loading, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [fullUserData, setFullUserData] = React.useState(null);
  const [isDataLoading, setIsDataLoading] = React.useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const { data } = await axiosSecure.get(
            `/get-user-profile/${user.email}`
          );
          setFullUserData(data);
        } catch (error) {
          console.error("Failed to fetch user profile data:", error);
          Swal.fire("Error", "Failed to load profile data.", "error");
        } finally {
          setIsDataLoading(false);
        }
      } else {
        setIsDataLoading(false);
      }
    };
    fetchUserData();
  }, [user, axiosSecure, reset, fullUserData]);

  const onSubmit = async (data) => {
    const updatedProfile = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      shippingAddress: {
        fullName: data.fullName,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
      },
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
        // Optionally update Firebase/Auth context displayName if fullName changed
        if (user.displayName !== data.fullName) {
          await updateUserProfile(data.fullName);
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "No changes were made to your profile.",
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

  // Handle password change separately for security
  const handleChangePassword = async (data) => {
    Swal.fire(
      "Info",
      "Password change functionality needs backend implementation.",
      "info"
    );
    console.log("Password change data:", data);
  };

  if (loading || isDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl text-gray-600">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8 flex items-center justify-center gap-3">
            <FaUserEdit className="text-blue-500" /> Update Your Profile
          </h2>

          {/* Personal Information Form */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Personal Information
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., +1234567890"
                />
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Save Personal Info
              </button>
            </form>
          </section>

          {/* Shipping Address Section */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FaMapMarkerAlt /> Shipping Address
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Address Line 1 */}
              <div>
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  {...register("addressLine1")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street address, P.O. Box"
                />
              </div>

              {/* Address Line 2 */}
              <div>
                <label
                  htmlFor="addressLine2"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  {...register("addressLine2")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  {...register("zipCode")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 12345"
                />
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  {...register("country")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Country"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Save Address
              </button>
            </form>
          </section>

          {/* Password Change Section */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FaLock /> Change Password
            </h3>
            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="space-y-6"
            >
              {/* Current Password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  {...register("confirmNewPassword", {
                    required: "Confirm new password is required",
                    validate: (value, formValues) =>
                      value === formValues.newPassword ||
                      "Passwords do not match",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                Change Password
              </button>
            </form>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default UpdateProfilePage;
