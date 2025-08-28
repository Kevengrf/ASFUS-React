// backend/routes/announcements.js
import express from 'express';
import * as announcementsController from '../controllers/announcementsController.js';

const router = express.Router();

router.get('/', announcementsController.getAnnouncements);
router.post('/', announcementsController.addAnnouncement);
router.put('/:id', announcementsController.updateAnnouncement);
router.delete('/:id', announcementsController.deleteAnnouncement);

export default router;
