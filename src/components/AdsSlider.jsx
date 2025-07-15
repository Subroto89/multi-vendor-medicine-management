import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const AdsSlider = ({activeAds}) => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            {
                activeAds.map(ad => (
                    <div key={ad._id} className="w-full rounded-lg overflow-hidden">
                        <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-lg">
                            <div className="w-50 h-42 overflow-hidden rounded-lg border border-gray-200"><img src={ad.mediPhoto} alt="medicine photo" className="w-60 h-auto"/></div>
                            <div className="flex flex-col">
                                <h2>{ad.linkedMedicineName}</h2>
                                <p>{ad.adDescription}</p>
                            </div>
                        </div>

                    </div>
                ))
            }
        </Carousel>
    );
};

export default AdsSlider;