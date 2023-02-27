import axios from "axios";
import { config } from "process";
import { REST_API } from "../constant/constants";
import { useAuthStore } from "../store/auth";

const token = useAuthStore.getState().token;

const api = axios.create({
    baseURL: REST_API,
});


api.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;
    config.headers = {
        Authorization: `Bearer ${token}`
    }
    return config;
});

export default api;