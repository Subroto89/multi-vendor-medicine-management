import React from 'react';
import { useQuery } from '@tanstack/react-query';
// import {useAxiosSecure} from '../utilities/utilities';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import DataNotFound from '../components/shared/DataNotFound';
import Container from '../components/shared/Container';
import ReviewCard from './ReviewCard';
import { FaQuoteLeft } from 'react-icons/fa';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ReviewSection = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch reviews for the homepage
  const {
    data: reviews = [], 
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["homepageReviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/get-reviews?limit=6'); 
      return data;
    },
    staleTime: 1000 * 60 * 10, 
    cacheTime: 1000 * 60 * 20,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
          <h3 className="text-xl font-semibold mb-2">Error Loading Reviews</h3>
          <p>We encountered an issue loading customer reviews: {error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container>
        <div className="text-center mb-12">
          <FaQuoteLeft className="text-5xl text-blue-400 mx-auto mb-4" />
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from real people who trust us with their health needs.
          </p>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <DataNotFound message="No customer reviews available yet. Be the first to leave one!" />
        )}
      </Container>
    </div>
  );
};

export default ReviewSection;
