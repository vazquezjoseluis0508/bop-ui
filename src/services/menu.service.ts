
import axios, { AxiosResponse } from "axios";
import { IMenu } from "../hook/types";
import { getFromLocalStorage, storeInLocalStorage } from "./cache.service";
import { searchImages } from "./google.service";

const REST_API = "http://localhost:3000/api";

export const get_menus = async (): Promise<any> => {
    try {
        
        const response = await axios.get(`${REST_API}/menu/get-menus`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("bop.token"),
            },
        });
        return response;

    } catch (error) {
     
        console.log("service get_menus: ", error);
    }
};

export const setImageMenus = async ( data: IMenu[] ) => {
    
}
