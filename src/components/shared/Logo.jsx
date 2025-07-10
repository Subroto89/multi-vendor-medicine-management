import React from 'react';
import MediMartLogo from '../../../src/assets/MediMartLogo.png';

const Logo = () => {
    return (
        <div className=' bg-teal-50 p-2  flex items-center justify-center gap-2 w-full shadow-xl'>
            <img src={MediMartLogo} alt="MediMart Logo" className='h-6 w-6 inline-block' />
            <h1 className='text-lg text-gray-700 font-bold'>MediMart</h1>
        </div>
    );
};

export default Logo;