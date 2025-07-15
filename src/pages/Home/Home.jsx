import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import Container from '../../components/shared/Container';
import AdsSlider from '../../components/AdsSlider';

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
    console.log(activeAds.length)
    return (
        <div className='text-blue-800'>
            <Container>
                {
                    activeAds.length > 0 ? (
                        <AdsSlider activeAds={activeAds}/>
                    ):(
                        <DataNotFound message={"No ads right now! Check back later!"}/>
                    )
                }
            </Container>
        </div>
    );
};

export default Home;