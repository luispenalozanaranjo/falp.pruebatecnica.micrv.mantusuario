/**
 * Se recopila información de los tipos de datos que se utilizan en la aplicación
 * habia inconsistencia en el uso de los tipos de datos, por lo que se centralizan
 * en este archivo.
 */
export type responseType = {
    Respuesta: string,
    Detalle: string,
    Registro: object,
    "codigo-error"?: number
}

export type responseDataBase = {
    success: boolean,
    msgError: string,
    data: any
}