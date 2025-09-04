import { useState, useEffect } from 'react';
import adminApi from '../services/adminApi';
import toast from 'react-hot-toast';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  inStock: boolean;
  stockQuantity: number;
  isBestseller: boolean;
  isFeatured: boolean;
  tags: string[];
  dimensions?: {
    width: number;
    height: number;
    unit: string;
  };
  materials: string[];
  customizable: boolean;
  deliveryTime: string;
  rating: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  inStock?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  sortBy?: string;
  sortOrder?: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  const fetchProducts = async (filterParams: ProductFilters = {}) => {
    setLoading(true);
    try {
      const response = await adminApi.getProducts(filterParams);
      if (response.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
        setFilters(response.data.filters);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: FormData) => {
    try {
      const response = await adminApi.createProduct(productData);
      if (response.success) {
        toast.success('Product created successfully!');
        fetchProducts(); // Refresh the list
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create product');
      throw error;
    }
  };

  const updateProduct = async (id: string, productData: FormData) => {
    try {
      const response = await adminApi.updateProduct(id, productData);
      if (response.success) {
        toast.success('Product updated successfully!');
        fetchProducts(); // Refresh the list
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update product');
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await adminApi.deleteProduct(id);
      if (response.success) {
        toast.success('Product deleted successfully!');
        fetchProducts(); // Refresh the list
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
      throw error;
    }
  };

  const duplicateProduct = async (id: string) => {
    try {
      const response = await adminApi.duplicateProduct(id);
      if (response.success) {
        toast.success('Product duplicated successfully!');
        fetchProducts(); // Refresh the list
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to duplicate product');
      throw error;
    }
  };

  const bulkAction = async (action: string, productIds: string[], updateData?: any) => {
    try {
      const response = await adminApi.bulkProductAction(action, productIds, updateData);
      if (response.success) {
        toast.success(`Bulk ${action} completed successfully!`);
        fetchProducts(); // Refresh the list
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Bulk action failed');
      throw error;
    }
  };

  const deleteProductImage = async (productId: string, imageIndex: number) => {
    try {
      const response = await adminApi.deleteProductImage(productId, imageIndex);
      if (response.success) {
        toast.success('Image deleted successfully!');
        fetchProducts(); // Refresh the list
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete image');
      throw error;
    }
  };

  return {
    products,
    loading,
    pagination,
    filters,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    bulkAction,
    deleteProductImage
  };
};
