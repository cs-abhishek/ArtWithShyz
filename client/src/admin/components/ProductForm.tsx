import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useProducts } from '../hooks/useProducts';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  stockQuantity: number;
  inStock: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  tags: string;
  materials: string;
  deliveryTime: string;
  customizable: boolean;
  seoTitle?: string;
  seoDescription?: string;
  dimensions?: {
    width: number;
    height: number;
    unit: string;
  };
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { createProduct, updateProduct } = useProducts();

  const [loading, setLoading] = useState(false);
  const [existingProduct, setExistingProduct] = useState<any>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [imageToDelete, setImageToDelete] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>();

  const watchCategory = watch('category');

  useEffect(() => {
    if (isEditing && id) {
      fetchProduct(id);
    }
  }, [isEditing, id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      // This would need to be implemented in adminApi
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/admin/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        const product = data.data;
        setExistingProduct(product);
        setExistingImages(product.images || []);
        
        // Pre-fill form
        reset({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          subcategory: product.subcategory,
          stockQuantity: product.stockQuantity,
          inStock: product.inStock,
          isBestseller: product.isBestseller,
          isFeatured: product.isFeatured,
          tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
          materials: Array.isArray(product.materials) ? product.materials.join(', ') : '',
          deliveryTime: product.deliveryTime,
          customizable: product.customizable,
          seoTitle: product.seoTitle,
          seoDescription: product.seoDescription,
          dimensions: product.dimensions
        });
      }
    } catch (error) {
      toast.error('Failed to fetch product details');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedImages([...selectedImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 10
  });

  const removeSelectedImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setImageToDelete([...imageToDelete, index]);
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Basic fields
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('category', data.category);
      formData.append('stockQuantity', data.stockQuantity.toString());
      formData.append('inStock', data.inStock.toString());
      formData.append('isBestseller', data.isBestseller.toString());
      formData.append('isFeatured', data.isFeatured.toString());
      formData.append('deliveryTime', data.deliveryTime);
      formData.append('customizable', data.customizable.toString());

      if (data.subcategory) formData.append('subcategory', data.subcategory);
      if (data.seoTitle) formData.append('seoTitle', data.seoTitle);
      if (data.seoDescription) formData.append('seoDescription', data.seoDescription);

      // Process tags and materials
      const tags = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const materials = data.materials.split(',').map(material => material.trim()).filter(material => material);
      
      formData.append('tags', JSON.stringify(tags));
      formData.append('materials', JSON.stringify(materials));

      // Dimensions
      if (data.dimensions) {
        formData.append('dimensions', JSON.stringify(data.dimensions));
      }

      // Add new images
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      // For editing, include existing images info
      if (isEditing) {
        const remainingImages = existingImages.map((img, index) => ({
          ...img,
          index: index
        }));
        formData.append('existingImages', JSON.stringify(remainingImages));
        formData.append('imagesToDelete', JSON.stringify(imageToDelete));
      }

      if (isEditing && id) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }

      navigate('/admin/products');
    } catch (error) {
      // Error handling is done in hooks
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'paintings', label: 'Paintings' },
    { value: 'digital-art', label: 'Digital Art' },
    { value: 'sketches', label: 'Sketches' },
    { value: 'custom-art', label: 'Custom Art' },
    { value: 'portraits', label: 'Portraits' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'art-supplies', label: 'Art Supplies' },
    { value: 'canvas', label: 'Canvas' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'prints', label: 'Prints' }
  ];

  if (loading && isEditing) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <span className="ml-4 text-gray-600">Loading product details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Update your artwork details' : 'Add a beautiful new artwork to your collection'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          ← Back to Products
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Product name is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    {...register('description', { required: 'Description is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Describe your artwork in detail..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      {...register('subcategory')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Optional subcategory"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    {...register('tags')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="abstract, modern, colorful, wall art"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Add tags to help customers find your artwork
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register('stockQuantity', { 
                      required: 'Stock quantity is required',
                      min: { value: 0, message: 'Stock cannot be negative' }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="1"
                  />
                  {errors.stockQuantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.stockQuantity.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('inStock')}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Product is in stock</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('isFeatured')}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Mark as featured product</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('isBestseller')}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Mark as bestseller</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('customizable')}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Available for customization</span>
                </label>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materials (comma-separated)
                  </label>
                  <input
                    type="text"
                    {...register('materials')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="canvas, acrylic paint, wooden frame"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Time
                  </label>
                  <input
                    type="text"
                    {...register('deliveryTime')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="3-5 days"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dimensions
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      step="0.1"
                      {...register('dimensions.width')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Width"
                    />
                    <input
                      type="number"
                      step="0.1"
                      {...register('dimensions.height')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Height"
                    />
                    <select
                      {...register('dimensions.unit')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="inches">Inches</option>
                      <option value="cm">CM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    {...register('seoTitle')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Optional SEO title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Description
                  </label>
                  <textarea
                    rows={3}
                    {...register('seoDescription')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Optional SEO description"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
              
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Current Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {existingImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                        {image.isPrimary && (
                          <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Upload */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="text-gray-500">
                  <div className="text-3xl mb-2">📸</div>
                  {isDragActive ? (
                    <p>Drop the images here...</p>
                  ) : (
                    <>
                      <p>Drag & drop images here, or click to select</p>
                      <p className="text-sm mt-1">Supports JPEG, PNG, GIF, WebP (Max 10 files)</p>
                    </>
                  )}
                </div>
              </div>

              {/* Selected Images Preview */}
              {selectedImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">New Images to Upload</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeSelectedImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Save Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {isEditing ? 'Update Product' : 'Create Product'}
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/admin/products')}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use high-quality images for better sales</li>
                <li>• Add relevant tags to improve discoverability</li>
                <li>• Write detailed descriptions</li>
                <li>• Set competitive prices</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
