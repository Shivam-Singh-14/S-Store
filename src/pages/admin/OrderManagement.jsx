import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders] = useState([
    {
      id: 1,
      customer: 'John Doe',
      date: '2024-03-15',
      total: 299.99,
      status: 'Delivered',
      items: 3,
      details: {
        shippingAddress: '123 Main St, City, Country',
        paymentMethod: 'Credit Card',
        items: [
          { name: 'Product 1', quantity: 2, price: 99.99 },
          { name: 'Product 2', quantity: 1, price: 100.01 }
        ]
      }
    },
    {
      id: 2,
      customer: 'Jane Smith',
      date: '2024-03-14',
      total: 149.99,
      status: 'Processing',
      items: 2,
      details: {
        shippingAddress: '456 Oak St, City, Country',
        paymentMethod: 'PayPal',
        items: [
          { name: 'Product 3', quantity: 1, price: 149.99 }
        ]
      }
    },
  ]);

  const [filters, setFilters] = useState({
    status: '',
    date: ''
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredOrders = orders.filter(order => {
    const statusMatch = !filters.status || order.status.toLowerCase() === filters.status.toLowerCase();
    const dateMatch = !filters.date || order.date === filters.date;
    return statusMatch && dateMatch;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  const handleStatusUpdate = (newStatus) => {
    // Here you would typically make an API call to update the order status
    console.log(`Updating order ${selectedOrder.id} to ${newStatus}`);
    setIsUpdateModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Order Management</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <select 
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.items}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${order.total}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleUpdateOrder(order)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Modal */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Order ID: #{selectedOrder.id}</p>
                <p className="text-sm text-gray-500">Customer: {selectedOrder.customer}</p>
                <p className="text-sm text-gray-500">Date: {selectedOrder.date}</p>
                <p className="text-sm text-gray-500">Total: ${selectedOrder.total}</p>
                <p className="text-sm text-gray-500">Status: {selectedOrder.status}</p>
                <p className="text-sm text-gray-500">Shipping Address: {selectedOrder.details.shippingAddress}</p>
                <p className="text-sm text-gray-500">Payment Method: {selectedOrder.details.paymentMethod}</p>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-500">Items:</p>
                  {selectedOrder.details.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-500">
                      {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                    </p>
                  ))}
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Order Modal */}
      {isUpdateModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900">Update Order Status</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Order ID: #{selectedOrder.id}</p>
                <p className="text-sm text-gray-500">Current Status: {selectedOrder.status}</p>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">New Status</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    onChange={(e) => handleStatusUpdate(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement; 