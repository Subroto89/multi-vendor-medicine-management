import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RoleUpdateModal = ({ handleRoleModal, role, setRole, userEmail, refetch }) => {
  // 
  const handleSelectOption = (e) => {
    e.preventDefault();
    setRole(e.target.value);
  };
  console.log(userEmail);
  console.log(role);
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    const { data } = await axiosSecure.patch(`/user/role-update/${userEmail}`, {
      role,
    });
    refetch();
    if (data.modifiedCount === 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Role has been updated!",
        timer: 1500,
      });
    }
    handleRoleModal();
  };
  return (
    <div className="fixed inset-0 bg-black/80 p-8 rounded-lg flex items-center justify-center ">
      <div className="bg-gray-300 h-auto w-[400px] p-8 rounded-lg text-gray-800">
        <h2 className="text-center text-3xl">Update Role</h2>
        <form>
          {/* Field For Role--------------------------------------------------------------- */}
          <select
            onChange={handleSelectOption}
            defaultValue={role}
            className="w-full px-4 py-3 border border-gray-800 rounded-lg mt-8 mb-4 "
          >
            <option value="">Select a role</option>
            <option value="admin">admin</option>
            <option value="seller">Seller</option>
            <option value="user">User</option>
          </select>
        </form>
        <div className="flex items-center justify-between">
          <button
            onClick={handleRoleModal}
            className="btn bg-red-300 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleRoleUpdate}
            className="btn bg-green-500 text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleUpdateModal;
