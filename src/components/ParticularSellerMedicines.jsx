import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./shared/LoadingSpinner";
import DataNotFound from "./shared/DataNotFound";
import MedicineRow from "./shared/Dashboard/medicineRow";

const ParticularSellerMedicines = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: medicines = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["particularSellerMedicines"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/get-medicines/${user.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="text-red-500">
      {medicines.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className=" w-full table-fixed divide-y divide-gray-200 bg-white"> 
            <thead className="bg-gray-200 text-sm">
              <tr>
                <th
                  scope="col"
                  className="w-1/12 text-gray-800 font-bold uppercase text-center px-5 py-3" 
                >
                  Photo
                </th>
                <th
                  scope="col"
                  className="w-2/12 text-gray-800 font-bold uppercase text-center px-5 py-3" 
                >
                  Medicine Name
                </th>
                <th
                  scope="col"
                  className="w-1/12 text-gray-800 font-bold uppercase text-center px-5 py-3" 
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="w-2/12 text-gray-800 font-bold uppercase text-center px-5 py-3" 
                >
                  Generic Name
                </th>
                <th
                  scope="col"
                  className="w-1/12 text-gray-800 font-bold uppercase text-center px-5 py-3"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="w-1/12 text-gray-800 font-bold uppercase text-center px-5 py-3" 
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="w-1/12 text-gray-800 font-bold uppercase text-center px-5 py-3" 
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="w-3/12 text-gray-800 font-bold uppercase text-center px-5 py-3 sticky right-0 bg-gray-200 z-10" 
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medicines.map((medicine) => (
                <MedicineRow key={medicine._id} medicine={medicine} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
};

export default ParticularSellerMedicines;
