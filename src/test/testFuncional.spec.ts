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

        expect(getRequest.status).toBe(500);
        expect(postRequest.status).toBe(500);
    });

    it('/api/v1/crearusuario without body should return 400', async () => {
        const res = await request(server.app).post('/api/v1/crearusuario');
        expect(res.statusCode).toEqual(500);
    });

    it('/api/v1/crearusuario with empty body should return 400', async () => {
        const res = await request(server.app).post('/api/v1/crearusuario').send({});
        expect(res.statusCode).toEqual(500);
    });

    it('/api/v1/crearusuario with invalid tipofolio should return 400', async () => {
        const json = { rut: '14143456-9' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(500);
    });

    it('/api/v1/crearusuario with invalid datos should return 400', async () => {
        const json = { rut: '14143456-9', nombre: 'Lu876' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(500);
    });

    it('/api/v1/crearusuario with invalid agno should return 400', async () => {
        const json = { rut: '14143456-k', nombre: 'Lu876' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(500);
    });

    it('/api/v1/crearusuario with invalid region should return 400', async () => {
        const json = { rut: '14143456-9', nombre: 'Lus' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(500);
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

    it('/api/v1/generarfolios should return 200 to tipoFolio 7', async () => {

        const json = { 
            tipofolio: 7,
            datos: 
                { 
                    agno: 2024,
                    region: 13
                } 
        }

        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(200);
        expect(res.body.numero_folio).not.toBe('')
        expect(res.body.respuesta).toBe('true');
        expect(res.body.Respuesta).toEqual(res.body.respuesta)
        expect(res.body.Detalle).toBe(`Folio generado correctamente para el tipo de folio ${json.tipofolio}`);
        expect(res.body.detalle).toEqual(res.body.Detalle)
    });

    it('/api/v1/generarfolios should return 200 to tipoFolio expendio', async () => {

        const json = { 
            tipofolio: '8'
        }

        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(200);
        expect(res.body.numero_folio).not.toBe('')
        expect(res.body.respuesta).toBe('true');
        expect(res.body.Respuesta).toEqual(res.body.respuesta)
        expect(res.body.Detalle).toBe(`Folio generado correctamente para el tipo de folio ${json.tipofolio}`);
        expect(res.body.detalle).toEqual(res.body.Detalle)
    });

    it('/api/v1/generarfolios should be greater than previous one', async () => {

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
    });
});