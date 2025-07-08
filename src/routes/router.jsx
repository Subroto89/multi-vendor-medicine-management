import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import JoinUs from "../pages/JoinUs";


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
            Component: Home
        }
      ]
    },
// ---------------------------------
// Dashboard Layout
// ---------------------------------
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
           {
            path: '/dashboard',
            index: true,
            Component: DashboardHome
        }
        ] 
    },
// ---------------------------------
// Auth Layout
// ---------------------------------
{
    path: '/auth',
    Component: AuthLayout,
    children:[
        {
            path: '/auth/register',
            Component: Register
        },
        {
            path: '/auth/joinUs',
            Component: JoinUs
        }
    ]
}
])
export default router;