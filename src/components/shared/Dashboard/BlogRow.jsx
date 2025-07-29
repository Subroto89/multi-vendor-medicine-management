import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Icons for actions

const BlogRow = ({ blog, handleDeleteBlog, handleEditBlog, handleViewBlogDetails }) => {
  const placeholderImage = "https://placehold.co/50x50/E0E7FF/4338CA?text=Blog"; // Small placeholder

  // Format publish date for display
  const formattedDate = blog.publishDate
    ? new Date(blog.publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <tr className="hover:bg-gray-50 h-content">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <img
          src={blog.blogPhoto || placeholderImage} 
          alt={blog.blogTitle || "Blog Image"}
          className="w-12 h-12 object-cover rounded-md"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 line-clamp-2">
        {blog.blogTitle || "Untitled"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {blog.author?.authorName || "N/A"} {/* Access nested authorName */}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {formattedDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {blog.status ? blog.status.toUpperCase() : 'N/A'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handleViewBlogDetails(blog)}
            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition-colors"
            title="View Details"
          >
            <FaEye size={18} />
          </button>
          <button
            onClick={() => handleEditBlog(blog)}
            className="text-yellow-600 hover:text-yellow-900 p-2 rounded-full hover:bg-yellow-100 transition-colors"
            title="Edit Blog"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => handleDeleteBlog(blog._id)}
            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
            title="Delete Blog"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogRow;
