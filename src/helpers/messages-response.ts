// message-responses.ts

export type IResponseMessage = {
    [key: string]: IResponseMessageItem;
    };

export interface IResponseMessageItem {
    message: string;
    type: 'success' | 'info' | 'error';
}

export const RESPONSE_MESSAGES: IResponseMessage = {
    'TODAY_NO_RESERVATION': {
      message: 'No se puede reservar para el día de hoy. Recuerda que tienes hasta las 18 hs para realizar la reserva, Gracias por tu comprensión!. ',
      type: 'info',
    },
    'ALREADY_ORDERED': {
      message: 'Tu pedido ya fue realizado, puedes cancelarlo si lo deseas o retirarlo aquí mismo o en el monitor.',
      type: 'success',
    },
    'ALREADY_RESERVED': {
        message: 'Ya tienes una reserva para el día de hoy. puedes pedirla si lo deseas.',
        type: 'success',
    },
    'ALREADY_WITHDRAWN': {
        message: 'Ya retiraste tu pedido, puedes reservar para el día de mañana si lo deseas.',
        type: 'success',
    },
    'ALREADY_CANCELED': {
        message: 'Ya cancelaste tu pedido, puedes reservar para el día de mañana si lo deseas.',
        type: 'success',
    },
    'TOMORROW_TOO_LATE': {
      message: 'La reserva para mañana solo se permite hasta las 18 hs del día de hoy.',
      type: 'info',
    },
    'NO_MENU_AVAILABLE': {
      message: 'No hay menús disponibles para el día de hoy. Por favor, <b>prueba con otra fecha</b>.',
      type: 'info',
    },
    'MENU_RESERVED': {
      message: '¡Genial! Ya tienes tu menú de comida reservado.',
      type: 'success',
    },
    'MENU_DELETED': {
      message: '¡Listo! Hemos eliminado el menú de comida que ya no deseabas de tu pedido.',
      type: 'success',
    },
    'FORM_ERROR': {
      message: 'Por favor, selecciona al menos un menú y un turno para poder continuar',
      type: 'error',
    },
    'MENU_CALIFICADO': {
      message: '¡Gracias por calificar el menú de comida!',
      type: 'success',
    },
  };
  