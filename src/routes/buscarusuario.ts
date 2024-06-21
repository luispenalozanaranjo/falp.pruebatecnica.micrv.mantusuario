import { Router } from 'express';
import { buscarusuario, metodoInvalido } from '../controllers/buscarusuario';
import { validarCampos } from '../middlewares/validar-campos';


const router = Router();

router.get('/', [

    validarCampos

], buscarusuario);

router.all('/', metodoInvalido);

module.exports = router;