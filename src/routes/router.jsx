import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";

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
    // {
    //     path: "/dashboard",
    //     Component:
    // },
// ---------------------------------
// Auth Layout
// ---------------------------------
// {
//     path: '/auth',
//     Component: AuthLayout
// }
])
export default router;