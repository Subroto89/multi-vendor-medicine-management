import React from 'react';
import { Link } from 'react-router';

const MenuButton = ({address, label, icon: Icon}) => {
    return (
        <div>
            <Link to={address} 
                     className='btn bg-transparent border-0  w-40 md:w-auto text-gray-600 hover:bg-gray-200 shadow-none'>
                     {label}
            </Link>
        </div>
    );
};

export default MenuButton;