import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import Container from '../../components/shared/Container';
import AdsSlider from '../../components/AdsSlider';
import CategoryCardsContainer from '../../components/CategoryCardsContainer';

const Home = () => {
    const axiosSecure = useAxiosSecure();


    const {data: activeAds = [], isLoading} = useQuery({
        queryKey: ["activeAds"],
        queryFn: async () => {

            const {data} = await axiosSecure('/active-ads');
            return data;
        }
    })

    if(isLoading) return <LoadingSpinner/>
   
    return (
        <div className='text-blue-800'>
            <Container>
                {/* ------------------------------------------------------
                Active Medicine Advertisements' Slides
                ------------------------------------------------------- */}
                {
                    activeAds.length > 0 ? (
                        <AdsSlider activeAds={activeAds}/>
                    ):(
                        <DataNotFound message={"No ads right now! Check back later!"}/>
                    )
                }

             {/* ------------------------------------------------------
                Medicine Categories Cards 
                ------------------------------------------------------- */}   
                <CategoryCardsContainer/>             
            </Container>
        </div>
    );
};

export default Home;