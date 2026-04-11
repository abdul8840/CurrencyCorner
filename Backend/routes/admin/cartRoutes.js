import express from 'express';
import {
  getAllCarts,
  getCartByUser,
  getCartAnalytics,
  adminRemoveFromCart,
  adminUpdateCartItem,
  adminClearCart,
  adminDeleteCart,
  exportCarts
} from '../../controllers/admin/cartController.js';
import { protect } from '../../middleware/auth.js';
import { admin } from '../../middleware/admin.js';

const router = express.Router();

router.use(protect, admin);

router.get('/', getAllCarts);
router.get('/analytics', getCartAnalytics);
router.get('/export', exportCarts);
router.get('/user/:userId', getCartByUser);
router.delete('/user/:userId/item/:productId', adminRemoveFromCart);
router.put('/user/:userId/item/:productId', adminUpdateCartItem);
router.delete('/user/:userId/clear', adminClearCart);
router.delete('/user/:userId', adminDeleteCart);

export default router;