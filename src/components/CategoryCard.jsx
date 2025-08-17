import { Link } from "react-router"; // Use react-router-dom for modern routing
import { useTheme } from "../context/ThemeContext";

const CategoryCard = ({ category }) => {
  const { categoryPhoto, catName, medicineCount } = category;
  const { theme } = useTheme();

  const cardStyle = {
    backgroundColor: theme === 'dark' ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)',
  };

  const buttonStyle = {
    backgroundColor: 'var(--accent-color)',
    color: 'white',
  };

  const buttonHoverStyle = {
    backgroundColor: 'var(--hover-color)',
  };

  return (
    <div
      className={`${theme==='dark' ? "category-card" : ""} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group`}
      style={cardStyle}
    >
      <div className={`relative w-full h-40  overflow-hidden ${theme==='dark' ? "category-card" : "bg-blue-100"} `}>
        <img
          src={categoryPhoto}
          alt={catName || "Category Image"}
          className="w-32 h-32 mx-auto mt-4 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
      </div>

      <div className={`p-5 text-center ${theme==='dark' ? "bg-gray-700" : ""}`}>
        <h3
          className="text-xl font-bold mb-2 truncate"
          style={{ color: 'var(--text-color)' }}
        >
          {catName || "Uncategorized"}
        </h3>
        <p className="text-sm">
          <span
            className="font-semibold"
            style={{ color: 'var(--accent-color)' }}
          >
            {medicineCount || 0}
          </span>
          <span style={{ color: 'var(--text-color)' }}> Medicines</span>
        </p>

        <Link to={`/category-medicines/${catName}`}>
          <button
            className="mt-4 px-5 py-2 font-semibold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            View Category
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;