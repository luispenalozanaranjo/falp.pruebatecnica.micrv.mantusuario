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
exports.metodoInvalido = exports.buscarusuario = void 0;
const function_1 = require("../function/function");
//import { FoliosService } from '../services/foliosService';
const Usuario_1 = require("../entities/Usuario");
const db_1 = require("../db/db");
const buscarusuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * A la fecha de creación de este código, 10-05-2024, los tipos de carnet son los siguientes:
     *  IdTipoCarnet: 1, NombreTipoCarnet: Carnet Caza Mayor
     *  IdTipoCarnet: 2, NombreTipoCarnet: Carnet Caza Menor
     *  IdTipoCarnet: 3, NombreTipoCarnet: Carnet Caza Homologación
     *  IdTipoCarnet: 4, NombreTipoCarnet: Credencial Aplicador Plaguicidas
     *  IdTipoCarnet: 5, NombreTipoCarnet: Certificado Mascotas
     *  IdTipoCarnet: 6, NombreTipoCarnet: Certificado de Inscripción de Establecimiento de expendio de productos farmacéuticos de uso veterinario
     *  IdTipoCarnet: 7, NombreTipoCarnet: Certificado de Inicio de Actividades Alimentacion Animal
     */
    yield db_1.AppDataSource.initialize();
    const response = {
        Respuesta: '',
        Detalle: '',
        Registro: {}
    };
    try {
        const { rut, nombre, primer_apellido, segundo_apellido } = req.query;
        const user = new Usuario_1.usuario();
        user.rut = (typeof rut === 'undefined') || (rut == '') ? '%' : function_1.Fn.format_rut(rut.toString());
        user.nombre = (typeof nombre === 'undefined') || (nombre == '') ? '%' : nombre.toString();
        user.primerApellido = (typeof primer_apellido === 'undefined') || (primer_apellido == '') ? '%' : primer_apellido.toString();
        user.segundoApellido = (typeof segundo_apellido === 'undefined') || (segundo_apellido == '') ? '%' : segundo_apellido.toString();
        // Validar si el campo tipofolio es un número
        if (user.rut.toString() != '%') {
            if (!function_1.Fn.validaRut(user.rut.toString())) {
                response.Respuesta = 'false';
                response.Detalle = `El Rut ingresado ${user.rut.toString()} es invalido`;
                response["codigo-error"] = 400;
                return res.status(400).json(response);
            }
        }
        const users = yield db_1.AppDataSource.getRepository(Usuario_1.usuario)
            .createQueryBuilder("usuario") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
            .where("usuario.rut = :rut or usuario.nombre = :nombre or usuario.primerApellido = :primerApellido or usuario.segundoApellido = :segundoApellido")
            .setParameters({ rut: user.rut, nombre: user.nombre, primerApellido: user.primerApellido, segundoApellido: user.segundoApellido })
            .getMany();
        if (users.length > 0) {
            response.Respuesta = 'true';
            response.Detalle = "Usuario encontrado con Exito";
            response.Registro = users;
        }
        else {
            response.Respuesta = 'false';
            response.Detalle = "Usuario no existe";
            response.Registro = users;
        }
        yield db_1.AppDataSource.destroy();
        return res.json(response);
    }
    catch (error) {
        response.Respuesta = 'false';
        response.Detalle = 'Error en busqueda de Usuario';
        response.Registro = {},
            response["codigo-error"] = 500;
        res.status(500);
        if (error instanceof Error) {
            console.log(error);
        }
    }
    return res.json(response);
});
exports.buscarusuario = buscarusuario;
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
