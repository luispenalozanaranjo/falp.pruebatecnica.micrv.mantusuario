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
exports.metodoInvalido = exports.crearusuario = void 0;
const function_1 = require("../function/function");
const Usuario_1 = require("../entities/Usuario");
const db_1 = require("../db/db");
const crearusuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.AppDataSource.initialize();
    const response = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };
    try {
        const { rut, nombre, primer_apellido, segundo_apellido } = req.body;
        const user = new Usuario_1.usuario();
        user.rut = (typeof rut === 'undefined') ? '' : function_1.Fn.format_rut(rut.toString());
        user.nombre = (typeof nombre === 'undefined') ? '' : nombre.toString();
        user.primerApellido = (typeof primer_apellido === 'undefined') ? '' : primer_apellido.toString();
        user.segundoApellido = (typeof segundo_apellido === 'undefined') ? '' : segundo_apellido.toString();
        //let rutCompleto =Fn.format_rut(user.rut.toString());
        // Validar si el campo tipofolio es un número
        if (user.rut.toString() != '') {
            if (!function_1.Fn.validaRut(user.rut.toString())) {
                response.Respuesta = 'false';
                response.Detalle = `El Rut ingresado ${user.rut.toString()} es invalido`;
                response.Registro = user;
                return res.status(400).json(response);
            }
        }
        const usu = db_1.AppDataSource.getRepository(Usuario_1.usuario);
        const registro = yield usu.findOneBy({
            rut: user.rut,
        });
        if (typeof (registro === null || registro === void 0 ? void 0 : registro.usuarioId) === 'undefined') {
            yield user.save();
            response.Respuesta = 'true';
            response.Detalle = "Registro Insertado de forma Exitosa";
            response.Registro = user;
        }
        else {
            response.Respuesta = 'true';
            response.Detalle = "Registro ya existe en nuestra base de datos";
            response.Registro = user;
        }
        yield db_1.AppDataSource.destroy();
        return res.status(200).json(response);
    }
    catch (error) {
        response.Respuesta = 'false';
        response.Detalle = 'Error en crear usuario';
        response.Registro = {},
            response["codigo-error"] = 500;
        res.status(500);
        if (error instanceof Error) {
            console.log(error);
        }
    }
    return res.json(response);
});
exports.crearusuario = crearusuario;
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
