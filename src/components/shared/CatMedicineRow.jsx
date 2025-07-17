import { MdVisibility } from "react-icons/md";

const CatMedicineRow = ({ medicine, handleModalView, handleAddToCart }) => {
  const {
    _id,
    medicineName,
    genericName,
    company,
    status,
    stockQuantity,
    perUnitPrice,
  } = medicine;
  return (
    <tr className="border-b-1 border-gray-300">
      <td className="text-sm text-left px-5 py-1">{medicineName}</td>
      <td className="text-sm text-left px-5 py-1">{genericName}</td>
      <td className="text-sm text-left px-5 py-1">{company}</td>
      <td className="text-sm text-left px-5 py-1">{status}</td>
      <td className="text-sm text-left px-5 py-1">{stockQuantity}</td>
      <td className="text-sm text-left px-5 py-1">{perUnitPrice}</td>
      <td className="text-sm text-left px-5 py-1 flex items-center gap-2">
        <button
          onClick={() => handleModalView(medicine)}
          className="btn btn-outline btn-xs hover:bg-blue-500 hover:text-white"
        >
          <MdVisibility size={16} />
        </button>
        <button
          onClick={() => handleAddToCart(stockQuantity, _id)}
          className="btn btn-outline btn-xs hover:bg-green-500 hover:text-white font-bold"
        >
          Select
        </button>
      </td>
    </tr>
  );
};

export default CatMedicineRow;
