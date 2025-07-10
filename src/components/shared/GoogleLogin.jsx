import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const { googleSignInUser } = useAuth();
    const navigate = useNavigate();

  const handleGoogleSignIn = async() => {
    try{
        const {user} = await googleSignInUser()
        if(user.uid){
            Swal.fire({
                    icon: "success",
                    title: "You are signedIn successfully!",
                    text: `Welcome, ${user.displayName}!`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
        }else{
            throw new Error("Signing In failed!");
        }
        navigate('/');
        
    }catch(err){
        Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message || "Something went wrong!",
              });
    }
  }
  return (
    <div>
      <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] shadow-lg w-full">
        <FaGoogle className="text-blue-800" />
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
