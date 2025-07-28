import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import DataNotFound from "../../components/shared/DataNotFound";
import Container from "../../components/shared/Container";
import { FaTools, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CatMedicineRow from "../../components/shared/CatMedicineRow";
import SingleMedicineModal from "../../components/modals/SingleMedicineModal";
import useAddToCart from "../../hooks/useAddToCart";

const CategoryMedicines = () => {
  const { catName } = useParams();
  const handleAddToCart = useAddToCart();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isSingleMedicineModalOpen, setIsSingleMedicineModalOpen] =
    useState(false);
  const [singleMedicine, setSingleMedicine] = useState(null);

  const handleModalView = (medicine) => {
    setSingleMedicine(medicine);
    setIsSingleMedicineModalOpen(!isSingleMedicineModalOpen);
  };

  const axiosSecure = useAxiosSecure();

  const {
    data: medicineData = { medicines: [], totalCount: 0 }, 
    isLoading,
    error, 
    refetch,
  } = useQuery({
    
    queryKey: ["categoryMedicines", catName, currentPage, itemsPerPage],
    queryFn: async () => {
      let url = `/get-medicines/category/${catName}`;
      const params = new URLSearchParams();

      // Pagination parameters
      params.append('page', currentPage);
      params.append('limit', itemsPerPage);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const { data } = await axiosSecure.get(url);
      // Backend should return { medicines: [...], totalCount: N }
      return data;
    },
    // StaleTime and CacheTime for better UX
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 5,
  });

  // DESTRUCTURING: Extract medicines (paginated data) and totalCount
  const { medicines, totalCount } = medicineData;
  // CALCULATED: Total number of pages
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Pagination handler functions
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };


  if (isLoading) return <LoadingSpinner />;

  // Error display
  if (error) {
    return (
      <Container>
        <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
          <h3 className="text-xl font-semibold mb-2">Error Loading Medicines</h3>
          <p>We encountered an issue loading medicines for this category: {error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-8"> 
      <Container>
        {/* --------------------------------------------------------------------------------------
        Category Heading Section
        -------------------------------------------------------------------------------------- */}
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center"> 
          {catName} Collection
        </h2>
        {/* --------------------------------------------------------------------------------------
        Category Heading Section
        -------------------------------------------------------------------------------------- */}
        <div>
          {medicines.length > 0 ? ( 
            <div className="w-full rounded-lg overflow-auto shadow-lg">
              <table className="w-full divider-y divider-gray-300">
                <thead className="bg-gray-50 text-gray-700 text-md font-semibold">
                  <tr>
                    <th className="px-5 py-2 text-left">Medicine Name</th>
                    <th className="px-5 py-2 text-left">Generic Name</th>
                    <th className="px-5 py-2 text-left">Company</th>
                    <th className="px-5 py-2 text-left">Status</th>
                    <th className="pr-5 py-2 text-left">Stock</th>
                    <th className="px-5 py-2 text-left">Unit Price</th>
                    <th className="px-5 py-2 text-center flex items-center gap-3">
                      <FaTools />
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 text-gray-800">
                  {medicines.map((medicine) => (
                    <CatMedicineRow
                      key={medicine._id}
                      medicine={medicine}
                      handleModalView={handleModalView}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            
            <DataNotFound
              message={`No medicines available in the "${catName}" category! Total medicines: ${totalCount}. Please check back later.`}
            />
          )}
        </div>

        
        {totalCount > 0 && ( 
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-4 py-3 bg-white rounded-lg shadow-md">
            {/* Items Per Page Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-700">Medicines per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            {/* Page Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaAngleLeft />
              </button>
              {/* Render a few page numbers around the current page for better UX */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                // Show first, last, and pages within 2 of current page, with ellipsis
                (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) ? (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  // Show ellipsis for skipped pages, but only once for a block of skipped pages
                  (page === currentPage - 3 || page === currentPage + 3) && (
                    <span key={page} className="px-2 text-gray-500">...</span>
                  )
                )
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaAngleRight />
              </button>
            </div>
            <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
          </div>
        )}

        {/* --------------------------------------------------------------------------------------
        Modal For Particular Medicine Details
        -------------------------------------------------------------------------------------- */}
        <div>
          {isSingleMedicineModalOpen && (
            <SingleMedicineModal
              handleModalView={handleModalView}
              singleMedicine={singleMedicine}
              handleAddToCart={handleAddToCart}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoryMedicines;
