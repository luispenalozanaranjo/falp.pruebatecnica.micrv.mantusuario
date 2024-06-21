import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import { direccion } from '../entities/Direccion';
import { AppDataSource } from '../db/db';

export const buscardireccion = async(req: Request, res: Response) => {

    /**
     * A la fecha de creación de este código, 10-05-2024, los tipos de carnet son los siguientes:
     *  IdTipoCarnet: 1, NombreTipoCarnet: Carnet Caza Mayor
     *  IdTipoCarnet: 2, NombreTipoCarnet: Carnet Caza Menor
     *  IdTipoCarnet: 3, NombreTipoCarnet: Carnet Caza Homologación
     *  IdTipoCarnet: 4, NombreTipoCarnet: Credencial Aplicador Plaguicidas
     *  IdTipoCarnet: 5, NombreTipoCarnet: Certificado Mascotas
     *  IdTipoCarnet: 6, NombreTipoCarnet: Certificado de Inscripción de Establecimiento de expendio de productos farmacéuticos de uso veterinario
     *  IdTipoCarnet: 7, NombreTipoCarnet: Certificado de Inicio de Actividades Alimentacion Animal
     */

    await AppDataSource.initialize();

    const response:responseType = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };

    try {

        const { usuarioId } = req.query;
        const direc = new direccion();

        direc.usuarioId = ( typeof usuarioId=== 'undefined' ) ? 0 : Number(usuarioId);

        const dir = AppDataSource.getRepository(direccion)
  
        const registro = await AppDataSource.getRepository(direccion)
        .createQueryBuilder("direccion") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .where("direccion.usuarioId = :usuarioId")
        .setParameters({ usuarioId: direc.usuarioId })
        .getMany();

        if(registro.length>0){
            response.Respuesta = 'true';
            response.Detalle = "Registro encontrado con Exito";
            response.Registro = registro;
            }
            else
            {
            response.Respuesta = 'true';
            response.Detalle = "Registro no encontrado";
            response.Registro = registro;
            }

        await AppDataSource.destroy();


        return res.json(response);

        
    } catch ( error:unknown ) {

        response.Respuesta = 'false';
        response.Detalle = 'Error en busqueda de Usuario';
        response.Registro={},
        response["codigo-error"] = 500;
        res.status(500);

        if( error instanceof Error ){
            console.log(error);
        }
    }

    return res.json(response);
};

export const metodoInvalido = (req:Request, res:Response) => {

    const response:responseType = {
        Respuesta: 'false',
        Detalle: `Cannot ${ req.method } to this endpoint`,
        Registro: {},
        "codigo-error": 405
    };

    console.log(`Intento de método ${ req.method } a la url: ${ req.baseUrl + req.url }`);

    return res.status(405).json(response)
}