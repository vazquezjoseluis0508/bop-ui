import api from "../api/bop";
import { useQuery } from "@tanstack/react-query";
import { IPedido } from "./types";


async function fetchPedidos() {
    try {
        const { data } = await api.get<IPedido[]>("/pedidos/get-reservas");
        return data;
    } catch (error) {
        console.log("fetchPedido: ",error);
    }
}

export function userFetchPedido() {
    return useQuery(["pedidos"], fetchPedidos);  
}
