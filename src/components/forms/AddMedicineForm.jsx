import { FaUser } from "react-icons/fa";
import InputField from "./InputField";
import { GiMedicines } from "react-icons/gi";
import { PuffLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const AddMedicineForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  uploadedMedicinePhoto,
  uploadingMedicinePhoto,
  photoUploadError,
  handleAddMedicineModal,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["medicineCategories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/get-categories");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.catName,
  }));

  const companyOptions = [
    { value: "johnson_johnson", label: "Johnson & Johnson" },
    { value: "pfizer", label: "Pfizer" },
    { value: "merck", label: "Merck & Co." },
    { value: "abbvie", label: "AbbVie" },
    { value: "eli_lilly", label: "Eli Lilly and Company" },
    { value: "bristol_myers_squibb", label: "Bristol Myers Squibb" },
    { value: "amgen", label: "Amgen" },
    { value: "gilead_sciences", label: "Gilead Sciences" },
  ];

  const massUnitOptions = [
    { value: "mg", label: "Mg (Milligram)" },
    { value: "ml", label: "ML (Milliliter)" },
  ];

  if (isLoadingCategories) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* --------------------------------------------------------------------------
    Medicine Item Name Field
    -------------------------------------------------------------------------- */}
        <InputField
          label="Medicine Name"
          name="medicineName"
          type="text"
          placeholder="Enter the medicine name"
          // icon={FaUser}
          register={register}
          errors={errors}
          validationRules={{
            required: "Medicine Name is required",
            minLength: {
              value: 3,
              message: "Medicine Name must be at least 3 characters long",
            },
          }}
        />

        {/* --------------------------------------------------------------------------
    Generic Name Field
    -------------------------------------------------------------------------- */}
        <InputField
          label="Generic Name"
          name="genericName"
          type="text"
          placeholder="Enter the generic name of the medicine"
          // icon={FaUser}
          register={register}
          errors={errors}
          validationRules={{
            required: "Generic Name is required",
            minLength: {
              value: 3,
              // message: "Medicine Name must be at least 3 characters long",
            },
          }}
        />

        {/* --------------------------------------------------------------------------
    Descript Field
    -------------------------------------------------------------------------- */}
        <InputField
          label="Short Description"
          name="shortDescription"
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

        <div className="flex items-center justify-between gap-2">
          {/* --------------------------------------------------------------------------
     Medicine Photo Upload Field
    -------------------------------------------------------------------------- */}

          <InputField
            label=""
            name="medicinePhoto"
            type="file"
            placeholder="Select the medicine photo"
            // icon={FaUpload}
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

          {/* --------------------------------------------------------------------------
    Photo Viewer Field
    -------------------------------------------------------------------------- */}
          <div className=" w-12 h-10 rounded-md overflow-hidden border-2 border-gray-300 mb-1 flex items-center justify-end">
            {uploadedMedicinePhoto ? (
              <img
                src={uploadedMedicinePhoto}
                alt="User Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center pr-3">
                {uploadingMedicinePhoto ? (
                  <PuffLoader size={36} />
                ) : (
                  <GiMedicines size={26} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------------------------
     Medicine Category Dropdown Selection Field
    -------------------------------------------------------------------------- */}

        <InputField
          label="Category"
          name="category"
          type="select"
          placeholder="Select a medicine category"
          options={categoryOptions}
          register={register}
          errors={errors}
          validationRules={{
            required: "Category is required",
          }}
        />

        {/* --------------------------------------------------------------------------
     Company Dropdown Selection Field
    -------------------------------------------------------------------------- */}

        <InputField
          label="Company"
          name="company"
          type="select"
          placeholder="Select a company"
          options={companyOptions}
          register={register}
          errors={errors}
          validationRules={{
            required: "Company is required",
          }}
        />

        {/* --------------------------------------------------------------------------
     Item Mass Unit Dropdown Selection Field
    -------------------------------------------------------------------------- */}

        <InputField
          label="Item Mass Unit"
          name="itemMassUnit"
          type="select"
          placeholder="Select a unit (Mg or ML)"
          options={massUnitOptions}
          register={register}
          errors={errors}
          validationRules={{
            required: "Item Mass Unit is required",
          }}
        />

        {/* --------------------------------------------------------------------------
     Stock Quantity Field
    -------------------------------------------------------------------------- */}

        <InputField
          label="Stock Quantity"
          name="stockQuantity"
          type="number"
          placeholder="e.g., 250"
          register={register}
          errors={errors}
          validationRules={{
            required: "Stock Quantity is required",
            min: {
              value: 1,
              message: "Stock Quantity must be greater than 0",
            },
            valueAsNumber: true,
          }}
        />

        {/* --------------------------------------------------------------------------
     Per Unit Price Selection Field
    -------------------------------------------------------------------------- */}

        <InputField
          label="Per Unit Price"
          name="perUnitPrice"
          type="number"
          placeholder="e.g., 150.75"
          register={register}
          errors={errors}
          validationRules={{
            required: "Price is required",
            min: {
              value: 0.01,
              message: "Price must be greater than 0",
            },
            valueAsNumber: true,
          }}
        />

        {/* --------------------------------------------------------------------------
    Discount Percentage Selection Field
    -------------------------------------------------------------------------- */}

        <InputField
          label="Discount Percentage"
          name="discountPercentage"
          type="number"
          placeholder="e.g., 10 (default is 0%)"
          register={register}
          errors={errors}
          validationRules={{
            min: {
              value: 0,
              message: "Discount cannot be negative",
            },
            max: {
              value: 100,
              message: "Discount cannot exceed 100%",
            },
            valueAsNumber: true,
          }}
        />

        {/* --------------------------------------------------------------------------
    Cancel & Submit Button
    -------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleAddMedicineModal}
            className="btn bg-red-500 rounded-lg"
          >
            Cancel
          </button>
          <button type="submit" className="btn bg-green-500 rounded-lg">
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineForm;
