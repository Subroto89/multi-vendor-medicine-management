import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt, FaGlobe, FaCity, FaMailBulk } from "react-icons/fa"; 
import { BounceLoader } from "react-spinners";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InputField from "./InputField";

const AddressUpdateForm = () => {
  // --------------------------------------------------------------
  // Necessary State Variables and Hooks
  // --------------------------------------------------------------
  const { user, setLoading, loading } = useAuth(); 
  const axiosSecure = useAxiosSecure();

  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // --------------------------------------------------------------
  // Effect to fetch initial user address data and populate form
  // --------------------------------------------------------------
  useEffect(() => {
    const fetchAndSetAddressData = async () => {
      if (user?.email) {
        try {
          const { data } = await axiosSecure.get(`/get-user-profile/${user.email}`);

          // Populate form fields with fetched address data
          reset({
            addressLine1: data.shippingAddress?.addressLine1 || '',
            addressLine2: data.shippingAddress?.addressLine2 || '',
            city: data.shippingAddress?.city || '',
            stateProvince: data.shippingAddress?.stateProvince || '',
            zipCode: data.shippingAddress?.zipCode || '',
            country: data.shippingAddress?.country || '',
          });
        } catch (error) {
          console.error("Failed to fetch address data:", error);
          Swal.fire('Error', 'Failed to load address data.', 'error');
        } finally {
          setIsFetchingInitialData(false);
        }
      } else {
        setIsFetchingInitialData(false); 
      }
    };

    if (!loading) { 
      fetchAndSetAddressData();
    }
  }, [user, loading, axiosSecure, reset]);

  // --------------------------------------------------------------
  // Form Submission Handler
  // --------------------------------------------------------------
  const onSubmit = async (data) => {
    const updatedAddress = {
      shippingAddress: { 
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        stateProvince: data.stateProvince, 
        zipCode: data.zipCode,
        country: data.country,
      }
    };

    try {
      const res = await axiosSecure.patch(`/update-user-profile/${user.email}`, updatedAddress);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Address Updated!',
          text: 'Your shipping address has been successfully updated.',
          timer: 1500,
          showConfirmButton: false,
        });
        setLoading(false);
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'No new changes were made to your address.',
        });
      }
    } catch (error) {
      console.error("Error updating address:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: `An error occurred: ${error.response?.data?.message || error.message}`,
      });
    }
  };

  if (loading || isFetchingInitialData) {
    return <div className="flex justify-center items-center h-40"><BounceLoader color="#36d7b7" /></div>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
        <FaMapMarkerAlt /> Shipping Address
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Address Line 1 */}
        <InputField
          label="Address Line 1"
          name="addressLine1"
          type="text"
          placeholder="Street address, P.O. Box"
          icon={FaMapMarkerAlt}
          register={register}
          errors={errors}
          validationRules={{ required: 'Address Line 1 is required' }}
        />

        {/* Address Line 2 */}
        <InputField
          label="Address Line 2 (Optional)"
          name="addressLine2"
          type="text"
          placeholder="Apartment, suite, unit, building, floor, etc."
          icon={FaMapMarkerAlt}
          register={register}
          errors={errors}
        />

        {/* City */}
        <InputField
          label="City"
          name="city"
          type="text"
          placeholder="City"
          icon={FaCity}
          register={register}
          errors={errors}
          validationRules={{ required: 'City is required' }}
        />

        {/* State/Province */}
        <InputField
          label="State/Province"
          name="stateProvince"
          type="text"
          placeholder="State or Province"
          icon={FaCity} 
          register={register}
          errors={errors}
          validationRules={{ required: 'State/Province is required' }}
        />

        {/* Zip Code */}
        <InputField
          label="Zip Code"
          name="zipCode"
          type="text"
          placeholder="e.g., 12345"
          icon={FaMailBulk}
          register={register}
          errors={errors}
          validationRules={{ required: 'Zip Code is required' }}
        />

        {/* Country */}
        <InputField
          label="Country"
          name="country"
          type="text"
          placeholder="Country"
          icon={FaGlobe}
          register={register}
          errors={errors}
          validationRules={{ required: 'Country is required' }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? <BounceLoader size={24} color="#fff" /> : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressUpdateForm;
