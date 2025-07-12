import { FadeLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div>
            <div className='min-h-screen w-full flex items-center justify-center pl-80'>
                <FadeLoader />
            </div>
            
        </div>
    );
};

export default LoadingSpinner;