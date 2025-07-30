import React from 'react';
import { MdOutlineSentimentDissatisfied } from 'react-icons/md'; // Importing a suitable icon

const DataNotFound = ({ message }) => {
    return (
        <div className='min-h-[60vh] md:min-h-[70vh] w-full flex flex-col justify-center items-center p-4 bg-gray-50 rounded-lg shadow-inner'>
            {/* React Icon for visual appeal */}
            <MdOutlineSentimentDissatisfied
                className="w-24 h-24 text-red-400 mb-6 animate-bounce-slow"
            />

            {/* Main message */}
            <h2 className='text-red-600 text-3xl md:text-4xl font-extrabold mb-4 text-center tracking-wide'>
                Oops! No Data Found
            </h2>

            {/* Dynamic message */}
            <p className='text-gray-700 text-lg md:text-xl font-medium text-center max-w-lg leading-relaxed'>
                {message || "It looks like there's nothing to display here right now."}
            </p>

            {/* Optional: Add a suggestion or call to action */}
            <p className='text-gray-500 text-md mt-4 text-center'>
                Please check back later or try a different filter.
            </p>

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
