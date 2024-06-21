"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const eliminardireccion_1 = require("../controllers/eliminardireccion");
const validar_campos_1 = require("../middlewares/validar-campos");
const regexSoloNumeros = /^[0-9]+$/;
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)("id", "El campo 'id' es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "Si va a enviar el campo 'id', este debe ser un numero").optional().matches(regexSoloNumeros),
    validar_campos_1.validarCampos
], eliminardireccion_1.eliminardireccion);
router.all('/', eliminardireccion_1.metodoInvalido);
module.exports = router;
