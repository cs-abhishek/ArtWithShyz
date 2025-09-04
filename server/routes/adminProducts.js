const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Product = require('../models/Product');
const { adminAuth } = require('../middleware/authMiddleware');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads/products');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Max 10 files
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// GET /api/admin/products - Get all products with admin filters
router.get('/', adminAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      inStock,
      featured,
      bestseller,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (category) filter.category = category;
    if (inStock !== undefined) filter.inStock = inStock === 'true';
    if (featured !== undefined) filter.isFeatured = featured === 'true';
    if (bestseller !== undefined) filter.isBestseller = bestseller === 'true';

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const products = await Product.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('reviews.user', 'name email');

    const total = await Product.countDocuments(filter);

    // Get category counts for filters
    const categoryCounts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
          limit: parseInt(limit)
        },
        filters: {
          categoryCounts
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// POST /api/admin/products - Create new product
router.post('/', adminAuth, upload.array('images', 10), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      inStock = true,
      stockQuantity = 1,
      isBestseller = false,
      isFeatured = false,
      tags,
      dimensions,
      materials,
      customizable = false,
      deliveryTime = '3-5 days',
      seoTitle,
      seoDescription
    } = req.body;

    // Process uploaded images
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        images.push({
          url: `/uploads/products/${file.filename}`,
          alt: `${name} - Image ${index + 1}`,
          isPrimary: index === 0
        });
      });
    }

    // Parse JSON fields if they're strings
    let parsedTags = [];
    let parsedDimensions = {};
    let parsedMaterials = [];

    try {
      if (tags) parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      if (dimensions) parsedDimensions = typeof dimensions === 'string' ? JSON.parse(dimensions) : dimensions;
      if (materials) parsedMaterials = typeof materials === 'string' ? JSON.parse(materials) : materials;
    } catch (parseError) {
      console.warn('Error parsing JSON fields:', parseError);
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category,
      subcategory,
      images,
      inStock: inStock === 'true' || inStock === true,
      stockQuantity: parseInt(stockQuantity) || 1,
      isBestseller: isBestseller === 'true' || isBestseller === true,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      tags: parsedTags,
      dimensions: parsedDimensions,
      materials: parsedMaterials,
      customizable: customizable === 'true' || customizable === true,
      deliveryTime: deliveryTime || '3-5 days',
      seoTitle,
      seoDescription
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// PUT /api/admin/products/:id - Update product
router.put('/:id', adminAuth, upload.array('images', 10), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updateData = { ...req.body };

    // Process new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file, index) => ({
        url: `/uploads/products/${file.filename}`,
        alt: `${updateData.name || product.name} - Image ${index + 1}`,
        isPrimary: false
      }));

      // Add new images to existing ones
      updateData.images = [...(product.images || []), ...newImages];
    }

    // Parse JSON fields if they're strings
    if (updateData.tags && typeof updateData.tags === 'string') {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch (e) {
        // Keep as string if not valid JSON
      }
    }

    if (updateData.dimensions && typeof updateData.dimensions === 'string') {
      try {
        updateData.dimensions = JSON.parse(updateData.dimensions);
      } catch (e) {
        // Keep as string if not valid JSON
      }
    }

    if (updateData.materials && typeof updateData.materials === 'string') {
      try {
        updateData.materials = JSON.parse(updateData.materials);
      } catch (e) {
        // Keep as string if not valid JSON
      }
    }

    // Convert string booleans to actual booleans
    if (updateData.inStock !== undefined) {
      updateData.inStock = updateData.inStock === 'true' || updateData.inStock === true;
    }
    if (updateData.isFeatured !== undefined) {
      updateData.isFeatured = updateData.isFeatured === 'true' || updateData.isFeatured === true;
    }
    if (updateData.isBestseller !== undefined) {
      updateData.isBestseller = updateData.isBestseller === 'true' || updateData.isBestseller === true;
    }
    if (updateData.customizable !== undefined) {
      updateData.customizable = updateData.customizable === 'true' || updateData.customizable === true;
    }

    // Convert price and stock to numbers
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.stockQuantity) updateData.stockQuantity = parseInt(updateData.stockQuantity);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// DELETE /api/admin/products/:id - Delete product
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete associated image files
    if (product.images && product.images.length > 0) {
      product.images.forEach(image => {
        const imagePath = path.join(__dirname, '../../', image.url);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

// POST /api/admin/products/bulk-action - Bulk operations
router.post('/bulk-action', adminAuth, async (req, res) => {
  try {
    const { action, productIds, updateData } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Product IDs are required'
      });
    }

    let result;

    switch (action) {
      case 'delete':
        result = await Product.deleteMany({ _id: { $in: productIds } });
        break;
      case 'update-featured':
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { isFeatured: updateData.isFeatured }
        );
        break;
      case 'update-bestseller':
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { isBestseller: updateData.isBestseller }
        );
        break;
      case 'update-stock':
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { inStock: updateData.inStock }
        );
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }

    res.json({
      success: true,
      message: `Bulk ${action} completed successfully`,
      modifiedCount: result.modifiedCount || result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error performing bulk action',
      error: error.message
    });
  }
});

// POST /api/admin/products/:id/duplicate - Duplicate product
router.post('/:id/duplicate', adminAuth, async (req, res) => {
  try {
    const originalProduct = await Product.findById(req.params.id);

    if (!originalProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Create a copy with modified name
    const duplicateData = originalProduct.toObject();
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    delete duplicateData.slug;
    
    duplicateData.name = `${duplicateData.name} (Copy)`;
    duplicateData.isFeatured = false;
    duplicateData.isBestseller = false;

    const duplicateProduct = new Product(duplicateData);
    await duplicateProduct.save();

    res.json({
      success: true,
      message: 'Product duplicated successfully',
      data: duplicateProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error duplicating product',
      error: error.message
    });
  }
});

// DELETE /api/admin/products/:id/image/:imageIndex - Delete specific image
router.delete('/:id/image/:imageIndex', adminAuth, async (req, res) => {
  try {
    const { id, imageIndex } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const index = parseInt(imageIndex);
    if (index < 0 || index >= product.images.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image index'
      });
    }

    // Delete the image file
    const imageToDelete = product.images[index];
    const imagePath = path.join(__dirname, '../../', imageToDelete.url);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove image from array
    product.images.splice(index, 1);

    // If deleted image was primary, make first image primary
    if (imageToDelete.isPrimary && product.images.length > 0) {
      product.images[0].isPrimary = true;
    }

    await product.save();

    res.json({
      success: true,
      message: 'Image deleted successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
});

module.exports = router;
