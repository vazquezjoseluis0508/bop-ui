import api from "../api/bop";
import { useQuery } from "@tanstack/react-query";
import { IPedido } from "./types";
import { IFormPedido } from "../pages/PedidosPage";


async function fetchPedidos() {
    try {
        const { data } = await api.get<IPedido[]>("/pedidos/get-reservas");
        return data;
    } catch (error) {
        console.log("fetchPedido: ",error);
    }
}

// async function createReserva( data: IFormPedido ) {
//     try {
//         const { data } = await api.post<IPedido>("/pedidos/create-reserva", data);
//         return data;
//     } catch (error) {
//         console.log("createReserva: ",error);
//     }
// }

export function userFetchPedido() {
    return useQuery(["pedidos"], fetchPedidos);  
}
