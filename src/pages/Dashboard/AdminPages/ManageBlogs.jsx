import React, { useState } from "react";
import Container from "../../../components/shared/Container";
import { FaPlus } from "react-icons/fa";
import AddBlogModal from "../../../components/modals/AddBlogModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BlogTable from "../../../components/BlogTable";
import { TabTitle } from "../../../utilities/utilities";
import {useTheme} from "../../../context/ThemeContext";

const ManageBlogs = () => {
  TabTitle('Manage Blogs');

  const {theme} = useTheme();
  const axiosSecure = useAxiosSecure();
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const handleAddBlogModal = () => {
    setIsAddBlogModal(!isAddBlogModal);
  };

    const {
    data: blogData = { blogPosts: [], totalCount: 0 }, 
    isLoading,
    error,
    refetch, 
  } = useQuery({
    queryKey: ["adminAllBlogPosts", currentPage, itemsPerPage],
    queryFn: async () => {
      let url = '/admin/get-all-blog-posts'; // NEW: Backend API endpoint for admin
      const params = new URLSearchParams();

      params.append('page', currentPage);
      params.append('limit', itemsPerPage);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const { data } = await axiosSecure.get(url);
      return data; // This data should contain { blogPosts: [...], totalCount: N }
    },
    staleTime: 1000 * 60 * 2, // Data is considered fresh for 2 minutes
    cacheTime: 1000 * 60 * 5, // Data stays in cache for 5 minutes
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


   if (error) {
    return (
      <Container>
        <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
          <h3 className="text-xl font-semibold mb-2">Error Loading Blog Posts</h3>
          <p>We encountered an issue loading blog posts: {error.message}</p>
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
    <div className={`w-full min-h-screen ${theme==="dark" ? "bg-secondary" : "light-bg"}`}>
      <div className={`w-11/12 mx-auto min-h-screen ${theme==="dark" ? "bg-secondary" : "light-bg"}`}>
        {/* ---------------------------------------------------------------------------
                Header Part (Included Add New Blog) 
                --------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between mb-6 pt-10">
          <h2 className={`text-xl md:text-2xl font-bold pt-4 ${theme==="dark" ? "text-white" : "text-gray-800"}`}>Manage Blogs</h2>
          <button
            onClick={handleAddBlogModal}
            className="flex items-center gap-2 border border-gray-500 px-4 py-1 font-bold rounded-lg hover:bg-green-600 hover:text-white "
          >
            <FaPlus />
            Add New Blog
          </button>
        </div>
        

 {/* ---------------------------------------------------------------------------
            Posted Blogs Table
                --------------------------------------------------------------------------- */}

 <BlogTable
          blogPosts={blogPosts}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          handlePageChange={handlePageChange}
          handleItemsPerPageChange={handleItemsPerPageChange}
        //   handleDeleteBlog={handleDeleteBlog}
        //   handleEditBlog={handleEditBlog}
        //   handleViewBlogDetails={handleViewBlogDetails}
        />



        {/* ---------------------------------------------------------------------------
                Add Blog Modal
                --------------------------------------------------------------------------- */}
        {isAddBlogModal && (
            <AddBlogModal handleAddBlogModal={handleAddBlogModal} refetch={refetch}/>
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;





