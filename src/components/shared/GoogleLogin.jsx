import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
    return (
        <div>
             <button className="btn bg-white text-black border-[#e5e5e5] shadow-lg w-full">
                    <FaGoogle className="text-blue-800" />
                    Login with Google
                  </button>
        </div>
    );
};

export default GoogleLogin;