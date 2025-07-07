import React from 'react';
import NavMenuButton from './NavMenuButton';

const NavMenu = () => {
    return (
        <div className='flex flex-col md:flex-row items-center gap:3 md:gap-4 bg-teal-50 md:bg-transparent rounded-lg'>
              <NavMenuButton address='/' label='Home'/>
              <NavMenuButton address='/register' label='Register'/>
              <NavMenuButton address='/signIn' label='SignIn'/>
              <NavMenuButton address='/signOut' label='SignOut'/>
              <NavMenuButton address='/dashboard' label='Dashboard'/>
        </div>
    );
};

export default NavMenu;