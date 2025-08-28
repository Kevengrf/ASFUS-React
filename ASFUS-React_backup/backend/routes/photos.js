
import express from 'express';
import { getPhotos, addPhoto, deletePhoto } from '../controllers/photoController.js';

const router = express.Router();

router.get('/', getPhotos);
router.post('/', addPhoto);
router.delete('/:id', deletePhoto);

export default router;
