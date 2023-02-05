

type OmitAuthEntityValues = Omit<
  IAuthEntity,
  'password' 
>



export interface IAuthEntity {
  readonly id: string
  usr: string
  password: string
  legajo: string
  nombre: string
  access_token: string
  account_type: AuthRol
}

export enum AuthRol {
  TECNICO = 'TECNICO',
  GENERAL = 'GENERAL',
  ADMIN = 'ADMIN',
  UNKNOWN = 'UNKNOWN',
}

export interface AuthFormLoginValue {
  username: string;
  password: string;
}
