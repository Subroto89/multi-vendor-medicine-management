
import LoadingSpinner from '../components/shared/LoadingSpinner';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const {user, loading:authLoading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: userRole, isLoading: userRoleLoading, refetch} = useQuery({
        queryKey: ['getUserRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const {data} = await axiosSecure(`/get-user-role/${user?.email}`);
            console.log(data.role)
            return data.role;
        }
    });

   

    return {userRole, userRoleLoading, refetch};
    
};

export default useUserRole;