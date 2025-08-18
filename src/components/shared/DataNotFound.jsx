import React from 'react';
import { MdOutlineSentimentDissatisfied } from 'react-icons/md'; // Importing a suitable icon
import { useTheme } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router';

const DataNotFound = ({ message }) => {
    const {theme} = useTheme();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    return (
        <div className={`min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 rounded-lg shadow-inner ${theme==="dark" ? "dark-category-card" : ""}`}>
            {/* React Icon for visual appeal */}
            <MdOutlineSentimentDissatisfied
                className="w-24 h-24 text-red-400 mb-6 animate-bounce-slow"
            />

            {/* Main message */}
            <h2 className='text-red-600 text-3xl md:text-4xl font-extrabold mb-4 text-center tracking-wide'>
                Oops! No Data Found
            </h2>

            {/* Dynamic message */}
            <p className={` text-lg md:text-xl font-medium text-center max-w-lg leading-relaxed ${theme==="dark" ? "text-amber-400" : "text-gray-700"}`}>
                {message || "It looks like there's nothing to display here right now."}
            </p>

            {/* Optional: Add a suggestion or call to action */}
            <p className={`text-md mt-4 text-center ${theme==="dark" ? "text-white" : "text-gray-500"}`}>
                Please check back later or try a different filter.
            </p>

            <Link onClick={handleGoBack} className={`text-md font-bold rounded-md px-3 py-1 mt-4 ${theme==="dark" ? "text-white bg-gray-500" : "text-gray-700 bg-gray-300"}`}>Tack Me Back</Link>

            {/* Simple animation for the icon (CSS remains the same) */}
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default DataNotFound;
