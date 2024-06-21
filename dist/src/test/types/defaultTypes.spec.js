"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('responseType', () => {
    (0, globals_1.it)('should have the correct properties', () => {
        const response = {
            Respuesta: 'true',
            Detalle: 'Details',
            Registro: {},
            'codigo-error': 0
        };
        (0, globals_1.expect)(response.Respuesta).toEqual('Success');
        (0, globals_1.expect)(response.Detalle).toEqual('Details');
        (0, globals_1.expect)(response.Registro).toEqual('Details');
        (0, globals_1.expect)(response['codigo-error']).toEqual(0);
    });
    (0, globals_1.it)('should allow optional "codigo-error" property', () => {
        const response = {
            Respuesta: 'Success',
            Detalle: 'Details',
            Registro: {}
        };
        (0, globals_1.expect)(response.Respuesta).toEqual('Success');
        (0, globals_1.expect)(response.Detalle).toEqual('Details');
        (0, globals_1.expect)(response.Registro).toEqual('Details');
        (0, globals_1.expect)(response['codigo-error']).toBeUndefined();
    });
});
