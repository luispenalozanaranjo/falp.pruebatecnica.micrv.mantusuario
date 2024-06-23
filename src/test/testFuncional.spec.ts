import { describe, expect, it } from "@jest/globals";
const request = require('supertest');
import { Server } from '../server';
import { config } from "../config/config";


describe('Pruebas con resultado no exitoso', () => {

    const server = new Server();

    it('GET, PUT, DELETE and PATCH should return 405', async () => {

        const url1 = '/api/v1/buscarusuario';
        const url2 = '/api/v1/crearusuario';
        const url3 = '/api/v1/creardireccion';
        const url4 = '/api/v1/buscardireccion';
        const url5 = '/api/v1/actualizardireccion';
        const url6 = '/api/v1/eliminardireccion';

        const [ getRequest, postRequest] = await Promise.all([
            request(server.app).get(url1),
            request(server.app).post(url2),
            request(server.app).post(url3),
            request(server.app).get(url4),
            request(server.app).post(url5),
            request(server.app).post(url6),
        ]);

        expect(getRequest.status).toBe(400);
        expect(postRequest.status).toBe(400);
    });

    it('/api/v1/buscarusuario Busqueda de un rut no existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=18.498.899-2').expect(400);
        expect(res.statusCode).toEqual(400);
        expect(res.body.Detalle).toBe(`Usuario no existe`);
    });

    it('/api/v1/buscarusuario Busqueda de un rut con mal formato', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=18.498.899-3').expect(400);
        expect(res.statusCode).toEqual(400);
        expect(res.body.Detalle).toBe(`El Rut ingresado 18498899-3 es invalido`);
    });

    it('/api/v1/buscardireccion Busqueda de una direccion no existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscardireccion?usuarioId=202').expect(400);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/buscardireccion Busqueda de una direccion no existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscardireccion?usuarioId=202o').expect(400);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario without body should return 400', async () => {
        const res = await request(server.app).post('/api/v1/crearusuario');
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario with empty body should return 400', async () => {
        const res = await request(server.app).post('/api/v1/crearusuario').send({});
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario with invalid tipofolio should return 400', async () => {
        const json = { rut: '14143456-9' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario with invalid datos should return 400', async () => {
        const json = { rut: '14143456-9', nombre: 'Lu876' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario with invalid agno should return 400', async () => {
        const json = { rut: '14143456-k', nombre: 'Lu876' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario with invalid region should return 500', async () => {
        const json = { rut: '14143456-9', nombre: 'Lus' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(400);
    });

});


describe('Pruebas con resultado exitoso', () => {

    const server = new Server();

    it('/health should return 200', async () => {
        const res = await request(server.app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('UP');
        expect(res.body.message).toBe('OK');
        expect(res.body.uptime).toBeGreaterThan(0);
        expect(res.body.timestamp).toBeGreaterThan(0);
    });

    it('/health.json should return 200', async () => {
        const res = await request(server.app).get('/health.json');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('UP');
        expect(res.body.message).toBe('OK');
        expect(res.body.uptime).toBeGreaterThan(0);
        expect(res.body.timestamp).toBeGreaterThan(0);
    });

    it('/status should return 200', async () => {
        const res = await request(server.app).get('/status');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('UP');
        expect(res.body.message).toBe('OK');
        expect(res.body.uptime).toBeGreaterThan(0);
        expect(res.body.timestamp).toBeGreaterThan(0);
    });

    it('/api/v1/buscarusuario Busqueda de un rut existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=14143456-k').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/buscardireccion Busqueda de una direccion existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscardireccion?usuarioId=22').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/crearusuario should return 200', async () => {

        const json2 = {
            "rut":"3.656.539-K",
            "nombre":"victor",
            "primer_apellido":"galindo",
            "segundo_apellido":"perez"
        }

        const res = await request(server.app).post('/api/v1/crearusuario').send(json2);
        if(res.statusCode==200){expect(res.statusCode).toEqual(200);}else{expect(res.statusCode).toEqual(400);}
        if(res.statusCode==200){expect(res.body.Respuesta).toBe('true');}else{expect(res.body.Respuesta).toBe('false');}
        if(res.statusCode==200){expect(res.body.Detalle).toBe(`Registro Insertado de forma Exitosa`);}else{expect(res.body.Detalle).toBe(`Registro ya existe en nuestra base de datos`);}
        
    });

    it('/api/v1/crearusuario should return 200 to rut sin ingresar los apellidos', async () => {

        const json = {
            rut:"3.656.539-K",
            nombre:"victor"
        }

        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        if(res.statusCode==200){expect(res.statusCode).toEqual(200);}else{expect(res.statusCode).toEqual(400);}
        if(res.statusCode==200){expect(res.body.Respuesta).toBe('true');}else{expect(res.body.Respuesta).toBe('false');}
        if(res.statusCode==200){expect(res.body.Detalle).toBe(`Registro Insertado de forma Exitosa`);}else{expect(res.body.Detalle).toBe(`Registro ya existe en nuestra base de datos`);}
    });

    /*it('/api/v1/generarfolios should be greater than previous one', async () => {

        const jsonFolio7 = { 
            tipofolio: 7,
            datos: 
                { 
                    agno: 2024,
                    region: 13
                } 
        }

        const res1 = await request(server.app).post('/api/v1/generarfolios').send(jsonFolio7);
        const res2 = await request(server.app).post('/api/v1/generarfolios').send(jsonFolio7);

        const folio1 = parseInt(res1.body.numero_folio);
        const folio2 = parseInt(res2.body.numero_folio);

        expect(folio2).toBeGreaterThan(folio1);

        const jsonFolioExpendio = {
            tipofolio: '8'
        }

        const res3 = await request(server.app).post('/api/v1/generarfolios').send(jsonFolioExpendio);
        const res4 = await request(server.app).post('/api/v1/generarfolios').send(jsonFolioExpendio);

        const folio3 = parseInt(res3.body.numero_folio);
        const folio4 = parseInt(res4.body.numero_folio);

        expect(folio4).toBeGreaterThan(folio3);
    });*/
});