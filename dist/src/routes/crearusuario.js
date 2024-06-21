"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const crearusuario_1 = require("../controllers/crearusuario");
const validar_campos_1 = require("../middlewares/validar-campos");
const regexSoloLetras = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)("rut", "El campo 'rut' es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("rut", "Si va a enviar el campo 'rut', este debe contener 4 números").isLength({ min: 9, max: 12 }),
    (0, express_validator_1.check)("nombre", "El campo 'nombre' es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("nombre", "El campo 'nombre' debe ser letra").matches(regexSoloLetras),
    validar_campos_1.validarCampos
], crearusuario_1.crearusuario);
router.all('/', crearusuario_1.metodoInvalido);
module.exports = router;
