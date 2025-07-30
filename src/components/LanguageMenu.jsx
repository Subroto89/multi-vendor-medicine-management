import React from 'react';
import NavMenuButton from './shared/NavMenuButton';

const LanguageMenu = () => {
    return (
        <div className='rounded-lg bg-teal-50'>
             <NavMenuButton  label='Eng-US'/>
             <NavMenuButton  label='Bengali'/>
             <NavMenuButton  label='French'/>
             <NavMenuButton  label='Hindi'/>
             <NavMenuButton  label='Spanish'/>
        </div>
    );
};

export default LanguageMenu;