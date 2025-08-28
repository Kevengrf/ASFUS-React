// backend/routes/associados.js
import express from 'express';
import * as associadosController from '../controllers/associadosController.js';

const router = express.Router();

router.get('/:id', associadosController.getAssociado);
router.get('/:id/dependentes', associadosController.getDependentes); // New route
router.post('/:id/dependentes', associadosController.addDependente);
router.put('/:id/dependentes/:dependenteId', associadosController.updateDependente); // New route
router.delete('/:id/dependentes/:dependenteId', associadosController.removeDependente);

export default router;
