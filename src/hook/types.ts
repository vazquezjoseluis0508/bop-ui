export interface IMenu {
    idMenuPersonal: number
    descripcion: string
    estado: number
    fecha_menu: string
    image?: string
}

export interface IMenuPersonal {
    color: string
    descripcion: string
    end: string
    estado: number
    f_registro: string
    idCalendarioMenu: number
    idMenu: number
    idMenuBingo: number
    legajo: string
    persona_str: string
    start: string
    textColor: string
    title: string
    turno: string
}


export interface UserMenu {
    id: number;
    firstName: string;
    lastName: string;
    legajo: string;
    pedido: string;
    fecha: string;
    estado: number;
  }