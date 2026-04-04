// routes/authRoutes.js
import express from 'express';
import {
  register,
  login,
  adminLogin,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  deactivateAccount,
  resendVerificationEmail
} from '../controllers/authController.js';
import {
  protect,
  isAdmin,
  authorize,
  optionalAuth,
  rateLimit,
  logRequest,
  asyncHandler
} from '../middleware/auth.js';
import {
  validateRegistration,
  validateLogin,
  validatePasswordReset,
  validateChangePassword,
  validateUpdateProfile,
  validateDeactivateAccount,
  validateForgotPassword,
  validateResendVerification
} from '../middleware/validate.js';

const router = express.Router();

// ==================== PUBLIC ROUTES ====================

// User Registration
router.post(
  '/register',
  rateLimit(5, 60 * 60 * 1000), // 5 requests per hour
  validateRegistration,
  asyncHandler(register)
);

// User Login
router.post(
  '/login',
  rateLimit(10, 15 * 60 * 1000), // 10 requests per 15 minutes
  validateLogin,
  asyncHandler(login)
);

// Admin Login
router.post(
  '/admin/login',
  rateLimit(10, 15 * 60 * 1000), // 10 requests per 15 minutes
  validateLogin,
  asyncHandler(adminLogin)
);

// Forgot Password
router.post(
  '/forgot-password',
  rateLimit(3, 60 * 60 * 1000), // 3 requests per hour
  validateForgotPassword,
  asyncHandler(forgotPassword)
);

// Reset Password
router.put(
  '/reset-password/:token',
  rateLimit(5, 60 * 60 * 1000), // 5 requests per hour
  validatePasswordReset,
  asyncHandler(resetPassword)
);

// Resend Verification Email
router.post(
  '/resend-verification',
  rateLimit(3, 60 * 60 * 1000), // 3 requests per hour
  validateResendVerification,
  asyncHandler(resendVerificationEmail)
);

// ==================== PROTECTED ROUTES ====================

// Logout (requires authentication)
router.post('/logout', protect, logRequest, asyncHandler(logout));

// Get Current User
router.get('/me', protect, logRequest, asyncHandler(getMe));

// Change Password
router.put(
  '/change-password',
  protect,
  logRequest,
  validateChangePassword,
  rateLimit(5, 60 * 60 * 1000), // 5 requests per hour
  asyncHandler(changePassword)
);

// Update Profile
router.put(
  '/update-profile',
  protect,
  logRequest,
  validateUpdateProfile,
  asyncHandler(updateProfile)
);

// Deactivate Account
router.put(
  '/deactivate-account',
  protect,
  logRequest,
  validateDeactivateAccount,
  asyncHandler(deactivateAccount)
);

export default router;