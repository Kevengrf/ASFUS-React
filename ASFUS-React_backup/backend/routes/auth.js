// backend/routes/auth.js
import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/admin/login', authController.adminLogin);
router.post('/register', authController.register);
router.get('/pending', authController.getPendingUsers);
router.put('/approve/:userId', authController.approveUser);

export default router;