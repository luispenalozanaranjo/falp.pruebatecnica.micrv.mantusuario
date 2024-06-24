import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import {Fn} from '../function/function';
import { UsuarioEntity } from '../entities/Usuario';
import { DireccionEntity } from '../entities/Direccion';
import { AppDataSource } from '../db/db';
import { logger_object, logger_variable  } from '../middlewares/loggins';

export const creardireccion = async(req: Request, res: Response) => {


    const response:responseType = {
        "codigo-error": 0,
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };

    try {

        const { calle, numero, ciudad, usuarioId } = req.body;
        const dir = new DireccionEntity();

        dir.calle     = calle.toString();
        dir.numero    = numero.toString();
        dir.ciudad    = ciudad.toString();
        dir.usuarioId = usuarioId;

        await AppDataSource.initialize();

        const usu = AppDataSource.getRepository(UsuarioEntity)
  
        const registro = await usu.findOneBy({
          usuarioId: dir.usuarioId,
        })

        if(typeof registro?.usuarioId!=='undefined'){
            await dir.save();
            response["codigo-error"] = 200;
            response.Respuesta = 'true';
            response.Detalle = "Registro Insertado de forma Exitosa";
            response.Registro = dir;
            }
            else
            {
            response["codigo-error"] = 400;
            response.Respuesta = 'false';
            response.Detalle = "Registro no se encuentra en nuestra base de datos de usuario";
            response.Registro = dir;
            }


        await AppDataSource.destroy();
        
    } catch ( error:unknown ) {

        const v1:string = error as string;
      
        response["codigo-error"] = 500;
        response.Respuesta = 'false';
        response.Detalle = v1;
        response.Registro={};

        if( error instanceof Error ){
            logger_object.error(error);
        }
    }

    return res.status(response["codigo-error"]).json(response);
};

export const metodoInvalido = (req:Request, res:Response) => {

    const response:responseType = {
        "codigo-error": 405,
        Respuesta: 'false',
        Detalle: `Cannot ${ req.method } to this endpoint`,
        Registro: {}
    };

    logger_variable.info(`Intento de método ${ req.method } a la url: ${ req.baseUrl + req.url }`);

    return res.status(405).json(response)
}