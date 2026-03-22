import express from 'express';
import { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../controllers/addressController.js';
import { protect } from '../middleware/auth.js';
import { validateAddress } from '../middleware/validate.js';

const router = express.Router();

router.get('/', protect, getAddresses);
router.post('/', protect, validateAddress, addAddress);
router.put('/:id', protect, updateAddress);
router.delete('/:id', protect, deleteAddress);
router.put('/:id/default', protect, setDefaultAddress);

export default router;