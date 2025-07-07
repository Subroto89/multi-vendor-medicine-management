import React from 'react';
import { NavLink } from 'react-router';

const NavMenuButton = ({address, label}) => {
    return (
        <div>
            <NavLink to={address} 
                     className='btn bg-transparent border-0  w-40 md:w-auto text-gray-600 hover:bg-gray-200 shadow-none'>
                     {label}
            </NavLink>
        </div>
    );
};

export default NavMenuButton;