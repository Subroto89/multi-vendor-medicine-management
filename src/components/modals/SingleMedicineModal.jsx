import React from "react";
import { MdClose } from "react-icons/md";

const SingleMedicineModal = ({ handleModalView, singleMedicine }) => {
  const {
    mediPhoto,
    medicineName,
    categoryName,
    genericName,
    company,
    shortDescription,
    status,
    perUnitPrice,
    discountPercentage,
    seller,
    stock,
    createdAt,
  } = singleMedicine; 
  const discountedPrice = perUnitPrice - (perUnitPrice * (discountPercentage / 100 || 0))

  return (
    <div className="fixed bg-black/50 inset-0 flex items-center">
      <div
        className="relative w-[800px] h-[500px] mx-auto bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg 
                            shadow-lg border-1 border-white"
      >
        {/* ----------------------------------------------------------------------------------
        Modal Heading - Medicine Name 
        -----------------------------------------------------------------------------------*/}
        <div>
          <h2 className="text-2xl font-bold text-gray-700 pl-10 pt-10">
            {medicineName} Details
          </h2>
        </div>
        {/* ----------------------------------------------------------------------------------
        Two Column Layout
        -----------------------------------------------------------------------------------*/}
        <div className="flex items-center gap-4 text-sm text-gray-700">
          {/* Left Column - Medicine Photo ----------------------------------------------- */}
          <div className="p-10 w-90 h-90 overflow-hidden">
            <img
              src={mediPhoto}
              alt="medicine photo"
              className="w-full h-auto object-cover hover:scale-125 transition duration-500"
            />
          </div>

          {/* Right Column - Medicine Information ---------------------------------------  */}
          <div className="flex flex-col gap-2">
            <div>
              <p>
                <span className="font-semibold">Generic Name:</span>
                {genericName}
              </p>
              <p>
                <span className="font-semibold">Description:</span>
                {shortDescription}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Category:</span> {categoryName}
              </p>
              <p>
                <span className="font-semibold">Company:</span> {company}
              </p>
              <p>
                <span className="font-semibold">Mass Unit:</span> {status}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Price:</span> ${perUnitPrice}
              </p>
              <p><span className="font-semibold">Discounted Price:</span> ${discountedPrice} ({perUnitPrice === discountedPrice ? "0% discount" : `${discountPercentage}% discount`})</p>
              <p>
                <span className="font-semibold">Stock Available:</span>
                {seller.sellerName}
              </p>
              <p>
                <span className="font-semibold">Added By:</span>
                {seller.sellerName}
              </p>
              <p>
                <span className="font-semibold">Added On:</span> {createdAt}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleModalView()}
          className="absolute right-6 top-6 border border-gray-100 rounded-md p-1"
        >
          <MdClose size={22} />
        </button>
      </div>
    </div>
  );
};

export default SingleMedicineModal;
