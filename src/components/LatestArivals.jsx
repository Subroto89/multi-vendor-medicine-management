import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./shared/LoadingSpinner";
import DataNotFound from "./shared/DataNotFound";
import { useTheme } from "../context/ThemeContext";
import RecentArrivalCard from "./RecentArrivalCard";


const LatestArrivals = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  // ---------------------------------------------------------------
  // Loading Latest Arriving Products Using Tanstack Query
  // ---------------------------------------------------------------
  const { data: latestProducts = [], isLoading } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: async () => {
      const { data } = await axiosSecure("/get-latest-arrivals");
      return data;
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Define dynamic styles using CSS variables for the container and heading
  const containerStyle = {
    backgroundColor: 'var(--bg-color)',
  };

  const headingStyle = {
    color: 'var(--text-color)',
  };

  return (
    <div className="w-full mt-14 py-8 md:py-12" style={containerStyle}>
      <div className="w-11/12 mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-extrabold pb-8 text-center"
          style={headingStyle}
        >
          Latest Arrivals
        </h2>
        {latestProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {latestProducts.map((medicine) => (
              <RecentArrivalCard key={medicine._id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <DataNotFound message={"No New Arrivals Available Now!"} />
        )}
      </div>
    </div>
  );
};

export default LatestArrivals;
