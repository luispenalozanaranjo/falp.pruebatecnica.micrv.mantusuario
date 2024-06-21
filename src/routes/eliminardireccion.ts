import { Router } from 'express';
import { check } from 'express-validator';
import { eliminardireccion, metodoInvalido } from '../controllers/eliminardireccion';
import { validarCampos } from '../middlewares/validar-campos';

const regexSoloNumeros = /^[0-9]+$/;

const router = Router();

router.post('/', [

    check("id", "El campo 'id' es obligatorio").not().isEmpty(),
    check("id", "Si va a enviar el campo 'id', este debe ser un numero").optional().matches(regexSoloNumeros),

    validarCampos

], eliminardireccion);

router.all('/', metodoInvalido);

module.exports = router;