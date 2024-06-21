import { describe, expect, it } from "@jest/globals";
import { responseType } from '../../types/defaultTypes';

describe('responseType', () => {
  it('should have the correct properties', () => {
    const response: responseType = {
      Respuesta: 'true',
      Detalle: 'Details',
      Registro: {},
      'codigo-error': 0
    };

    expect(response.Respuesta).toEqual('true');
    expect(response.Detalle).toEqual('Details');
    expect(response.Registro).toEqual('Details');
    expect(response['codigo-error']).toEqual(0);
  });

  it('should allow optional "codigo-error" property', () => {
    const response: responseType = {
      Respuesta: 'true',
      Detalle: 'Details',
      Registro : {}
    };

    expect(response.Respuesta).toEqual('true');
    expect(response.Detalle).toEqual('Details');
    expect(response.Registro).toEqual('Details');
    expect(response['codigo-error']).toBeUndefined();
  });
});