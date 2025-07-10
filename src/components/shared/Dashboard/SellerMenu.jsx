import React from 'react';
import MenuButton from '../MenuButton';

const SellerMenu = () => {
    return (
        <div>
            <MenuButton
                label="Manage Medicines"
                address="/dashboard/manage-medicines"
            />
            <MenuButton
                label="Payment History"
                address="/dashboard/seller-payment-history"
            />
            <MenuButton
                label="Ask for Advertisements"
                address="/dashboard/ask-for-advertisements"
            />
        </div>
    );
};

export default SellerMenu;