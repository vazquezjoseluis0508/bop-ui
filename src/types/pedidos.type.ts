export type Accion = 'pedir' | 'reservar' | 'cancelar' | 'retirar' | 'nada' | 'calificar'

export interface IFormPedido {
    form_menu: string
    form_turno: string
    form_fecha: string
    idUsuarios: string
}