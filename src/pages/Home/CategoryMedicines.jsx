import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import DataNotFound from "../../components/shared/DataNotFound";
import Container from "../../components/shared/Container";
import { FaTools } from "react-icons/fa";
import CatMedicineRow from "../../components/shared/CatMedicineRow";
import SingleMedicineModal from "../../components/modals/SingleMedicineModal";
import useAddToCart from "../../hooks/useAddToCart";

const CategoryMedicines = () => {
  const { catName } = useParams();
  const handleAddToCart = useAddToCart()

  const [isSingleMedicineModalOpen, setIsSingleMedicineModalOpen] =
    useState(false);
  const [singleMedicine, setSingleMedicine] = useState(null);

  const handleModalView = (medicine) => {
    setSingleMedicine(medicine);
    setIsSingleMedicineModalOpen(!isSingleMedicineModalOpen);
  };

  const axiosSecure = useAxiosSecure();

  const { data: catMedicines, isLoading } = useQuery({
    querykey: ["categoryMedicines"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/get-medicines/category/${catName}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  
  return (
    <div className="text-red-700">
      <Container>
        {/* --------------------------------------------------------------------------------------
        Category Heading Section
        -------------------------------------------------------------------------------------- */}
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          {catName} Collection
        </h2>
        {/* --------------------------------------------------------------------------------------
        Category Heading Section
        -------------------------------------------------------------------------------------- */}
        <div>
          {catMedicines.length > 0 ? (
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
                  {catMedicines.map((medicine) => (
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
              message={
                "No medicines available in this category! Please check back later."
              }
            />
          )}
        </div>
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
