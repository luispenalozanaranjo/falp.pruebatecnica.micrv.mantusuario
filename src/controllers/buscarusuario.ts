import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import {Fn} from '../function/function';
import { logger } from '../middlewares/loggins';
import { usuario } from '../entities/Usuario';
import { AppDataSource } from '../db/db';

export const buscarusuario = async(req: Request, res: Response) => {

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

        const { rut, nombre, primer_apellido, segundo_apellido } = req.query;
        const user = new usuario();

        user.rut = ( typeof rut=== 'undefined' ) || (rut == '') ? '%' : Fn.format_rut(rut.toString());
        user.nombre = ( typeof nombre=== 'undefined' ) || (nombre == '') ? '%' : nombre.toString();
        user.primerApellido = ( typeof primer_apellido=== 'undefined' ) || (primer_apellido == '') ? '%' : primer_apellido.toString();
        user.segundoApellido = ( typeof segundo_apellido=== 'undefined' ) || (segundo_apellido == '') ? '%' : segundo_apellido.toString();

        // Validar si el campo tipofolio es un número

    if(user.rut.toString()!='%')
      {
        if( !Fn.validaRut(user.rut.toString()) ){
            response.Respuesta = 'false';
            response.Detalle = `El Rut ingresado ${ user.rut.toString() } es invalido`;
            response["codigo-error"] = 400;
            logger.error('Rut no encontrado: ', response);
            return res.status(400).json(response);
        }
      }


        const users = await AppDataSource.getRepository(usuario)
    .createQueryBuilder("usuario") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .where("usuario.rut = :rut or usuario.nombre = :nombre or usuario.primerApellido = :primerApellido or usuario.segundoApellido = :segundoApellido")
    .setParameters({ rut: user.rut, nombre: user.nombre, primerApellido: user.primerApellido, segundoApellido: user.segundoApellido })
    .getMany();

    logger.info("Resultado query", users);


    if(users.length>0){
        response.Respuesta = 'true';
        response.Detalle = "Usuario encontrado con Exito";
        response.Registro = users;
        response["codigo-error"] = 200;
        logger.info('Respuesta Final: ', response);
        }
        else
        {
        response.Respuesta = 'false';
        response.Detalle = "Usuario no existe";
        response.Registro = users;
        response["codigo-error"] = 400;
        logger.error('Respuesta Final: ', response);
        }

        await AppDataSource.destroy();
        
        return res.status(response["codigo-error"]).json(response);

        
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