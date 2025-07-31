import React, { useState, useEffect } from 'react';
import { getDeals, createDeal, updateDeal, deleteDeal, getRetailers, getProducts } from '../../utils/api';

const DealManagement = () => {
  const [deals, setDeals] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDeal, setEditingDeal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    retailerId: '',
    productIds: [],
    status: 'Active'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dealsData, retailersData, productsData] = await Promise.all([
        getDeals(),
        getRetailers(),
        getProducts()
      ]);
      setDeals(dealsData);
      setRetailers(retailersData);
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleDeleteDeal = async (dealId) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        const result = await deleteDeal(dealId);
        if (result.success) {
          setDeals(deals.filter(deal => deal.id !== dealId));
        }
      } catch (err) {
        setError('Failed to delete deal');
      }
    }
  };

  const handleEditClick = (deal) => {
    setEditingDeal(deal);
    setFormData({
      title: deal.title || '',
      description: deal.description || '',
      discountPercentage: deal.discountPercentage || '',
      startDate: deal.startDate || '',
      endDate: deal.endDate || '',
      retailerId: deal.retailerId || '',
      productIds: deal.products?.map(p => p.id) || [],
      status: deal.status || 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (e) => {
    const options = e.target.options;
    const selectedProducts = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedProducts.push(Number(options[i].value));
      }
    }
    setFormData(prev => ({
      ...prev,
      productIds: selectedProducts
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedRetailer = retailers.find(r => r.id === Number(formData.retailerId));
      const dealData = {
        ...formData,
        retailerId: Number(formData.retailerId),
        retailerName: selectedRetailer?.businessName || '',
        products: formData.productIds.map(id => {
          const product = products.find(p => p.id === id);
          return { id, name: product?.title || '' };
        })
      };

      if (editingDeal?.id) {
        const updatedDeal = await updateDeal(editingDeal.id, dealData);
        setDeals(deals.map(deal => 
          deal.id === editingDeal.id ? { ...deal, ...updatedDeal.data } : deal
        ));
      } else {
        const newDeal = await createDeal(dealData);
        setDeals([...deals, newDeal.data]);
      }
      setEditingDeal(null);
      setFormData({
        title: '',
        description: '',
        discountPercentage: '',
        startDate: '',
        endDate: '',
        retailerId: '',
        productIds: [],
        status: 'Active'
      });
    } catch (err) {
      setError('Failed to save deal');
    }
  };

  const handleAddDeal = () => {
    setEditingDeal({ id: null });
    setFormData({
      title: '',
      description: '',
      discountPercentage: '',
      startDate: '',
      endDate: '',
      retailerId: '',
      productIds: [],
      status: 'Active'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading deals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Deal Management</h1>
        <button 
          onClick={handleAddDeal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add New Deal
        </button>
      </div>

      {editingDeal && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">
            {editingDeal.id ? 'Edit Deal' : 'Add New Deal'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Retailer</label>
                <select
                  name="retailerId"
                  value={formData.retailerId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Retailer</option>
                  {retailers.map(retailer => (
                    <option key={retailer.id} value={retailer.id}>
                      {retailer.businessName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Products</label>
              <select
                multiple
                name="productIds"
                value={formData.productIds}
                onChange={handleProductChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Hold Ctrl (Windows) or Command (Mac) to select multiple products
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingDeal(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingDeal.id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                  <div className="text-sm text-gray-500">{deal.description}</div>
                  <div className="text-sm text-gray-500">Retailer: {deal.retailerName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{deal.discountPercentage}% off</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(deal.startDate).toLocaleDateString()} - {new Date(deal.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {deal.products?.length || 0} Products
                  </div>
                  <div className="text-sm text-gray-500">
                    {deal.products?.slice(0, 2).map(p => p.name).join(', ')}
                    {deal.products?.length > 2 ? '...' : ''}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    deal.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : deal.status === 'Expired'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {deal.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEditClick(deal)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDeal(deal.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealManagement; 