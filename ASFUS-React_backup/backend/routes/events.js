// backend/routes/events.js
import express from 'express';
import * as eventsController from '../controllers/eventsController.js';

const router = express.Router();
const isAdmin = (req, res, next) => next(); // Simulado

router.get('/', eventsController.getAllEvents);
router.post('/', isAdmin, eventsController.createEvent);
router.put('/:id', isAdmin, eventsController.updateEvent);
router.delete('/:id', isAdmin, eventsController.deleteEvent);

export default router;