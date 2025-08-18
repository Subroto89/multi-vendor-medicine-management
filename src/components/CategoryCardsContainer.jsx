import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./shared/LoadingSpinner";
import Container from "./shared/Container";
import DataNotFound from "../components/shared/DataNotFound";
import CategoryCard from "./CategoryCard";
import { useTheme } from "../context/ThemeContext";

const CategoryCardsContainer = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  // ---------------------------------------------------------------
  // Loading All Categories Using Tanstack
  // ---------------------------------------------------------------
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const { data } = await axiosSecure("/get-categories");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div id="categories" className="w-full bg-secondary mt-24">
      <div className="w-11/12 mx-auto">
        <h2
          className={`text-4xl mb-10 font-bold text-center ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          Category Medicines
        </h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        ) : (
          <DataNotFound message={"No Category Available Now!"} />
        )}
      </div>
    </div>
  );
};

export default CategoryCardsContainer;
