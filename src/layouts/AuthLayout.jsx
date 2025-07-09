import React from "react";
import Logo from "../components/shared/Logo";
import { Link, Outlet } from "react-router";
import authBackground from "../../src/assets/authBackground.jpg"

const AuthLayout = () => {
  return (
// className="bg-cover bg-center bg-no-repeat h-screen w-full"
 


    <div>
      <div className="bg-gradient-to-b from-teal-50 to-gray-400 p-1 shadow-lg pl-8">
        <Link to="/">
          <Logo></Logo>
        </Link>
      </div>

      <div  style={{ backgroundImage: `url(${authBackground})` }} className="flex flex-col md:flex-row gap-10 bg-gray-700 min-h-[calc(100vh-52px)] bg-cover bg-center bg-no-repeat w-full">
        
        {/* ---------------------------------------
                     Illustration Section
             ----------------------------------- */}
        <div className="flex-1 order-first md:order-none hidden md:block pt-70 text-center text-5xl font-extrabold">Welcome <br/>MediMart</div>

        {/* ---------------------------------------
                     Outlet Section
            ----------------------------------- */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
