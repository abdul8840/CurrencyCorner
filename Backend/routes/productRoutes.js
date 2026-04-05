// routes/productRoutes.js
import express from 'express';
import {
  createProduct, getAllProducts, getAllProductsAdmin, getProductBySlug,
  getProductById, getProductsByCategory, getFeaturedProducts,
  getLatestProducts, getRelatedProducts, updateProduct, deleteProduct,
  getNewProducts
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/admin', protect, admin, getAllProductsAdmin);
router.get('/featured', getFeaturedProducts);
router.get('/new', getNewProducts); // New route for new products
router.get('/latest', getLatestProducts);
router.get('/category/:slug', getProductsByCategory);
router.get('/related/:id', getRelatedProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);
router.post('/', protect, admin, upload.array('images', 10), createProduct);
router.put('/:id', protect, admin, upload.array('images', 10), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;