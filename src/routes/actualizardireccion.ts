import { Router } from 'express';
import { check } from 'express-validator';
import { actualizardireccion, metodoInvalido } from '../controllers/actualizardireccion';
import { validarCampos } from '../middlewares/validar-campos';

const regexSoloNumeros = /^[0-9]+$/;

const router = Router();

router.post('/', [

    check("id", "El campo 'id' es obligatorio").not().isEmpty(),
    check("id", "Si va a enviar el campo 'id', este debe ser un numero").optional().matches(regexSoloNumeros),

    check("calle", "El campo 'calle' es obligatorio").not().isEmpty(),

    check("numero", "El campo 'numero' es obligatorio").not().isEmpty(),
    check("numero", "Si va a enviar el campo 'numero', este debe ser un numero").optional().matches(regexSoloNumeros),

    check("ciudad", "El campo 'ciudad' es obligatorio").not().isEmpty(),

    check("usuarioId", "El campo 'usuarioId' es obligatorio").not().isEmpty(),
    check("usuarioId", "Si va a enviar el campo 'usuarioId', este debe ser un numero").optional().matches(regexSoloNumeros),

    validarCampos

], actualizardireccion);

router.all('/', metodoInvalido);

module.exports = router;