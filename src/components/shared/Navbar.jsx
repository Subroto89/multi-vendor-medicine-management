import { useState } from "react";
import NavMenu from "./NavMenu";
import { FaBars, FaMoon, FaSun, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import NavMenuAvatar from "./NavMenuAvatar";
import LanguageMenu from "../LanguageMenu";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { user } = useAuth();
  const {theme, toggleTheme} = useTheme()
  

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
    <div className={`fixed top-0 z-1000 w-full ${theme==="dark" ? "card-bg border-b border-gray-500" : "bg-primary"}`}>
      <div className="w-11/12 mx-auto h-14 relative flex items-center justify-between gap-4  p-4 shadow-lg">
        {/* -------------------------------------------------------------------------
          Logo Section
          --------------------------------------------------------------------- */}
          <div className="w-40 rounded-lg overflow-hidden">
             <Link to="/"><Logo/></Link>
          </div>

          {/* -----------------------------------------------------------------------
          Theme Toggler Icon
          ----------------------------------------------------------------------- */}
          <div onClick={()=>toggleTheme()}>
            {
            theme === 'dark' ? <FaSun size="18"/> : <FaMoon size="18"/>
          }
          </div>



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
            className="absolute right-0 bg-primary z-10 w-40 transition duration-1000 ease-in-out md:hidden "
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
            className={`absolute right-0 bg-primary z-16 w-40 transition  duration-1000 ease-in-out`}
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
