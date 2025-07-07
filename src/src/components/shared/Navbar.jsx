import React, { useState } from "react";
import NavMenu from "./NavMenu";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div>
      <div className="h-14 relative flex items-center justify-between gap-4 bg-gray-600 text-xl bg-gradient-to-b from-teal-50 to-gray-400 p-4 shadow-lg">
        {/* Logo Section */}
        <Logo></Logo>

        <div className="flex items-center justify-between gap-10">
          {/* Desktop Menu Section */}
          <div className="hidden md:block">
            <NavMenu />
          </div>

          <div className="border-1 border-blue-400 rounded-full p-2 hidden md:block">
            <FaUserCircle size={32} />
          </div>

          {/* Small Screen Section - Hamburger Icon*/}
          <div className="flex items-center justify-around w-24 border border-gray-200 p-2 rounded-full md:hidden">
            <FaBars onClick={toggleMenu} size={24} />
            <FaUserCircle size={24} />
          </div>
        </div>
      </div>
      {/*Small Screen Menu - Visible When Clicking Hamburger on Small Devices  */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="absolute right-2 z-10 w-40 transition duration-1000 ease-in-out md:hidden "
        >
          <NavMenu />
        </div>
      )}
    </div>
  );
};

export default Navbar;
