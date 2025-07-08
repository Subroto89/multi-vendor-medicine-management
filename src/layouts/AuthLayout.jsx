import React from "react";
import Logo from "../components/shared/Logo";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <div className="bg-gradient-to-b from-teal-50 to-gray-400 p-1 shadow-lg pl-8">
        <Link to="/">
          <Logo></Logo>
        </Link>
      </div>

      <div className="flex items-center gap-10">
        {/* ---------------------------------------
                     Outlet Section
            ----------------------------------- */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        {/* ---------------------------------------
                     Illustration Section
             ----------------------------------- */}
        <div className="flex-1">Symbol</div>
      </div>
    </div>
  );
};

export default AuthLayout;
