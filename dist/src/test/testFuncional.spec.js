"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const request = require('supertest');
const server_1 = require("../server");
(0, globals_1.describe)('Pruebas con resultado no exitoso', () => {
    const server = new server_1.Server();
    (0, globals_1.it)('GET, PUT, DELETE and PATCH should return 405', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = '/api/v1/generarfolios';
        const [getRequest, putRequest, patchRequest, deleteRequest] = yield Promise.all([
            request(server.app).get(url),
            request(server.app).put(url),
            request(server.app).patch(url),
            request(server.app).delete(url)
        ]);
        (0, globals_1.expect)(getRequest.status).toBe(405);
        (0, globals_1.expect)(putRequest.status).toBe(405);
        (0, globals_1.expect)(patchRequest.status).toBe(405);
        (0, globals_1.expect)(deleteRequest.status).toBe(405);
    }));
    (0, globals_1.it)('/api/v1/generarfolios without body should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(server.app).post('/api/v1/generarfolios');
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with empty body should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(server.app).post('/api/v1/generarfolios').send({});
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with invalid tipofolio should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 'invalid' };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with invalid datos should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7, datos: 'invalid' };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with invalid agno should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7, datos: { agno: 'invalid', region: 13 } };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with invalid region should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7, datos: { agno: 2024, region: 'invalid' } };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with invalid agno and region should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7, datos: { agno: 'invalid', region: 'invalid' } };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with invalid region length should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7, datos: { agno: 2024, region: 133 } };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with invalid agno length should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7, datos: { agno: 20245, region: 13 } };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with invalid region length and agno length should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7, datos: { agno: 20245, region: 133 } };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with tipofolio not existing should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 0, datos: { agno: 2024, region: 13 } };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with missing datos should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7 };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
    (0, globals_1.it)('/api/v1/generarfolios with region not existing should return 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = { tipofolio: 7, datos: { agno: 2024, region: 99 } };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(400);
    }));
});
(0, globals_1.describe)('Pruebas con resultado exitoso', () => {
    const server = new server_1.Server();
    (0, globals_1.it)('/health should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(server.app).get('/health');
        (0, globals_1.expect)(res.statusCode).toEqual(200);
        (0, globals_1.expect)(res.body.status).toBe('UP');
        (0, globals_1.expect)(res.body.message).toBe('OK');
        (0, globals_1.expect)(res.body.uptime).toBeGreaterThan(0);
        (0, globals_1.expect)(res.body.timestamp).toBeGreaterThan(0);
    }));
    (0, globals_1.it)('/health.json should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(server.app).get('/health.json');
        (0, globals_1.expect)(res.statusCode).toEqual(200);
        (0, globals_1.expect)(res.body.status).toBe('UP');
        (0, globals_1.expect)(res.body.message).toBe('OK');
        (0, globals_1.expect)(res.body.uptime).toBeGreaterThan(0);
        (0, globals_1.expect)(res.body.timestamp).toBeGreaterThan(0);
    }));
    (0, globals_1.it)('/status should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(server.app).get('/status');
        (0, globals_1.expect)(res.statusCode).toEqual(200);
        (0, globals_1.expect)(res.body.status).toBe('UP');
        (0, globals_1.expect)(res.body.message).toBe('OK');
        (0, globals_1.expect)(res.body.uptime).toBeGreaterThan(0);
        (0, globals_1.expect)(res.body.timestamp).toBeGreaterThan(0);
    }));
    (0, globals_1.it)('/api/v1/generarfolios should return 200 to tipoFolio 7', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = {
            tipofolio: 7,
            datos: {
                agno: 2024,
                region: 13
            }
        };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(200);
        (0, globals_1.expect)(res.body.numero_folio).not.toBe('');
        (0, globals_1.expect)(res.body.respuesta).toBe('true');
        (0, globals_1.expect)(res.body.Respuesta).toEqual(res.body.respuesta);
        (0, globals_1.expect)(res.body.Detalle).toBe(`Folio generado correctamente para el tipo de folio ${json.tipofolio}`);
        (0, globals_1.expect)(res.body.detalle).toEqual(res.body.Detalle);
    }));
    (0, globals_1.it)('/api/v1/generarfolios should return 200 to tipoFolio expendio', () => __awaiter(void 0, void 0, void 0, function* () {
        const json = {
            tipofolio: '8'
        };
        const res = yield request(server.app).post('/api/v1/generarfolios').send(json);
        (0, globals_1.expect)(res.statusCode).toEqual(200);
        (0, globals_1.expect)(res.body.numero_folio).not.toBe('');
        (0, globals_1.expect)(res.body.respuesta).toBe('true');
        (0, globals_1.expect)(res.body.Respuesta).toEqual(res.body.respuesta);
        (0, globals_1.expect)(res.body.Detalle).toBe(`Folio generado correctamente para el tipo de folio ${json.tipofolio}`);
        (0, globals_1.expect)(res.body.detalle).toEqual(res.body.Detalle);
    }));
    (0, globals_1.it)('/api/v1/generarfolios should be greater than previous one', () => __awaiter(void 0, void 0, void 0, function* () {
        const jsonFolio7 = {
            tipofolio: 7,
            datos: {
                agno: 2024,
                region: 13
            }
        };
        const res1 = yield request(server.app).post('/api/v1/generarfolios').send(jsonFolio7);
        const res2 = yield request(server.app).post('/api/v1/generarfolios').send(jsonFolio7);
        const folio1 = parseInt(res1.body.numero_folio);
        const folio2 = parseInt(res2.body.numero_folio);
        (0, globals_1.expect)(folio2).toBeGreaterThan(folio1);
        const jsonFolioExpendio = {
            tipofolio: '8'
        };
        const res3 = yield request(server.app).post('/api/v1/generarfolios').send(jsonFolioExpendio);
        const res4 = yield request(server.app).post('/api/v1/generarfolios').send(jsonFolioExpendio);
        const folio3 = parseInt(res3.body.numero_folio);
        const folio4 = parseInt(res4.body.numero_folio);
        (0, globals_1.expect)(folio4).toBeGreaterThan(folio3);
    }));
});
