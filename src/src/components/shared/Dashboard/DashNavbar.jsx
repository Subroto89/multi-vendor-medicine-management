
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "../Logo";
import { Link } from "react-router";


const DashNavbar = ({toggleMenu}) => {

  return (
    <div>
      <div className="h-14 relative flex items-center justify-between gap-4 bg-gray-600 text-xl bg-gradient-to-b from-teal-50 to-gray-400 p-4 shadow-lg">
        {/* Logo Section */}
        <Link to="/">
        <Logo></Logo>
        </Link>

        <div className="flex items-center justify-between gap-10">
        

          {/* Dashboard Small Screen - Hamburger Icon*/}
          <div onClick={toggleMenu} className="flex items-center justify-around w-24 border border-gray-200 p-2 rounded-full md:hidden">
            <FaBars  size={24} />
            <FaUserCircle size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
