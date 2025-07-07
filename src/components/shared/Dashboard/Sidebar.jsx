import Logo from "../Logo";
import MenuButton from "../MenuButton";

const Sidebar = ({ isSideBarOpen }) => {
  return (
    <div>
      <div
        className={`absolute w-64  inset-y-0  bg-gray-200 flex flex-col md:fixed   md:translate-x-0 transform ${
          !isSideBarOpen && "-translate-x-full"
        }  transition duration-200 ease-in-out`}
      >
       {/* Sidebar Logo - For Large Screen Only */}
        <div className="hidden md:block">
          <Logo></Logo>
        </div>

        {/* ---------------------------------------------------------------
            Sidebar Menu
            ----------------------------------------------------------- */}
        <MenuButton address='' label='Customer'/>
        
      </div>
    </div>
  );
};

export default Sidebar;
