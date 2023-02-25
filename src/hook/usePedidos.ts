import api from "../api/bop";
import { useQuery } from "@tanstack/react-query";
import { idMenuPersonal } from "./types";
import { IFormPedido } from "../pages/PedidosPage";


async function fetchPedidos( legajo: string ): Promise<idMenuPersonal[]> {
    try {
        const { data } = await api.get("/pedidos/get-reservas", {
            params: {
                legajo: legajo
            }
        });

        return data;
    } catch (error) {
        console.log("fetchPedido: ",error);
        return [];
    }

}

export async function createReserva( params: IFormPedido ) {
    try {

        const { data } = await api.post<IFormPedido>("/pedidos/reservar", {
            idMenu: params.form_menu,
            turno: params.form_turno,
            usuario: params.idUsuarios,
            fecha: params.form_fecha,
        });
        console.log("createReserva: ",data)
        return data;
    } catch (error) {
        console.log("createReserva: ",error);
    }
}

async function deleteReserva( id: number ) {
    try {
        const { data } = await api.delete("/pedidos/delete-reserva", {
            params: {
                id: id
            }
        });
        console.log("deleteReserva: ",data)
        return data;
    } catch (error) {
        console.log("deleteReserva: ",error);
    }
}

export async function filterReservaByDate(data: idMenuPersonal[], fecha: string) {
    try {
        const filtered = await data.filter((pedido: idMenuPersonal) => pedido.start.substring(0,10) === fecha);
        return filtered;
    } catch (error) {
        console.log("filterReservaByDate: ",error);
    }
}

// export function userCreateReserva( pedido: IFormPedido ) {
//     return useQuery(["pedidos"], () => createReserva(pedido));
// }

export function userFetchPedido( legajo : string) {
    return useQuery({
        queryKey: ["pedidos", legajo ],
        queryFn: async () => await fetchPedidos(legajo)
        
    });  
}
