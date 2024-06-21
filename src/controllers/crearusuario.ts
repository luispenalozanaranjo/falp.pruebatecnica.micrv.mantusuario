import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import {Fn} from '../function/function';
import { usuario } from '../entities/Usuario';
import { AppDataSource } from '../db/db';

export const crearusuario = async(req: Request, res: Response) => {


    await AppDataSource.initialize();

    const response:responseType = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };

    try {

        const { rut, nombre, primer_apellido, segundo_apellido } = req.body;
        const user = new usuario();

        user.rut = ( typeof rut=== 'undefined' ) ? '' : Fn.format_rut(rut.toString());
        user.nombre = ( typeof nombre=== 'undefined' ) ? '' : nombre.toString();
        user.primerApellido = ( typeof primer_apellido=== 'undefined' ) ? '' : primer_apellido.toString();
        user.segundoApellido = ( typeof segundo_apellido=== 'undefined' ) ? '' : segundo_apellido.toString();


        //let rutCompleto =Fn.format_rut(user.rut.toString());
        // Validar si el campo tipofolio es un número
   
    if(user.rut.toString()!='')
      {
        if( !Fn.validaRut(user.rut.toString()) ){
            response.Respuesta = 'false';
            response.Detalle = `El Rut ingresado ${ user.rut.toString() } es invalido`;
            response.Registro = user;
            return res.status(400).json(response);
        }
      }

      const usu = AppDataSource.getRepository(usuario)

      const registro = await usu.findOneBy({
        rut: user.rut,
    })


      if(typeof registro?.usuarioId==='undefined'){
      await user.save();
      response.Respuesta = 'true';
      response.Detalle = "Registro Insertado de forma Exitosa";
      response.Registro = user;
      }
      else
      {
      response.Respuesta = 'true';
      response.Detalle = "Registro ya existe en nuestra base de datos";
      response.Registro = user;
      }

      await AppDataSource.destroy();



      return res.status(200).json(response);

        
    } catch ( error:unknown ) {

        response.Respuesta = 'false';
        response.Detalle = 'Error en crear usuario';
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
        Registro:{},
        "codigo-error": 405
    };

    console.log(`Intento de método ${ req.method } a la url: ${ req.baseUrl + req.url }`);

    return res.status(405).json(response)
}