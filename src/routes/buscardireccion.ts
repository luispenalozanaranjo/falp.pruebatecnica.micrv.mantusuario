import { Router } from 'express';
import { check } from 'express-validator';
import { buscardireccion, metodoInvalido } from '../controllers/buscardireccion';
import { validarCampos } from '../middlewares/validar-campos';

const regexSoloNumeros = /^[0-9]+$/;

const router = Router();

router.get('/', [

    check("usuarioId", "El campo 'usuarioId' es obligatorio").not().isEmpty(),
    check("usuarioId", "Si va a enviar el campo 'usuarioId', este debe ser un numero").optional().matches(regexSoloNumeros),

    validarCampos

], buscardireccion);

router.all('/', metodoInvalido);

module.exports = router;