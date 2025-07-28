import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { Navigate } from 'react-router';

const SellerRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {userRole, userRoleLoading} = useUserRole();

    if(loading || userRoleLoading) return <LoadingSpinner/>

    if(!user || userRole !== 'seller') {
        return <Navigate to="/forbidden"></Navigate>
    }

    return children;
};

export default SellerRoute;