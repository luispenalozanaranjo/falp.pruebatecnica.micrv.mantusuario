import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import { UsuarioEntity } from '../entities/Usuario';
import { DireccionEntity } from '../entities/Direccion';
import { AppDataSource } from '../db/db';
import { logger_object, logger_variable  } from '../middlewares/loggins';

export const actualizardireccion = async(req: Request, res: Response) => {

    let UpdateResult;

    const response:responseType = {
        "codigo-error": 0,
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };


    try {


        const { id, calle, numero, ciudad, usuarioId } = req.body;
        const dir = new DireccionEntity();

        dir.id = ( typeof id=== 'undefined' ) ? 0 : id;
        dir.calle = ( typeof calle=== 'undefined' ) ? '' : calle.toString();
        dir.numero = ( typeof numero=== 'undefined' ) ? '' : numero.toString();
        dir.ciudad = ( typeof ciudad=== 'undefined' ) ? '' : ciudad.toString();
        dir.usuarioId = ( typeof usuarioId=== 'undefined' ) ? '' : usuarioId;

        await AppDataSource.initialize();

        const usu = AppDataSource.getRepository(UsuarioEntity)
  
        const registro = await usu.findOneBy({
          usuarioId: dir.usuarioId,
        })

        if(registro===null){
            response["codigo-error"] = 400;
            response.Respuesta = 'true';
            response.Detalle = "Registro no se encuentra en nuestra base de datos de usuario";
            response.Registro = {};
        }

            const dire = AppDataSource.getRepository(DireccionEntity)

            const direcci = await dire.findOneBy({
                id: dir.id,
            });

            if((direcci===null)&&(registro!==null)){
                response["codigo-error"] = 400;
                response.Respuesta = 'true';
                response.Detalle = "Registro no se encuentra en nuestra base de datos de direccion";
                response.Registro = {};
            }

            if((direcci!==null)&&(registro!==null)){

            UpdateResult=await dire.update({id:dir.id},{calle:dir.calle, numero:dir.numero,ciudad:dir.ciudad,usuarioId:dir.usuarioId});
            response["codigo-error"] = 200;
            response.Respuesta = 'true';
            response.Detalle = "Registro Actualizado de forma Exitosa";
            response.Registro = dir;
            }

            if((UpdateResult?.affected!=1)&&(direcci!==null)&&(registro!==null)){
                response["codigo-error"] = 500;
                response.Respuesta = 'false';
                response.Detalle = "Registro no Actualizado";
                response.Registro = {};   
            }


        await AppDataSource.destroy();
        
    } catch ( error:unknown ) {

        const v1:string = error as string;
        
        response["codigo-error"] = 500;
        response.Respuesta = 'false';
        response.Detalle = v1;
        response.Registro={}

        if( error instanceof Error ){
            logger_object.error(error);
        }
    }
    return res.status(Number(response["codigo-error"])).json(response);
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