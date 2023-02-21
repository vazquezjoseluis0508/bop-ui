
import axios from "axios";

const REST_API = "http://localhost:3000/api";

export const get_menus = async () => {
    try {
        
        const response = await axios.get(`${REST_API}/menu/get-menus`, {
            headers: {
                // Authorization: "Bearer " + localStorage.getItem("bop.token"),
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTY3Njk5MDI5NSwiZXhwIjoxNjc2OTkyMDk1fQ.zY_CDGc824mEsxtCOky_jfh1UUdJJlTaNrFsmGu9Obw" 
            },
        });
        return response;

    } catch (error) {
     
        console.log("service get_menus: ", error);
    }
};
