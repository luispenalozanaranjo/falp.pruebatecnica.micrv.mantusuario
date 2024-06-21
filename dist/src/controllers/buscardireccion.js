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
exports.metodoInvalido = exports.buscardireccion = void 0;
const Direccion_1 = require("../entities/Direccion");
const db_1 = require("../db/db");
const buscardireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { usuarioId } = req.query;
        const direc = new Direccion_1.direccion();
        direc.usuarioId = (typeof usuarioId === 'undefined') ? 0 : Number(usuarioId);
        const dir = db_1.AppDataSource.getRepository(Direccion_1.direccion);
        const registro = yield db_1.AppDataSource.getRepository(Direccion_1.direccion)
            .createQueryBuilder("direccion") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
            .where("direccion.usuarioId = :usuarioId")
            .setParameters({ usuarioId: direc.usuarioId })
            .getMany();
        if (registro.length > 0) {
            response.Respuesta = 'true';
            response.Detalle = "Registro encontrado con Exito";
            response.Registro = registro;
        }
        else {
            response.Respuesta = 'true';
            response.Detalle = "Registro no encontrado";
            response.Registro = registro;
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
exports.buscardireccion = buscardireccion;
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
