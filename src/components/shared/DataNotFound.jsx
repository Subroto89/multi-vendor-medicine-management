
const DataNotFound = ({message}) => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center text-gray-700 font-semibold'>
            <h2 className='text-red-500 text-2xl'>{message}</h2>
        </div>
    );
};

export default DataNotFound;