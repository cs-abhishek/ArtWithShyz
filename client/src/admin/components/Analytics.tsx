import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useAnalytics } from '../hooks/useAnalytics';
import toast from 'react-hot-toast';
import adminApi from '../services/adminApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics: React.FC = () => {
  const { analytics, loading, fetchAnalytics } = useAnalytics();
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('overview');

  useEffect(() => {
    fetchAnalytics({ period: dateRange });
  }, [dateRange, fetchAnalytics]);

  const exportReport = async () => {
    try {
      const response = await adminApi.exportAnalytics({
        period: dateRange,
        type: reportType
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analytics-report-${dateRange}-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Analytics report exported successfully');
    } catch (error) {
      toast.error('Failed to export analytics report');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading && !analytics) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <span className="ml-4 text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data available</h3>
          <p className="text-gray-600">Analytics data will appear once you have orders and customers</p>
        </div>
      </div>
    );
  }

  // Chart configurations
  const salesChartData = {
    labels: analytics.salesOverTime?.labels || [],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: analytics.salesOverTime?.data || [],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const productCategoryData = {
    labels: analytics.topCategories?.map(cat => cat.name) || [],
    datasets: [
      {
        label: 'Sales',
        data: analytics.topCategories?.map(cat => cat.count) || [],
        backgroundColor: [
          '#EF4444', // Red
          '#F59E0B', // Amber
          '#10B981', // Emerald
          '#3B82F6', // Blue
          '#8B5CF6', // Violet
          '#EC4899', // Pink
        ],
      },
    ],
  };

  const orderStatusData = {
    labels: analytics.ordersByStatus?.map(status => status.status) || [],
    datasets: [
      {
        data: analytics.ordersByStatus?.map(status => status.count) || [],
        backgroundColor: [
          '#FEF3C7', // Pending - Light Yellow
          '#DBEAFE', // Confirmed - Light Blue
          '#E0E7FF', // Processing - Light Indigo
          '#C7D2FE', // Shipped - Light Purple
          '#D1FAE5', // Delivered - Light Green
          '#FEE2E2', // Cancelled - Light Red
          '#F3F4F6', // Refunded - Light Gray
        ],
        borderColor: [
          '#F59E0B',
          '#3B82F6',
          '#6366F1',
          '#8B5CF6',
          '#10B981',
          '#EF4444',
          '#6B7280',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Insights into your business performance</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center space-x-2"
          >
            <span>📊</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Total Revenue</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(analytics.totalRevenue || 0)}
              </div>
              {analytics.revenueGrowth && (
                <div className={`text-sm ${analytics.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.revenueGrowth > 0 ? '↗' : '↘'} {Math.abs(analytics.revenueGrowth).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">📦</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Total Orders</div>
              <div className="text-2xl font-bold text-gray-900">{analytics.totalOrders || 0}</div>
              {analytics.orderGrowth && (
                <div className={`text-sm ${analytics.orderGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.orderGrowth > 0 ? '↗' : '↘'} {Math.abs(analytics.orderGrowth).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-lg">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">New Customers</div>
              <div className="text-2xl font-bold text-gray-900">{analytics.newCustomers || 0}</div>
              {analytics.customerGrowth && (
                <div className={`text-sm ${analytics.customerGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.customerGrowth > 0 ? '↗' : '↘'} {Math.abs(analytics.customerGrowth).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-lg">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Avg Order Value</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(analytics.averageOrderValue || 0)}
              </div>
              {analytics.aovGrowth && (
                <div className={`text-sm ${analytics.aovGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.aovGrowth > 0 ? '↗' : '↘'} {Math.abs(analytics.aovGrowth).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Over Time */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Over Time</h2>
          {analytics.salesOverTime?.data?.length ? (
            <Line data={salesChartData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p>No sales data available</p>
              </div>
            </div>
          )}
        </div>

        {/* Top Product Categories */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h2>
          {analytics.topCategories?.length ? (
            <Bar data={productCategoryData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <p>No category data available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Order Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h2>
          {analytics.ordersByStatus?.length ? (
            <div className="h-64">
              <Doughnut data={orderStatusData} options={doughnutOptions} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📦</div>
                <p>No order status data available</p>
              </div>
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h2>
          {analytics.topProducts?.length ? (
            <div className="space-y-4">
              {analytics.topProducts.slice(0, 5).map((product, index) => (
                <div key={product._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-red-600">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.sales} sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <p>No product performance data available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {analytics.conversionRate ? `${(analytics.conversionRate * 100).toFixed(1)}%` : '0%'}
            </div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
            <div className="text-xs text-gray-500 mt-1">Visitors to customers</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {analytics.repeatCustomerRate ? `${(analytics.repeatCustomerRate * 100).toFixed(1)}%` : '0%'}
            </div>
            <div className="text-sm text-gray-600">Repeat Customer Rate</div>
            <div className="text-xs text-gray-500 mt-1">Customers who bought again</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {analytics.averageOrderProcessingTime || '0'} hrs
            </div>
            <div className="text-sm text-gray-600">Avg Processing Time</div>
            <div className="text-xs text-gray-500 mt-1">Order to shipment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
