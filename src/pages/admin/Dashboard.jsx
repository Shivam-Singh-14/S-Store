import React, { useState, useEffect } from 'react';
import { getProducts, getUsers, getOrders } from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, users, orders] = await Promise.all([
          getProducts(),
          getUsers(),
          getOrders(),
        ]);

        // Calculate total revenue from orders
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        setStats({
          totalProducts: products.length,
          totalUsers: users.length,
          totalOrders: orders.length,
          totalRevenue: totalRevenue.toFixed(2),
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue}`,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-lg shadow-lg p-6 text-white`}
          >
            <h3 className="text-lg font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 