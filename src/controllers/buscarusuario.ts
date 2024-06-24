import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import {Fn} from '../function/function';
import { logger_object, logger_variable  } from '../middlewares/loggins';
import { UsuarioEntity } from '../entities/Usuario';
import { AppDataSource } from '../db/db';


export const buscarusuario = async(req: Request, res: Response) => {

    const response:responseType = {
        "codigo-error": 0,
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };
    
    try {
        
        
        const { rut, nombre, primer_apellido, segundo_apellido } = req.query;

        const user = new UsuarioEntity();

        user.rut = ( typeof rut=== 'undefined' ) || (rut == '') ? '' : Fn.format_rut(rut.toString());
        user.nombre = ( typeof nombre=== 'undefined' ) || (nombre == '') ? '' : nombre.toString();
        user.primerApellido = ( typeof primer_apellido=== 'undefined' ) || (primer_apellido == '') ? '' : primer_apellido.toString();
        user.segundoApellido = ( typeof segundo_apellido=== 'undefined' ) || (segundo_apellido == '') ? '' : segundo_apellido.toString();


        // Validar si el campo tipofolio es un número

    if(user.rut.toString()!='')
      {
        if( !Fn.validaRut(user.rut.toString()) ){
            response["codigo-error"] = 400;
            response.Respuesta = 'false';
            response.Detalle = `El Rut ingresado ${ user.rut.toString() } es invalido`;
            logger_object.error('Rut Invalido: ', response);
            return res.status(400).json(response);
        }
      }


      await AppDataSource.initialize();


     const users = (user.rut=='' && user.nombre=='' && user.primerApellido=='' && user.segundoApellido=='') ? 
     await AppDataSource.getRepository(UsuarioEntity)
    .createQueryBuilder("usuario") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .getMany()
    :
    await AppDataSource.getRepository(UsuarioEntity)
    .createQueryBuilder("usuario") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .where("usuario.rut = :rut or usuario.nombre = :nombre or usuario.primerApellido = :primerApellido or usuario.segundoApellido = :segundoApellido")
    .setParameters({ rut: user.rut, nombre: user.nombre, primerApellido: user.primerApellido, segundoApellido: user.segundoApellido })
    .getMany();

    logger_object.info("Resultado query", users);


    if(users.length>0){
        response["codigo-error"] = 200;
        response.Respuesta = 'true';
        response.Detalle = "Usuario encontrado con Exito";
        response.Registro = users;
        logger_object.info('Respuesta Final: ', response);
    }
     else
    {
        response["codigo-error"] = 400;
        response.Respuesta = 'false';
        response.Detalle = "Usuario no existe";
        response.Registro = users;
        logger_object.error('Respuesta Final: ', response);
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