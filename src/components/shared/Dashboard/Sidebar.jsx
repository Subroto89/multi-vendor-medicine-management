import Logo from "../Logo";
import AdminMenu from "../../shared/Dashboard/AdminMenu";
import SellerMenu from "../../shared/Dashboard/SellerMenu";
import UserMenu from "../../shared/Dashboard/UserMenu";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";
import useUserRole from "../../../hooks/useUserRole";

const Sidebar = ({ isSideBarOpen, toggleMenu }) => {
  const { loading:authLoading } = useAuth()
  const {userRole, userRoleLoading} = useUserRole();
  if(authLoading || userRoleLoading) return <LoadingSpinner/>
console.log(userRole)

  return (
    <div>
      <div
        className={`absolute w-56 md:w-64  inset-y-0  bg-gray-200 flex flex-col gap-20 md:fixed   md:translate-x-0 transform ${
          !isSideBarOpen && "-translate-x-full"
        }  transition duration-200 ease-in-out`}
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
        <div className="w-full" onClick={toggleMenu}>


          {
            userRole === 'admin' ? (<AdminMenu/>) : userRole === 'seller' ? (<SellerMenu/>): userRole === 'user' ? (<UserMenu/>):(<h2>No menu</h2>)
          }

          
          
           
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
