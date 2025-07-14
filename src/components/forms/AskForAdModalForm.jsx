import InputField from "./InputField";
import { GiMedicines } from "react-icons/gi";
import { PuffLoader } from "react-spinners";
import { RiImageAddLine, RiMedicineBottleLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";

const AskForAdModalForm = ({
  handleIsAddModal,
  register,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
  uploadedMedicinePhoto,
  uploadingMedicinePhoto,
  photoUploadError,
}) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // -------------------------------------------------------------------------------
  // Fetching Seller Medicine For Link Medicine Drop Down
  // -------------------------------------------------------------------------------
  const {
    data: sellerMedicines = [],
    isLoading: isLoadingMedicines,
    error: medicinesError,
  } = useQuery({
    queryKey: ["sellerMedicinesForAd", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axiosSecure.get(`/get-medicines/${user.email}`);
      return data;
    },
    enabled: !!user?.email, // Only fetch if user email is available
  });

  // ---------------------------------------------------------------------------
  // Prepare Options For Linked Medicine Droptown
  // -----------------------------------------------------------------------------
  const linkedMedicineOptions = sellerMedicines.map((medicine) => ({
    value: medicine._id, // Use MongoDB _id as the value
    label: `${medicine.medicineName} (${medicine.genericName})`, // Display name and generic name
  }));

   if (isLoadingMedicines) {
    return <LoadingSpinner />;
  }

  if (medicinesError) {
    return <div className="text-red-600 p-4 text-center">Error loading your medicines: {medicinesError.message}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* --------------------------------------------------------------------------
    Photo Viewer Field
    -------------------------------------------------------------------------- */}
        <div className="w-26 h-26 rounded-md overflow-hidden border-1 border-gray-400 mb-1 flex items-center justify-end">
          {uploadedMedicinePhoto ? (
            <img
              src={uploadedMedicinePhoto}
              alt="User Photo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center pr-8">
              {uploadingMedicinePhoto ? (
                <PuffLoader size={36} className="" />
              ) : (
                <div className="relative">
                  <GiMedicines
                    size={26}
                    className="absolute z-20 -left-4 top-0"
                  />
                  <RiMedicineBottleLine size={48} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* -------------------------------------------------------------------------
        Medicine Photo Field
        --------------------------------------------------------------------------- */}
        <div className={`border border-gray-500 rounded-md $}`}>
          <InputField
            label=""
            name="medicineAdvertisementPhoto"
            type="file"
            placeholder="Select the medicine photo"
            icon={RiImageAddLine}
            register={register}
            errors={errors}
            validationRules={{
              required: "Medicine photo is required",
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

        {/* -------------------------------------------------------------------------
        Linked Medicine Drop Down Field
        --------------------------------------------------------------------------- */}

        <InputField
          label="Link to Medicine"
          name="linkedMedicineId" // Will store the _id of the linked medicine
          type="select"
          placeholder="Select a medicine to advertise"
          options={linkedMedicineOptions} // Pass the prepared options
          register={register}
          errors={errors}
          validationRules={{
            required: "Linking to a medicine is required for advertisement",
          }}
        />

        {/* -------------------------------------------------------------------------
        Ad Description Field
        --------------------------------------------------------------------------- */}

        <div className="border border-gray-400 rounded-md mb-10">
          <InputField
            label="Ad Description"
            name="adDescription"
            type="textarea"
            placeholder="Provide a brief description of the medicine"
            rows={4}
            register={register}
            errors={errors}
            validationRules={{
              required: "Short Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters long",
              },
              maxLength: {
                value: 200,
                message: "Description cannot exceed 200 characters",
              },
            }}
          />
        </div>

        {/* -------------------------------------------------------------------------
        Button - Ask For Advertisement Modal 
        -------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleIsAddModal}
            className="btn bg-red-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={uploadingMedicinePhoto}
            className="btn bg-green-500 text-white rounded-lg"
          >
            {isSubmitting && <PuffLoader size={36} className="" />}
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskForAdModalForm;
