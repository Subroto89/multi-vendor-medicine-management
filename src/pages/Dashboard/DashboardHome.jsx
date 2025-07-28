

import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import SellerDashboardHome from './SellerPages/SellerDashboardHome'; // Import the seller home content
import AdminDashboardHome from './AdminPages/AdminDashboardHome';
import useUserRole from '../../hooks/useUserRole';
import UserDashboardHome from './UserPages/UserDashboardHome';


const DashboardHome = () => {
  const { user, loading } = useAuth();
  const {userRole, userRoleLoading} = useUserRole() 


  if (loading || userRoleLoading) {
    return <LoadingSpinner />;
  }
console.log(userRole)
  if (!user) {
    return <div className="text-center py-20">Please log in to view your dashboard.</div>;
  }

  // Conditionally render the appropriate role-specific home page
  switch (userRole) {
    case 'admin':
      return <AdminDashboardHome />;
    case 'seller':
      return <SellerDashboardHome />; 
    case 'user':
      return <UserDashboardHome />;
    default:
      return <div className="text-center py-20">Welcome to your Dashboard! Role not recognized.</div>;
  }
};

export default DashboardHome;