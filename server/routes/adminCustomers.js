const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const { adminAuth } = require('../middleware/authMiddleware');

// GET /api/admin/customers - Get all customers with filters
router.get('/', adminAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isActive
    } = req.query;

    // Build filter object
    const filter = { role: 'user' };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const customers = await User.find(filter)
      .select('-password -emailVerificationToken -passwordResetToken')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    // Get customer statistics for each user
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const orderStats = await Order.aggregate([
          { $match: { user: customer._id } },
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalSpent: { $sum: '$totalAmount' },
              avgOrderValue: { $avg: '$totalAmount' }
            }
          }
        ]);

        const stats = orderStats[0] || {
          totalOrders: 0,
          totalSpent: 0,
          avgOrderValue: 0
        };

        return {
          ...customer.toObject(),
          orderStats: stats
        };
      })
    );

    res.json({
      success: true,
      data: {
        customers: customersWithStats,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching customers',
      error: error.message
    });
  }
});

// GET /api/admin/customers/:id - Get single customer details
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const customer = await User.findById(req.params.id)
      .select('-password -emailVerificationToken -passwordResetToken');

    if (!customer || customer.role !== 'user') {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Get customer's order history
    const orders = await Order.find({ user: customer._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('items.product', 'name images');

    // Get customer statistics
    const orderStats = await Order.aggregate([
      { $match: { user: customer._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      }
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      totalSpent: 0,
      avgOrderValue: 0
    };

    res.json({
      success: true,
      data: {
        customer,
        recentOrders: orders,
        orderStats: stats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching customer details',
      error: error.message
    });
  }
});

// PUT /api/admin/customers/:id/status - Update customer status
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;
    const customer = await User.findById(req.params.id);

    if (!customer || customer.role !== 'user') {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    customer.isActive = isActive;
    await customer.save();

    res.json({
      success: true,
      message: `Customer account ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: customer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating customer status',
      error: error.message
    });
  }
});

// GET /api/admin/customers/export/csv - Export customers to CSV
router.get('/export/csv', adminAuth, async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' })
      .select('-password -emailVerificationToken -passwordResetToken')
      .sort({ createdAt: -1 });

    // Get order stats for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const orderStats = await Order.aggregate([
          { $match: { user: customer._id } },
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalSpent: { $sum: '$totalAmount' }
            }
          }
        ]);

        const stats = orderStats[0] || { totalOrders: 0, totalSpent: 0 };
        
        return {
          'Customer Name': customer.name,
          'Email': customer.email,
          'Phone': customer.phone || 'N/A',
          'Status': customer.isActive ? 'Active' : 'Inactive',
          'Email Verified': customer.emailVerified ? 'Yes' : 'No',
          'Total Orders': stats.totalOrders,
          'Total Spent': stats.totalSpent,
          'Registration Date': customer.createdAt.toISOString().split('T')[0],
          'Last Login': customer.lastLogin ? customer.lastLogin.toISOString().split('T')[0] : 'Never'
        };
      })
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=customers.csv');

    // Simple CSV generation
    const headers = Object.keys(customersWithStats[0] || {});
    let csvContent = headers.join(',') + '\n';
    
    customersWithStats.forEach(row => {
      const values = headers.map(header => `"${row[header]}"`);
      csvContent += values.join(',') + '\n';
    });

    res.send(csvContent);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error exporting customers',
      error: error.message
    });
  }
});

module.exports = router;
