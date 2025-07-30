import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

const AdsSlider = ({ activeAds }) => {
  if (!activeAds || activeAds.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        interval={5000}
        transitionTime={500}
        className="rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        {activeAds.map((ad) => (
          <div
            key={ad._id}
            className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[450px] flex items-center justify-center p-4 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 gap-6 md:gap-10">
              {/* Medicine Photo Section */}
              <div className="w-full md:w-1/3 flex justify-center items-center">
                <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 overflow-hidden rounded-full border-4 border-blue-200 shadow-md flex items-center justify-center bg-gray-50">
                  <img
                    src={
                      ad.mediPhoto ||
                      "https://placehold.co/250x250/E0E7FF/4338CA?text=No+Image"
                    } // Fallback image
                    alt={ad.linkedMedicineName || "Medicine Photo"}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/250x250/E0E7FF/4338CA?text=Image+Error";
                    }} // Error fallback
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-2/3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-800 mb-2 leading-tight">
                  {ad.linkedMedicineName}
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                  {ad.adDescription}
                </p>

                {ad.linkedMedicineId && (
                  <Link
                    to={`/shop`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Shop Now
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdsSlider;
