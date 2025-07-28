import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";
import Container from "../Container";
import DataNotFound from "../DataNotFound";
import MyMediAdsRow from "./MyMediAdsRow";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

const MyMedicineAdvertisements = ({ handleAdViewModal, handleParticularAd }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: allMediAds = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myMediAds"],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-advertisements?email=${user.email}`
      );
      return data;
    },
  });

  const handleAdsDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmation.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(
          `/delete-advertisement/${id}`
        );
        if (data.deletedCount) {
          Swal.fire({
            icon: "success",
            title: "Deletion Success!",
            text: "Your advertisement has been deleted successfully",
            timer: 1000,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Deletion Failed!",
            text: "Your advertisement can not be deleted",
            timer: 1000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Container>
        <h2 className="text-red-800">My Advertisements</h2>
        <div>
          {allMediAds.length > 0 ? (
            <div>
              <table className="w-8/12 md:min-w-full divide-y divide-gray-200 overflow-scroll">
                <thead className="bg-gray-200 shadow-lg text-sm">
                  <tr>
                    <th
                      scope="col"
                      className=" text-gray-800 font-bold uppercase text-center px-5 py-2"
                    >
                      Photo
                    </th>
                    <th
                      scope="col"
                      className="text-gray-800 font-bold uppercase text-center px-5 py-2"
                    >
                      Medicine Name
                    </th>
                    <th
                      scope="col"
                      className="text-gray-800 font-bold uppercase text-center px-5 py-2"
                    >
                      Generic Name
                    </th>
                    <th
                      scope="col"
                      className="text-gray-800 font-bold uppercase text-center px-5 py-2"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-gray-800 font-bold uppercase text-center px-5 py-2"
                    >
                      Created Date
                    </th>
                    <th
                      scope="col"
                      className="text-gray-800 font-bold uppercase flex items-center justify-center  gap-3 px-5 py-2"
                    >
                      <GrUpdate size={18} />
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allMediAds.map((mediAd) => (
                    <MyMediAdsRow
                      key={mediAd._id}
                      mediAd={mediAd}
                      handleAdsDelete={handleAdsDelete}
                      handleAdViewModal={handleAdViewModal}
                      handleParticularAd={handleParticularAd}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <DataNotFound
              message={
                "You didn't applied for any advertisement! You may add now."
              }
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default MyMedicineAdvertisements;
