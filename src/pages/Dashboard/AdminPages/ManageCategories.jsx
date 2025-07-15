import React, { useState } from "react";
import Container from "../../../components/shared/Container";
import { FaPlus } from "react-icons/fa";
import CategoryModal from "../../../components/modals/CategoryModal";

const ManageCategories = () => {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const handleCategoryModal = () => {
        setIsCategoryModalOpen(!isCategoryModalOpen);
    }
  return (
    <div className="text-blue-700">
      <Container>
        {/* --------------------------------------------------------------
                Page Title & Button For Adding New Category
                -------------------------------------------------------------- */}
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Manage Medicine Categories</h2>
            <button onClick={handleCategoryModal} className="flex items-center gap-2 btn btn-outline hover:bg-green-500 hover:text-white"><FaPlus size={20}/>Add New Category</button>
        </div>
        {/* --------------------------------------------------------------
                Category Based Medicine Info Table
                -------------------------------------------------------------- */}
        <div>

        </div>
        {/* --------------------------------------------------------------
                Category Creation Modal
                -------------------------------------------------------------- */}
                <div>
                    {
                     isCategoryModalOpen && <CategoryModal handleCategoryModal={handleCategoryModal}/>   
                    }
                </div>
        
      </Container>
    </div>
  );
};

export default ManageCategories;
