

import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import SellerDashboardHome from './SellerPages/SellerDashboardHome'; // Import the seller home content
import AdminDashboardHome from './AdminPages/AdminDashboardHome';


const DashboardHome = () => {
  const { user, loading } = useAuth(); 


  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div className="text-center py-20">Please log in to view your dashboard.</div>;
  }

  return <AdminDashboardHome/>
//   return <SellerDashboardHome/>

  // Conditionally render the appropriate role-specific home page
//   switch (userRole) {
//     case 'admin':
//       // return <AdminDashboardHome />; // You'll create this component in AdminPages
//       return <div className="text-center py-20 text-xl font-semibold">Admin Dashboard Home Coming Soon!</div>;
//     case 'seller':
//       return <SellerDashboardHome />; // Render the seller's home content directly
//     case 'user':
//       // return <UserDashboardHome />; // You'll create this component in UserPages
//       return <div className="text-center py-20 text-xl font-semibold">User Dashboard Home Coming Soon!</div>;
//     default:
//       return <div className="text-center py-20">Welcome to your Dashboard! Role not recognized.</div>;
//   }
};

export default DashboardHome;