import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import { DireccionEntity } from '../entities/Direccion';
import { logger_object, logger_variable  } from '../middlewares/loggins';
import { AppDataSource } from '../db/db';

export const buscardireccion = async(req: Request, res: Response) => {

    const response:responseType = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };

    try {

        const { usuarioId } = req.query;
        const direc = new DireccionEntity();

        direc.usuarioId = ( typeof usuarioId=== 'undefined' ) ? 0 : Number(usuarioId);

        await AppDataSource.initialize();

        const registro = await AppDataSource.getRepository(DireccionEntity)
        .createQueryBuilder("direccion") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .where("direccion.usuarioId = :usuarioId")
        .setParameters({ usuarioId: direc.usuarioId })
        .getMany();
        

        logger_object.info("Resultado query", registro);

        if(registro.length>0)
        {
            response.Respuesta = 'true';
            response.Detalle = "Registro encontrado con Exito";
            response.Registro = registro;
            response["codigo-error"] = 200;
        }
          else
        {
            response.Respuesta = 'true';
            response.Detalle = "Registro no encontrado";
            response.Registro = registro;
            response["codigo-error"] = 400;
        }

        await AppDataSource.destroy();

        
    } catch ( error:unknown ) {

        const v1:string = error as string;
        
        response.Respuesta = 'false';
        response.Detalle = v1;
        response.Registro={},
        response["codigo-error"] = 500;

        if( error instanceof Error ){
            logger_object.error(error);
        }
    }

    return res.status(response["codigo-error"]).json(response);
};

export const metodoInvalido = (req:Request, res:Response) => {

    const response:responseType = {
        Respuesta: 'false',
        Detalle: `Cannot ${ req.method } to this endpoint`,
        Registro: {},
        "codigo-error": 405
    };

    logger_variable.info(`Intento de método ${ req.method } a la url: ${ req.baseUrl + req.url }`);

    return res.status(405).json(response)
}