import React, { useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAnalytics } from '../hooks/useAnalytics';
import adminApi from '../services/adminApi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { dashboardData, loading, fetchDashboardData } = useAnalytics();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  const overviewCards = [
    {
      title: 'Total Products',
      value: dashboardData?.overview.totalProducts || 0,
      icon: '🎨',
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Orders',
      value: dashboardData?.overview.totalOrders || 0,
      icon: '📦',
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Total Customers',
      value: dashboardData?.overview.totalCustomers || 0,
      icon: '👥',
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Total Revenue',
      value: adminApi.formatCurrency(dashboardData?.overview.totalRevenue || 0),
      icon: '💰',
      color: 'bg-red-500',
      change: '+22%'
    }
  ];

  const todayStats = [
    {
      title: "Today's Orders",
      value: dashboardData?.overview.todayOrders || 0,
      icon: '📈'
    },
    {
      title: "Today's Revenue",
      value: adminApi.formatCurrency(dashboardData?.overview.todayRevenue || 0),
      icon: '💵'
    }
  ];

  // Chart data for monthly sales
  const monthlyData = dashboardData?.monthlySales || [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const salesChartData = {
    labels: monthlyData.map(item => monthNames[item._id - 1] || `Month ${item._id}`),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyData.map(item => item.revenue),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'Orders',
        data: monthlyData.map(item => item.orders),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const salesChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Revenue (₹)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Orders'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Sales Performance'
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your art business.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-green-600 mt-1">{card.change} from last month</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center text-white text-xl`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {todayStats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-sm p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className="text-3xl opacity-80">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h3>
          {monthlyData.length > 0 ? (
            <Line data={salesChartData} options={salesChartOptions} />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No sales data available
            </div>
          )}
        </div>

        {/* Popular Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Products</h3>
          <div className="space-y-4">
            {dashboardData?.popularProducts.slice(0, 5).map((product, index) => (
              <div key={product._id} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {product.product.images?.[0] ? (
                    <img 
                      src={product.product.images[0].url} 
                      alt={product.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      🎨
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Sold: {product.soldCount} | Revenue: {adminApi.formatCurrency(product.revenue)}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  #{index + 1}
                </div>
              </div>
            )) || (
              <div className="text-center text-gray-500 py-8">
                No popular products data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {dashboardData?.recentOrders.slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">{order.user.name}</p>
                  <p className="text-xs text-gray-400">{adminApi.formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {adminApi.formatCurrency(order.totalAmount)}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            )) || (
              <div className="text-center text-gray-500 py-8">
                No recent orders
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
          <div className="space-y-3">
            {dashboardData?.lowStockProducts.length ? 
              dashboardData.lowStockProducts.map((product) => (
                <div key={product._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-red-600">Only {product.stockQuantity} left in stock</p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Low Stock
                    </span>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">✅</div>
                  <p>All products are well stocked!</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
