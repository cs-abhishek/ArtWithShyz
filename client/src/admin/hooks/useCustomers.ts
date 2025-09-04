import { useState, useCallback } from 'react';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  lastOrderDate?: string;
  orderCount?: number;
  totalSpent?: number;
  averageOrderValue?: number;
  isActive: boolean;
}

interface CustomersFilter {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async (filters: CustomersFilter = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminApi.getCustomers(filters);
      setCustomers(response.data.customers || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch customers';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomer = useCallback(async (customerId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminApi.getCustomer(customerId);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch customer';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCustomerOrders = useCallback(async (customerId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminApi.getCustomerOrders(customerId);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch customer orders';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCustomer = useCallback(async (customerId: string, data: Partial<Customer>) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminApi.updateCustomer(customerId, data);
      
      // Update local state
      setCustomers(prev => prev.map(customer => 
        customer._id === customerId ? { ...customer, ...response.data } : customer
      ));
      
      toast.success('Customer updated successfully');
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update customer';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    getCustomer,
    getCustomerOrders,
    updateCustomer
  };
};
