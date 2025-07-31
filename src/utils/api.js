import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Get all orders (since FakeStoreAPI doesn't have orders endpoint, we'll simulate it)
export const getOrders = async () => {
  try {
    // Simulate orders data since FakeStoreAPI doesn't provide orders
    return [
      {
        id: 1,
        userId: 1,
        date: '2024-03-15',
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 }
        ],
        total: 299.99,
        status: 'Delivered'
      },
      {
        id: 2,
        userId: 2,
        date: '2024-03-14',
        products: [
          { productId: 3, quantity: 1 }
        ],
        total: 149.99,
        status: 'Processing'
      }
    ];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// User Management
export const getUserById = (id) => axios.get(`${BASE_URL}/users/${id}`);
export const updateUser = (id, data) => axios.put(`${BASE_URL}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/users/${id}`);

// Product Management
export const getProductById = (id) => axios.get(`${BASE_URL}/products/${id}`);
export const createProduct = (data) => axios.post(`${BASE_URL}/products`, data);
export const updateProduct = (id, data) => axios.put(`${BASE_URL}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${BASE_URL}/products/${id}`);

// Order Management
export const getOrderById = (id) => axios.get(`${BASE_URL}/orders/${id}`);
export const updateOrder = (id, data) => axios.put(`${BASE_URL}/orders/${id}`, data);

// Retailer Management
export const getRetailers = async () => {
  try {
    // For demo purposes, we'll return mock data
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Business St, City, Country',
        businessName: 'John\'s Store',
        businessType: 'Individual',
        products: [
          { id: 1, name: 'Product 1' },
          { id: 2, name: 'Product 2' }
        ],
        status: 'Active'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        address: '456 Market Ave, Town, Country',
        businessName: 'Smith Enterprises',
        businessType: 'Corporation',
        products: [
          { id: 3, name: 'Product 3' },
          { id: 4, name: 'Product 4' }
        ],
        status: 'Active'
      }
    ];
  } catch (error) {
    throw new Error('Failed to fetch retailers');
  }
};

export const createRetailer = async (retailerData) => {
  try {
    // For demo purposes, we'll return mock data
    return {
      data: {
        id: Math.floor(Math.random() * 1000),
        ...retailerData,
        products: []
      }
    };
  } catch (error) {
    throw new Error('Failed to create retailer');
  }
};

export const updateRetailer = async (id, retailerData) => {
  try {
    // For demo purposes, we'll return mock data
    return {
      data: {
        id,
        ...retailerData
      }
    };
  } catch (error) {
    throw new Error('Failed to update retailer');
  }
};

export const deleteRetailer = async (id) => {
  try {
    // For demo purposes, we'll return mock data
    return { success: true };
  } catch (error) {
    throw new Error('Failed to delete retailer');
  }
};

// Deal Management
export const getDeals = async () => {
  try {
    // For demo purposes, we'll return mock data
    const mockDeals = [
      {
        id: 1,
        title: 'Summer Sale',
        description: 'Get up to 50% off on summer collection',
        discountPercentage: 50,
        startDate: '2024-03-01',
        endDate: '2024-03-31',
        products: [
          { id: 1, name: 'Product 1' },
          { id: 2, name: 'Product 2' }
        ],
        status: 'Active',
        retailerId: 1,
        retailerName: 'John\'s Store'
      },
      {
        id: 2,
        title: 'Weekend Special',
        description: 'Special weekend discounts on selected items',
        discountPercentage: 30,
        startDate: '2024-03-15',
        endDate: '2024-03-17',
        products: [
          { id: 3, name: 'Product 3' },
          { id: 4, name: 'Product 4' }
        ],
        status: 'Active',
        retailerId: 2,
        retailerName: 'Smith Enterprises'
      }
    ];
    return mockDeals;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
};

export const createDeal = async (dealData) => {
  try {
    // For demo purposes, we'll return mock data
    const newDeal = {
      id: Math.floor(Math.random() * 1000),
      ...dealData,
      status: 'Active',
      retailerName: dealData.retailerName || 'New Retailer'
    };
    return { data: newDeal };
  } catch (error) {
    console.error('Error creating deal:', error);
    throw new Error('Failed to create deal');
  }
};

export const updateDeal = async (id, dealData) => {
  try {
    // For demo purposes, we'll return mock data
    const updatedDeal = {
      id,
      ...dealData,
      retailerName: dealData.retailerName || 'Updated Retailer'
    };
    return { data: updatedDeal };
  } catch (error) {
    console.error('Error updating deal:', error);
    throw new Error('Failed to update deal');
  }
};

export const deleteDeal = async (id) => {
  try {
    // For demo purposes, we'll return mock data
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting deal:', error);
    throw new Error('Failed to delete deal');
  }
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;