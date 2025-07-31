// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// // Dummy data for categories with icons (using emoji for simplicity, you can replace with actual icons)
// const categories = [
//   { name: 'Shop All', path: '/category/all', icon: '🛒' },
//   { name: 'New Arrivals', path: '/category/new-arrivals', icon: '✨', badge: 'NEW', badgeColor: 'bg-green-500' },
//   { name: 'Sale', path: '/category/sale', icon: '🏷️', badge: 'SALE', badgeColor: 'bg-red-500' },
//   { name: 'Daily Deals', path: '/category/daily-deals', icon: '⏰' },
//   { name: 'Audio', path: '/category/audio', icon: '🎧' },
//   { name: 'Camera & Drone', path: '/category/camera-drone', icon: '📷' },
//   { name: 'Cell Phones', path: '/category/cell-phones', icon: '📱' },
//   { name: 'Computers', path: '/category/computers', icon: '💻' },
//   { name: 'iPad & Tablets', path: '/category/ipad-tablets', icon: '📟' },
//   { name: 'Portable Speakers', path: '/category/portable-speakers', icon: '🔊' },
// ];

// const Category = () => {
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className=" w-full ml-10 flex gap-[40px] overflow-x-hidden space-x-4 p-4 bg-gray-100">
//       {categories.map((category, index) => (
//         <div
//           key={index}
//           onClick={() => handleNavigation(category.path)}
//           className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
//         >
//           <div className="relative w-[125px] h-[125px] bg-white rounded-full flex items-center justify-center shadow-md">
//             <span className="text-2xl">{category.icon}</span>
//             {category.badge && (
//               <span
//                 className={`absolute top-0 right-0 ${category.badgeColor} text-white text-xs font-bold rounded-full px-2 py-1 transform translate-x-2 -translate-y-2`}
//               >
//                 {category.badge}
//               </span>
//             )}
//           </div>
//           <p className="mt-2 text-sm text-gray-700 text-center">{category.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Category;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// // Dummy data for categories with icons
// const categories = [
//   { name: 'Shop All', path: '/category/all', icon: '🛒', category: 'All' },
//   { name: 'New Arrivals', path: '/category/new-arrivals', icon: '✨', badge: 'NEW', badgeColor: 'bg-green-500', category: 'New Arrivals' },
//   { name: 'Sale', path: '/category/sale', icon: '🏷️', badge: 'SALE', badgeColor: 'bg-red-500', category: 'Sale' },
//   { name: 'Daily Deals', path: '/category/daily-deals', icon: '⏰', category: 'Daily Deals' },
//   { name: 'Audio', path: '/category/audio', icon: '🎧', category: 'Audio' },
//   { name: 'Camera & Drone', path: '/category/camera-drone', icon: '📷', category: 'Camera & Drone' },
//   { name: 'Cell Phones', path: '/category/cell-phones', icon: '📱', category: 'Cell Phones' },
//   { name: 'Computers', path: '/category/computers', icon: '💻', category: 'Computers' },
//   { name: 'iPad & Tablets', path: '/category/ipad-tablets', icon: '📟', category: 'iPad & Tablets' },
//   { name: 'Portable Speakers', path: '/category/portable-speakers', icon: '🔊', category: 'Portable Speakers' },
//   { name: 'Smart Home', path: '/category/smart-home', icon: '🏠', category: 'Smart Home' },
//   { name: 'TV & Audio', path: '/category/tv-audio', icon: '📺', category: 'TV & Audio' },
//   { name: 'Watches', path: '/category/watches', icon: '⌚', category: 'Watches' },
//   { name: 'Gaming', path: '/category/gaming', icon: '🎮', category: 'Gaming' },
// ];

// const Category = ({ onCategoryClick }) => {
//   const navigate = useNavigate();

//   const handleNavigation = (path, category) => {
//     navigate(path);
//     onCategoryClick(category);
//   };

//   return (
//     <div className="w-full ml-10 flex gap-[40px] overflow-x-auto space-x-4 p-4 bg-gray-100">
//       {categories.map((category, index) => (
//         <div
//           key={index}
//           onClick={() => handleNavigation(category.path, category.category)}
//           className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
//         >
//           <div className="relative w-[125px] h-[125px] bg-white rounded-full flex items-center justify-center shadow-md">
//             <span className="text-2xl">{category.icon}</span>
//             {category.badge && (
//               <span
//                 className={`absolute top-0 right-0 ${category.badgeColor} text-white text-xs font-bold rounded-full px-2 py-1 transform translate-x-2 -translate-y-2`}
//               >
//                 {category.badge}
//               </span>
//             )}
//           </div>
//           <p className="mt-2 text-sm text-gray-700 text-center">{category.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Category;


import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const categories = [
  { name: 'Shop All', path: '/shop', icon: '🛒', categoryId: 'all' },
  { name: 'New Arrivals', path: '/category/new-arrivals', icon: '✨', badge: 'NEW', badgeColor: 'bg-green-500', categoryId: 'new-arrivals' },
  { name: 'Sale', path: '/category/sale', icon: '🏷️', badge: 'SALE', badgeColor: 'bg-red-500', categoryId: 'sale' },
  { name: 'Daily Deals', path: '/category/daily-deals', icon: '⏰', categoryId: 'daily-deals' },
  { name: 'Audio', path: '/category/audio', icon: '🎧', categoryId: 'audio' },
  { name: 'Camera & Drone', path: '/category/camera-drone', icon: '📷', categoryId: 'camera-drone' },
  { name: 'Cell Phones', path: '/category/cell-phones', icon: '📱', categoryId: 'cell-phones' },
  { name: 'Computers', path: '/category/computers', icon: '💻', categoryId: 'computers' },
  { name: 'iPad & Tablets', path: '/category/ipad-tablets', icon: '📟', categoryId: 'ipad-tablets' },
  { name: 'Portable Speakers', path: '/category/portable-speakers', icon: '🔊', categoryId: 'portable-speakers' },
  { name: 'Smart Home', path: '/category/smart-home', icon: '🏠', categoryId: 'smart-home' },
  { name: 'TV & Audio', path: '/category/tv-audio', icon: '📺', categoryId: 'tv-audio' },
  { name: 'Watches', path: '/category/watches', icon: '⌚', categoryId: 'watches' },
  { name: 'Gaming', path: '/category/gaming', icon: '🎮', categoryId: 'gaming' },
];

const Category = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const activeCategory = categoryId || 'all';

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full flex  gap-4 justify-center overflow-x-auto p-4 bg-gray-100">
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => handleNavigation(category.path)}
          className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-2xl">{category.icon}</span>
            {category.badge && (
              <span
                className={`absolute top-0 right-0 ${category.badgeColor} text-white text-xs font-bold rounded-full px-2 py-1 transform translate-x-2 -translate-y-2`}
              >
                {category.badge}
              </span>
            )}
          </div>
          <p
            className={`mt-2 text-sm text-gray-700 text-center ${
              activeCategory === category.categoryId ? 'underline font-semibold' : ''
            }`}
          >
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Category;