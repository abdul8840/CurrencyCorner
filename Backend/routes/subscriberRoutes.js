import express from 'express';
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

const router = express.Router();

// ==================== PUBLIC ROUTES ====================
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.put('/preferences', updatePreferences);

// ==================== ADMIN ROUTES ====================
router.get('/', protect, isAdmin, getAllSubscribers);
router.post('/', protect, isAdmin, addSingleSubscriber);
router.post('/import', protect, isAdmin, upload.single('file'), bulkImportSubscribers);
router.delete('/:id', protect, isAdmin, deleteSubscriber);
router.get('/export/csv', protect, isAdmin, exportSubscribers);
router.get('/stats', protect, isAdmin, getSubscriberStats);

export default router;