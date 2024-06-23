import { describe, expect, it } from "@jest/globals";
import { config } from '../../config/config';
import { UsuarioEntity } from '../../entities/Usuario'
import { DireccionEntity } from '../../entities/Direccion'


describe('Config', () => {
  it('should have the correct app port', () => {
    expect(config.app.port).toBeGreaterThan(0);
  });

  it('should have the correct database server', () => {
    expect(config.db.host).toBeDefined();
  });

  it('should have the correct database user', () => {
    expect(config.db.username).toBeDefined();
  });

  it('should have the correct database password', () => {
    expect(config.db.password).toBeDefined();
  });

  it('should have the correct database port', () => {
    expect(config.db.port).toBeGreaterThan(0);
  });

  it('should have the correct database name', () => {
    expect(config.db.database).toBeDefined();
  });

  it('should have the correct the entities', () => {
    expect(config.db.entities).toStrictEqual([UsuarioEntity,DireccionEntity]);
  });

  it('should have the correct logging', () => {
    expect(config.db.logging).toBe(true);
  });

  it('should have the correct synchronize option', () => {
    expect(config.db.synchronize).toBe(true);
  });

  it('should have the correct type option', () => {
    expect(config.db.type).toBe('postgres');
  });

  // Add more tests for other properties if needed
});