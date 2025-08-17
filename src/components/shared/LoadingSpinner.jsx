import { FadeLoader } from 'react-spinners';
import {useTheme} from ".././../context/ThemeContext";

const LoadingSpinner = () => {
    const {theme} = useTheme();
    return (
        <div>
            <div className={`min-h-screen w-full flex items-center justify-center pl-80 ${theme==="dark" ? "bg-secondary" : "light-bg"}`}>
                <FadeLoader size={26} className={` ${theme==="dark" ? "text-white" : "light-bg"}`}/>
            </div>
            
        </div>
    );
};

export default LoadingSpinner;