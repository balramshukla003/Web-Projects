/**
 * API SERVICE LAYER DOCUMENTATION
 * 
 * This service layer provides a centralized interface for all API calls.
 * In a production environment, these would call real backend endpoints.
 * For this demo, they interact with localStorage and mock data.
 */

const API_BASE_URL = '/api'; // Would be real API URL in production

// Simulated API delay
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * AUTHENTICATION APIs
 */

export const authAPI = {
  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - Full name
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password
   * @param {string} userData.phone - Phone number
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  register: async (userData) => {
    await simulateDelay();
    console.log('📡 API Call: POST /api/auth/register', { userData });
    
    // Mock response
    return {
      success: true,
      data: {
        user: { ...userData, id: Date.now().toString() },
        token: 'mock-jwt-token-' + Date.now()
      }
    };
  },

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  login: async (email, password) => {
    await simulateDelay();
    console.log('📡 API Call: POST /api/auth/login', { email });
    
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-' + Date.now()
      }
    };
  },

  /**
   * Logout user
   * @returns {Promise<{success: boolean}>}
   */
  logout: async () => {
    await simulateDelay(200);
    console.log('📡 API Call: POST /api/auth/logout');
    
    return { success: true };
  },

  /**
   * Verify token
   * @param {string} token - JWT token
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  verifyToken: async (token) => {
    await simulateDelay(300);
    console.log('📡 API Call: GET /api/auth/verify');
    
    return { success: true, data: { valid: true } };
  }
};

/**
 * PRODUCT APIs
 */

export const productAPI = {
  /**
   * Get all products
   * @param {Object} filters - Filter options
   * @returns {Promise<{success: boolean, data: Array}>}
   */
  getAll: async (filters = {}) => {
    await simulateDelay(300);
    console.log('📡 API Call: GET /api/products', { filters });
    
    return {
      success: true,
      data: {
        products: [], // Would come from database
        total: 0,
        page: 1,
        limit: 20
      }
    };
  },

  /**
   * Get product by ID
   * @param {string} id - Product ID
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  getById: async (id) => {
    await simulateDelay(200);
    console.log('📡 API Call: GET /api/products/' + id);
    
    return {
      success: true,
      data: { product: {} }
    };
  },

  /**
   * Search products
   * @param {string} query - Search query
   * @returns {Promise<{success: boolean, data: Array}>}
   */
  search: async (query) => {
    await simulateDelay(400);
    console.log('📡 API Call: GET /api/products/search', { query });
    
    return {
      success: true,
      data: { products: [] }
    };
  },

  /**
   * Create product (Admin only)
   * @param {Object} productData - Product data
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  create: async (productData) => {
    await simulateDelay();
    console.log('📡 API Call: POST /api/products', { productData });
    
    return {
      success: true,
      data: { product: { ...productData, id: Date.now().toString() } }
    };
  },

  /**
   * Update product (Admin only)
   * @param {string} id - Product ID
   * @param {Object} updates - Product updates
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  update: async (id, updates) => {
    await simulateDelay();
    console.log('📡 API Call: PUT /api/products/' + id, { updates });
    
    return {
      success: true,
      data: { product: { id, ...updates } }
    };
  },

  /**
   * Delete product (Admin only)
   * @param {string} id - Product ID
   * @returns {Promise<{success: boolean}>}
   */
  delete: async (id) => {
    await simulateDelay();
    console.log('📡 API Call: DELETE /api/products/' + id);
    
    return { success: true };
  }
};

/**
 * ORDER APIs
 */

export const orderAPI = {
  /**
   * Create new order
   * @param {Object} orderData - Order details
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  create: async (orderData) => {
    await simulateDelay(800);
    console.log('📡 API Call: POST /api/orders', { orderData });
    
    return {
      success: true,
      data: {
        order: {
          id: 'ORD-' + Date.now(),
          ...orderData,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      }
    };
  },

  /**
   * Get user orders
   * @param {string} userId - User ID
   * @returns {Promise<{success: boolean, data: Array}>}
   */
  getUserOrders: async (userId) => {
    await simulateDelay(400);
    console.log('📡 API Call: GET /api/orders/user/' + userId);
    
    return {
      success: true,
      data: { orders: [] }
    };
  },

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  getById: async (orderId) => {
    await simulateDelay(300);
    console.log('📡 API Call: GET /api/orders/' + orderId);
    
    return {
      success: true,
      data: { order: {} }
    };
  },

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   * @returns {Promise<{success: boolean}>}
   */
  updateStatus: async (orderId, status) => {
    await simulateDelay();
    console.log('📡 API Call: PATCH /api/orders/' + orderId + '/status', { status });
    
    return { success: true };
  },

  /**
   * Cancel order
   * @param {string} orderId - Order ID
   * @returns {Promise<{success: boolean}>}
   */
  cancel: async (orderId) => {
    await simulateDelay();
    console.log('📡 API Call: POST /api/orders/' + orderId + '/cancel');
    
    return { success: true };
  }
};

/**
 * PAYMENT APIs
 */

export const paymentAPI = {
  /**
   * Create Razorpay order
   * @param {Object} paymentData - Payment details
   * @param {number} paymentData.amount - Amount in cents
   * @param {string} paymentData.currency - Currency code
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  createRazorpayOrder: async (paymentData) => {
    await simulateDelay(600);
    console.log('📡 API Call: POST /api/payment/razorpay/create', { paymentData });
    
    return {
      success: true,
      data: {
        orderId: 'order_' + Date.now(),
        amount: paymentData.amount,
        currency: paymentData.currency
      }
    };
  },

  /**
   * Verify Razorpay payment
   * @param {Object} paymentData - Payment verification data
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  verifyRazorpayPayment: async (paymentData) => {
    await simulateDelay(400);
    console.log('📡 API Call: POST /api/payment/razorpay/verify', { paymentData });
    
    return {
      success: true,
      data: {
        verified: true,
        transactionId: 'txn_' + Date.now()
      }
    };
  },

  /**
   * Process payment
   * @param {Object} paymentData - Payment data
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  processPayment: async (paymentData) => {
    await simulateDelay(1000);
    console.log('📡 API Call: POST /api/payment/process', { paymentData });
    
    return {
      success: true,
      data: {
        transactionId: 'txn_' + Date.now(),
        status: 'success'
      }
    };
  }
};

/**
 * USER APIs
 */

export const userAPI = {
  /**
   * Get user profile
   * @param {string} userId - User ID
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  getProfile: async (userId) => {
    await simulateDelay(300);
    console.log('📡 API Call: GET /api/users/' + userId);
    
    return {
      success: true,
      data: { user: {} }
    };
  },

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updates - Profile updates
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  updateProfile: async (userId, updates) => {
    await simulateDelay();
    console.log('📡 API Call: PUT /api/users/' + userId, { updates });
    
    return {
      success: true,
      data: { user: { id: userId, ...updates } }
    };
  },

  /**
   * Get user addresses
   * @param {string} userId - User ID
   * @returns {Promise<{success: boolean, data: Array}>}
   */
  getAddresses: async (userId) => {
    await simulateDelay(300);
    console.log('📡 API Call: GET /api/users/' + userId + '/addresses');
    
    return {
      success: true,
      data: { addresses: [] }
    };
  },

  /**
   * Add user address
   * @param {string} userId - User ID
   * @param {Object} address - Address data
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  addAddress: async (userId, address) => {
    await simulateDelay();
    console.log('📡 API Call: POST /api/users/' + userId + '/addresses', { address });
    
    return {
      success: true,
      data: { address: { ...address, id: Date.now().toString() } }
    };
  }
};

/**
 * ADMIN APIs
 */

export const adminAPI = {
  /**
   * Get dashboard statistics
   * @returns {Promise<{success: boolean, data?: Object}>}
   */
  getDashboardStats: async () => {
    await simulateDelay(500);
    console.log('📡 API Call: GET /api/admin/dashboard');
    
    return {
      success: true,
      data: {
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        totalUsers: 0
      }
    };
  },

  /**
   * Get all orders (Admin)
   * @returns {Promise<{success: boolean, data: Array}>}
   */
  getAllOrders: async () => {
    await simulateDelay(400);
    console.log('📡 API Call: GET /api/admin/orders');
    
    return {
      success: true,
      data: { orders: [] }
    };
  },

  /**
   * Get all users (Admin)
   * @returns {Promise<{success: boolean, data: Array}>}
   */
  getAllUsers: async () => {
    await simulateDelay(400);
    console.log('📡 API Call: GET /api/admin/users');
    
    return {
      success: true,
      data: { users: [] }
    };
  }
};

export default {
  auth: authAPI,
  product: productAPI,
  order: orderAPI,
  payment: paymentAPI,
  user: userAPI,
  admin: adminAPI
};
