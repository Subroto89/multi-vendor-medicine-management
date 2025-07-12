import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/shared/Dashboard/Sidebar";
import DashNavbar from "../components/shared/Dashboard/DashNavbar";

const DashboardLayout = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const toggleMenu = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <div>
      <div className="relative flex flex-col min-h-screen bg-gray-100">
{/* ------------------------------------------------------------
    Dashboard Navbar For Small Screen Only Section
    ------------------------------------------------------------ */}
        <div className="absolute md:hidden top-0 z-20 inset-x-0">
          <DashNavbar toggleMenu={toggleMenu} isSideBarOpen={isSideBarOpen}></DashNavbar>
        </div>
        
        <div className="flex-1 gap-2 w-full">
{/* ------------------------------------------------------------
    Sidebar Section
    ------------------------------------------------------------ */}
          <div>
          <Sidebar isSideBarOpen={isSideBarOpen} toggleMenu={toggleMenu}></Sidebar>
          </div>
{/* ------------------------------------------------------------
    Outlet Section
    ------------------------------------------------------------ */}
          <div className="w-1/2 md:w-full md:pl-64">
            <Outlet />
          </div>
{/* ------------------------------------------------------------ */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
