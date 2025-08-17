import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const CartDataRow = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
  isLoading,
  isSelected,
  onToggleSelect,
}) => {
  const { theme } = useTheme();

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
    <tr
      className={` border-b border-white hover:bg-green-100 ${
        theme === "dark" ? "category-card" : "bg-gray-50"
      }`}
    >
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(medicineId)}
          className={`form-checkbox h-5 w-5 rounded focus:ring-blue-500`}
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
      <td className="text-sm text-center font-semibold">{medicineName}</td>
      <td className="text-sm text-center">{companyName}</td>
      <td className="text-sm text-center">{perUnitPrice}</td>
      <td className="text-sm text-center">
        <button
          onClick={() =>
            handleQuantityChange(item.medicineId, item.quantity, "decrease")
          }
          className={`${theme==="dark" ? "bg-gray-300 text-gray-700" : "bg-gray-300 text-white"} p-1  rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={item.quantity <= 1} // Disable if quantity is 1
          aria-label="Decrease quantity"
        >
          <FaMinus size={14} />
        </button>
        <span className="font-semibold text-lg w-8 text-center px-2">
          {item.quantity}
        </span>
        <button
          onClick={() =>
            handleQuantityChange(item.medicineId, item.quantity, "increase")
          }
          className={`${theme==="dark" ? "bg-gray-300 text-gray-700" : "bg-gray-300 text-white"} p-1 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Increase quantity"
        >
          <FaPlus size={14} />
        </button>
      </td>
      <td className="text-sm text-center">{totalPricePerItem.toFixed(2)}</td>
      <td className="text-sm text-center pr-16 ">
        <button
          onClick={() => handleRemoveItem(item.medicineId, item.medicineName)}
          className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Remove ${item.itemName}`}
        >
          <FaTrash size={16} />
        </button>
      </td>
    </tr>
  );
};

export default CartDataRow;
