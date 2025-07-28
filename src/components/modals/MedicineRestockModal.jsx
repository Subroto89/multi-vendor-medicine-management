import React, { useState } from "react";

const MedicineRestockModal = ({ handleRestockModal, particularMedicine, handleRestock }) => {
  const { _id, stockQuantity, medicineName } = particularMedicine;
  const [stockQuantityFieldValue, setStockQuantityFieldValue] = useState(stockQuantity)
  const handleFieldValue = (e) => {
    setStockQuantityFieldValue(e.target.value)
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center shadow-2xl">
      <div className="w-4/12 h-4/12 rounded-lg p-6 bg-gray-50 text-gray-700">
        <div className="text-gray-600">
          <p className="text-2xl font-bold text-center mb-4">{medicineName}</p>
          <div className="flex items-center h-14 rounded-3xl overflow-hidden border-2 border-gray-600 mb-4">
            <label className="h-full font-bold border-r border-gray-500 px-4 py-3">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQuantityField"
              value={stockQuantityFieldValue}
              onChange={handleFieldValue}
              placeholder="Input stock amount"
              className="h-full px-4 flex-1 text-lg font-semibold text-green-600 text-center"
            />
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button onClick={handleRestockModal} className="btn btn-outline hover:bg-red-600">
            close
          </button>
          <button onClick={()=>handleRestock(_id, stockQuantityFieldValue)} className="btn btn-outline hover:bg-green-400">Confirm Stock</button>
        </div>
      </div>
    </div>
  );
};

export default MedicineRestockModal;
