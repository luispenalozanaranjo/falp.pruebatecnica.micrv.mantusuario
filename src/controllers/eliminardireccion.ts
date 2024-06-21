import e, { Request, Response } from 'express';
import { responseType } from '../types/defaultTypes';
import { direccion } from '../entities/Direccion';
import { AppDataSource } from '../db/db';

export const eliminardireccion = async(req: Request, res: Response) => {

    await AppDataSource.initialize();

    const response:responseType = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };

    let del;

    try {

        const { id } = req.body;
        const direc = new direccion();

        direc.id = ( typeof id=== 'undefined' ) ? 0 : Number(id);

  
        const registro = AppDataSource.getRepository(direccion)

        const direcci = await registro.findOneBy({
            id: direc.id,
        });

        if(direcci===null){
        
            response.Respuesta = 'false';
            response.Detalle = "Registro id no se encuentra en nuestra base de datos de direccion";
            response.Registro = {};
        }
        else
        {
            del=await registro.delete({id:direc.id});
            response.Respuesta = 'true';
            response.Detalle = "Registro eliminado en forma exitosa";
            response.Registro = {};
        }

        if((del?.affected!=1)&&(direcci!==null)){
            response.Respuesta = 'false';
            response.Detalle = "Registro no Eliminado";
            response.Registro = {};   
        }


        await AppDataSource.destroy();


        return res.json(response);

        
    } catch ( error:unknown ) {

        response.Respuesta = 'false';
        response.Detalle = 'Error en eliminar direccion';
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