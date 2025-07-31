import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
  const categories = [
    "All Products",
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Books",
    "Toys",
    "Jewelry",
    "Automotive",
    "Health",
    "Garden",
    "Pet Supplies",
    "Office Products",
    "Musical Instruments"
  ];

  return (
    <div className="bg-white py-4 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/shop?category=${category.toLowerCase()}`}
              className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-[#1976D2] hover:text-white rounded-full text-sm font-medium transition-colors duration-200"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
