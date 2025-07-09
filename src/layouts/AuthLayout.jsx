import React from "react";
import Logo from "../components/shared/Logo";
import { Link, Outlet } from "react-router";
import authBackground from "../../src/assets/authBackground.jpg";

const AuthLayout = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${authBackground})` }}
        className="relative flex flex-col md:flex-row items-center gap-10 bg-gray-700 min-h-screen bg-cover bg-center bg-no-repeat w-full"
      >
        {/* ---------------------------------------
                     Left Half Section
             ----------------------------------- */}

        <div
          className="flex-1 order-first md:order-none hidden md:flex text-white p-8 md:p-12 lg:p-16 rounded-lg shadow-2xl 
                     flex-col justify-center items-center text-center min-h-screen"
        >
          <div className="text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Welcome
          </div>
          <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider drop-shadow-lg">
            MediMart
          </div>
          <p className="text-white text-opacity-80 mt-4 max-w-sm text-lg">
            Your trusted partner in healthcare, delivering wellness to your
            doorstep.
          </p>
          <Link to="/">
            <p className="btn btn-outline mt-3">Take Me Home</p>
          </Link>
        </div>
        {/* ---------------------------------------
                    Right Half- Outlet Section
            ----------------------------------- */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
