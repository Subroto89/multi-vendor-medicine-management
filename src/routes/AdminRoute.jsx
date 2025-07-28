import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {userRole, userRoleLoading} = useUserRole();

    if(loading || userRoleLoading) return <LoadingSpinner/>

    if(!user || userRole !== 'admin') {
        return <Navigate to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;