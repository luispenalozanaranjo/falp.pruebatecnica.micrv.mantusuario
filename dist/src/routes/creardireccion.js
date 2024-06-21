"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const creardireccion_1 = require("../controllers/creardireccion");
const validar_campos_1 = require("../middlewares/validar-campos");
const regexSoloNumeros = /^[0-9]+$/;
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)("calle", "El campo 'calle' es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numero", "El campo 'numero' es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numero", "Si va a enviar el campo 'numero', este debe ser un numero").optional().matches(regexSoloNumeros),
    (0, express_validator_1.check)("ciudad", "El campo 'ciudad' es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("usuarioId", "El campo 'usuarioId' es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("usuarioId", "Si va a enviar el campo 'usuarioId', este debe ser un numero").optional().matches(regexSoloNumeros),
    validar_campos_1.validarCampos
], creardireccion_1.creardireccion);
router.all('/', creardireccion_1.metodoInvalido);
module.exports = router;
