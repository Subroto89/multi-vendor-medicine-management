import React from "react";
import Navbar from "../component/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../component/shared/Footer"; 

const RootLayout = () => {
  return (
    <div>
      <div>
        <nav>
          <Navbar></Navbar>
        </nav>
        <main className="min-h-screen bg-gray-300">
          <Outlet></Outlet>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
};

export default RootLayout;
