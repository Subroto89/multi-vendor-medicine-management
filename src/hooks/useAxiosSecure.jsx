import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";




const axiosSecure = axios.create({
     baseURL: import.meta.env.VITE_Server_API_KEY
});

const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();
const token = localStorage.getItem('token');
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            logOutUser()
                .then(() => {
                    navigate('/auth/joinUs')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;