import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from './LoadingSpinner';
import DataNotFound from './DataNotFound';
import Container from './Container';
import BlogPostCard from './BlogPostCard';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'; 

const HealthBlogPost = () => {
  const axiosSecure = useAxiosSecure();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default 6 blog posts per page

  // Fetch blog posts data with pagination
  const {
    data: blogData = { blogPosts: [], totalCount: 0 }, 
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["healthBlogPosts", currentPage, itemsPerPage],
    queryFn: async () => {
      let url = '/get-blog-posts'; 
      const params = new URLSearchParams();

      params.append('page', currentPage);
      params.append('limit', itemsPerPage);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const { data } = await axiosSecure.get(url);
      return data; // This data should contain { blogPosts: [...], totalCount: N }
    },
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10,
  });

  // Destructure blogPosts and totalCount from the fetched data
  const { blogPosts, totalCount } = blogData;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Pagination handler functions
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <div className="text-red-600 py-8 text-center bg-white shadow-md rounded-lg mx-auto w-full">
          <h3 className="text-xl font-semibold mb-2">Error Loading Blog Posts</h3>
          <p>We encountered an issue loading the health blog: {error.message}</p>
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
    <div className="py-8 bg-gray-100 min-h-screen">
      <Container>
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          Health Blog & Insights
        </h1>

        {blogPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalCount > 0 && (
              <div className="flex flex-col md:flex-row justify-between items-center mt-12 px-4 py-3 bg-white rounded-lg shadow-md">
                {/* Items Per Page Selector */}
                <div className="flex items-center gap-2">
                  <label htmlFor="blogItemsPerPage" className="text-sm text-gray-700">Posts per page:</label>
                  <select
                    id="blogItemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                  </select>
                </div>

                {/* Page Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaAngleLeft />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) ? (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                          currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ) : (
                      (page === currentPage - 3 || page === currentPage + 3) && (
                        <span key={page} className="px-2 text-gray-500">...</span>
                      )
                    )
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaAngleRight />
                  </button>
                </div>
                <span className="text-sm text-gray-700">Page {currentPage} of {totalPages} ({totalCount} posts)</span>
              </div>
            )}
          </>
        ) : (
          <DataNotFound message={`No blog posts available. Total posts: ${totalCount}. Please check back later.`} />
        )}
      </Container>
    </div>
  );
};

export default HealthBlogPost;
