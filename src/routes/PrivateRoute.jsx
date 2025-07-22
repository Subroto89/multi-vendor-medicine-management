
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    
        const {user, loading} = useAuth();
        const location = useLocation();

        if(loading) return <LoadingSpinner/>

        if(user && user?.email) return children;

        return <Navigate to="/auth/joinUs" state={location.pathname}></Navigate>
};

export default PrivateRoute;