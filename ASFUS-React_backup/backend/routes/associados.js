// backend/routes/associados.js
import express from 'express';
import * as associadosController from '../controllers/associadosController.js';

const router = express.Router();

router.get('/', associadosController.getAllAssociados);
router.post('/', associadosController.createAssociado);
router.get('/:id', associadosController.getAssociado);
router.put('/:id', associadosController.updateAssociado);
router.delete('/:id', associadosController.deleteAssociado);
router.get('/:id/dependentes', associadosController.getDependentes);
router.post('/:id/dependentes', associadosController.addDependente);
router.put('/:id/dependentes/:dependenteId', associadosController.updateDependente);
router.delete('/:id/dependentes/:dependenteId', associadosController.removeDependente);

export default router;
