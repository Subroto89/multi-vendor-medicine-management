import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import DataNotFound from "../../components/shared/DataNotFound";
import Container from "../../components/shared/Container";
import ShopMedicineRow from "../../components/shopMedicineRow";
import React, { useState } from "react";
import ShopModal from "../../components/modals/ShopModal";
import { TabTitle } from "../../utilities/utilities";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaSearch,
  FaTools,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Shop = () => {
  TabTitle("Shop");

  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetMedicine, setTargetMedicine] = useState(null);

  // ----------------------------------------------------------------------------------------
  // Pagination States
  // ----------------------------------------------------------------------------------------
  const [totalItem, setTotalItem] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPage = parseInt(Math.ceil(totalItem / itemPerPage));

  const pages = [...Array(totalPage).keys()];

  const handleItemPerPage = (e) => {
    setItemPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // -----------------------------------------------------------------------------------------
  // Sorting & Searching States
  // -----------------------------------------------------------------------------------------
  const searchRef = React.useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setAppliedSearchTerm(searchTerm);
      setCurrentPage(0);
      searchRef.focus();
    }
  };

  // Function to handle sort by price
  const handleSortingPrice = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(0);
  };

  const handleModalView = () => {
    setIsModalOpen(!isModalOpen);
  };

  // ------------------------------------------------------------------------------------------------------------
  // Fetching Data Using UseQuery
  // ------------------------------------------------------------------------------------------------------------
  const { data: allMedicines = [], isLoading } = useQuery({
    queryKey: [
      "allMedicines",
      currentPage,
      itemPerPage,
      appliedSearchTerm,
      sortOrder,
    ],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/get-medicines?page=${currentPage}&size=${itemPerPage}&search=${appliedSearchTerm}&sort=${sortOrder}`
      );

      if (data && data.totalCount !== undefined) {
        setTotalItem(data.totalCount);
        return data.medicines;
      }

      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div
      className={`w-full mx-auto bg-secondary min-h-screen  text-gray-400 text-xl pt-24 ${
        theme === "dark" ? "" : ""
      }`}
    >
      <div className="w-11/12 mx-auto">
        <div>
          <h2 className={`text-3xl font-bold mb-4 text-center ${theme==="dark" ? "text-white" : "text-gray-700"}`}>
            Medicines Store in Different Categories{" "}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name, generic, company..."
              ref={searchRef}
              className={`w-full py-2 pl-10 pr-4 text-sm border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme==="dark" ? "category-card text-white" : "text-gray-700"}`}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Sort Price Dropdown */}
          <select
            value={sortOrder}
            onChange={handleSortingPrice}
            className={`text-lg border border-gray-500 rounded-lg py-2 px-4 ${theme==="dark" ? "text-white btn-accent" : "text-gray-700"}`}
          >
            <option value="">Unsorted</option>
            <option value="asc">Lowest First</option>
            <option value="desc">Highest First</option>
          </select>
        </div>

        <div>
          {allMedicines.length > 0 ? (
            <div className={`w-full rounded-lg overflow-auto shadow-lg max-h-[calc(100vh-250px)]`}>
              <table className={`w-full h-full divider-y divider-gray-300`}>
                <thead className={`bg-gray-50 text-gray-700 text-md font-semibold sticky top-0 ${theme==="dark" ? "category-card" : "bg-gray-50"}`}>
                  <tr>
                    <th className="px-5 py-2 text-left">Medicine Name</th>
                    <th className="px-5 py-2 text-left">Generic Name</th>
                    <th className="px-5 py-2 text-left">Company</th>
                    <th className="px-5 py-2 text-left">Status</th>
                    <th className="pr-5 py-2 text-left">Stock</th>

                    <th className="px-5 py-2 text-left flex items-center gap-2">
                      Unit Price
                      {sortOrder === "asc" && <FaArrowUp className="text-sm" />}
                      {sortOrder === "desc" && (
                        <FaArrowDown className="text-sm" />
                      )}
                    </th>
                    <th className="px-5 py-2">
                      <div className="flex items-center justify-center gap-3">
                        <FaTools />
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className={`bg-gray-100 text-gray-800 ${theme==="dark" ? "category-card" : "bg-gray-50"}`}>
                  {allMedicines.map((medicine) => (
                    <ShopMedicineRow
                      key={medicine._id}
                      medicine={medicine}
                      handleModalView={handleModalView}
                      setTargetMedicine={setTargetMedicine}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <DataNotFound
              message={"No medicines available! Please check back later."}
            />
          )}
        </div>

        {isModalOpen && (
          <ShopModal
            targetMedicine={targetMedicine}
            handleModalView={handleModalView}
          />
        )}

        {/* Pagination Section */}
        {totalItem > 0 && (
          <div className="flex items-center justify-center gap-6 text-gray-700 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="disabled:text-gray-400"
            >
              <FaArrowLeft />
            </button>
            <div className="flex items-center gap-6">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => handleCurrentPage(page)}
                  className={
                    page === currentPage
                      ? "bg-yellow-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                      : "w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200"
                  }
                >
                  {page + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
              className="disabled:text-gray-400"
            >
              <FaArrowRight />
            </button>
            <select
              value={itemPerPage}
              onChange={handleItemPerPage}
              className={`text-gray-800 border border-blue-400 rounded-md ${theme==="dark" ? "category-card" : ""}`}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
