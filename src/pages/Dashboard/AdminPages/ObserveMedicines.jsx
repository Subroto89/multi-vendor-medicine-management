import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Container from "../../../components/shared/Container";
import DataNotFound from "../../../components/shared/DataNotFound";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import { TabTitle } from "../../../utilities/utilities";
import MedicineRow from "../../../components/shared/MedicineRow";
import MedicineObserveModal from "../../../components/modals/MedicineObserveModal";
import Swal from "sweetalert2";

const ObserveMedicines = () => {
  TabTitle("Manage Medicines");
  const axiosSecure = useAxiosSecure();

  const [isMedicineObserveModal, setIsMedicineObserveModal] = useState(false);
  const [particularMedicine, setParticularMedicine] = useState(null);

  const handleMedicineObserveModal = () => {
    setIsMedicineObserveModal(!isMedicineObserveModal);
  };

  const handleMedicineStatus = async (medicineId, action) => {
    const confirm = await Swal.fire({
      title: `${action === "active" ? "Active" : "Reject"} Application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!confirm.isConfirmed) return;

    try {
      const { data } = await axiosSecure.patch(
        `/medicine/approve/reject/${medicineId}`,
        {
          status: action === "active" ? "active" : "inactive",
        }
      );
      if (data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: `Advertisement has been ${
            action === "active" ? "active" : "inactive"
          } successfully`,
          timer: 1500,
        });
        handleMedicineObserveModal(),
        refetch();

      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const {
    data: medicinesList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allMedicines"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/observe/get-medicines`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  console.log(medicinesList);
  return (
    <div>
      <Container>
        <h2 className="text-xl md:text-2xl font-bold text-gray-600 py-8 md:py-4 ">
          Manage Medicines <br/>
          <span className="text-sm">Check and confirm for advertisement engagement and ready to sell.</span>
        </h2>
        {medicinesList.length > 0 ? (
          <div className="overflow-auto rounded-lg max-h-[calc(100vh-150px)]">
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
                {medicinesList.map((medicine) => (
                  <MedicineRow
                    key={medicine._id}
                    medicine={medicine}
                    refetch={refetch}
                    handleMedicineObserveModal={handleMedicineObserveModal}
                    setParticularMedicine={setParticularMedicine}
                    handleMedicineStatus={handleMedicineStatus}
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
        {isMedicineObserveModal && (
          <MedicineObserveModal
            particularMedicine={particularMedicine}
            handleMedicineObserveModal={handleMedicineObserveModal}
            handleMedicineStatus={handleMedicineStatus}
          />
        )}
      </div>
    </div>
  );
};

export default ObserveMedicines;
