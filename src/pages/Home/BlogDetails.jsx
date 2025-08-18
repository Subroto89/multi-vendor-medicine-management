import Container from '../../components/shared/Container'; 
import { useParams } from 'react-router'; 
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure'; 
import LoadingSpinner from '../../components/shared/LoadingSpinner'; 
import DataNotFound from '../../components/shared/DataNotFound'; 
import { FaCalendarAlt, FaUserCircle, FaEnvelope } from 'react-icons/fa'; 
import { useTheme } from '../../context/ThemeContext';

const BlogDetails = () => {
  const { id } = useParams(); 
  const {theme} = useTheme();
  const axiosSecure = useAxiosSecure();

  // Fetch single blog post data
  const { data: blogData = {}, isLoading, error } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: async () => {
      // Ensure id exists before making the API call
      if (!id) return {};
      const { data } = await axiosSecure(`/get-blog-details/${id}`); 
      return data;
    },
    enabled: !!id, 
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <div className="text-red-600 p-8 text-center bg-white shadow-md rounded-lg mx-auto max-w-4xl">
          <h3 className="text-xl font-semibold mb-2">Error Loading Blog Post</h3>
          <p>We encountered an issue loading this blog post: {error.message}</p>
          
        </div>
      </Container>
    );
  }

  
  if (!blogData || Object.keys(blogData).length === 0) {
    return (
      <Container>
        <DataNotFound message="Blog post not found. It might have been removed or the link is incorrect." />
      </Container>
    );
  }

  // Destructure properties from blogData
  const {
    blogTitle,
    shortDescription,
    fullContent,
    blogPhoto, 
    publishDate,
    author
  } = blogData;

  // Format publish date for display
  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  // Placeholder image for broken or missing images
  const placeholderImage = "https://placehold.co/1200x600/E0E7FF/4338CA?text=Blog+Image";

  return (
    <div className={`py-40 min-h-screen ${theme==="dark" ? "dark-bg-body" : "light-bg-body"}`}>
      <div>
        <div className={`max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden ${theme==="dark" ? "dark-category-card" : "light-category-card"}`}>
          {/* Blog Post Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={blogPhoto || placeholderImage}
              alt={blogTitle || "Blog Post"}
              className="w-full h-full object-cover object-center"
              onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Fallback
            />
          </div>

          <div className="p-8 md:p-10">
            {/* Blog Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {blogTitle || "Untitled Blog Post"}
            </h1>

            {/* Author and Date Metadata */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-8 border-b pb-6 border-gray-200">
              <div className="flex items-center gap-2">
                <FaUserCircle className={` text-lg ${theme==="dark" ? "text-white" : "text-blue-500"}`} />
                <span className="font-semibold">{author?.authorName || "Unknown Author"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className={`text-lg ${theme==="dark" ? "text-white" : "text-blue-500"}`} />
                <span>{author?.authorEmail || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className={`text-lg ${theme==="dark" ? "text-white" : "text-blue-500"}`} />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Short Description (Introduction) */}
            {shortDescription && (
              <p className={`text-lg mb-8 leading-relaxed italic ${theme==="dark" ? "text-white" : "text-gray-700"}`}>
                "{shortDescription}"
              </p>
            )}

            {/* Full Content */}
            <div className={`prose prose-lg max-w-none leading-relaxed ${theme==="dark" ? "text-white" : "text-gray-800"}`}>
              
              {fullContent ? (
                // If fullContent is plain text, render as paragraphs
                fullContent.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>No content available for this blog post.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
