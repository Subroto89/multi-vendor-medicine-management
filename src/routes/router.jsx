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
import PaymentManagement from "../pages/Dashboard/AdminPages/PaymentManagement";
import SalesReport from "../pages/Dashboard/AdminPages/SalesReport";
import ManageBannerAdvertises from "../pages/Dashboard/AdminPages/ManageBannerAdvertises";
import ManageMedicines from "../pages/Dashboard/SellerPages/ManageMedicines";
import SellerPaymentHistory from "../pages/Dashboard/SellerPages/SellerPaymentHistory";
import AskForAdvertisement from "../pages/Dashboard/SellerPages/AskForAdvertisements";
import UserPaymentHistory from "../pages/Dashboard/UserPages/UserPaymentHistory";
import CategoryMedicines from "../pages/Home/CategoryMedicines";
import CheckoutPage from "../pages/Home/CheckoutPage";


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
        path:"/category-medicines/:catName",
        Component: CategoryMedicines
      },
      {
        path: "/shop",
        Component: Shop
      },
      {
        path: "/cart",
        Component: Cart
      },
      {
        path: "/checkout",
        Component: CheckoutPage
      }
    ],
  },
  // ---------------------------------
  // Dashboard Layout
  // ---------------------------------
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        index: true,
        Component: DashboardHome,
      },
      //   Routes For Admin Pages-------
      {
        path: "/dashboard/manage-users",
        Component: ManageUsers,
      },
      {
        path: "/dashboard/manage-categories",
        Component: ManageCategories,
      },
      {
        path: "/dashboard/payment-management",
        Component: PaymentManagement,
      },
      {
        path: "/dashboard/sales-report",
        Component: SalesReport,
      },
      {
        path: "/dashboard/manage-banner-advertises",
        Component: ManageBannerAdvertises,
      },
      //   Routes For Seller Pages-------
      {
        path: "/dashboard/manage-medicines",
        Component: ManageMedicines,
      },
      {
        path: "/dashboard/seller-payment-history",
        Component: SellerPaymentHistory,
      },
      {
        path: "/dashboard/ask-for-advertisements",
        Component: AskForAdvertisement,
      },
      //   Routes For User Pages-------
      {
        path: "/dashboard/user-payment-history",
        Component: UserPaymentHistory
      }
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
