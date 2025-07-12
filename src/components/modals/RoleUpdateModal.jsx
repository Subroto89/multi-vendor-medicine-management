import React from "react";
import { useForm } from "react-hook-form";

const RoleUpdateModal = () => {
  return (
    <div className="fixed inset-0 bg-black/80 p-8 rounded-lg flex items-center justify-center ">
      <div className="bg-gray-300 h-auto w-[400px] p-8 rounded-lg text-gray-800">
        <h2 className="text-center text-3xl">Update Role</h2>
      <form>
        {/* Field For Role--------------------------------------------------------------- */}
        <select className="w-full px-4 py-3 border-gray-200 mt-8 mb-4">
          <option value="">Select a role</option>
          <option value="admin">admin</option>
          <option value="seller">Seller</option>
          <option value="user">User</option>
        </select>
      </form>
      <div className="flex items-center justify-between">
        <button className="btn bg-red-300 text-white">Cancel</button>
        <button className="btn bg-green-500 text-white">Update</button>
      </div>
      </div>
    </div>
  );
};

export default RoleUpdateModal;
