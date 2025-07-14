import React, { useState } from "react";
import Container from "../../../components/shared/Container";
import AskForAdvertisementModal from "../../../components/modals/AskForAdvertisementModal";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import MyMedicineAdvertisements from "../../../components/shared/Dashboard/MyMedicineAdvertisements";

const AskForAdvertisements = () => {
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const handleIsAddModal = () => {
    setIsAdModalOpen(!isAdModalOpen);
  };
  return (
    <div className="relative">
      <Container>
        {/* --------------------------------------------------------------------------------
            Button To Open Ask For Advertisement Modal 
            -------------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-700">
            Create New Advertisement
          </h2>
          <Link
            onClick={handleIsAddModal}
            className="btn rounded-lg shadow-lg flex items-center gap-2 bg-green-500"
          >
            <FaPlus size={20} />
            Ask For New Advertisement
          </Link>
        </div>



{/* -----------------------------------------------------------------------
Table of Medicine Ask For Advertisement and Status
--------------------------------------------------------------------------- */}
        <div>

        <MyMedicineAdvertisements></MyMedicineAdvertisements>
        </div>

        {/* -------------------------------------------------------------
Ask For Advertisement Modal
------------------------------------------------------------- */}
        <div>
          {isAdModalOpen && (
            <AskForAdvertisementModal handleIsAddModal={handleIsAddModal} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default AskForAdvertisements;
