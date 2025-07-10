
import { Link } from 'react-router';

const MenuButton = ({address, label, icon: Icon}) => {
    return (
        <div>
            <Link to={address} 
                     className='btn bg-transparent border-0  w-full md:w-full text-gray-600 hover:bg-gray-400 shadow-lg'>
                     {label}
            </Link>
        </div>
    );
};

export default MenuButton;