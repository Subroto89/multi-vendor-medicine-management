import { Link } from "react-router";
import useAddToCart from "../hooks/useAddToCart";


const DiscounteProductCard = ({ medicine }) => {
    const {stockQuantity, _id} = medicine;
    const handleAddToCart = useAddToCart();
 

    const finalPrice = medicine.perUnitPrice - (medicine.perUnitPrice * (medicine.discountPercentage / 100 || 0));

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative border border-gray-200">
      {medicine.discountPercentage > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          -{medicine.discountPercentage}%
        </span>
      )}
      <Link
        to={`/medicine/${medicine._id}`}>
        <img
          src={medicine.mediPhoto}
          alt={medicine.medicineName}
          className="w-full h-48 object-cover"
          
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {medicine.medicineName}
        </h3>
        <p className="text-sm text-gray-600 mb-2 truncate">
          {medicine.genericName}
        </p>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xl font-bold text-green-600">
            ${finalPrice.toFixed(2)}
          </span>
          {medicine.discountPercentage > 0 && (
            <span className="text-gray-500 text-sm line-through ml-2">
              ${medicine.perUnitPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button onClick={()=>handleAddToCart(stockQuantity, _id, medicine)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default DiscounteProductCard;
