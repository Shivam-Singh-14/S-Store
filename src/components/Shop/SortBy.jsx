// import React, { useState } from 'react';
// import { FaTh, FaBars, FaList } from 'react-icons/fa';

// // Dummy data (assuming 36 products are available)
// const dummyProducts = [
//   { id: 1, name: 'Wireless Headphones', price: 59.99, image: 'https://via.placeholder.com/200x200?text=Headphones', category: 'Electronics', rating: 4.5, popularity: 80, date: '2025-01-15' },
//   { id: 2, name: 'Smartphone', price: 499.99, image: 'https://via.placeholder.com/200x200?text=Smartphone', category: 'Electronics', rating: 4.8, popularity: 90, date: '2025-02-10' },
//   { id: 3, name: 'Running Shoes', price: 79.99, image: 'https://via.placeholder.com/200x200?text=Shoes', category: 'Footwear', rating: 4.2, popularity: 60, date: '2025-03-01' },
//   { id: 4, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/200x200?text=Laptop', category: 'Electronics', rating: 4.7, popularity: 85, date: '2025-04-20' },
//   { id: 5, name: 'Smartwatch', price: 199.99, image: 'https://via.placeholder.com/200x200?text=Smartwatch', category: 'Electronics', rating: 4.3, popularity: 70, date: '2025-05-01' },
//   { id: 6, name: 'Camera', price: 299.99, image: 'https://via.placeholder.com/200x200?text=Camera', category: 'Camera & Drone', rating: 4.6, popularity: 75, date: '2025-05-10' },
//   // ... (assuming 36 products in total)
// ];

// // Sorting logic
// const sortProducts = (products, sortOption) => {
//   const sorted = [...products];
//   switch (sortOption) {
//     case 'Sort By Popularity':
//       return sorted.sort((a, b) => b.popularity - a.popularity);
//     case 'Sort By Average Rating':
//       return sorted.sort((a, b) => b.rating - a.rating);
//     case 'Sort By Latest':
//       return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
//     case 'Sort By Price: High to Low':
//       return sorted.sort((a, b) => b.price - a.price);
//     case 'Sort By Price: Low to High':
//       return sorted.sort((a, b) => a.price - b.price);
//     default:
//       return sorted; // Default Sorting (by ID)
//   }
// };

// const SortBy = ({ onViewChange, onColumnsChange, onItemsChange, onSortChange }) => {
//   const [viewMode, setViewMode] = useState('grid'); // grid, card, list
//   const [columns, setColumns] = useState(5); // 5 or 6 columns
//   const [itemsToShow, setItemsToShow] = useState(12); // 12, 24, 36, or 'All'
//   const [sortOption, setSortOption] = useState('Default Sorting');
//   const [isColumnsOpen, setIsColumnsOpen] = useState(false);
//   const [isShowOpen, setIsShowOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);

//   const handleViewToggle = () => {
//     const newViewMode = viewMode === 'grid' ? 'card' : 'grid';
//     setViewMode(newViewMode);
//     onViewChange(newViewMode);
//   };

//   const handleListView = () => {
//     setViewMode('list');
//     onViewChange('list');
//   };

//   const handleColumnsChange = (numColumns) => {
//     setColumns(numColumns);
//     onColumnsChange(numColumns);
//     setIsColumnsOpen(false);
//   };

//   const handleItemsChange = (numItems) => {
//     setItemsToShow(numItems);
//     onItemsChange(numItems);
//     setIsShowOpen(false);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     onSortChange(sortProducts(dummyProducts, option));
//     setIsSortOpen(false);
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
//       {/* Left Section: View Toggle, List View, Columns Dropdown */}
//       <div className="flex items-center space-x-4 mb-4 md:mb-0">
//         {/* Grid/Card Toggle */}
//         <button
//           onClick={handleViewToggle}
//           className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//         >
//           <FaTh className="text-gray-600" />
//           <span>{viewMode === 'grid' ? 'Grid' : 'Card'}</span>
//         </button>

//         {/* List View */}
//         <button
//           onClick={handleListView}
//           className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//         >
//           <FaList className="text-gray-600" />
//           <span>List</span>
//         </button>

//         {/* Columns Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsColumnsOpen(!isColumnsOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <FaBars className="text-gray-600" />
//             <span>{columns} Columns Grid</span>
//           </button>
//           {isColumnsOpen && (
//             <div className="absolute top-12 left-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleColumnsChange(5)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 5 Column Grid
//               </button>
//               <button
//                 onClick={() => handleColumnsChange(6)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 6 Column Grid
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Section: Show and Sort By Dropdowns */}
//       <div className="flex items-center space-x-4">
//         {/* Show Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsShowOpen(!isShowOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <span>Show {itemsToShow}</span>
//           </button>
//           {isShowOpen && (
//             <div className="absolute top-12 right-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleItemsChange(12)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 12
//               </button>
//               <button
//                 onClick={() => handleItemsChange(24)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 24
//               </button>
//               <button
//                 onClick={() => handleItemsChange(36)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 36
//               </button>
//               <button
//                 onClick={() => handleItemsChange('All')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 All
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Sort By Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsSortOpen(!isSortOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <span>{sortOption}</span>
//           </button>
//           {isSortOpen && (
//             <div className="absolute top-12 right-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleSortChange('Default Sorting')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Default Sorting
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Popularity')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Popularity
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Average Rating')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Average Rating
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Latest')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Latest
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Price: High to Low')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Price: High to Low
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Price: Low to High')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Price: Low to High
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default SortBy;
// import React, { useState } from 'react';
// import { LayoutGrid, PanelLeft, List } from 'lucide-react';

// // Dummy data (assuming 36 products are available)
// const dummyProducts = [
//   { id: 1, name: 'Wireless Headphones', price: 59.99, image: 'https://via.placeholder.com/200x200?text=Headphones', category: 'Electronics', rating: 4.5, popularity: 80, date: '2025-01-15' },
//   { id: 2, name: 'Smartphone', price: 499.99, image: 'https://via.placeholder.com/200x200?text=Smartphone', category: 'Electronics', rating: 4.8, popularity: 90, date: '2025-02-10' },
//   { id: 3, name: 'Running Shoes', price: 79.99, image: 'https://via.placeholder.com/200x200?text=Shoes', category: 'Footwear', rating: 4.2, popularity: 60, date: '2025-03-01' },
//   { id: 4, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/200x200?text=Laptop', category: 'Electronics', rating: 4.7, popularity: 85, date: '2025-04-20' },
//   { id: 5, name: 'Smartwatch', price: 199.99, image: 'https://via.placeholder.com/200x200?text=Smartwatch', category: 'Electronics', rating: 4.3, popularity: 70, date: '2025-05-01' },
//   { id: 6, name: 'Camera', price: 299.99, image: 'https://via.placeholder.com/200x200?text=Camera', category: 'Camera & Drone', rating: 4.6, popularity: 75, date: '2025-05-10' },
//   // ... (assuming 36 products in total)
// ];

// // Sorting logic
// const sortProducts = (products, sortOption) => {
//   const sorted = [...products];
//   switch (sortOption) {
//     case 'Sort By Popularity':
//       return sorted.sort((a, b) => b.popularity - a.popularity);
//     case 'Sort By Average Rating':
//       return sorted.sort((a, b) => b.rating - a.rating);
//     case 'Sort By Latest':
//       return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
//     case 'Sort By Price: High to Low':
//       return sorted.sort((a, b) => b.price - a.price);
//     case 'Sort By Price: Low to High':
//       return sorted.sort((a, b) => a.price - b.price);
//     default:
//       return sorted; // Default Sorting (by ID)
//   }
// };

// const SortBy = ({ onViewChange, onColumnsChange, onItemsChange, onSortChange }) => {
//   const [viewMode, setViewMode] = useState('grid'); // grid, card, list
//   const [columns, setColumns] = useState(5); // 5 or 6 columns
//   const [itemsToShow, setItemsToShow] = useState(12); // 12, 24, 36, or 'All'
//   const [sortOption, setSortOption] = useState('Default Sorting');
//   const [isColumnsOpen, setIsColumnsOpen] = useState(false);
//   const [isShowOpen, setIsShowOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);

//   const handleViewToggle = () => {
//     const newViewMode = viewMode === 'grid' ? 'card' : 'grid';
//     setViewMode(newViewMode);
//     onViewChange(newViewMode);
//   };

//   const handleListView = () => {
//     setViewMode('list');
//     onViewChange('list');
//   };

//   const handleColumnsChange = (numColumns) => {
//     setColumns(numColumns);
//     onColumnsChange(numColumns);
//     setIsColumnsOpen(false);
//   };

//   const handleItemsChange = (numItems) => {
//     setItemsToShow(numItems);
//     onItemsChange(numItems);
//     setIsShowOpen(false);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     onSortChange(sortProducts(dummyProducts, option));
//     setIsSortOpen(false);
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
//       {/* Left Section: View Toggle, List View, Columns Dropdown */}
//       <div className="flex items-center space-x-4 mb-4 md:mb-0">
//         {/* Grid/Card Toggle */}
//         <button
//           onClick={handleViewToggle}
//           className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//         >
//           <LayoutGrid className="text-gray-600 w-4 h-4" />
//           <span>{viewMode === 'grid' ? 'Grid' : 'Card'}</span>
//         </button>

//         {/* List View */}
//         <button
//           onClick={handleListView}
//           className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//         >
//           <List className="text-gray-600 w-4 h-4" />
//           <span>List</span>
//         </button>

//         {/* Columns Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsColumnsOpen(!isColumnsOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <PanelLeft className="text-gray-600 w-4 h-4" />
//             <span>{columns} Columns Grid</span>
//           </button>
//           {isColumnsOpen && (
//             <div className="absolute top-12 left-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleColumnsChange(5)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 5 Column Grid
//               </button>
//               <button
//                 onClick={() => handleColumnsChange(6)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 6 Column Grid
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Section: Show and Sort By Dropdowns */}
//       <div className="flex items-center space-x-4">
//         {/* Show Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsShowOpen(!isShowOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <span>Show {itemsToShow}</span>
//           </button>
//           {isShowOpen && (
//             <div className="absolute top-12 right-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleItemsChange(12)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 12
//               </button>
//               <button
//                 onClick={() => handleItemsChange(24)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 24
//               </button>
//               <button
//                 onClick={() => handleItemsChange(36)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 36
//               </button>
//               <button
//                 onClick={() => handleItemsChange('All')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 All
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Sort By Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsSortOpen(!isSortOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <span>{sortOption}</span>
//           </button>
//           {isSortOpen && (
//             <div className="absolute top-12 right-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleSortChange('Default Sorting')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Default Sorting
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Popularity')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Popularity
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Average Rating')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Average Rating
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Latest')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Latest
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Price: High to Low')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Price: High to Low
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Price: Low to High')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Price: Low to High
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SortBy;
// import React, { useState } from 'react';
// import { LayoutGrid, PanelLeft, List } from 'lucide-react';

// const SortBy = ({ onViewChange, onColumnsChange, onItemsChange, onSortChange, products }) => {
//   const [viewMode, setViewMode] = useState('grid'); // grid, card, list
//   const [columns, setColumns] = useState(5); // 5 or 6 columns
//   const [itemsToShow, setItemsToShow] = useState(12); // 12, 24, 36, or 'All'
//   const [sortOption, setSortOption] = useState('Default Sorting');
//   const [isColumnsOpen, setIsColumnsOpen] = useState(false);
//   const [isShowOpen, setIsShowOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);

//   const handleViewToggle = () => {
//     const newViewMode = viewMode === 'grid' ? 'card' : 'grid';
//     setViewMode(newViewMode);
//     onViewChange(newViewMode);
//   };

//   const handleListView = () => {
//     setViewMode('list');
//     onViewChange('list');
//   };

//   const handleColumnsChange = (numColumns) => {
//     setColumns(numColumns);
//     onColumnsChange(numColumns);
//     setIsColumnsOpen(false);
//   };

//   const handleItemsChange = (numItems) => {
//     setItemsToShow(numItems);
//     onItemsChange(numItems);
//     setIsShowOpen(false);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     let sortedProducts = [...products];
//     switch (option) {
//       case 'Sort By Popularity':
//         sortedProducts.sort((a, b) => b.popularity - a.popularity);
//         break;
//       case 'Sort By Average Rating':
//         sortedProducts.sort((a, b) => b.rating - a.rating);
//         break;
//       case 'Sort By Latest':
//         sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
//         break;
//       case 'Sort By Price: High to Low':
//         sortedProducts.sort((a, b) => b.price - a.price);
//         break;
//       case 'Sort By Price: Low to High':
//         sortedProducts.sort((a, b) => a.price - b.price);
//         break;
//       default:
//         break;
//     }
//     onSortChange(sortedProducts);
//     setIsSortOpen(false);
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
//       {/* Left Section: View Toggle, List View, Columns Dropdown */}
//       <div className="flex items-center space-x-4 mb-4 md:mb-0">
//         {/* Grid/Card Toggle */}
//         <button
//           onClick={handleViewToggle}
//           className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//         >
//           <LayoutGrid className="text-gray-600 w-4 h-4" />
//           <span>{viewMode === 'grid' ? 'Grid' : 'Card'}</span>
//         </button>

//         {/* List View */}
//         <button
//           onClick={handleListView}
//           className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//         >
//           <List className="text-gray-600 w-4 h-4" />
//           <span>List</span>
//         </button>

//         {/* Columns Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsColumnsOpen(!isColumnsOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <PanelLeft className="text-gray-600 w-4 h-4" />
//             <span>{columns} Columns Grid</span>
//           </button>
//           {isColumnsOpen && (
//             <div className="absolute top-12 left-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleColumnsChange(5)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 5 Column Grid
//               </button>
//               <button
//                 onClick={() => handleColumnsChange(6)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 6 Column Grid
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Section: Show and Sort By Dropdowns */}
//       <div className="flex items-center space-x-4">
//         {/* Show Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsShowOpen(!isShowOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <span>Show {itemsToShow}</span>
//           </button>
//           {isShowOpen && (
//             <div className="absolute top-12 right-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleItemsChange(12)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 12
//               </button>
//               <button
//                 onClick={() => handleItemsChange(24)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 24
//               </button>
//               <button
//                 onClick={() => handleItemsChange(36)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 36
//               </button>
//               <button
//                 onClick={() => handleItemsChange('All')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 All
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Sort By Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsSortOpen(!isSortOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <span>{sortOption}</span>
//           </button>
//           {isSortOpen && (
//             <div className="absolute top-12 right-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleSortChange('Default Sorting')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Default Sorting
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Popularity')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Popularity
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Average Rating')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Average Rating
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Latest')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Latest
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Price: High to Low')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Price: High to Low
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Price: Low to High')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Price: Low to High
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SortBy;

// import React, { useState } from 'react';
// import { LayoutGrid, PanelLeft, List } from 'lucide-react';

// const SortBy = ({ onViewChange, onColumnsChange, onItemsChange, onSortChange, products }) => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [columns, setColumns] = useState(5);
//   const [itemsToShow, setItemsToShow] = useState(12);
//   const [sortOption, setSortOption] = useState('Default Sorting');
//   const [isColumnsOpen, setIsColumnsOpen] = useState(false);
//   const [isShowOpen, setIsShowOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);

//   const handleViewToggle = () => {
//     const newViewMode = viewMode === 'grid' ? 'card' : 'grid';
//     setViewMode(newViewMode);
//     onViewChange(newViewMode);
//   };

//   const handleListView = () => {
//     setViewMode('list');
//     onViewChange('list');
//   };

//   const handleColumnsChange = (numColumns) => {
//     setColumns(numColumns);
//     onColumnsChange(numColumns);
//     setIsColumnsOpen(false);
//   };

//   const handleItemsChange = (numItems) => {
//     setItemsToShow(numItems);
//     onItemsChange(numItems);
//     setIsShowOpen(false);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     let sortedProducts = [...products];
//     switch (option) {
//       case 'Sort By Popularity':
//         sortedProducts.sort((a, b) => b.popularity - a.popularity);
//         break;
//       case 'Sort By Average Rating':
//         sortedProducts.sort((a, b) => b.rating - a.rating);
//         break;
//       case 'Sort By Latest':
//         sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
//         break;
//       case 'Sort By Price: High to Low':
//         sortedProducts.sort((a, b) => b.price - a.price);
//         break;
//       case 'Sort By Price: Low to High':
//         sortedProducts.sort((a, b) => a.price - b.price);
//         break;
//       default:
//         break;
//     }
//     onSortChange(sortedProducts);
//     setIsSortOpen(false);
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
//       {/* Left Section: View Toggle, List View, Columns Dropdown */}
//       <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
//         {/* Grid/Card Toggle */}
//         <button
//           onClick={handleViewToggle}
//           className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//         >
//           <LayoutGrid className="text-gray-600 w-4 h-4" />
//           <span>{viewMode === 'grid' ? 'Grid' : 'Card'}</span>
//         </button>

//         {/* List View */}
//         <button
//           onClick={handleListView}
//           className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//         >
//           <List className="text-gray-600 w-4 h-4" />
//           <span>List</span>
//         </button>

//         {/* Columns Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsColumnsOpen(!isColumnsOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <PanelLeft className="text-gray-600 w-4 h-4" />
//             <span>{columns} Columns Grid</span>
//           </button>
//           {isColumnsOpen && (
//             <div className="absolute top-12 left-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleColumnsChange(5)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 5 Column Grid
//               </button>
//               <button
//                 onClick={() => handleColumnsChange(6)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 6 Column Grid
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Section: Show and Sort By Dropdowns */}
//       <div className="flex flex-wrap gap-2">
//         {/* Show Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsShowOpen(!isShowOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <span>Show {itemsToShow}</span>
//           </button>
//           {isShowOpen && (
//             <div className="absolute top-12 right-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleItemsChange(12)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 12
//               </button>
//               <button
//                 onClick={() => handleItemsChange(24)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 24
//               </button>
//               <button
//                 onClick={() => handleItemsChange(36)}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 36
//               </button>
//               <button
//                 onClick={() => handleItemsChange('All')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 All
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Sort By Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsSortOpen(!isSortOpen)}
//             className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100"
//           >
//             <span>{sortOption}</span>
//           </button>
//           {isSortOpen && (
//             <div className="absolute top-12 right-0 bg-white border rounded shadow-lg z-10">
//               <button
//                 onClick={() => handleSortChange('Default Sorting')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Default Sorting
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Popularity')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Popularity
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Average Rating')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Average Rating
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Latest')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Latest
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Price: High to Low')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Price: High to Low
//               </button>
//               <button
//                 onClick={() => handleSortChange('Sort By Price: Low to High')}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Sort By Price: Low to High
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SortBy;

import React, { useState } from 'react';
import { LayoutGrid, PanelLeft, List } from 'lucide-react';

const SortBy = ({ onViewChange, onColumnsChange, onItemsChange, onSortChange, products }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [columns, setColumns] = useState(4); // Default to 4 columns
  const [itemsToShow, setItemsToShow] = useState(12);
  const [sortOption, setSortOption] = useState('Default Sorting');
  const [isColumnsOpen, setIsColumnsOpen] = useState(false);
  const [isShowOpen, setIsShowOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleGridView = () => {
    setViewMode('grid');
    onViewChange('grid');
  };

  const handleListView = () => {
    setViewMode('list');
    onViewChange('list');
  };

  const handleColumnsChange = (numColumns) => {
    setColumns(numColumns);
    onColumnsChange(numColumns);
    setIsColumnsOpen(false);
  };

  const handleItemsChange = (numItems) => {
    setItemsToShow(numItems);
    onItemsChange(numItems);
    setIsShowOpen(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedProducts = [...products];
    switch (option) {
      case 'Sort By Popularity':
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'Sort By Average Rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'Sort By Latest':
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'Sort By Price: High to Low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Sort By Price: Low to High':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    onSortChange(sortedProducts);
    setIsSortOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Left Section: Grid View, List View, Columns Dropdown */}
      <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-0">
        {/* Grid View */}
        <button
          onClick={handleGridView}
          className="flex items-center space-x-2 px-3 py-2 border rounded hover:bg-gray-100 text-sm sm:text-base"
        >
          <LayoutGrid className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
          <span>Grid</span>
        </button>

        {/* List View */}
        <button
          onClick={handleListView}
          className="flex items-center space-x-2 px-3 py-2 border rounded hover:bg-gray-100 text-sm sm:text-base"
        >
          <List className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
          <span>List</span>
        </button>

        {/* Columns Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsColumnsOpen(!isColumnsOpen)}
            className="flex items-center space-x-2 px-3 py-2 border rounded hover:bg-gray-100 text-sm sm:text-base"
          >
            <PanelLeft className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
            <span>{columns} Columns Grid</span>
          </button>
          {isColumnsOpen && (
            <div className="absolute top-10 sm:top-12 left-0 bg-white border rounded shadow-lg z-10">
              <button
                onClick={() => handleColumnsChange(4)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                4 Columns Grid
              </button>
              <button
                onClick={() => handleColumnsChange(5)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                5 Columns Grid
              </button>
              {/* <button
                onClick={() => handleColumnsChange(6)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                6 Columns Grid
              </button> */}
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Show and Sort By Dropdowns */}
      <div className="flex flex-wrap gap-2">
        {/* Show Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsShowOpen(!isShowOpen)}
            className="flex items-center space-x-2 px-3 py-2 border rounded hover:bg-gray-100 text-sm sm:text-base"
          >
            <span>Show {itemsToShow}</span>
          </button>
          {isShowOpen && (
            <div className="absolute top-10 sm:top-12 right-0 bg-white border rounded shadow-lg z-10">
              <button
                onClick={() => handleItemsChange(12)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                12
              </button>
              <button
                onClick={() => handleItemsChange(24)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                24
              </button>
              <button
                onClick={() => handleItemsChange(36)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                36
              </button>
              <button
                onClick={() => handleItemsChange('All')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                All
              </button>
            </div>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center space-x-2 px-3 py-2 border rounded hover:bg-gray-100 text-sm sm:text-base"
          >
            <span>{sortOption}</span>
          </button>
          {isSortOpen && (
            <div className="absolute top-10 sm:top-12 right-0 bg-white border rounded shadow-lg z-10">
              <button
                onClick={() => handleSortChange('Default Sorting')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                Default Sorting
              </button>
              <button
                onClick={() => handleSortChange('Sort By Popularity')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                Sort By Popularity
              </button>
              <button
                onClick={() => handleSortChange('Sort By Average Rating')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                Sort By Average Rating
              </button>
              <button
                onClick={() => handleSortChange('Sort By Latest')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                Sort By Latest
              </button>
              <button
                onClick={() => handleSortChange('Sort By Price: High to Low')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                Sort By Price: High to Low
              </button>
              <button
                onClick={() => handleSortChange('Sort By Price: Low to High')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm sm:text-base"
              >
                Sort By Price: Low to High
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortBy;