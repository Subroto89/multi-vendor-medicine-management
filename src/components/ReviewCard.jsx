import React from "react";
import { FaStar } from "react-icons/fa"; 
import { useTheme } from "../context/ThemeContext";

const ReviewCard = ({ review }) => {
  const {theme} = useTheme();

  const { reviewerName, rating, reviewText, timestamp } = review || {};

    const cardStyle = {
    backgroundColor: theme === 'dark' ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
    color: theme === 'dark' ? 'var(--text-color)' : 'var(--text-color-light)',
  };

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
    <div style={cardStyle} className={`bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between ${theme==="dark" ? "category-card" : ""}`}>
      <div>
        <div className="flex items-center mb-4">
          <div className="flex text-lg mr-2">{renderStars(rating)}</div>
          <span className="font-semibold">{rating}/5 Stars</span>
        </div>
        <p className=" mb-4 italic leading-relaxed">
          "{reviewText || "No review text provided."}"
        </p>
      </div>
      <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm">
        <span className="font-semibold">
          {reviewerName || "Anonymous"}
        </span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
