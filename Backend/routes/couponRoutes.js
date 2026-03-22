import express from 'express';
import { createCoupon, getAllCoupons, getCouponById, applyCoupon, updateCoupon, deleteCoupon } from '../controllers/couponController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { validateCoupon } from '../middleware/validate.js';

const router = express.Router();

router.post('/apply', protect, applyCoupon);
router.get('/', protect, admin, getAllCoupons);
router.get('/:id', protect, admin, getCouponById);
router.post('/', protect, admin, validateCoupon, createCoupon);
router.put('/:id', protect, admin, updateCoupon);
router.delete('/:id', protect, admin, deleteCoupon);

export default router;