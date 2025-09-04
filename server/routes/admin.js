const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const { adminAuth } = require('../middleware/authMiddleware');

// GET /api/admin/dashboard - Dashboard statistics
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // Get date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get basic counts
    const [totalProducts, totalOrders, totalCustomers, totalRevenue] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.aggregate([
        { $match: { status: { $in: ['delivered', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ])
    ]);

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10)
      .select('orderNumber totalAmount status createdAt user');

    // Get low stock products
    const lowStockProducts = await Product.find({ stockQuantity: { $lt: 5 } })
      .select('name stockQuantity')
      .limit(10);

    // Get monthly sales data
    const monthlySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(now.getFullYear(), 0, 1) },
          status: { $in: ['delivered', 'completed'] }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get popular products
    const popularProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          soldCount: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { soldCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ]);

    // Get today's statistics
    const todayStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday },
          status: { $in: ['delivered', 'completed'] }
        }
      },
      {
        $group: {
          _id: null,
          orders: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalOrders,
          totalCustomers,
          totalRevenue: totalRevenue[0]?.total || 0,
          todayOrders: todayStats[0]?.orders || 0,
          todayRevenue: todayStats[0]?.revenue || 0
        },
        recentOrders,
        lowStockProducts,
        monthlySales,
        popularProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

// GET /api/admin/analytics - Advanced analytics
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateRange;
    const now = new Date();
    
    switch (period) {
      case 'week':
        dateRange = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        dateRange = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        dateRange = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        dateRange = new Date(now.setMonth(now.getMonth() - 1));
    }

    // Sales trend analysis
    const salesTrend = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: dateRange },
          status: { $in: ['delivered', 'completed'] }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Category performance
    const categoryPerformance = await Order.aggregate([
      { $match: { createdAt: { $gte: dateRange } } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          quantity: { $sum: '$items.quantity' }
        }
      },
      { $sort: { revenue: -1 } }
    ]);

    // Customer insights
    const customerInsights = await Order.aggregate([
      { $match: { createdAt: { $gte: dateRange } } },
      {
        $group: {
          _id: '$user',
          totalSpent: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        salesTrend,
        categoryPerformance,
        customerInsights,
        period
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics data',
      error: error.message
    });
  }
});

module.exports = router;
