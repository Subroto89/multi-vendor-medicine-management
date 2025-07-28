import { Link } from 'react-router'; 

const BlogPostCard = ({ post }) => {
  
  const { _id, blogTitle, blogPhoto, shortDescription, author, publishDate } = post || {};

  // Format date for display
  const formattedDate = publishDate ? new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'N/A';

  const placeholderImage = "https://placehold.co/400x250/E0E7FF/4338CA?text=Blog+Image";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={blogPhoto || placeholderImage}
        alt={blogTitle || "Blog Post"}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Fallback for broken images
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {blogTitle || "Untitled Blog Post"}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {shortDescription || "A short description of the blog post."}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>By {author.authorName || "Unknown Author"}</span>
          <span>{formattedDate}</span>
        </div>
        
        <Link
          to={`/blog/${_id}`} // Assuming a route like /blog/:id for single post view
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
