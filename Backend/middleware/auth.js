// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Get token from cookies or Authorization header
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, please login'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated'
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Auth error:', error.message);

    // Handle different JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired, please login again'
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, authentication failed'
      });
    }
  }
};

// ==================== ROLE-BASED MIDDLEWARE ====================

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Not authorized to access this resource. Required role: ${roles.join(', ')}`
      });
    }

    next();
  };
};

// ==================== ADMIN-ONLY MIDDLEWARE ====================

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Only administrators can access this resource'
    });
  }

  next();
};

// ==================== OPTIONAL AUTH MIDDLEWARE ====================

export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (user && user.isActive) {
        req.user = user;
        req.isAuthenticated = true;
      }
    } catch (error) {
      console.error('❌ Optional auth error:', error.message);
      req.isAuthenticated = false;
    }
  } else {
    req.isAuthenticated = false;
  }

  next();
};

// ==================== OWNERSHIP VERIFICATION ====================

export const checkOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the resource belongs to the user or if user is admin
    if (req.user._id.toString() !== id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource'
      });
    }

    next();
  } catch (error) {
    console.error('❌ Ownership check error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error verifying resource ownership'
    });
  }
};

// ==================== RATE LIMITING MIDDLEWARE ====================

const requestCounts = new Map();

export const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const key = req.user ? req.user._id.toString() : req.ip;
    const now = Date.now();

    if (!requestCounts.has(key)) {
      requestCounts.set(key, []);
    }

    const requests = requestCounts.get(key);
    const recentRequests = requests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: `Too many requests. Please try again later.`,
        retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
      });
    }

    recentRequests.push(now);
    requestCounts.set(key, recentRequests);

    // Clean up old entries
    if (requestCounts.size > 10000) {
      requestCounts.clear();
    }

    next();
  };
};

// ==================== REQUEST LOGGING MIDDLEWARE ====================

export const logRequest = (req, res, next) => {
  const requestInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    ip: req.ip,
    userId: req.user ? req.user._id : 'anonymous'
  };

  console.log('📝 Request:', requestInfo);

  next();
};

// ==================== ERROR HANDLING MIDDLEWARE ====================

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};