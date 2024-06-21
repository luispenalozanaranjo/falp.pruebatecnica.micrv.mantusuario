import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/config';
import { logger_object, logger_variable } from './middlewares/loggins';

export class Server {
    
    app:Express;
    port: Number;
    paths: {
        crearusuario: string,
        buscarusuario: string,
        creardireccion: string,
        buscardireccion: string,
        eliminardireccion: string,
        actualizardireccion: string,
        health:string,
        healthJson:string,
        status:string
    }
    
    constructor() {
        this.app = express();
        this.port = config.app.port;
        
        logger_variable.info(`Nombre app es: ${ config.saglog.app }`);
        logger_variable.info('Iniciando aplicacion');

        this.paths = {
            crearusuario: '/api/v1/crearusuario',
            buscarusuario: '/api/v1/buscarusuario',
            creardireccion: '/api/v1/creardireccion',
            buscardireccion: '/api/v1/buscardireccion',
            eliminardireccion: '/api/v1/eliminardireccion',
            actualizardireccion: '/api/v1/actualizardireccion',
            health: '/health',
            healthJson: '/health.json',
            status: '/status'
        }

        this.middlewares();
        this.routes();
    }
    
    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routes(){
        this.app.use( this.paths.crearusuario, require( './routes/crearusuario') );
        this.app.use( this.paths.buscarusuario, require( './routes/buscarusuario') );
        this.app.use( this.paths.creardireccion, require( './routes/creardireccion') );
        this.app.use( this.paths.buscardireccion, require( './routes/buscardireccion') );
        this.app.use( this.paths.eliminardireccion, require( './routes/eliminardireccion') );
        this.app.use( this.paths.actualizardireccion, require( './routes/actualizardireccion') );
        this.app.use( this.paths.health, require( './routes/health') );
        this.app.use( this.paths.healthJson, require( './routes/health') );
        this.app.use( this.paths.status, require( './routes/health') );
    }

    listen(){
        this.app.listen(this.port, () => {
            logger_variable.info(`Servidor corriendo en puerto ${ this.port }`);
        });
    }
}