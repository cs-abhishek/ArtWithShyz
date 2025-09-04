import { useState, useEffect } from 'react';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

export interface Order {
  _id: string;
  orderNumber: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    product: {
      _id: string;
      name: string;
      images: Array<{ url: string; alt: string; isPrimary: boolean }>;
    };
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  shippingAddress: any;
  statusHistory: Array<{
    status: string;
    notes?: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    hasNext: false,
    hasPrev: false,
    limit: 20
  });
  const [filters, setFilters] = useState<any>({});

  const fetchOrders = async (filterParams: OrderFilters = {}) => {
    setLoading(true);
    try {
      const response = await adminApi.getOrders(filterParams);
      if (response.success) {
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
        setFilters(response.data.filters);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (id: string) => {
    try {
      const response = await adminApi.getOrder(id);
      if (response.success) {
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch order details');
      throw error;
    }
  };

  const updateOrderStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await adminApi.updateOrderStatus(id, status, notes);
      if (response.success) {
        toast.success('Order status updated successfully!');
        fetchOrders(); // Refresh the list
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update order status');
      throw error;
    }
  };

  const exportOrders = async (filterParams: OrderFilters = {}) => {
    try {
      const blob = await adminApi.exportOrders(filterParams);
      const filename = `orders_${new Date().toISOString().split('T')[0]}.csv`;
      adminApi.downloadFile(blob, filename);
      toast.success('Orders exported successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to export orders');
    }
  };

  return {
    orders,
    loading,
    pagination,
    filters,
    fetchOrders,
    getOrder,
    updateOrderStatus,
    exportOrders
  };
};
