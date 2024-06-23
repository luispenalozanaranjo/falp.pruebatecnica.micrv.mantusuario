import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import {Fn} from '../function/function';
import { UsuarioEntity } from '../entities/Usuario';
import { AppDataSource } from '../db/db';
import { logger_object, logger_variable  } from '../middlewares/loggins';

export const crearusuario = async(req: Request, res: Response) => {


    const response:responseType = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };

    try {

        const { rut, nombre, primer_apellido, segundo_apellido } = req.body;
        const user = new UsuarioEntity();

        user.rut = Fn.format_rut(rut.toString());
        user.nombre = nombre.toString();
        user.primerApellido = ( typeof primer_apellido=== 'undefined' ) ? '' : primer_apellido.toString();
        user.segundoApellido = ( typeof segundo_apellido=== 'undefined' ) ? '' : segundo_apellido.toString();

        // Validar si el rut ingresado es valido
        if( !Fn.validaRut(user.rut.toString()) ){
            response.Respuesta = 'false';
            response.Detalle = `El Rut ingresado ${ user.rut.toString() } es invalido`;
            response.Registro = user;
            response["codigo-error"] = 400;
            return res.status(400).json(response);
        }
        
        await AppDataSource.initialize();

      const usu = AppDataSource.getRepository(UsuarioEntity)
      
      const registro = await usu.findOneBy({
        rut: user.rut,
      })


      if(typeof registro?.usuarioId==='undefined'){
      await user.save();
      response.Respuesta = 'true';
      response.Detalle = "Registro Insertado de forma Exitosa";
      response.Registro = user;
      response["codigo-error"] = 200;
      }
      else
      {
      response.Respuesta = 'false';
      response.Detalle = "Registro ya existe en nuestra base de datos";
      response.Registro = user;
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
        Registro:{},
        "codigo-error": 405
    };

    logger_variable.error(`Intento de método ${ req.method } a la url: ${ req.baseUrl + req.url }`);

    return res.status(405).json(response)
}