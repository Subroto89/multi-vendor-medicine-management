import { useState } from "react";
import NavMenu from "./NavMenu";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import NavMenuAvatar from "./NavMenuAvatar";
import LanguageMenu from "../LanguageMenu";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // ---------------------------------------------------------
  // Menu Toggle Functionality
  // ---------------------------------------------------------
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // ---------------------------------------------------------
  // Menu Toggle Functionality
  // ---------------------------------------------------------
  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };
  const closeLanguageMenu = () => {
    setIsLanguageOpen(false);
  };

  return (
    <div>
      <div className="h-14 relative flex items-center justify-between gap-4 bg-gray-600 text-xl bg-gradient-to-b from-teal-50 to-gray-400 p-4 shadow-lg">
        {/* -------------------------------------------------------------------------
          Logo Section
          --------------------------------------------------------------------- */}
        <Logo></Logo>

        {/* -------------------------------------------------------------------------
          Navigation Link Section
          --------------------------------------------------------------------- */}
        <div className="flex items-center justify-between gap-10">
          {/* Links on Desktop Mode Section --------------------------------------*/}
          <div className="hidden md:block">
            <NavMenu toggleLanguage={() => (toggleLanguage(), closeMenu())} />
          </div>

          {/* Avatar/User Photo on Desktop Mode Section --------------------------------------*/}
          <div
            onClick={()=>{closeLanguageMenu(), toggleMenu()}}
            className="border-1 border-blue-400 rounded-full hidden md:block"
          >
            {user?.photoURL ? (
              <div className="w-12 h-12 rounded-full overflow-hidden"><img src={user?.photoURL} alt="user photo" className="w-full h-full object-cover"/></div>
            ) : (
              <FaUserCircle  size={32} />
            )}
          </div>

          {/* -------------------------------------------------------------------------
          Small Screen Hamburger Section
          --------------------------------------------------------------------- */}
          <div className="flex items-center justify-around w-24 border border-gray-200 p-2 rounded-full md:hidden">
            {
              isMenuOpen ? <FaTimes onClick={toggleMenu} size={24}/> : <FaBars onClick={toggleMenu} size={24} />
            }
                        
            {user?.photoURL ? (
              <div className="w-8 h-8 rounded-full overflow-hidden"><img src={user?.photoURL} alt="user photo" className="w-full h-full object-cover"/></div>
            ) : (
              <FaUserCircle  size={24} />
            )}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------
          Menu - Visible on Click
          --------------------------------------------------------------------- */}
      <div>
        {/*------------------------------------------------------------------------
          Small Screen Menu - Visible When Clicking Hamburger on Small Devices    
          ----------------------------------------------------------------------*/}
        {isMenuOpen && (
          <div
            onClick={closeMenu}
            className="absolute right-2 z-10 w-40 transition duration-1000 ease-in-out md:hidden "
          >
            <NavMenu closeMenu={closeMenu} />
          </div>
        )}

        {/*------------------------------------------------------------------------
          Large Screen Menu for Avatar- Visible When Clicking on Avatar/User Image    
          ----------------------------------------------------------------------*/}

        {isMenuOpen && (
          <div
            onClick={closeMenu}
            className={`absolute right-2 z-16 w-40 transition  duration-1000 ease-in-out`}
          >
            <NavMenuAvatar />
          </div>
        )}

        {/*------------------------------------------------------------------------
          Large Screen Menu for Language- Visible When Clicking on Language    
          ----------------------------------------------------------------------*/}
        {isLanguageOpen && (
          <div
            onClick={closeLanguageMenu}
            className={`absolute right-35 z-16 w-40  transition  duration-1000 ease-in-out`}
          >
            <LanguageMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
