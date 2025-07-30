import { useState } from "react";
import DataNotFound from "./shared/DataNotFound";
import MedicineRow from "./shared/Dashboard/medicineRow";
import { FaTools } from "react-icons/fa";

const ParticularSellerMedicines = ({
  medicines,
  handleDeleteMedicine,
  handleMedicineDetailsModal,
  setParticularMedicine,
  handleRestockModal,
  handleMedicineEditModal
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = medicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page
  };

  return (
    <div className="text-gray-700">
      {medicines.length > 0 ? (
        <>
          {/* Table */}
          <div className="max-h-[calc(100vh-174px)] overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-200 text-sm font-semibold sticky top-0">
                <tr>
                  <th className="w-1/12 text-gray-800 text-center px-5 py-3">Photo</th>
                  <th className="w-2/12 text-gray-800 text-center py-3">Medicine Name</th>
                  <th className="w-1/12 text-gray-800 text-center px-5 py-3">Category</th>
                  <th className="w-2/12 text-gray-800 text-center px-5 py-3">Generic Name</th>
                  <th className="w-1/12 text-gray-800 text-center px-5 py-3">Company</th>
                  <th className="w-1/12 text-gray-800 text-center px-5 py-3">Stock</th>
                  <th className="w-1/12 text-gray-800 text-center px-5 py-3">Status</th>
                  <th className="text-gray-800 text-center px-5 py-3 flex items-center justify-center gap-2">
                    <FaTools /> Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMedicines.map((medicine) => (
                  <MedicineRow
                    key={medicine._id}
                    medicine={medicine}
                    handleDeleteMedicine={handleDeleteMedicine}
                    handleMedicineDetailsModal={handleMedicineDetailsModal}
                    setParticularMedicine={setParticularMedicine}
                    handleRestockModal={handleRestockModal}
                    handleMedicineEditModal={handleMedicineEditModal}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls and Items Per Page */}
          <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
            {/* Pagination */}
            <div className="flex gap-2 items-center text-gray-700">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {/* Items per page dropdown */}
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="itemsPerPage" className="text-gray-700 font-medium">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-gray-700 rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </>
      ) : (
        <DataNotFound message={"You didn't add any medicine yet! Please, add first."} />
      )}
    </div>
  );
};

export default ParticularSellerMedicines;
