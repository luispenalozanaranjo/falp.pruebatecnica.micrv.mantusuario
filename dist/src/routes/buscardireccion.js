"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const buscardireccion_1 = require("../controllers/buscardireccion");
const validar_campos_1 = require("../middlewares/validar-campos");
const regexSoloNumeros = /^[0-9]+$/;
const router = (0, express_1.Router)();
router.get('/', [
    (0, express_validator_1.check)("usuarioId", "El campo 'usuarioId' es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("usuarioId", "Si va a enviar el campo 'usuarioId', este debe ser un numero").optional().matches(regexSoloNumeros),
    validar_campos_1.validarCampos
], buscardireccion_1.buscardireccion);
router.all('/', buscardireccion_1.metodoInvalido);
module.exports = router;
