// backend/routes/admin.js
import express from 'express';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.get('/pre-cadastros', adminController.getPreCadastros);
router.post('/pre-cadastros/:associadoId/:action', adminController.approvePreCadastro);

export default router;
