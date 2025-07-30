import { Link } from "react-router";

const CategoryCard = ({ category }) => {
  const { categoryPhoto, catName, medicineCount } = category;
  


  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative w-full h-40 bg-blue-100 overflow-hidden">
        <img
          src={categoryPhoto}
          alt={catName || "Category Image"}
          className="w-32 h-32 mx-auto mt-4 transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
      </div>

      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {catName || "Uncategorized"}
        </h3>

        {/* Medicine Count */}
        <p className="text-gray-600 text-sm">
          <span className="font-semibold text-blue-600">
            {medicineCount || 0}
          </span>
          Medicines
        </p>

        {/*  View Category Button */}
        <Link to={`/category-medicines/${catName}`}>
          <button
            className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
          >
            View Category
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
