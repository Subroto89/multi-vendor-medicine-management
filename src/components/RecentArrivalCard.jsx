import { Link } from "react-router"; 
import useAddToCart from "../hooks/useAddToCart";
import { useTheme } from "../context/ThemeContext"; 

const RecentArrivalCard = ({ medicine }) => {
  const { stockQuantity, _id } = medicine;

  const handleAddToCart = useAddToCart();

  const { theme } = useTheme();

  // Calculate the final price after applying the discount
  const finalPrice = medicine.perUnitPrice - (medicine.perUnitPrice * (medicine.discountPercentage / 100 || 0));

  // Define dynamic styles for the card, adapting to the current theme
  const cardStyle = {
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-color)',
    border: '1px solid var(--card-border)',
    boxShadow: '0 4px 6px -1px var(--card-shadow-color), 0 2px 4px -1px var(--card-shadow-color)'
  };
  
  // Style for the medicine name heading
  const headingStyle = {
    color: 'var(--text-color)'
  };

  // Style for the generic name text (secondary text color)
  const genericNameStyle = {
    color: 'var(--text-color)' 
  };

  // Style for the displayed final price (accent color)
  const priceStyle = {
    color: 'var(--accent-color)'
  };

  // Style for the original price (line-through, secondary text color)
  const originalPriceStyle = {
    color: 'var(--text-color)'
  };

  // Style for the "Add to Cart" button (accent color)
  const buttonStyle = {
    backgroundColor: 'var(--accent-color)',
    color: 'white' // White text on accent button
  };

  // Style for the "Add to Cart" button on hover
  const buttonHoverStyle = {
    backgroundColor: 'var(--hover-color)'
  };

  return (
    <div
      className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
      style={cardStyle}
    >
      {/* Discount Percentage Badge */}
      {medicine.discountPercentage > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          -{medicine.discountPercentage}%
        </span>
      )}

      {/* Medicine Image - clickable to medicine details page */}
      <Link to={`/medicine/${medicine._id}`}>
        <img
          src={medicine.mediPhoto}
          alt={medicine.medicineName}
          className="w-full h-48 object-cover"
        />
      </Link>

      {/* Product Information */}
      <div className="p-4">
        {/* Medicine Name */}
        <h3 className="text-lg font-semibold mb-1 truncate" style={headingStyle}>
          {medicine.medicineName}
        </h3>

        {/* Generic Name */}
        <p className="text-sm mb-2 truncate" style={genericNameStyle}>
          {medicine.genericName}
        </p>

        {/* Price Section */}
        <div className="flex items-baseline justify-between mb-2">
          {/* Final Price */}
          <span className="text-xl font-bold" style={priceStyle}>
            ${finalPrice.toFixed(2)}
          </span>
          {/* Original Price (if discounted) */}
          {medicine.discountPercentage > 0 && (
            <span className="text-sm line-through ml-2" style={originalPriceStyle}>
              ${medicine.perUnitPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(stockQuantity, _id, medicine)}
          className="w-full px-4 py-2 rounded-md transition-colors duration-200"
          style={buttonStyle}
          // Handle hover effect using JavaScript for inline styles
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecentArrivalCard;
