import React from 'react';
import { NavLink } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

const NavMenuButton = ({address, label, icon: Icon, onClick}) => {
    const {theme} = useTheme();
    return (
        <div>
            <NavLink to={address} 
                     onClick={onClick}
                     className={`btn bg-transparent border-0 w-full font-semibold btn-color shadow-none ${theme==="dark" ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-gray-900"}`}>
                     {label}
                     {Icon && <Icon size={20} />}
            </NavLink>
        </div>
    );
};

export default NavMenuButton;