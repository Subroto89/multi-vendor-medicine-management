import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const CategoryRow = ({ category, handleCategoryDelete }) => {
  const { _id, catName, categoryPhoto, medicineCount, createdAt, status } = category;
  
  return (
    <tr className="border-b-1 border-gray-300">
      <td className="py-2 w-12 h-12 overflow-hidden">
        <img
          src={categoryPhoto}
          alt="category photo"
          className="w-8 h-8 object-cover mx-auto"
        />
      </td>
      <td className="py-2 px-8">{catName}</td>
      <td className="py-2 px-8 text-center">{medicineCount}</td>
      <td className="py-2 px-8">{new Date(createdAt).toLocaleDateString()}</td>
      <td className="py-2 px-8">{status}</td>
      <td className="py-2 px-8">
        <div className="flex items-center gap-2">
          <MdEdit className="btn btn-xs btn-outline hover:bg-blue-400 hover:text-white"/>
          <MdDelete onClick={()=>handleCategoryDelete(_id)} className="btn btn-xs btn-outline hover:bg-red-600 hover:text-white"/>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;
