"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.config.app.port;
        console.log(config_1.config.saglog.app);
        console.log('Iniciando aplicacion');
        this.paths = {
            crearusuario: '/api/v1/crearusuario',
            buscarusuario: '/api/v1/buscarusuario',
            creardireccion: '/api/v1/creardireccion',
            buscardireccion: '/api/v1/buscardireccion',
            eliminardireccion: '/api/v1/eliminardireccion',
            actualizardireccion: '/api/v1/actualizardireccion',
            health: '/health',
            healthJson: '/health.json',
            status: '/status'
        };
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.paths.crearusuario, require('./routes/crearusuario'));
        this.app.use(this.paths.buscarusuario, require('./routes/buscarusuario'));
        this.app.use(this.paths.creardireccion, require('./routes/creardireccion'));
        this.app.use(this.paths.buscardireccion, require('./routes/buscardireccion'));
        this.app.use(this.paths.eliminardireccion, require('./routes/eliminardireccion'));
        this.app.use(this.paths.actualizardireccion, require('./routes/actualizardireccion'));
        this.app.use(this.paths.health, require('./routes/health'));
        this.app.use(this.paths.healthJson, require('./routes/health'));
        this.app.use(this.paths.status, require('./routes/health'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}
exports.Server = Server;
