import React from 'react';
import MenuButton from '../MenuButton';

const AdminMenu = () => {
    return (
        <div>
           <MenuButton
                label="Manage Users"
                address="/dashboard/manage-users"
           />
           <MenuButton
                label="Manage Category"
                address="/dashboard/manage-categories"
           />
           <MenuButton
                label="Payment Management"
                address="/dashboard/payment-management"
           />
           <MenuButton
                label="Sales Report"
                address="/dashboard/sales-report"
           />
           <MenuButton
                label="Manage Banner Advertises"
                address="/dashboard/manage-banner-advertises"
           />

        </div>
    );
};

export default AdminMenu;