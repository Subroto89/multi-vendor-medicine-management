import DataNotFound from './shared/DataNotFound';
import BlogRow from '../components/shared/Dashboard/BlogRow'
import { FaTools, FaAngleLeft, FaAngleRight } from 'react-icons/fa'; 

const BlogTable = ({
  blogPosts,
  totalCount,
  currentPage,
  totalPages,
  itemsPerPage,
  handlePageChange,
  handleItemsPerPageChange,
  handleDeleteBlog,
  handleEditBlog,
  handleViewBlogDetails,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex flex-col justify-between">
      {totalCount > 0 ? (
        <>
          <div className="w-full rounded-lg overflow-auto shadow-lg border border-gray-200">
            <table className="w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50 text-gray-700 text-sm font-semibold uppercase tracking-wider">
                <tr>
                  <th scope="col" className="w-1/12 text-left px-6 py-3">Image</th>
                  <th scope="col" className="w-3/12 text-left px-6 py-3">Title</th>
                  <th scope="col" className="w-2/12 text-left px-6 py-3">Author</th>
                  <th scope="col" className="w-2/12 text-left px-6 py-3">Publish Date</th>
                  <th scope="col" className="w-1/12 text-left px-6 py-3">Status</th>
                  <th scope="col" className="w-3/12 text-center px-6 py-3 flex items-center justify-center gap-2">
                    <FaTools /> Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogPosts.map((blog) => (
                  <BlogRow
                    key={blog._id}
                    blog={blog}
                    handleDeleteBlog={handleDeleteBlog}
                    handleEditBlog={handleEditBlog}
                    handleViewBlogDetails={handleViewBlogDetails}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 px-4 py-3 bg-white rounded-lg shadow-md">
            {/* Items Per Page Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="blogItemsPerPage" className="text-sm text-gray-700">Blogs per page:</label>
              <select
                id="blogItemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
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
        </>
      ) : (
        <DataNotFound message={`No blog posts available. Total posts: ${totalCount}.`} />
      )}
    </div>
  );
};

export default BlogTable;
