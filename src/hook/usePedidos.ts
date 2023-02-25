import api from "../api/bop";
import { useQuery } from "@tanstack/react-query";
import { idMenuPersonal } from "./types";
import { IFormPedido } from "../pages/PedidosPage";
import { AxiosError } from "axios";


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

export async function crearReserva( params: IFormPedido ) {
    try {
        console.log("Parametros de reserva: ", params)

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

export async function eliminarReserva( id: number ) {
    try {
        const { data } = await api.delete("/pedidos/eliminar", {
            params: {
                idCalendarioMenu: id
            }
        });
        console.log("deleteReserva: ",data)
        return data;
    } catch (error: any) {
        throw new Error("Error en el servidor: " + error.response.data);
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
