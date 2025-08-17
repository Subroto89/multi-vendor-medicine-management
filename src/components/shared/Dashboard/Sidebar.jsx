import Logo from "../Logo";
import AdminMenu from "../../shared/Dashboard/AdminMenu";
import SellerMenu from "../../shared/Dashboard/SellerMenu";
import UserMenu from "../../shared/Dashboard/UserMenu";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";
import useUserRole from "../../../hooks/useUserRole";
import DigitalClock from "../DigitalClock";
import { FaEdit, FaHome, FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { useTheme } from "../../../context/ThemeContext";

const Sidebar = ({ isSideBarOpen, toggleMenu }) => {
  // const {theme} = useTheme();

  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const {theme, toggleTheme} = useTheme()

  const { loading: authLoading } = useAuth();
  const { userRole, userRoleLoading } = useUserRole();
  if (authLoading || userRoleLoading) return <LoadingSpinner />;
  console.log(userRole);

  return (
    <div>
      <div
        className={`absolute w-56 md:w-64  inset-y-0 ${theme==="dark" ? "dark-bg border-r border-gray-600 shadow-4xl" : "bg-secondary"} flex flex-col gap-20 md:fixed   md:translate-x-0 transform ${
          !isSideBarOpen && "-translate-x-full"
        }  transition duration-200 ease-in-out z-10`}
      >
        {/*---------------------------------------------------------------
        Sidebar Logo - For Large Screen Only 
        ---------------------------------------------------------------*/}
        <div className="hidden md:block w-full">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* ---------------------------------------------------------------
            Sidebar Menu
        ---------------------------------------------------------------- */}
        <div className=" w-full mt-24 md:mt-1 " onClick={toggleMenu}>
          <Link to="/dashboard">
            <div className="w-16 h-16 rounded-full overflow-hidden ml-24 ring ring-blue-500 hover:ring-blue-700 hover:shadow-md hover:scale-104">
              <img
                src={user.photoURL}
                className="w-full h-full object-cover"
                title={user.displayName}
              />
            </div>
          </Link>
          

         <div>
           {userRole === "admin" ? (
            <AdminMenu />
          ) : userRole === "seller" ? (
            <SellerMenu />
          ) : userRole === "user" ? (
            <UserMenu />
          ) : (
            <h2>No menu</h2>
          )}
         </div>

          <div className={`flex flex-col items-center mt-6  ${theme==="dark" ? "text-white" : "text-gray-800  "}`}>
            <DigitalClock />
            <Link
              to={`/update-profile/${user?.email}`}
              className="flex items-center justify-center gap-2 py-1 border-t border-b border-gray-400 hover:bg-green-500 hover:text-white cursor-pointer w-full mb-3  "
            >
              <FaEdit />
              Update Profile
            </Link>
            <div className="flex items-center gap-4">
              {/* <LuSettings
                size={24}
                className="cursor-pointer hover:scale-110"
              /> */}
              
                 {/* -----------------------------------------------------------------------
                          Theme Toggler Icon
                          ----------------------------------------------------------------------- */}
                          <div onClick={()=>toggleTheme()}>
                            {
                            theme === 'dark' ? <FaSun size="18"/> : <FaMoon size="18"/>
                          }
                          </div>


              <button
                onClick={() => {
                  logOutUser(), navigate("/");
                }}
                className="flex items-center gap-2 border border-gray-400 rounded-md px-2 hover:bg-green-500 hover:text-white cursor-pointer"
              >
                Logout <FaSignOutAlt />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
