import React from "react";
import NavMenuButton from "./NavMenuButton";
import { FaCartArrowDown } from "react-icons/fa";

const NavMenu = ({ toggleLanguage }) => {
  return (
    <div className="flex flex-col md:flex-row  gap:3 md:gap-4 bg-teal-50 md:bg-transparent rounded-lg">
      <NavMenuButton address="/" label="Home" />
      <NavMenuButton address="/shop" label="Shop" />
      <NavMenuButton address="/cart" label="" icon={FaCartArrowDown} />
      <NavMenuButton label="Languages" onClick={toggleLanguage} />
      <NavMenuButton address="/auth/joinUs" label="Join Us" />
      <div className="md:hidden">
        <hr className="border-1 border-gray-300 mx-8 my-2" />
        <NavMenuButton address="/updateProfile" label="Update Profile" />
        <NavMenuButton address="/dashboard" label="Dashboard" />
        <NavMenuButton address="/logOut" label="LogOut" />
      </div>
    </div>
  );
};

export default NavMenu;
