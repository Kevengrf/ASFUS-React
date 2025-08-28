// backend/routes/convenios.js
import express from 'express';
import * as conveniosController from '../controllers/conveniosController.js';

const router = express.Router();
const isAdmin = (req, res, next) => next(); // Simulado

router.get('/', conveniosController.getAllConvenios);
router.post('/', isAdmin, conveniosController.createConvenio);
router.put('/:id', isAdmin, conveniosController.updateConvenio);
router.delete('/:id', isAdmin, conveniosController.deleteConvenio);

export default router;