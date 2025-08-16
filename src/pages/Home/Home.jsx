import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Container from "../../components/shared/Container";
import AdsSlider from "../../components/AdsSlider";
import CategoryCardsContainer from "../../components/CategoryCardsContainer";
import DiscounteProductSlider from "../../components/shared/DiscounteProductSlider";
import DataNotFound from "../../components/shared/DataNotFound";
import HealthBlogPost from "../../components/shared/HealthBlogPost";
import ReviewSection from "../../components/ReviewSection";
import {TabTitle} from "../../utilities/utilities";

const Home = () => {
  TabTitle('Home');
  const axiosSecure = useAxiosSecure();

  const { data: activeAds = [], isLoading } = useQuery({
    queryKey: ["activeAds"],
    queryFn: async () => {
      const { data } = await axiosSecure("/active-ads");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="text-blue-800 w-full bg-secondary">
      <Container>
        {/* ------------------------------------------------------
                Active Medicine Advertisements' Slides
        ------------------------------------------------------- */}
        {activeAds.length > 0 ? (
          <AdsSlider activeAds={activeAds} />
        ) : (
          <DataNotFound message={"No ads right now! Check back later!"} />
        )}

        {/* ------------------------------------------------------
                Medicine Categories Cards 
        ------------------------------------------------------- */}
        <CategoryCardsContainer />

        {/* ------------------------------------------------------
                Discounted Medicines Slider 
        ------------------------------------------------------- */}

        <DiscounteProductSlider />

        {/* ------------------------------------------------------
               Reviews Section
        ------------------------------------------------------- */}
        <ReviewSection />

        {/* ------------------------------------------------------
                Health Blogs 
        ------------------------------------------------------- */}
        <HealthBlogPost />
      </Container>
    </div>
  );
};

export default Home;
