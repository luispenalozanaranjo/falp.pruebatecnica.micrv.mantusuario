import { Router } from 'express';
import { check } from 'express-validator';
import { crearusuario, metodoInvalido } from '../controllers/crearusuario';
import { validarCampos } from '../middlewares/validar-campos';

const regexSoloLetras = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

const router = Router();

router.post('/', [

    check("rut", "El campo 'rut' es obligatorio").not().isEmpty(),
    check("rut", "Si va a enviar el campo 'rut', este debe contener un minimo de 4 a un maximo de 12 caracteres").isLength({ min: 9, max: 12 }),

    check("nombre", "El campo 'nombre' es obligatorio").not().isEmpty(),
    check("nombre", "El campo 'nombre' debe ser letra").matches(regexSoloLetras),

    validarCampos

], crearusuario);

router.all('/', metodoInvalido);

module.exports = router;