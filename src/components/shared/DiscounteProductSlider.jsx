import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinner';
import DiscountProductCard from '../DiscountProductCard';
import DataNotFound from './DataNotFound'; // Added missing import

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DiscountProductSlider = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: discountedMedicines,
    isLoading,
  } = useQuery({
    queryKey: ['discountedMedicines'],
    queryFn: async () => {
      const { data } = await axiosSecure('/get-discounted-medicines');
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Special Offers & Discounts
        </h2>

        {discountedMedicines?.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            grabCursor={true}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="mySwiper p-4"
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {discountedMedicines.map((medicine) => (
              <SwiperSlide key={medicine._id}>
                <DiscountProductCard medicine={medicine} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <DataNotFound message="No discounted products available right now. Check back soon!" />
        )}
      </div>
    </section>
  );
};

export default DiscountProductSlider;