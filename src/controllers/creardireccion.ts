import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import {Fn} from '../function/function';
import { UsuarioEntity } from '../entities/Usuario';
import { DireccionEntity } from '../entities/Direccion';
import { AppDataSource } from '../db/db';

export const creardireccion = async(req: Request, res: Response) => {


    await AppDataSource.initialize();

    const response:responseType = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };

    try {

        const { calle, numero, ciudad, usuarioId } = req.body;
        const dir = new DireccionEntity();

        dir.calle = ( typeof calle=== 'undefined' ) ? '' : calle.toString();
        dir.numero = ( typeof numero=== 'undefined' ) ? '' : numero.toString();
        dir.ciudad = ( typeof ciudad=== 'undefined' ) ? '' : ciudad.toString();
        dir.usuarioId = ( typeof usuarioId=== 'undefined' ) ? '' : usuarioId;


        const usu = AppDataSource.getRepository(UsuarioEntity)
  
        const registro = await usu.findOneBy({
          usuarioId: dir.usuarioId,
        })

        if(typeof registro?.usuarioId!=='undefined'){
            await dir.save();
            response.Respuesta = 'true';
            response.Detalle = "Registro Insertado de forma Exitosa";
            response.Registro = dir;
            }
            else
            {
            response.Respuesta = 'true';
            response.Detalle = "Registro no se encuentra en nuestra base de datos de usuario";
            response.Registro = dir;
            }


        await AppDataSource.destroy();
        
    } catch ( error:unknown ) {

        response.Respuesta = 'false';
        response.Detalle = 'Error en crear direccion';
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
        "codigo-error": 405,
        Registro: {}
    };

    console.log(`Intento de método ${ req.method } a la url: ${ req.baseUrl + req.url }`);

    return res.status(405).json(response)
}