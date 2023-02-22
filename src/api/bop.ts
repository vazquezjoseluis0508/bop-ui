import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("bop.token")
    },
});

export default api;