import { IoCloseSharp } from "react-icons/io5";
import AddCategoryForm from "../forms/AddCategoryForm";

const CategoryModal = ({ handleCategoryModal, refetch }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative w-[400px] h-[300px] overflow-hidden rounded-lg bg-gray-200 text-blue-500">
        {/* --------------------------------------------------------------
                Title Bar & Button To Open Category Modal
                -------------------------------------------------------------- */}
        <div className="sticky top-0 inset-x-0 z-1000 flex items-center justify-between bg-green-500 px-4 py-2">
          <h2 className="text-xl font-bold text-white">Add New Category</h2>
          <IoCloseSharp
            onClick={handleCategoryModal}
            size={26}
            className="border border-white rounded-md hover:bg-red-500 hover:text-white"
          />
        </div>

        {/* --------------------------------------------------------------
                Add Category Form
                -------------------------------------------------------------- */}
        <AddCategoryForm handleCategoryModal={handleCategoryModal} refetch={refetch}/>

       
        
      </div>
    </div>
  );
};

export default CategoryModal;
