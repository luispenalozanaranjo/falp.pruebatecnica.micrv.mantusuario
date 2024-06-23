import { DataSource } from "typeorm";
import { config } from './src/config/config';
import { UsuarioEntity } from './src/entities/Usuario'
import { DireccionEntity } from './src/entities/Direccion'
import { afterAll, beforeAll } from '@jest/globals';

let connection: DataSource;

beforeAll(async () => {
    //@ts-ignore
    connection = new DataSource({
        type: "postgres",
        host: config.db.host,
        port: config.db.port,
        username: config.db.username,
        password: config.db.password,
        database: config.db.database,
        synchronize: true,
        logging: true,
        entities: [UsuarioEntity,DireccionEntity]
    });
});

afterAll(async () => {
    await connection.close();
});

