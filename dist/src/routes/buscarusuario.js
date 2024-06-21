"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buscarusuario_1 = require("../controllers/buscarusuario");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get('/', [
    validar_campos_1.validarCampos
], buscarusuario_1.buscarusuario);
router.all('/', buscarusuario_1.metodoInvalido);
module.exports = router;
