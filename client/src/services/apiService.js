const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('auth_token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });

    if (response.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  }

  async resetPassword(token, newPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: { token, newPassword },
    });
  }

  async verifyEmail(token) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: { token },
    });
  }

  async resendVerification(email) {
    return this.request('/auth/resend-verification', {
      method: 'POST',
      body: { email },
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword },
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: profileData,
    });
  }

  // Product methods
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  // Cart methods
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(productId, quantity = 1) {
    return this.request('/cart/add', {
      method: 'POST',
      body: { productId, quantity },
    });
  }

  async updateCartItem(productId, quantity) {
    return this.request('/cart/update', {
      method: 'PUT',
      body: { productId, quantity },
    });
  }

  async removeFromCart(productId) {
    return this.request('/cart/remove', {
      method: 'DELETE',
      body: { productId },
    });
  }

  // Order methods
  async getOrders() {
    return this.request('/orders');
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: orderData,
    });
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  // Utility methods
  isLoggedIn() {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }
}

export default new ApiService();
