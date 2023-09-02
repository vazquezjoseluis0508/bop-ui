export interface IFormPreferenciaMenuUsuario {
    legajo: number,
    sal: number,
    idUsuario: number,
}

export interface IPreferenciaMenuUsuario {
    idPreferencia: number,
    legajo: number,
    sal: number,
    idUsuario: number,
    fecharegistro: Date,
    estado: number,
}