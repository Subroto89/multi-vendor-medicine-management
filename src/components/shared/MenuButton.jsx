
import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

const MenuButton = ({address, label, icon: Icon}) => {
    const {theme} = useTheme();
    return (
        <div>
            <Link to={address} 
                     className={`btn ${theme==="dark" ? "border-b border-gray-500 shadow-lg " : "text-gray-800 border-0 bg-transparent" }    w-full hover:bg-gray-400 shadow-lg`}>
                     {label}
            </Link>
        </div>
    );
};

export default MenuButton;