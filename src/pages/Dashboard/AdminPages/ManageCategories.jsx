import React, { useState } from "react";
import Container from "../../../components/shared/Container";
import { FaPlus, FaTools } from "react-icons/fa";
import CategoryModal from "../../../components/modals/CategoryModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../components/shared/DataNotFound";
import CategoryRow from "../../../components/shared/Dashboard/CategoryRow";
import Swal from "sweetalert2";
import UpdateCategoryModal from "../../../components/modals/UpdateCategoryModal";
import { TabTitle } from "../../../utilities/utilities";

const ManageCategories = () => {
  TabTitle('Manage Categories');
  const axiosSecure = useAxiosSecure();

  // --------------------------------------------------------------------
  // Add Category Modal Opening/Closing State & Function
  // --------------------------------------------------------------------
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const handleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleUpdateCategoryModal = () => {
    setIsUpdateCategoryModalOpen(!isUpdateCategoryModalOpen)
  }

  // --------------------------------------------------------------------
  // Fetching All Categories Using Tanstack
  // --------------------------------------------------------------------
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure("/get-categories");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  //   ----------------------------------------------------------------------------
  // Category Delete Function
  // ------------------------------------------------------------------------------
  const handleCategoryDelete = async (id) => {
    try{
        const {data} = await axiosSecure.delete(`/delete-category/${id}`);
        if(data.deletedCount){
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Category Deleted!",
                timer: 1500 
            })
            refetch();
        }
    }catch(error){
        console.log(error);
    }
  }

  return (
    <div className="text-gray-700">
      <Container>
        {/* --------------------------------------------------------------
                Page Title & Button For Adding New Category
                -------------------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold my-10 md:my-2">Manage Medicine Categories</h2>
          <button
            onClick={handleCategoryModal}
            className="flex items-center gap-2 btn btn-outline hover:bg-green-500 hover:text-white"
          >
            <FaPlus size={20} />
            Add New Category
          </button>
        </div>
        {/* --------------------------------------------------------------
                Category Based Medicine Info Table
                -------------------------------------------------------------- */}
        <div>
          {categories.length > 0 ? (
            <div className="w-full overflow-auto rounded-lg mt-10 shadow-lg">
              <table className="w-full divider-y divider-gray-300">
                <thead className="h-4 bg-gray-200 uppercase text-sm font-semibold ">
                  <tr className="text-left">
                    <th className="py-2 px-20">Photo</th>
                    <th className="py-2 px-8">Category Name</th>
                    <th className="py-2 px-8">Total Medicines</th>
                    <th className="py-2 px-8">Created On</th>
                    <th className="py-2 px-8">Status</th>
                    <th className="py-2 px-8 text-center flex items-center gap-2">
                      <FaTools size={16} />
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <CategoryRow key={category._id} category={category} 
                    handleCategoryDelete = {handleCategoryDelete} 
                    handleUpdateCategoryModal={handleUpdateCategoryModal}
                    setCategoryToEdit={setCategoryToEdit}/>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <DataNotFound message={"No Category Added Yet. Please, Add First."}/>
          )}
        </div>
        {/* --------------------------------------------------------------
                Category Creation Modal
                -------------------------------------------------------------- */}
        <div>
          {isCategoryModalOpen && (
            <CategoryModal handleCategoryModal={handleCategoryModal} refetch={refetch} />
          )}
        </div>
        {isUpdateCategoryModalOpen && (
          <UpdateCategoryModal 
          handleUpdateCategoryModal={handleUpdateCategoryModal}
          categoryToEdit={categoryToEdit} refetch={refetch}/>)}
      </Container>
    </div>
  );
};

export default ManageCategories;
