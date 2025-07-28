import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Home/Shop";
import Cart from "../pages/Home/Cart";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Home/Register";
import JoinUs from "../pages/Home/JoinUs";
import ManageUsers from "../pages/Dashboard/AdminPages/ManageUsers";
import ManageCategories from "../pages/Dashboard/AdminPages/ManageCategories";
import SalesReport from "../pages/Dashboard/AdminPages/SalesReport";
import ManageBannerAdvertises from "../pages/Dashboard/AdminPages/ManageBannerAdvertises";
import ManageMedicines from "../pages/Dashboard/SellerPages/ManageMedicines";
import SellerPaymentHistory from "../pages/Dashboard/SellerPages/SellerPaymentHistory";
import AskForAdvertisement from "../pages/Dashboard/SellerPages/AskForAdvertisements";
import UserPaymentHistory from "../pages/Dashboard/UserPages/UserPaymentHistory";
import CategoryMedicines from "../pages/Home/CategoryMedicines";
import CheckoutPage from "../pages/Home/paymentGateWay/CheckoutPage";
import InvoicePage from "../pages/Home/paymentGateWay/InvoicePage";
import AdminPaymentManagement from "../pages/Dashboard/AdminPages/AdminPaymentManagement";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "../pages/Forbidden";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import SellerRoute from "./SellerRoute";
import ManageBlogs from "../pages/Dashboard/AdminPages/ManageBlogs";
import BlogDetails from "../pages/Home/BlogDetails";

const router = createBrowserRouter([
  // ---------------------------------
  // Root Layout
  // ---------------------------------
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/category-medicines/:catName",
        Component: CategoryMedicines,
      },
      {
        path: "/shop",
        Component: Shop,
      },
      {
        path: "/cart",
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      },
      {
        path: "/checkout",
        Component: CheckoutPage,
      },
      {
        path: "/invoice",
        Component: InvoicePage,
      },
      {
        path: "/forbidden",
        Component: Forbidden
      },
      {
        path: "/blog/:id",
        Component: BlogDetails
      }
    ],
  },
  // ---------------------------------
  // Dashboard Layout
  // ---------------------------------
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        index: true,
        Component: DashboardHome
      },
      //   Routes For Admin Pages-------
      {
        path: "/dashboard/manage-users",
        element: <AdminRoute><ManageUsers/></AdminRoute>
      },
      {
        path: "/dashboard/manage-categories",
        element: <AdminRoute><ManageCategories/></AdminRoute>
      },
      {
        path: "/dashboard/payment-management",
        element: <AdminRoute><AdminPaymentManagement/></AdminRoute>
      },
      {
        path: "/dashboard/sales-report",
        element: <AdminRoute><SalesReport/></AdminRoute>
      },
      {
        path: "/dashboard/manage-banner-advertises",
        element: <AdminRoute><ManageBannerAdvertises/></AdminRoute>
      },
      {
        path: "/dashboard/manage-blogs",
        element: <AdminRoute><ManageBlogs/></AdminRoute>
      },
      //   Routes For Seller Pages-------
      {
        path: "/dashboard/manage-medicines",
        element: <SellerRoute><ManageMedicines/></SellerRoute>
      },
      {
        path: "/dashboard/seller-payment-history",
        element: <SellerRoute><SellerPaymentHistory/></SellerRoute>
      },
      {
        path: "/dashboard/ask-for-advertisements",
        element: <SellerRoute><AskForAdvertisement/></SellerRoute>
      },
      //   Routes For User Pages-------
      {
        path: "/dashboard/user-payment-history",
        element: <UserRoute><UserPaymentHistory/></UserRoute>
      },
    ],
  },
  // ---------------------------------
  // Auth Layout
  // ---------------------------------
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/joinUs",
        Component: JoinUs,
      },
    ],
  },
]);
export default router;
