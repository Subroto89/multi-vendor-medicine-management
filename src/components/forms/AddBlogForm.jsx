import React from "react";
import InputField from "../forms/InputField";
import { PuffLoader } from "react-spinners";

const AddBlogForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
//   isSubmitting,
  uploadedBlogPhoto,
  uploadingBlogPhoto,
  //   photoUploadError,
  handleAddBlogModal,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Title -------------------------------- */}
        <InputField
          label="Blog Title"
          name="blogTitle"
          type="text"
          placeholder="Enter the blog title"
          // icon={FaUser}
          register={register}
          errors={errors}
          validationRules={{
            required: "Blog title is required",
          }}
        />

        {/* Short Description -------------------------------- */}
        <InputField
          label="Short Description"
          name="shortDescription"
          type="textarea"
          placeholder="Provide a brief description of the blog"
          rows={3}
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

        {/* Full Content -------------------------------- */}
        <InputField
          label="Content"
          name="fullContent"
          type="textarea"
          placeholder="Enter the content"
          rows={4}
          register={register}
          errors={errors}
          validationRules={{
            required: "Content is required",
            minLength: {
              value: 10,
              message: "Description must be at least 200 characters long",
            },
          }}
        />

        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-4">
           
            {/* Author -------------------------------- */}
            <InputField
              label=""
              name="blogPhoto"
              type="file"
              placeholder="Select the blog photo"
              // icon={FaUpload}
              register={register}
              errors={errors}
              validationRules={{
                required: "Blog photo is required",
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
          {/* Photo Viewer ----------------------------------- */}
          <div className=" w-20 h-24 rounded-md overflow-hidden border-2 border-gray-300 mb-1 flex items-center justify-end mt-5">
            {uploadedBlogPhoto ? (
              <img
                src={uploadedBlogPhoto}
                alt="Blog Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center pr-3">
                {uploadingBlogPhoto ? (
                  <PuffLoader size={36} />
                ) : (
                  <span>Blog Symbol</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Submit & Cancel Button -------------------------------- */}

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleAddBlogModal}
            className="btn bg-red-500 rounded-lg"
          >
            Cancel
          </button>

          <button type="submit" className="btn bg-green-500 rounded-lg">
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogForm;
