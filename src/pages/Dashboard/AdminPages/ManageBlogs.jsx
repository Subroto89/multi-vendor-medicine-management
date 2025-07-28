import React, { useState } from "react";
import Container from "../../../components/shared/Container";
import { FaPlus } from "react-icons/fa";
import AddBlogModal from "../../../components/modals/AddBlogModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BlogTable from "../../../components/BlogTable";
import { TabTitle } from "../../../utilities/utilities";

const ManageBlogs = () => {
  TabTitle('Manage Blogs');
    const axiosSecure = useAxiosSecure();
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const handleAddBlogModal = () => {
    setIsAddBlogModal(!isAddBlogModal);
  };




    const {
    data: blogData = { blogPosts: [], totalCount: 0 }, // Expect object with blogPosts array and totalCount
    isLoading,
    error,
    refetch, // Function to refetch data after CRUD operations
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
    <div className="text-gray-700">
      <Container>
        {/* ---------------------------------------------------------------------------
                Header Part (Included Add New Blog) 
                --------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Manage Blogs</h2>
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
            <AddBlogModal handleAddBlogModal={handleAddBlogModal}/>
        )}
      </Container>
    </div>
  );
};

export default ManageBlogs;






// import React, { useState } from "react";
// import Container from "../../../components/shared/Container";
// import { FaPlus } from "react-icons/fa";
// // import AddBlogModal from "../../../components/modals/AddBlogModal"; // Assuming this is for adding
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../../components/shared/LoadingSpinner";
// import Swal from "sweetalert2";
// import BlogTable from "../../../components/BlogTable"; // NEW: Component to render the table and pagination
// // // import BlogDetailsModal from "../../../components/modals/BlogDetailsModal"; // NEW: Modal for viewing details
// // import EditBlogModal from "../../../components/modals/EditBlogModal"; // NEW: Modal for editing

// const ManageBlogs = () => {
//   const axiosSecure = useAxiosSecure();

//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10 blogs per page

//   // Modal States
// //   const [isAddBlogModal, setIsAddBlogModal] = useState(false);
// //   const [isBlogDetailsModalOpen, setIsBlogDetailsModalOpen] = useState(false); // For view details modal
// //   const [isEditBlogModalOpen, setIsEditBlogModalOpen] = useState(false);     // For edit modal
// //   const [selectedBlog, setSelectedBlog] = useState(null); // To store the blog being viewed/edited

//   // Fetch blog posts data with pagination
//   const {
//     data: blogData = { blogPosts: [], totalCount: 0 }, // Expect object with blogPosts array and totalCount
//     isLoading,
//     error,
//     refetch, // Function to refetch data after CRUD operations
//   } = useQuery({
//     queryKey: ["adminAllBlogPosts", currentPage, itemsPerPage],
//     queryFn: async () => {
//       let url = '/admin/get-all-blog-posts'; // NEW: Backend API endpoint for admin
//       const params = new URLSearchParams();

//       params.append('page', currentPage);
//       params.append('limit', itemsPerPage);

//       if (params.toString()) {
//         url += `?${params.toString()}`;
//       }

//       const { data } = await axiosSecure.get(url);
//       return data; // This data should contain { blogPosts: [...], totalCount: N }
//     },
//     staleTime: 1000 * 60 * 2, // Data is considered fresh for 2 minutes
//     cacheTime: 1000 * 60 * 5, // Data stays in cache for 5 minutes
//   });

//   // Destructure blogPosts and totalCount from the fetched data
//   const { blogPosts, totalCount } = blogData;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   // Pagination handler functions
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber > 0 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(1); // Reset to first page when items per page changes
//   };

//   // Modal Handlers
//   const handleAddBlogModal = () => {
//     setIsAddBlogModal(!isAddBlogModal);
//   };

// //   const handleViewBlogDetails = (blog) => {
// //     setSelectedBlog(blog);
// //     setIsBlogDetailsModalOpen(true);
// //   };

// //   const closeViewBlogDetailsModal = () => {
// //     setIsBlogDetailsModalOpen(false);
// //     setSelectedBlog(null);
// //   };

// //   const handleEditBlog = (blog) => {
// //     setSelectedBlog(blog);
// //     setIsEditBlogModalOpen(true);
// //   };

// //   const closeEditBlogModal = () => {
// //     setIsEditBlogModalOpen(false);
// //     setSelectedBlog(null);
// //     refetch(); // Refetch data after an edit operation
// //   };

//   // CRUD Operations
//   const handleDeleteBlog = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this blog post!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const { data } = await axiosSecure.delete(`/admin/delete-blog-post/${id}`); // NEW: Backend DELETE endpoint
//         if (data.deletedCount > 0) {
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "The blog post has been deleted.",
//             timer: 1500,
//             showConfirmButton: false,
//           });
//           refetch(); // Refetch data to update the table
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Failed!",
//             text: "Failed to delete blog post.",
//             timer: 1500,
//             showConfirmButton: false,
//           });
//         }
//       } catch (error) {
//         console.error("Error deleting blog post:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error!",
//           text: `An error occurred: ${error.response?.data?.message || error.message}`,
//         });
//       }
//     }
//   };

//   // Render loading spinner or error message
//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <Container>
//         <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
//           <h3 className="text-xl font-semibold mb-2">Error Loading Blog Posts</h3>
//           <p>We encountered an issue loading blog posts: {error.message}</p>
//           <button
//             onClick={() => refetch()}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <div className="py-8 bg-gray-100 min-h-screen">
//       <Container>
//         {/* Header Part (Included Add New Blog) */}
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Manage Blogs</h2>
//           <button
//             onClick={handleAddBlogModal}
//             className="flex items-center gap-2 px-6 py-3 font-bold rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition-colors"
//           >
//             <FaPlus size={18} />
//             Add New Blog
//           </button>
//         </div>

//         {/* Posted Blogs Table (Rendered by BlogTable component) */}
//         <BlogTable
//           blogPosts={blogPosts}
//           totalCount={totalCount}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           itemsPerPage={itemsPerPage}
//           handlePageChange={handlePageChange}
//           handleItemsPerPageChange={handleItemsPerPageChange}
//           handleDeleteBlog={handleDeleteBlog}
//           handleEditBlog={handleEditBlog}
//           handleViewBlogDetails={handleViewBlogDetails}
//         />

//         {/* Add Blog Modal */}
//         {/* {isAddBlogModal && (
//           <AddBlogModal
//             handleAddBlogModal={handleAddBlogModal}
//             refetch={refetch} // Pass refetch to update table after adding
//           />
//         )} */}

//         {/* Blog Details Modal
//         {isBlogDetailsModalOpen && selectedBlog && (
//           <BlogDetailsModal
//             blog={selectedBlog}
//             closeModal={closeViewBlogDetailsModal}
//           />
//         )} */}

//         {/* Edit Blog Modal */}
//         {/* {isEditBlogModalOpen && selectedBlog && (
//           <EditBlogModal
//             blog={selectedBlog}
//             closeModal={closeEditBlogModal}
//             refetch={refetch} // Pass refetch to update table after editing
//           />
//         )} */}
//       </Container>
//     </div>
//   );
// };

// export default ManageBlogs;
