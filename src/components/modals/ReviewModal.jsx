import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaStar, FaTimes } from "react-icons/fa";
const ReviewModal = ({ handleReviewModal, refetch, orderDetails }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the rating field to update stars dynamically
  const currentRating = watch("rating", 0);

  // Set initial values for form fields
  React.useEffect(() => {
    if (user) {
      setValue("reviewerName", user?.displayName || "");
    }
  }, [user, setValue, orderDetails]);

  const onSubmit = async (data) => {
    const reviewData = {
      reviewerName: data.reviewerName,
      rating: parseInt(data.rating),
      reviewText: data.reviewText,
    };

    try {
      const res = await axiosSecure.post("/add-review", reviewData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Thank you for your valuable feedback!",
          timer: 1500,
          showConfirmButton: false,
        });
        handleReviewModal();
        if (refetch) {
          refetch();
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to submit review. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `An error occurred: ${
          error.response?.data?.message || error.message
        }`,
      });
    }
  };

  return (
    <div>
      {/* -----------------------------------------------------------------------------------
            Review Form
            ------------------------------------------------------------------------------------ */}
      <div className="fixed inset-0 bg-black/50 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={handleReviewModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            title="Close"
          >
            <FaTimes size={24} />
          </button>

          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
              Submit Your Review
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 text-gray-600"
            >
              {/* Reviewer Name */}
              <div>
                <label
                  htmlFor="reviewerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="reviewerName"
                  {...register("reviewerName", {
                    required: "Your name is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                  readOnly
                />
                {errors.reviewerName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reviewerName.message}
                  </p>
                )}
              </div>

              {/* Rating Stars */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Rating
                </label>
                <div className="flex items-center gap-1 text-2xl cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= currentRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                      onClick={() =>
                        setValue("rating", star, { shouldValidate: true })
                      }
                    />
                  ))}
                </div>
                <input
                  type="hidden" // Hidden input to register the rating value
                  {...register("rating", {
                    required: "Please select a rating",
                    min: {
                      value: 1,
                      message: "Rating must be at least 1 star",
                    },
                    max: { value: 5, message: "Rating cannot exceed 5 stars" },
                  })}
                />
                {errors.rating && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="reviewText"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Review
                </label>
                <textarea
                  id="reviewText"
                  {...register("reviewText", {
                    required: "Review text is required",
                    minLength: {
                      value: 10,
                      message: "Review must be at least 10 characters",
                    },
                    maxLength: {
                      value: 500,
                      message: "Review cannot exceed 500 characters",
                    },
                  })}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your experience..."
                ></textarea>
                {errors.reviewText && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reviewText.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
