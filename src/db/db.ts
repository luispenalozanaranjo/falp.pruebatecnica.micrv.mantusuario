import { DataSource } from "typeorm";
import { config } from '../config/config';
import { usuario } from '../entities/Usuario'
import { direccion } from '../entities/Direccion'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: true,
    entities: [usuario,direccion]
})