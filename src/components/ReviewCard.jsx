import React from "react";
import { FaStar } from "react-icons/fa"; 

const ReviewCard = ({ review }) => {
  const { reviewerName, rating, reviewText, timestamp } = review || {};

  // Function to render star rating
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < numStars ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  // Format timestamp for display
  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-4">
          <div className="flex text-lg mr-2">{renderStars(rating)}</div>
          <span className="text-gray-700 font-semibold">{rating}/5 Stars</span>
        </div>
        <p className="text-gray-700 text-base mb-4 italic leading-relaxed">
          "{reviewText || "No review text provided."}"
        </p>
      </div>
      <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm text-gray-500">
        <span className="font-semibold text-gray-800">
          {reviewerName || "Anonymous"}
        </span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
