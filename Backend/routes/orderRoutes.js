import express from 'express';
import {
  createOrder, getMyOrders, getOrderById, trackOrder,
  downloadInvoice, getAllOrders, updateOrderStatus,
  getNewOrders, markOrderViewed, markAllOrdersViewed, getStoreInfo
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.get('/store-info', getStoreInfo);
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/admin/all', protect, admin, getAllOrders);
router.get('/admin/new', protect, admin, getNewOrders);
router.put('/admin/mark-all-viewed', protect, admin, markAllOrdersViewed);
router.put('/admin/:id/status', protect, admin, updateOrderStatus);
router.put('/admin/:id/viewed', protect, admin, markOrderViewed);
router.get('/:id', protect, getOrderById);
router.get('/:id/track', protect, trackOrder);
router.get('/:id/invoice', protect, downloadInvoice);

export default router;