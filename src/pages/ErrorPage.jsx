import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import pageNotFound from "../assets/lotties/404lottie.json";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-lvh space-y-5">
        <p className="text-4xl font-bold text-center">
          <Lottie
            animationData={pageNotFound}
            style={{ width: "500px", margin: "0 auto" }}
          />
          Oops! Page Not Fount
        </p>

        <Link
          to="/"
          className="border-1 border-red-300 px-6 py-3 bg-amber-600 shadow rounded-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
