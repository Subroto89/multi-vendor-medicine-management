import React from "react";
import { useTheme } from "../../../context/ThemeContext";

const UserRow = ({ user, handleRoleModal, setRole, setUserEmail }) => {
  const {theme} = useTheme();

  const { _id, userEmail, userRole, status } = user;

  return (
    <tr className={`${theme==="dark" ? "category-card" : "text-gray-700"} min-w-full  text-sm font-normal hover:bg-blue-50 transition-color duration-300`}>
      <td className="px-5 py-2 w-86">{userEmail}</td>
      <td className="px-5 py-2 text-center">{userRole}</td>
      <td className="px-5 py-2 text-center">{status}</td>
      <td className="px-5 py-2 text-center">
        <button
          className="btn btn-outline text-xs hover:bg-green-600 hover:text-white rounded-md"
          onClick={() => {
            setRole(userRole), handleRoleModal(), setUserEmail(userEmail);
          }}
        >
          Update Role
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
