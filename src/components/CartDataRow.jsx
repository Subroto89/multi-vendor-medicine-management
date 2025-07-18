import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";


const CartDataRow = ({ item, handleQuantityChange, handleRemoveItem, isLoading, isSelected, onToggleSelect }) => {
    
    
  const {
    _id,
    medicineId,
    imageUrl,
    medicineName,
    companyName,
    perUnitPrice,
    priceAtAddToCart,
    totalPricePerItem,
  } = item;

  return (
    <tr className="bg-gray-50 border-b border-white hover:bg-green-100">
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(medicineId)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          disabled={isLoading}
        />
      </td>
      <td className="overflow-hidden mx-auto">
        <img
          src={imageUrl}
          alt="medicine photo"
          className="w-12 h-12 object-cover mx-auto"
        />
      </td>
      <td className="text-sm text-gray-500 text-center font-semibold">
        {medicineName}
      </td>
      <td className="text-sm text-gray-500 text-center">{companyName}</td>
      <td className="text-sm text-gray-500 text-center">{perUnitPrice}</td>
      <td className="text-sm text-gray-500 text-center">
        <button
          onClick={() => handleQuantityChange(item.medicineId, item.quantity, 'decrease')}
          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={item.quantity <= 1} // Disable if quantity is 1
          aria-label="Decrease quantity"
        >
          <FaMinus size={14} />
        </button>
        <span className="font-semibold text-lg text-gray-800 w-8 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.medicineId, item.quantity, 'increase')}
          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <FaPlus size={14} />
        </button>
      </td>
      <td className="text-sm text-gray-500 text-center">
        {totalPricePerItem.toFixed(2)}
      </td>
      <td className="text-sm text-gray-500 text-center pr-16 ">
         <button
          onClick={() => handleRemoveItem(item.medicineId, item.medicineName)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Remove ${item.itemName}`}
        >
          <FaTrash size={16} />
        </button>
      </td>
    </tr>
  );
};

export default CartDataRow;
