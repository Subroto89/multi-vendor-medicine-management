import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Container from "../../../components/shared/Container";
import DataNotFound from "../../../components/shared/DataNotFound";
import { GrUpdate } from "react-icons/gr";
import AdvertisementRow from "../../../components/shared/Dashboard/AdvertisementRow";
import { useState } from "react";
import BannerAdModal from "../../../components/modals/BannerAdModal";
import { TabTitle } from "../../../utilities/utilities";

const ManageBannerAdvertises = () => {
  TabTitle('Manage Banner Advertises')
  const axiosSecure = useAxiosSecure();

  const [isBannerAdModal, setIsBannerAdModal] = useState(false);
  const [particularBannerAd, setParticularBannerAd] = useState(null)
  const handleBannerAdModal = () => {
    setIsBannerAdModal(!isBannerAdModal);
  };

  const {
    data: advertisements,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/get-advertisements/status`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      
      <Container>
        <h2 className="text-xl md:text-2xl font-bold text-gray-600 py-8 md:py-4 ">Manage Banner Advertisements</h2>
        {advertisements.length > 0 ? (
          <div className="max-h-[calc(100vh-120px)] overflow-auto rounded-lg">
            <table className="w-8/12 md:min-w-full divide-y divide-gray-200 overflow-scroll text-gray-800">
              <thead className="bg-gray-200 shadow-lg text-sm sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className="w-34 text-gray-800 font-bold uppercase text-center px-5 py-2"
                  >
                    Photo
                  </th>
                  <th
                    scope="col"
                    className="text-gray-800 font-bold uppercase text-center px-3 py-2"
                  >
                    Ad Description
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
                    Seller Email
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-400 ">
                {advertisements.map((advertisement) => (
                  <AdvertisementRow
                    key={advertisement._id}
                    advertisement={advertisement}
                    refetch={refetch}
                    handleBannerAdModal={handleBannerAdModal}
                    setParticularBannerAd={setParticularBannerAd}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <DataNotFound
            message={"No advertisement is available to for approval"}
          />
        )}
      </Container>

      {/* -----------------------------------------------------------------------------------------------------------------
           Banner Advertisement Modal
           ------------------------------------------------------------------------------------------------------------------ */}
      <div>
        {isBannerAdModal && (
          <BannerAdModal particularBannerAd={particularBannerAd} handleBannerAdModal={handleBannerAdModal} />
        )}
      </div>
    </div>
  );
};

export default ManageBannerAdvertises;
