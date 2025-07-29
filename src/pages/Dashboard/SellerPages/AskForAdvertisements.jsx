import React, { useState } from "react";
import Container from "../../../components/shared/Container";
import AskForAdvertisementModal from "../../../components/modals/AskForAdvertisementModal";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import MyMedicineAdvertisements from "../../../components/shared/Dashboard/MyMedicineAdvertisements";
import AdvertisementViewModal from "../../../components/modals/AdvertisementViewModal";
import { TabTitle } from "../../../utilities/utilities";

const AskForAdvertisements = () => {
  TabTitle('Ask For Advertisement');
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isAdViewModal, setIsAdViewModal] = useState(false);
  const [particularAd, setParticularAd] = useState(null);

  const handleIsAddModal = () => {
    setIsAdModalOpen(!isAdModalOpen);
  };

  const handleAdViewModal = () => {
    setIsAdViewModal(!isAdViewModal);
  };

  const handleParticularAd = (particularAd) => {
    setParticularAd(particularAd);
  };
  return (
    <div className="relative">
      <Container>
        {/* --------------------------------------------------------------------------------
            Button To Open Ask For Advertisement Modal 
            -------------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between pt-8 md:pt-1">
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
          <MyMedicineAdvertisements
            handleAdViewModal={handleAdViewModal}
              handleParticularAd={handleParticularAd} 
          />
        </div>

        {/* -------------------------------------------------------------
        Ask For Advertisement Modal
        ------------------------------------------------------------- */}
        <div>
          {isAdModalOpen && (
            <AskForAdvertisementModal handleIsAddModal={handleIsAddModal} />
          )}
        </div>

        {/* -------------------------------------------------------------
        Ask For Advertisement View Modal
        ------------------------------------------------------------- */}
        <div>
          {isAdViewModal && (
            <AdvertisementViewModal handleAdViewModal={handleAdViewModal} particularAd={particularAd} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default AskForAdvertisements;
