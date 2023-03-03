import api from "../api/bop";
import { useQuery } from "@tanstack/react-query";
import { IMenuPersonal, UserMenu } from "./types";
import { IFormPedido } from "../pages/PedidosPage";



function getSuspenderReservas(promise: Promise<UserMenu[]>) {
    let status = "pending";
    let result: any;
    let suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        },
    };
}

export function fetchReservasMonitor() {
   const promise = api.get("/pedidos/get-reservas")
        .then((res) => {
            const menu_user: UserMenu[] = res.data.map((menu: IMenuPersonal ) => {
                return {
                    id: menu.idCalendarioMenu,
                    firstName: menu.persona_str,
                    lastName: '',
                    legajo: menu.legajo,
                    pedido: menu.title

                }
            }
            );
            return menu_user;

        }
        
        )
        .then((data) => data);
        
        return getSuspenderReservas(promise);

}

async function fetchReservas( legajo: string ): Promise<IMenuPersonal[]> {
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
        return data;
    } catch (error: any) {
        throw new Error("Error en el servidor: " + error.response.data);
    }
}

export async function filterReservaByDate(data: IMenuPersonal[], fecha: string) {
    try {
        const filtered = await data.filter((pedido: IMenuPersonal) => pedido.start.substring(0,10) === fecha);
        return filtered;
    } catch (error) {
        console.log("filterReservaByDate: ",error);
    }
}

export function userFetchPedido( legajo : string) {
    return useQuery({
        queryKey: ["pedidos", legajo ],
        queryFn: async () => await fetchReservas(legajo)
        
    });  
}
