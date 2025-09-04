import { useState } from 'react';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

export interface DashboardData {
  overview: {
    totalProducts: number;
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
    todayOrders: number;
    todayRevenue: number;
  };
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  }>;
  lowStockProducts: Array<{
    _id: string;
    name: string;
    stockQuantity: number;
  }>;
  monthlySales: Array<{
    _id: number;
    revenue: number;
    orders: number;
  }>;
  popularProducts: Array<{
    _id: string;
    soldCount: number;
    revenue: number;
    product: {
      name: string;
      images: Array<{ url: string; alt: string; isPrimary: boolean }>;
    };
  }>;
}

export interface AnalyticsData {
  salesTrend: Array<{
    _id: {
      year: number;
      month: number;
      day: number;
    };
    revenue: number;
    orders: number;
  }>;
  categoryPerformance: Array<{
    _id: string;
    revenue: number;
    quantity: number;
  }>;
  customerInsights: Array<{
    _id: string;
    totalSpent: number;
    orderCount: number;
    avgOrderValue: number;
    user: {
      name: string;
      email: string;
    };
  }>;
  period: string;
}

export const useAnalytics = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getDashboardData();
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (period: string = 'month') => {
    setLoading(true);
    try {
      const response = await adminApi.getAnalytics(period);
      if (response.success) {
        setAnalyticsData(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboardData,
    analyticsData,
    loading,
    fetchDashboardData,
    fetchAnalytics
  };
};
