import React from "react";

const UserRow = ({ user, handleRoleModal, setRole, setUserEmail }) => {
  const { _id, userEmail, userRole, status } = user;

  return (
    <tr className="min-w-full divide-y divide-gray-200 text-gray-700 text-sm font-normal hover:bg-blue-50 transition-color duration-300">
      <td className="px-5 py-2 w-86">{userEmail}</td>
      <td className="px-5 py-2 text-center">{userRole}</td>
      <td className="px-5 py-2 text-center">{status}</td>
      <td className="px-5 py-2 text-center">
        <button
          className="btn btn-outline text-xs text-gray-600 hover:bg-green-600 hover:text-white rounded-md"
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
