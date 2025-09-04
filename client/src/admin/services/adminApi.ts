import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AdminApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = `${API_BASE_URL}/admin`;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  private getMultipartHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };
  }

  // Dashboard
  async getDashboardData() {
    const response = await axios.get(`${this.baseURL}/dashboard`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async getAnalytics(period: string = 'month') {
    const response = await axios.get(`${this.baseURL}/analytics?period=${period}`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  // Products
  async getProducts(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${this.baseURL}/products?${queryString}`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async createProduct(productData: FormData) {
    const response = await axios.post(`${this.baseURL}/products`, productData, {
      headers: this.getMultipartHeaders()
    });
    return response.data;
  }

  async updateProduct(id: string, productData: FormData) {
    const response = await axios.put(`${this.baseURL}/products/${id}`, productData, {
      headers: this.getMultipartHeaders()
    });
    return response.data;
  }

  async deleteProduct(id: string) {
    const response = await axios.delete(`${this.baseURL}/products/${id}`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async duplicateProduct(id: string) {
    const response = await axios.post(`${this.baseURL}/products/${id}/duplicate`, {}, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async bulkProductAction(action: string, productIds: string[], updateData?: any) {
    const response = await axios.post(`${this.baseURL}/products/bulk-action`, {
      action,
      productIds,
      updateData
    }, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async deleteProductImage(productId: string, imageIndex: number) {
    const response = await axios.delete(`${this.baseURL}/products/${productId}/image/${imageIndex}`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  // Orders
  async getOrders(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${this.baseURL}/orders?${queryString}`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async getOrder(id: string) {
    const response = await axios.get(`${this.baseURL}/orders/${id}`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async updateOrderStatus(id: string, status: string, notes?: string) {
    const response = await axios.put(`${this.baseURL}/orders/${id}/status`, {
      status,
      notes
    }, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async exportOrders(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${this.baseURL}/orders/export/csv?${queryString}`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    });
    return response.data;
  }

  // Customers
  async getCustomers(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${this.baseURL}/customers?${queryString}`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async getCustomer(id: string) {
    const response = await axios.get(`${this.baseURL}/customers/${id}`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async updateCustomerStatus(id: string, isActive: boolean) {
    const response = await axios.put(`${this.baseURL}/customers/${id}/status`, {
      isActive
    }, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async exportCustomers() {
    const response = await axios.get(`${this.baseURL}/customers/export/csv`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    });
    return response.data;
  }

  // Utility methods
  downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  formatDateOnly(date: string | Date): string {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }
}

export default new AdminApiService();
