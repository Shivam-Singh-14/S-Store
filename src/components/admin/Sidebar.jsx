import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  TagIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  PhotoIcon,
  VideoCameraIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { UserContext } from '../context/UserContext';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
    { name: 'Retailers', href: '/admin/retailers', icon: BuildingStorefrontIcon },
    { name: 'Deals', href: '/admin/deals', icon: TagIcon },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon },
    { name: 'Banners', href: '/admin/banners', icon: PhotoIcon },
    { name: 'Videos', href: '/admin/videos', icon: VideoCameraIcon },
    { name: 'Enquiries', href: '/admin/enquiries', icon: QuestionMarkCircleIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Admin Panel</h1>
        <button
          className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`flex items-center px-4 py-3 text-base md:text-lg font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-base md:text-lg font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 md:w-6 md:h-6 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;