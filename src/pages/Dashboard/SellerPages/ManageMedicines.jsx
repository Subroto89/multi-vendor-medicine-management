import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import AddMedicineModal from "../../../components/modals/AddMedicineModal";
import Container from "../../../components/shared/Container";
import ParticularSellerMedicines from "../../../components/ParticularSellerMedicines";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Swal from "sweetalert2";
import MedicineDetailsModal from "../../../components/modals/MedicineDetailsModal";
import MedicineRestockModal from "../../../components/modals/MedicineRestockModal";
import MedicineEditModal from "../../../components/modals/MedicineEditModal";

const ManageMedicines = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // ---------------------------------------------------------------------------------------
  // Add Medicine Modal Opening State
  // ---------------------------------------------------------------------------------------
  const [isAddMedicineModal, setIsAddMedicineModal] = useState(false);
  const [isMedicineDetailsModal, setIsMedicineDetailsModal] = useState(false);
  const [isRestockModal, setIsRestockModal] = useState(false);
  const [isMedicineEditModal, setIsMedicineEditModal] = useState(false);
  const [particularMedicine, setParticularMedicine] = useState(null);

  const handleAddMedicineModal = () => {
    setIsAddMedicineModal(!isAddMedicineModal);
  };

  const handleMedicineDetailsModal = () => {
    setIsMedicineDetailsModal(!isMedicineDetailsModal);
  };

  const handleRestockModal = () => {
    setIsRestockModal(!isRestockModal);
  };

  const handleMedicineEditModal = () => {
    setIsMedicineEditModal(!isMedicineEditModal);
  };

  const {
    data: medicines = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["particularSellerMedicines", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/get-medicines/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // --------------------------------------------------------------------------------------------
  // Medicine Delete Function
  // --------------------------------------------------------------------------------------------
  const handleDeleteMedicine = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this medicine!", // More specific text
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(`/delete-medicine/${id}`);
        if (data.deletedCount) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Medicine deleted",
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Medicine deletion failed",
            timer: 1000,
          });
        }
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // --------------------------------------------------------------------------------------------
  // Restock Medicine Function
  // --------------------------------------------------------------------------------------------
  const handleRestock = async (id, quantity) => {
    const incrementedStock = {
      newStock: quantity,
    };
    const { data } = await axiosSecure.patch(
      `/restock-medicine/${id}`,
      incrementedStock
    );
    if (data.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: "Restocking successful",
        text: "You have restocked successfully",
        timer: 1000,
      });
      refetch();
      handleRestockModal();
    } else {
      Swal.fire({
        icon: "error",
        title: "Restocking Failed!",
        text: "Restocking is not completed",
        timer: 1000,
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative">
      <Container>
        {/* --------------------------------------------------------------------------------
            Button To Open Add New Medicine Modal 
            -------------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-700">
            Manage Your Medicine
          </h2>
          <Link
            onClick={handleAddMedicineModal}
            className="btn rounded-lg shadow-lg flex items-center gap-2 bg-green-500"
          >
            <FaPlus size={20} />
            Add New Medicine
          </Link>
        </div>

        {/* --------------------------------------------------------------------------------
            All the Added Medicine Display Table
            -------------------------------------------------------------------------------- */}
        <div className="my-4">
          <ParticularSellerMedicines
            medicines={medicines}
            refetch={refetch}
            handleDeleteMedicine={handleDeleteMedicine}
            handleMedicineDetailsModal={handleMedicineDetailsModal}
            setParticularMedicine={setParticularMedicine}
            handleRestockModal={handleRestockModal}
            handleRestock={handleRestock}
            handleMedicineEditModal={handleMedicineEditModal}
          />
        </div>
        {/* All The Modals Below ----------------------------------------------------------- */}
        {/* --------------------------------------------------------------------------------
            Add New Medicine Modal
            -------------------------------------------------------------------------------- */}
        {isAddMedicineModal && (
          <AddMedicineModal
            handleAddMedicineModal={handleAddMedicineModal}
            refetch={refetch}
          />
        )}

        {/* --------------------------------------------------------------------------------
            Medicine Details Modal
            -------------------------------------------------------------------------------- */}
        {isMedicineDetailsModal && (
          <MedicineDetailsModal
            particularMedicine={particularMedicine}
            handleMedicineDetailsModal={handleMedicineDetailsModal}
          />
        )}

        {/* --------------------------------------------------------------------------------
            Medicine Restock Modal
            -------------------------------------------------------------------------------- */}
        {isRestockModal && (
          <MedicineRestockModal
            particularMedicine={particularMedicine}
            handleRestockModal={handleRestockModal}
            handleRestock={handleRestock}
          />
        )}

        {/* --------------------------------------------------------------------------------
            Medicine Edit Modal
            -------------------------------------------------------------------------------- */}
        {isMedicineEditModal && (
          <MedicineEditModal
            handleMedicineEditModal={handleMedicineEditModal}
            refetch={refetch}
            particularMedicine={particularMedicine}
          />
        )}
      </Container>
    </div>
  );
};

export default ManageMedicines;











