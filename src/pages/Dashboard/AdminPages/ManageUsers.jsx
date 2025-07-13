import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../components/shared/DataNotFound";
import UserRow from "../../../components/shared/Dashboard/userRow";
import { GrUpdate } from "react-icons/gr";
import RoleUpdateModal from "../../../components/modals/RoleUpdateModal";
import { useState } from "react";

const ManageUsers = () => {
  // -------------------------------------------------------------
  //   RoleUpdating Modal State Management
  // -------------------------------------------------------------
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRoleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
 

  // -------------------------------------------------------------
  // Getting Users Using Tanstack & axios
  // -------------------------------------------------------------
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/get-users");
      return data;
    },
  });
  // -------------------------------------------------------------
  // Spinner Shows When Data Loading -----------------------------
  // -------------------------------------------------------------
  if (isLoading) return <LoadingSpinner />;

  // -------------------------------------------------------------
  // Users Ready To Load
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen p-8 relative">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Avaiable Users
      </h2>
      {users.length > 0 ? (
        <div>
          <table className="w-8/12 md:min-w-full divide-y divide-gray-200 overflow-scroll">
            <thead className="bg-gray-200 shadow-lg text-sm">
              <tr>
                <th
                  scope="col"
                  className="w-86 text-gray-800 font-bold uppercase text-center px-5 py-2"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="text-gray-800 font-bold uppercase text-center px-5 py-2"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="text-gray-800 font-bold uppercase text-center px-5 py-2"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-gray-800 font-bold uppercase flex items-center justify-center  gap-3 px-5 py-2"
                >
                  <GrUpdate size={18} />
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <UserRow key={user._id} user={user} handleRoleModal={handleRoleModal} setRole={setRole} setUserEmail={setUserEmail}/>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DataNotFound message={"No User is Available!"} />
      )}

      {/* ------------------------------------------------------------------
      Modal To Update Role
      ------------------------------------------------------------------- */}
      {isModalOpen && <RoleUpdateModal handleRoleModal={handleRoleModal} role={role} setRole={setRole} userEmail={userEmail} refetch={refetch}/>}
    </div>
  );
};

export default ManageUsers;
