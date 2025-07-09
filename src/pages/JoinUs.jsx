import InputField from "../components/forms/InputField";
import { useForm } from "react-hook-form";
import { GoPasskeyFill } from "react-icons/go";
import { FaEnvelope, FaGoogle, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router";
import { BounceLoader } from "react-spinners";

const JoinUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="border border-white rounded-lg shadowlg m-4 p-4 bg-gradient-to-bl from-[#1F5591] to-[#80A5AB] opacity-70">
        {/*-----------------------------------------------------------------------------------
            Login Text and Symbol
            ----------------------------------------------------------------------------------- */}
        <div className="flex items-center gap-4">
          <GoPasskeyFill size={60} />
          <h2 className="text-4xl font-bold mb-8 pt-6">Login</h2>
        </div>
        {/*-----------------------------------------------------------------------------------
            Login Form Section
            ----------------------------------------------------------------------------------- */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/*-----------------------------------------------------------------------------------
            User Email Field
            ----------------------------------------------------------------------------------- */}

            <InputField
              label="User Email"
              name="userEmail"
              type="email"
              placeholder="xyz@gmail.com"
              icon={FaEnvelope}
              register={register}
              errors={errors}
              validationRules={{
                required: "User Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
            />

            {/*-----------------------------------------------------------------------------------
            Password Field
            ----------------------------------------------------------------------------------- */}

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              icon={FaLock}
              register={register}
              errors={errors}
              validationRules={{
                required: "Password is required",
                minLength: {
                  value: 8, // Increased for better security
                  message: "Password must be at least 8 characters long",
                },
              }}
            />
          </div>
          {/* -----------------------------------------------------------
      SignIn Button Section
      ----------------------------------------------------------- */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-outline hover:bg-green-500 hover:text-white w-full mt-2"
          >
            {isSubmitting ? <BounceLoader /> : <span className="flex items-center gap-4"><FaSignInAlt size={20}/> SignIn</span>}
          </button>
        </form>
        <div className="divider px-20">OR</div>
        <button className="btn bg-white text-black border-[#e5e5e5] shadow-lg w-full">
          <FaGoogle className="text-blue-800" />
          Login with Google
        </button>

        <p className="text-center mt-1">
          Don't have an account?
          <Link to="/auth/register">
            <span className="text-blue-500 font-medium link"> Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
