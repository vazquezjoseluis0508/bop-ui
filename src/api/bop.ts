import axios from "axios";
import { config } from "process";
import { useAuthStore } from "../store/auth";

const token = useAuthStore.getState().token;

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        Authorization: `Bearer ${token}`
    }

});

// api.interceptors.request.use(config => {
//     const token = useAuthStore.getState().token;
//     config.headers = {
//         Authorization: `Bearer ${token}`
//     }
//     return config;
// });

export default api;