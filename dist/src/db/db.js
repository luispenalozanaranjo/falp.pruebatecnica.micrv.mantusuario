"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../config/config");
const Usuario_1 = require("../entities/Usuario");
const Direccion_1 = require("../entities/Direccion");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.config.db.host,
    port: config_1.config.db.port,
    username: config_1.config.db.username,
    password: config_1.config.db.password,
    database: config_1.config.db.database,
    synchronize: true,
    logging: true,
    entities: [Usuario_1.usuario, Direccion_1.direccion]
});
