import React from 'react';
import NavMenuButton from './shared/NavMenuButton';

const LanguageMenu = () => {
    return (
        <div className='rounded-lg bg-teal-50'>
             <NavMenuButton address='/' label='Eng-US'/>
             <NavMenuButton address='/' label='Bengali'/>
             <NavMenuButton address='/' label='French'/>
             <NavMenuButton address='/' label='Hindi'/>
             <NavMenuButton address='/' label='Spanish'/>
        </div>
    );
};

export default LanguageMenu;