// backend/routes/news.js
import express from 'express';
import * as newsController from '../controllers/newsController.js';

const router = express.Router();
const isAdmin = (req, res, next) => next(); // Simulado

router.get('/', newsController.getAllNews);
router.post('/', isAdmin, newsController.createNews);
router.put('/:id', isAdmin, newsController.updateNews);
router.delete('/:id', isAdmin, newsController.deleteNews);

export default router;