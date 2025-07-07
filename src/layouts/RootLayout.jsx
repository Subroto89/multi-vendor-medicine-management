import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer"; 

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
