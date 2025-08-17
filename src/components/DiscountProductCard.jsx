import { Link } from "react-router";
import useAddToCart from "../hooks/useAddToCart";
import { useTheme } from "../context/ThemeContext";

const DiscounteProductCard = ({ medicine }) => {
  const { stockQuantity, _id } = medicine;
  const handleAddToCart = useAddToCart();
  const { theme } = useTheme();

  const finalPrice = medicine.perUnitPrice - (medicine.perUnitPrice * (medicine.discountPercentage / 100 || 0));
  
  const headingStyle = {
    color: 'var(--text-color)'
  };

  const genericNameStyle = {
    color: 'var(--text-color-secondary)'
  };

  const priceStyle = {
    color: 'var(--accent-color)'
  };

  const originalPriceStyle = {
    color: 'var(--text-color-secondary)'
  };

  const buttonStyle = {
    backgroundColor: 'var(--accent-color)',
    color: 'white'
  };

  const buttonHoverStyle = {
    backgroundColor: 'var(--hover-color)'
  };


  return (
    <div
      className={`rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative ${theme==="dark" ? "category-card" : ""}`}
    >
      {medicine.discountPercentage > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          -{medicine.discountPercentage}%
        </span>
      )}
      <Link to={`/medicine/${medicine._id}`}>
        <img
          src={medicine.mediPhoto}
          alt={medicine.medicineName}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate" style={headingStyle}>
          {medicine.medicineName}
        </h3>
        <p className="text-sm mb-2 truncate" style={genericNameStyle}>
          {medicine.genericName}
        </p>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xl font-bold" style={priceStyle}>
            ${finalPrice.toFixed(2)}
          </span>
          {medicine.discountPercentage > 0 && (
            <span className="text-sm line-through ml-2" style={originalPriceStyle}>
              ${medicine.perUnitPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={() => handleAddToCart(stockQuantity, _id, medicine)}
          className="w-full px-4 py-2 rounded-md transition-colors duration-200"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default DiscounteProductCard;