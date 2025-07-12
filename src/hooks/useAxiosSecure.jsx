import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_Server_API_KEY,
  // withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOutUser } = useAuth();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },

      async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          logOutUser();
        }
        return Promise.reject(err);
      }
    );
  }, [logOutUser]);
  return axiosSecure;
};

export default useAxiosSecure;
