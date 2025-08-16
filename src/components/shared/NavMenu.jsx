import NavMenuButton from "./NavMenuButton";
import { FaCartArrowDown } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import DigitalClock from "./DigitalClock";

const NavMenu = ({ toggleLanguage }) => {
  const { user, logOutUser } = useAuth();
  return (
    <div className="flex flex-col md:flex-row  gap:3 md:gap-4 md:bg-transparent rounded-lg">
      <DigitalClock/>
      <NavMenuButton address="/" label="Home" />
      <NavMenuButton address="/shop" label="Shop" />
      <NavMenuButton address="/cart" label="Cart" icon={FaCartArrowDown} />
      <NavMenuButton label="Languages" onClick={toggleLanguage} />

      <div className="hidden md:block">
        {user ? (
          <NavMenuButton label="LogOut" onClick={logOutUser}/>
        ) : (
          <NavMenuButton address="/auth/joinUs" label="Join Us" />
        )}
      </div>
      <div className="md:hidden">
        <hr className="border-1 border-gray-300 mx-8 my-2" />
        <NavMenuButton address="/updateProfile" label="Update Profile" />
        <NavMenuButton address="/dashboard" label="Dashboard" />
        <div>
          {user ? (
            <NavMenuButton address="/logOut" label="LogOut" />
          ) : (
            <NavMenuButton address="/auth/joinUs" label="Join Us" />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
