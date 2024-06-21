import { describe, expect, it } from "@jest/globals";
const request = require('supertest');
import { Server } from '../server';
import { config } from "../config/config";

describe('Pruebas con resultado no exitoso', () => {

    const server = new Server();

    it('GET, PUT, DELETE and PATCH should return 405', async () => {

        const url = '/api/v1/generarfolios';

        const [ getRequest, putRequest, patchRequest, deleteRequest ] = await Promise.all([
            request(server.app).get(url),
            request(server.app).put(url),
            request(server.app).patch(url),
            request(server.app).delete(url)
        ]);

        expect(getRequest.status).toBe(405);
        expect(putRequest.status).toBe(405);
        expect(patchRequest.status).toBe(405);
        expect(deleteRequest.status).toBe(405);
    });

    it('/api/v1/generarfolios without body should return 400', async () => {
        const res = await request(server.app).post('/api/v1/generarfolios');
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with empty body should return 400', async () => {
        const res = await request(server.app).post('/api/v1/generarfolios').send({});
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with invalid tipofolio should return 400', async () => {
        const json = { tipofolio: 'invalid' };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with invalid datos should return 400', async () => {
        const json = { tipofolio: 7, datos: 'invalid' };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with invalid agno should return 400', async () => {
        const json = { tipofolio: 7, datos: { agno: 'invalid', region: 13 } };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with invalid region should return 400', async () => {
        const json = { tipofolio: 7, datos: { agno: 2024, region: 'invalid' } };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with invalid agno and region should return 400', async () => {
        const json = { tipofolio: 7, datos: { agno: 'invalid', region: 'invalid' } };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with invalid region length should return 400', async () => {
        const json = { tipofolio: 7, datos: { agno: 2024, region: 133 } };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with invalid agno length should return 400', async () => {
        const json = { tipofolio: 7, datos: { agno: 20245, region: 13 } };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with invalid region length and agno length should return 400', async () => {
        const json = { tipofolio: 7, datos: { agno: 20245, region: 133 } };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with tipofolio not existing should return 400', async () => {
        const json = { tipofolio: 0, datos: { agno: 2024, region: 13 } };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with missing datos should return 400', async () => {
        const json = { tipofolio: 7 };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/generarfolios with region not existing should return 400', async () => {
        const json = { tipofolio: 7, datos: { agno: 2024, region: 99 } };
        const res = await request(server.app).post('/api/v1/generarfolios').send(json);
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