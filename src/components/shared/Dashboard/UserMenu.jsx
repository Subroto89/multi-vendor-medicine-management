import React from 'react';
import MenuButton from '../MenuButton';

const UserMenu = () => {
    return (
        <div>
            <MenuButton
                label="Payment History"
                address="/dashboard/user-payment-history"
            />
        </div>
    );
};

export default UserMenu;