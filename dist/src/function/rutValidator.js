"use strict";
/* eslint-disable import/prefer-default-export */
/**
 * Validador de rut chileno, regresa true si es correcto
 * se puede enviar en cualquier formato de separacion de numeros validoos en chile
 * 11.111.111-1, 11111111-1, 111111111
 * o incluso con el digito verificador aparte
 * ej:
 * validateRUN('11.111.111', 1);
 * @param rut string | number
 * @param dv string | number
 * @return Boolean
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRUN = validateRUN;
function validateRUN(payload) {
    try {
        // acumuladores e indices
        let sum = 0;
        let multiply = 2;
        let idx = 0;
        // valida si se ingresa un digito verificador que solo sea como regex /[0-9]|k|K/
        if (String(payload.dv).length > 1)
            throw new Error('Invalid DV lenght');
        // sanitiza el rut ingresado y lo deja een un formato de numeros
        // y digito verificador sin guion ni puntos
        const pre = String(payload.run)
            .replace('.', '')
            .replace('-', '');
        const value = `${pre}${payload.dv}`;
        // sanitiza el digito verificador para comprarlo
        let dv = value.slice(-1).toUpperCase();
        // crea un array con el numero
        const body = value
            .slice(0, -1)
            .split('')
            .map((v) => (parseInt(v, 10)));
        // valida el largo del rut
        if (body.length <= 6 || body.length >= 9)
            throw new Error('Invalid Rut length');
        // recorre el rut calculando el digito verificador
        //  el unico motivo que no use reduce fue
        // porque el acumulador esta seteado arriba por la formula
        body.forEach((val) => {
            idx = multiply * val;
            sum += idx;
            if (multiply < 7) {
                multiply += 1;
            }
            else {
                multiply = 2;
            }
        });
        // calculo final del digito verificador
        const calCdv = 11 - (sum % 11);
        // se reasignan las variables para la comparacion
        dv = (dv === 'K') ? 10 : dv;
        dv = (dv === 0) ? 11 : dv;
        // se compara y retorna si esta OK
        if (dv === calCdv)
            return true;
        return false;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
