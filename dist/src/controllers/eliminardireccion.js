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
exports.metodoInvalido = exports.eliminardireccion = void 0;
const Direccion_1 = require("../entities/Direccion");
const db_1 = require("../db/db");
const eliminardireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.AppDataSource.initialize();
    const response = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };
    let del;
    try {
        const { id } = req.body;
        const direc = new Direccion_1.direccion();
        direc.id = (typeof id === 'undefined') ? 0 : Number(id);
        const registro = db_1.AppDataSource.getRepository(Direccion_1.direccion);
        const direcci = yield registro.findOneBy({
            id: direc.id,
        });
        if (direcci === null) {
            response.Respuesta = 'false';
            response.Detalle = "Registro id no se encuentra en nuestra base de datos de direccion";
            response.Registro = {};
        }
        else {
            del = yield registro.delete({ id: direc.id });
            response.Respuesta = 'true';
            response.Detalle = "Registro eliminado en forma exitosa";
            response.Registro = {};
        }
        if (((del === null || del === void 0 ? void 0 : del.affected) != 1) && (direcci !== null)) {
            response.Respuesta = 'false';
            response.Detalle = "Registro no Eliminado";
            response.Registro = {};
        }
        yield db_1.AppDataSource.destroy();
        return res.json(response);
    }
    catch (error) {
        response.Respuesta = 'false';
        response.Detalle = 'Error en eliminar direccion';
        response.Registro = {},
            response["codigo-error"] = 500;
        res.status(500);
        if (error instanceof Error) {
            console.log(error);
        }
    }
    return res.json(response);
});
exports.eliminardireccion = eliminardireccion;
const metodoInvalido = (req, res) => {
    const response = {
        Respuesta: 'false',
        Detalle: `Cannot ${req.method} to this endpoint`,
        Registro: {},
        "codigo-error": 405
    };
    console.log(`Intento de método ${req.method} a la url: ${req.baseUrl + req.url}`);
    return res.status(405).json(response);
};
exports.metodoInvalido = metodoInvalido;
