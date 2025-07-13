import React from 'react';

const Container = ({children}) => {
    return (
        <div className='px-8 py-6'>
            {children}
        </div>
    );
};

export default Container;