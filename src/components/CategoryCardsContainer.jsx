import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './shared/LoadingSpinner';
import Container from './shared/Container';
import DataNotFound from '../components/shared/DataNotFound';
import CategoryCard from './CategoryCard';

const CategoryCardsContainer = () => {
    const axiosSecure = useAxiosSecure();
// ---------------------------------------------------------------
// Loading All Categories Using Tanstack
// ---------------------------------------------------------------
    const {data: categories = [], isLoading} = useQuery({
        queryKey: ["allCategories"],
        queryFn: async () => {
            const {data} = await axiosSecure('/get-categories');
            return data;
        }
    })
    console.log(categories)
    if(isLoading) return <LoadingSpinner/>

    return (
        <div>
            <Container>
                {
                    categories.length > 0 ? (
                       <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
                         {
                            categories.map(category => <CategoryCard key={category._id} category={category}/>)
                        }
                       </div>
                    ):(
                        <DataNotFound message={"No Category Available Now!"}/>
                    )
                }
            </Container>
        </div>
    );
};

export default CategoryCardsContainer;