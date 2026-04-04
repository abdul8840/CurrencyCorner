// routes/campaignRoutes.js
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
import {
  subscribe,
  unsubscribe,
  updatePreferences,
  getAllSubscribers,
  bulkImportSubscribers,
  addSingleSubscriber,
  deleteSubscriber,
  exportSubscribers,
  getSubscriberStats
} from '../controllers/subscriberController.js';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { validateCampaign } from '../middleware/validate.js';

const router = express.Router();

// ==================== PUBLIC ROUTES ====================

// Subscribe
router.post('/subscribe', subscribe);

// Unsubscribe
router.post('/unsubscribe', unsubscribe);

// Update Preferences
router.put('/preferences', updatePreferences);

// ==================== ADMIN ROUTES ====================

// Campaigns
router.get('/campaigns', protect, isAdmin, getAllCampaigns);
router.get('/campaigns/:id', protect, isAdmin, getCampaignById);
router.post('/campaigns', protect, isAdmin, upload.single('bannerImage'), validateCampaign, createCampaign);
router.put('/campaigns/:id', protect, isAdmin, upload.single('bannerImage'), updateCampaign);
router.delete('/campaigns/:id', protect, isAdmin, deleteCampaign);
router.put('/campaigns/:id/cancel', protect, isAdmin, cancelCampaign);
router.get('/stats/campaigns', protect, isAdmin, getCampaignStats);

// Subscribers
router.get('/subscribers', protect, isAdmin, getAllSubscribers);
router.post('/subscribers', protect, isAdmin, addSingleSubscriber);
router.post('/subscribers/import', protect, isAdmin, upload.single('file'), bulkImportSubscribers);
router.delete('/subscribers/:id', protect, isAdmin, deleteSubscriber);
router.get('/subscribers/export/csv', protect, isAdmin, exportSubscribers);
router.get('/stats/subscribers', protect, isAdmin, getSubscriberStats);

export default router;