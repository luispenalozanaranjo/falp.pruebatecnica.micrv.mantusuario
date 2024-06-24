import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import { DireccionEntity } from '../entities/Direccion';
import { AppDataSource } from '../db/db';
import { logger_object, logger_variable  } from '../middlewares/loggins';

export const eliminardireccion = async(req: Request, res: Response) => {

    const response:responseType = {
        "codigo-error": 0,
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };

    let del;

    try {


        const { id } = req.body;
        const direc = new DireccionEntity();

        direc.id = Number(id);

        await AppDataSource.initialize();

  
        const registro = AppDataSource.getRepository(DireccionEntity)

        const direcci = await registro.findOneBy({
            id: direc.id,
        });

        if(direcci===null){
            response["codigo-error"] = 400;        
            response.Respuesta = 'false';
            response.Detalle = "Registro id no se encuentra en nuestra base de datos de direccion";
            response.Registro = {};
        }
        else
        {
            del=await registro.delete({id:direc.id});
            response["codigo-error"] = 200;
            response.Respuesta = 'true';
            response.Detalle = "Registro eliminado en forma exitosa";
            response.Registro = {};
        }

        if((del?.affected!=1)&&(direcci!==null)){
            response["codigo-error"] = 500;
            response.Respuesta = 'false';
            response.Detalle = "Registro no Eliminado";
            response.Registro = {};
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