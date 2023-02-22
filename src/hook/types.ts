export interface IMenu {
    idMenuPersonal: number
    descripcion: string
    estado: number
    fecha_menu: string
    image?: string
}

export interface IPedido {
    idPedido: number // idCalendarioMenu
    idMenuPersonal: number // idMenu
    persona_str: string
    legajo: number
    fecha_pedido: string //start
    estado: number // 1: pendiente, 2: reservado, 3: rechazado

}