import React from "react";
import NavMenuButton from "./NavMenuButton";

const NavMenuAvatar = () => {
  return (
    <div>
      <div className=" bg-teal-50 rounded-lg">
        <NavMenuButton address="/updateProfile" label="Update Profile" />
        <NavMenuButton address="/dashboard" label="Dashboard" />
        {/* <NavMenuButton address="/logOut" label="LogOut" /> */}
      </div>
    </div>
  );
};

export default NavMenuAvatar;
