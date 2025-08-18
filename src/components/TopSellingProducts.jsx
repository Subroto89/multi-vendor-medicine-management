import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure"; // Assuming this hook is available
import LoadingSpinner from "./shared/LoadingSpinner"; // Assuming this component is available
import DataNotFound from "../components/shared/DataNotFound"; // Assuming this component is available
import DiscounteProductCard from "./DiscounteProductCard"; // Re-using the previously modified product card
import { useTheme } from "../context/ThemeContext"; // Import your ThemeContext hook

const TopSellingProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme(); // Access the current theme

  // ---------------------------------------------------------------
  // Loading Top Selling Products Using Tanstack Query
  // ---------------------------------------------------------------
  const { data: topSellingProducts = [], isLoading } = useQuery({
    queryKey: ["topSellingProducts"],
    queryFn: async () => {
      // Replace with your actual API endpoint for top selling products
      const { data } = await axiosSecure("/get-top-selling-products");
      return data;
    },
    // Optional: Add refetchOnWindowFocus: false if you don't want to refetch on window focus
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Define dynamic styles using CSS variables for the container and heading
  const containerStyle = {
    backgroundColor: 'var(--bg-color)', // Uses --bg-color from your CSS :root or .dark
  };

  const headingStyle = {
    color: 'var(--text-color)', // Uses --text-color from your CSS :root or .dark
  };

  return (
    <div className="w-full mt-14 py-8 md:py-12" style={containerStyle}>
      <div className="w-11/12 mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-extrabold pb-8 text-center"
          style={headingStyle}
        >
          Top Selling Products
        </h2>
        {topSellingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topSellingProducts.map((medicine) => (
              <DiscounteProductCard key={medicine._id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <DataNotFound message={"No Top Selling Products Available Now!"} />
        )}
      </div>
    </div>
  );
};

export default TopSellingProducts;