import React from 'react';
import { NavLink } from 'react-router';

const NavMenuButton = ({address, label, icon: Icon, onClick}) => {
    return (
        <div>
            <NavLink to={address} 
                     onClick={onClick}
                     className='btn bg-transparent border-0 w-full font-semibold text-gray-600 hover:bg-gray-200 shadow-none'>
                     {label}
                     {Icon && <Icon size={20} />}
            </NavLink>
        </div>
    );
};

export default NavMenuButton;