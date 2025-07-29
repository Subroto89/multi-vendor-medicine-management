import React from "react";
import NavMenuButton from "./NavMenuButton";
import useAuth from "../../hooks/useAuth";


const NavMenuAvatar = () => {
  const {user} = useAuth()
  return (
    <div>
      
        <div className=" bg-teal-50 rounded-lg">
        <NavMenuButton address={`/update-profile/${user?.email}`} label="Update Profile" />
        <NavMenuButton address="/dashboard" label="Dashboard" />
        
      </div>
      
    </div>
  );
};

export default NavMenuAvatar;
