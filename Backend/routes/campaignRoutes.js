import express from 'express';
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignStats,
  cancelCampaign
} from '../controllers/campaignController.js';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { validateCampaign } from '../middleware/validate.js';

const router = express.Router();

// ==================== ADMIN ROUTES ====================
router.get('/', protect, isAdmin, getAllCampaigns);
router.get('/stats', protect, isAdmin, getCampaignStats);
router.get('/:id', protect, isAdmin, getCampaignById);
router.post('/', protect, isAdmin, upload.single('bannerImage'), validateCampaign, createCampaign);
router.put('/:id', protect, isAdmin, upload.single('bannerImage'), updateCampaign);
router.delete('/:id', protect, isAdmin, deleteCampaign);
router.put('/:id/cancel', protect, isAdmin, cancelCampaign);

export default router;