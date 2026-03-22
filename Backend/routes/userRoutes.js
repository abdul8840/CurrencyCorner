import express from 'express';
import { getProfile, updateProfile, updatePassword, updateAvatar, getAllUsers } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.put('/avatar', protect, upload.single('avatar'), updateAvatar);
router.get('/all', protect, admin, getAllUsers);

export default router;