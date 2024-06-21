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
exports.metodoInvalido = exports.creardireccion = void 0;
const Usuario_1 = require("../entities/Usuario");
const Direccion_1 = require("../entities/Direccion");
const db_1 = require("../db/db");
const creardireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.AppDataSource.initialize();
    const response = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };
    try {
        const { calle, numero, ciudad, usuarioId } = req.body;
        const dir = new Direccion_1.direccion();
        dir.calle = (typeof calle === 'undefined') ? '' : calle.toString();
        dir.numero = (typeof numero === 'undefined') ? '' : numero.toString();
        dir.ciudad = (typeof ciudad === 'undefined') ? '' : ciudad.toString();
        dir.usuarioId = (typeof usuarioId === 'undefined') ? '' : usuarioId;
        const usu = db_1.AppDataSource.getRepository(Usuario_1.usuario);
        const registro = yield usu.findOneBy({
            usuarioId: dir.usuarioId,
        });
        if (typeof (registro === null || registro === void 0 ? void 0 : registro.usuarioId) !== 'undefined') {
            yield dir.save();
            response.Respuesta = 'true';
            response.Detalle = "Registro Insertado de forma Exitosa";
            response.Registro = dir;
        }
        else {
            response.Respuesta = 'true';
            response.Detalle = "Registro no se encuentra en nuestra base de datos de usuario";
            response.Registro = dir;
        }
        yield db_1.AppDataSource.destroy();
    }
    catch (error) {
        response.Respuesta = 'false';
        response.Detalle = 'Error en crear direccion';
        response["codigo-error"] = 500;
        res.status(500);
        if (error instanceof Error) {
            console.log(error);
        }
    }
    return res.json(response);
});
exports.creardireccion = creardireccion;
const metodoInvalido = (req, res) => {
    const response = {
        Respuesta: 'false',
        Detalle: `Cannot ${req.method} to this endpoint`,
        "codigo-error": 405,
        Registro: {}
    };
    console.log(`Intento de método ${req.method} a la url: ${req.baseUrl + req.url}`);
    return res.status(405).json(response);
};
exports.metodoInvalido = metodoInvalido;
