// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaShoppingCart, FaPhone, FaChevronDown, FaChartBar, FaHome, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
// import { UserContext } from './context/UserContext';
// import SignInForm from './Navbar/Signin';
// import FavoritesSidebar from './Navbar/FavoritesSidebar';
// import CompareSidebar from './Navbar/CompareSidebar';
// import CartSidebar from './Navbar/CartSidebar';
// import { getProducts } from '../utils/api';

// // Utility function to get data from local storage
// const getFromStorage = (key) => {
//   try {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : [];
//   } catch (error) {
//     console.error(`Error fetching ${key} from localStorage:`, error);
//     return [];
//   }
// };

// // Back Button Component
// const BackButton = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Don't show back button on home page
//   if (location.pathname === '/') return null;

//   return (
//     <div className="md:hidden bg-[#1976D2] text-white">
//       <div className="container mx-auto px-4 py-3">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-white hover:text-gray-100"
//         >
//           <FaArrowLeft className="text-xl mr-2" />
//           <span className="text-sm font-medium">Back to Previous Page</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, setUser, logout } = useContext(UserContext);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isBudgetOpen, setIsBudgetOpen] = useState(false);
//   const [isOccasionOpen, setIsOccasionOpen] = useState(false);
//   const [isBrandsOpen, setIsBrandsOpen] = useState(false);
//   const [isSignInOpen, setIsSignInOpen] = useState(false);
//   const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
//   const [isCompareOpen, setIsCompareOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [favoritesCount, setFavoritesCount] = useState(0);
//   const [compareCount, setCompareCount] = useState(0);
//   const [cartCount, setCartCount] = useState(0);
//   const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
//   const [dynamicBudgetOptions, setDynamicBudgetOptions] = useState([]);
//   const [dynamicOccasionOptions, setDynamicOccasionOptions] = useState([]);
//   const [dynamicBrandsOptions, setDynamicBrandsOptions] = useState([]);
//   const dropdownTimeoutRef = useRef(null);

//   const budgetRef = useRef(null);
//   const occasionRef = useRef(null);
//   const brandsRef = useRef(null);

//   // Use user ID from UserContext
//   const userId = user?.id || 'default-user';
//   const wishlistKey = `wishlist_${userId}`;
//   const compareKey = `compare_${userId}`;
//   const cartKey = `cart_${userId}`;

//   // Fetch counts from localStorage
//   const fetchCounts = () => {
//     const favorites = getFromStorage(wishlistKey);
//     const compareList = getFromStorage(compareKey);
//     const cart = getFromStorage(cartKey);

//     setFavoritesCount(favorites.length);
//     setCompareCount(compareList.length);
//     setCartCount(cart.length);
//   };

//   // Fetch counts on mount and when user or location changes
//   useEffect(() => {
//     fetchCounts();
//   }, [user, location, wishlistKey, compareKey, cartKey]);

//   // Fetch products and generate dynamic budget options
//   useEffect(() => {
//     const fetchAndGenerateBudgetOptions = async () => {
//       try {
//         const products = await getProducts();
//         if (products && products.length > 0) {
//           const prices = products.map(product => product.price).filter(price => typeof price === 'number');
//           if (prices.length > 0) {
//             const minPrice = Math.min(...prices);
//             const maxPrice = Math.max(...prices);
//             const ranges = generatePriceRanges(minPrice, maxPrice);
//             setDynamicBudgetOptions(ranges);
//           } else {
//             setDynamicBudgetOptions(["All Prices"]);
//           }

//           const categories = Array.from(new Set(products.map(product => product.category))).sort();
//           setDynamicOccasionOptions(categories);
//         } else {
//           setDynamicBudgetOptions(["All Prices"]);
//           setDynamicOccasionOptions(["All Occasions"]);
//           setDynamicBrandsOptions(["All Brands"]);
//         }
//       } catch (error) {
//         console.error("Error fetching products for options:", error);
//         setDynamicBudgetOptions(["All Prices"]);
//         setDynamicOccasionOptions(["All Occasions"]);
//         setDynamicBrandsOptions(["All Brands"]);
//       }
//     };

//     const dummyBrands = [
//       "Fjallraven", "John", "WD", "Samsung", "SanDisk",
//       "Acer", "BIYLACLESEN", "MBJ", "Rain", "Opna"
//     ];
//     setDynamicBrandsOptions(dummyBrands);
//     fetchAndGenerateBudgetOptions();
//   }, []);

//   const generatePriceRanges = (min, max) => {
//     const ranges = [];
//     let lowerBound = 0;
//     const step = 100;

//     while (lowerBound <= max) {
//       const upperBound = lowerBound + step - 1;
//       if (lowerBound === 0) {
//         ranges.push(`0 - ${upperBound}`);
//       } else {
//         ranges.push(`${lowerBound} - ${upperBound}`);
//       }
//       lowerBound += step;
//     }
//     if (ranges[ranges.length - 1].split(' - ')[1] < max) {
//       ranges.push(`${lowerBound} & Above`);
//     }
//     if (max > parseInt(ranges[ranges.length - 1].split(' - ')[0]) && !ranges[ranges.length - 1].includes('& Above')) {
//       ranges.push(`${parseInt(ranges[ranges.length - 2].split(' - ')[0]) + step} & Above`);
//       ranges.splice(ranges.length - 2, 1);
//     }
//     return ranges;
//   };

//   useEffect(() => {
//     setIsSidebarOpen(false);
//     setIsBudgetOpen(false);
//     setIsOccasionOpen(false);
//     setIsBrandsOpen(false);
//     setIsFavoritesOpen(false);
//     setIsCompareOpen(false);
//     setIsSignInOpen(false);
//   }, [location]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (budgetRef.current && !budgetRef.current.contains(event.target)) {
//         setIsBudgetOpen(false);
//       }
//       if (occasionRef.current && !occasionRef.current.contains(event.target)) {
//         setIsOccasionOpen(false);
//       }
//       if (brandsRef.current && !brandsRef.current.contains(event.target)) {
//         setIsBrandsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleBudget = () => {
//     setIsBudgetOpen(!isBudgetOpen);
//   };

//   const toggleOccasion = () => {
//     setIsOccasionOpen(!isOccasionOpen);
//   };

//   const toggleBrands = () => {
//     setIsBrandsOpen(!isBrandsOpen);
//   };

//   const handleBudgetMouseEnter = () => {
//     clearTimeout(dropdownTimeoutRef.current);
//     setIsBudgetOpen(true);
//   };

//   const handleBudgetMouseLeave = () => {
//     dropdownTimeoutRef.current = setTimeout(() => {
//       setIsBudgetOpen(false);
//     }, 200);
//   };

//   const openSignIn = () => setIsSignInOpen(true);
//   const closeSignIn = () => setIsSignInOpen(false);

//   const handleLogout = () => {
//     console.log('Logging out, clearing user data from localStorage.');
//     logout();
//     navigate('/');
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       console.log('Searching for:', searchTerm);
//       navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
//     }
//   };

//   const categories = [
//     "Apparels & Fashion",
//     "Bags & Luggage",
//     "By Budget",
//     "Camera & Drone",
//     "Car & Bike Accessories",
//     "Cell Phones",
//     "Clocks & Watches",
//     "Combo Gift Set",
//     "Computers",
//     "Daily Deals",
//     "Desktop Items",
//     "Diaries & Planners",
//     "Doctor's Utility",
//   ];

//   const sidebarVariants = {
//     hidden: { x: '-100%' },
//     visible: { 
//       x: 0,
//       transition: { 
//         duration: 0.3,
//         ease: 'easeInOut',
//         when: 'beforeChildren',
//         staggerChildren: 0.05
//       }
//     },
//     exit: { 
//       x: '-100%',
//       transition: { 
//         duration: 0.3,
//         ease: 'easeInOut'
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { 
//       opacity: 1, 
//       x: 0,
//       transition: { 
//         duration: 0.3,
//         ease: 'easeOut'
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       x: -20,
//       transition: { 
//         duration: 0.2,
//         ease: 'easeIn'
//       }
//     }
//   };

//   return (
//     <div className="font-poppins font-medium text-[#212121]">
//       {/* Desktop Navbar */}
//       <div className="hidden md:block">
//         {/* Top Navbar */}
//         <div className="bg-white shadow-md">
//           <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 lg:px-8 gap-2 sm:gap-4 md:gap-4">
//             {/* Logo and Hamburger */}
//             <div className="flex items-center justify-between w-full sm:w-auto">
//               <Link to="/" className="flex flex-col items-center">
//                 <div className="flex items-center space-x-1 sm:space-x-1.5">
//                   <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#000000]">X</span>
//                   <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#212121]">-</span>
//                   <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#1976D2]">STORE</span>
//                 </div>
//                 <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-[#757575] mt-0.5 sm:mt-1"></span>
//               </Link>
//               <button
//                 onClick={toggleSidebar}
//                 className="sm:hidden text-[#212121] hover:text-[#1976D2]"
//                 aria-label="Toggle Sidebar"
//               >
//                 {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//               </button>
//             </div>

//             {/* Search Bar */}
//             <div className="flex-grow w-full sm:w-auto mx-0 sm:mx-3 md:mx-4 lg:mx-6">
//               <form onSubmit={handleSearch} className="relative w-full max-w-[260px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[400px] xl:max-w-[500px] mx-auto sm:mx-0">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-10 md:pl-12 pr-4 sm:pr-5 md:pr-6 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-xs sm:text-sm md:text-base font-poppins font-medium text-[#212121] placeholder:truncate placeholder:text-[#757575]"
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 sm:px-4 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-r-md"
//                 >
//                   <FaSearch className="text-sm sm:text-base md:text-lg" />
//                 </button>
//               </form>
//             </div>

//             {/* Contact and Icons */}
//             <div className="flex items-center space-x-1 sm:space-x-3 md:space-x-3 lg:space-x-4">
//               <div className="hidden md:flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs md:text-sm lg:text-base border border-[#E0E0E0] rounded-md px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
//                 <FaPhone className="text-[#1976D2] text-xs sm:text-sm md:text-base lg:text-lg" />
//                 <span className="text-[#757575] font-medium hidden sm:inline">Need help? Call us:</span>
//                 <span className="text-[#212121] font-medium sm:ml-1">+91 95035 54800</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 {user ? (
//                   <button
//                     onClick={handleLogout}
//                     className="flex flex-col items-center text-[#757575] hover:text-[#1976D2]"
//                     title="Logout"
//                   >
//                     <FaUser className="text-base sm:text-lg md:text-xl lg:text-2xl" />
//                     <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">Logout</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={openSignIn}
//                     className="flex flex-col items-center text-[#757575] hover:text-[#1976D2]"
//                     title="Sign In"
//                   >
//                     <FaUser className="text-base sm:text-lg md:text-xl lg:text-2xl" />
//                     <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">Sign In</span>
//                   </button>
//                 )}
//               </div>
//               <button
//                 type="button"
//                 className="flex flex-col items-center text-[#757575] hover:text-[#1976D2] relative focus:outline-none"
//                 onClick={() => setIsCompareOpen(true)}
//               >
//                 <FaChartBar className="text-base sm:text-lg md:text-xl lg:text-2xl" />
//                 <span className="absolute -top-1 -right-1 sm:-right-1 md:-right-1.5 bg-[#1976D2] text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full w-4 sm:w-4.5 md:w-5 lg:w-5.5 h-4 sm:h-4.5 md:h-5 lg:h-5.5 flex items-center justify-center">
//                   {compareCount}
//                 </span>
//                 <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">Comparison</span>
//               </button>
//               <button
//                 type="button"
//                 className="flex flex-col items-center text-[#757575] hover:text-[#1976D2] relative focus:outline-none"
//                 onClick={() => setIsFavoritesOpen(true)}
//               >
//                 <FaHeart className="text-base sm:text-lg md:text-xl lg:text-2xl" />
//                 <span className="absolute -top-1 -right-1 sm:-right-1 md:-right-1.5 bg-[#1976D2] text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full w-4 sm:w-4.5 md:w-5 lg:w-5.5 h-4 sm:h-4.5 md:h-5 lg:h-5.5 flex items-center justify-center">
//                   {favoritesCount}
//                 </span>
//                 <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">Favorites</span>
//               </button>
//               <button
//                 type="button"
//                 className="flex flex-col items-center text-[#757575] hover:text-[#1976D2] relative focus:outline-none"
//                 onClick={() => setIsCartSidebarOpen(true)}
//               >
//                 <FaShoppingCart className="text-base sm:text-lg md:text-xl lg:text-2xl" />
//                 <span className="absolute -top-1 -right-1 sm:-right-1 md:-right-1.5 bg-[#1976D2] text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full w-4 sm:w-4.5 md:w-5 lg:w-5.5 h-4 sm:h-4.5 md:h-5 lg:h-5.5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//                 <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">My Cart</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Navigation */}
//         <div className="bg-white text-[#212121] border-t border-[#E0E0E0]">
//           <div className="container mx-auto flex flex-wrap items-center justify-between py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 lg:px-8 gap-2 sm:gap-4 md:gap-4">
//             <div className="relative" ref={budgetRef}>
//               <button
//                 onClick={toggleSidebar}
//                 className="flex items-center bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded text-sm sm:text-base md:text-lg font-poppins font-medium"
//               >
//                 <FaBars className="mr-1 sm:mr-2 md:mr-2.5 text-sm sm:text-base md:text-lg" />
//                 Browse Categories
//               </button>
//             </div>

//             <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-4 gap-y-1 sm:gap-y-3 text-sm sm:text-base md:text-lg font-poppins font-medium">
//               <NavLink to="/" className={({ isActive }) => isActive ? "text-[#1976D2] font-medium" : "text-[#212121] hover:text-[#1976D2]"}>Home</NavLink>
//               <NavLink to="/aboutus" className={({ isActive }) => isActive ? "text-[#1976D2] font-medium" : "text-[#212121] hover:text-[#1976D2]"}>About Us</NavLink>
//               <NavLink to="/shop" className={({ isActive }) => isActive ? "text-[#1976D2] font-medium" : "text-[#212121] hover:text-[#1976D2]"}>Shop</NavLink>

//               <div className="relative" ref={budgetRef}
//                 onMouseEnter={handleBudgetMouseEnter}
//                 onMouseLeave={handleBudgetMouseLeave}
//               >
//                 <button
//                   onClick={toggleBudget}
//                   className="flex items-center text-[#212121] hover:text-[#1976D2] font-poppins font-medium"
//                 >
//                   By Budget
//                   <FaChevronDown className="ml-1 sm:ml-1.5 md:ml-2 text-sm sm:text-base md:text-lg" />
//                 </button>
//                 {isBudgetOpen && (
//                   <div
//                     onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
//                     onMouseLeave={handleBudgetMouseLeave}
//                     className="absolute bg-white text-[#212121] shadow-lg rounded mt-2 sm:mt-2.5 md:mt-3 w-28 sm:w-32 md:w-36 lg:w-40 z-10"
//                   >
//                     {dynamicBudgetOptions.map((option, index) => (
//                       <Link
//                         key={index}
//                         to={`/shop?priceRange=${encodeURIComponent(option)}`}
//                         className="block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins font-medium text-[#212121] hover:text-[#1976D2]"
//                         onClick={() => setIsBudgetOpen(false)}
//                       >
//                         {option}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative" ref={occasionRef}
//                 onMouseEnter={() => setIsOccasionOpen(true)}
//                 onMouseLeave={() => dropdownTimeoutRef.current = setTimeout(() => setIsOccasionOpen(false), 200)}
//               >
//                 <button
//                   onClick={toggleOccasion}
//                   className="flex items-center text-[#212121] hover:text-[#1976D2] font-poppins font-medium"
//                 >
//                   By Occasion
//                   <FaChevronDown className="ml-1 sm:ml-1.5 md:ml-2 text-sm sm:text-base md:text-lg" />
//                 </button>
//                 {isOccasionOpen && (
//                   <div
//                     onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
//                     onMouseLeave={handleBudgetMouseLeave}
//                     className="absolute bg-white text-[#212121] shadow-lg rounded mt-2 sm:mt-2.5 md:mt-3 w-28 sm:w-32 md:w-36 lg:w-40 z-10"
//                   >
//                     {dynamicOccasionOptions.map((option, index) => (
//                       <Link
//                         key={index}
//                         to={`/shop?occasion=${encodeURIComponent(option)}`}
//                         className="block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins font-medium text-[#212121] hover:text-[#1976D2]"
//                         onClick={() => setIsOccasionOpen(false)}
//                       >
//                         {option}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative" ref={brandsRef}>
//                 <button
//                   onClick={toggleBrands}
//                   onMouseEnter={() => setIsBrandsOpen(true)}
//                   onMouseLeave={() => dropdownTimeoutRef.current = setTimeout(() => setIsBrandsOpen(false), 200)}
//                   className="flex items-center text-[#212121] hover:text-[#1976D2] font-poppins font-medium"
//                 >
//                   By Brands
//                   <FaChevronDown className="ml-1 sm:ml-1.5 md:ml-2 text-sm sm:text-base md:text-lg" />
//                 </button>
//                 {isBrandsOpen && (
//                   <div
//                     onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
//                     onMouseLeave={handleBudgetMouseLeave}
//                     className="absolute bg-white text-[#212121] shadow-lg rounded mt-2 sm:mt-2.5 md:mt-3 w-28 sm:w-32 md:w-36 lg:w-40 z-10"
//                   >
//                     {dynamicBrandsOptions.map((option, index) => (
//                       <Link
//                         key={index}
//                         to={`/shop?brand=${encodeURIComponent(option)}`}
//                         className="block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins font-medium text-[#212121] hover:text-[#1976D2]"
//                         onClick={() => setIsBrandsOpen(false)}
//                       >
//                         {option}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#1976D2] font-medium" : "text-[#212121] hover:text-[#1976D2]"}>Contact Us</NavLink>
//             </div>

//             <div className="flex">
//               <NavLink to="/enquiry" className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded text-sm sm:text-base md:text-lg font-poppins font-medium">Enquiry</NavLink>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navbar */}
//       <div className="md:hidden">
//         {/* Mobile Top Bar */}
//         <div className="bg-white shadow-md">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex items-center justify-between">
//               {/* Logo */}
//               <Link to="/" className="flex items-center space-x-1">
//                 <span className="text-2xl font-medium text-[#000000]">X</span>
//                 <span className="text-base font-medium text-[#212121]">-</span>
//                 <span className="text-2xl font-medium text-[#1976D2]">STORE</span>
//               </Link>

//               {/* Mobile Icons */}
//               <div className="flex items-center space-x-4">
//                 {user ? (
//                   <button
//                     onClick={handleLogout}
//                     className="text-[#757575] hover:text-[#1976D2] flex flex-col items-center"
//                     title="Logout"
//                   >
//                     <FaUser className="text-xl" />
//                     <span className="text-xs mt-1">Logout</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={openSignIn}
//                     className="text-[#757575] hover:text-[#1976D2] flex flex-col items-center"
//                     title="Sign In"
//                   >
//                     <FaUser className="text-xl" />
//                     <span className="text-xs mt-1">Sign In</span>
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setIsCartSidebarOpen(true)}
//                   className="text-[#757575] hover:text-[#1976D2] relative flex flex-col items-center"
//                 >
//                   <FaShoppingCart className="text-xl" />
//                   {cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-[#1976D2] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {cartCount}
//                     </span>
//                   )}
//                   <span className="text-xs mt-1">Cart</span>
//                 </button>
//                 <button
//                   onClick={toggleSidebar}
//                   className="text-[#757575] hover:text-[#1976D2] flex flex-col items-center"
//                 >
//                   {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//                   <span className="text-xs mt-1">Menu</span>
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Search Bar */}
//             <div className="mt-3">
//               <form onSubmit={handleSearch} className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full py-2 pl-10 pr-4 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-sm"
//                 />
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#757575]" />
//                 <button
//                   type="submit"
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1976D2] hover:bg-[#1565C0] text-white px-4 py-2 rounded-r-md"
//                 >
//                   Search
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Back Button for Mobile - Now below navbar */}
//         <BackButton />

//         {/* Mobile Bottom Navigation */}
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] z-10">
//           <div className="flex items-center justify-around py-2">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `flex flex-col items-center ${isActive ? 'text-[#1976D2]' : 'text-[#757575]'}`
//               }
//             >
//               <FaHome className="text-xl" />
//               <span className="text-xs mt-1">Home</span>
//             </NavLink>
//             <NavLink
//               to="/shop"
//               className={({ isActive }) =>
//                 `flex flex-col items-center ${isActive ? 'text-[#1976D2]' : 'text-[#757575]'}`
//               }
//             >
//               <FaShoppingBag className="text-xl" />
//               <span className="text-xs mt-1">Shop</span>
//             </NavLink>
//             <button
//               onClick={() => setIsFavoritesOpen(true)}
//               className="flex flex-col items-center text-[#757575] relative"
//             >
//               <FaHeart className="text-xl" />
//               {favoritesCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-[#1976D2] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {favoritesCount}
//                 </span>
//               )}
//               <span className="text-xs mt-1">Favorites</span>
//             </button>
//             <button
//               onClick={() => setIsCompareOpen(true)}
//               className="flex flex-col items-center text-[#757575] relative"
//             >
//               <FaChartBar className="text-xl" />
//               {compareCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-[#1976D2] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {compareCount}
//                 </span>
//               )}
//               <span className="text-xs mt-1">Compare</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <motion.div
//         className="fixed top-0 left-0 h-full w-[70%] sm:w-56 md:w-64 lg:w-72 bg-white shadow-lg z-20"
//         initial="hidden"
//         animate={isSidebarOpen ? "visible" : "hidden"}
//         exit="exit"
//         variants={sidebarVariants}
//       >
//         <div className="flex items-center justify-between p-3 border-b border-[#E0E0E0]">
//           <h2 className="text-sm font-poppins font-medium text-[#212121]">Menu</h2>
//           <button onClick={toggleSidebar} aria-label="Close Sidebar">
//             <FaTimes className="text-base text-[#212121]" />
//           </button>
//         </div>
//         <div className="p-3">
//           {/* Navigation Links */}
//           <div className="mb-4">
//             <motion.h3
//               className="font-poppins font-medium mb-2 text-sm text-[#212121]"
//               variants={itemVariants}
//             >
//               Navigation
//             </motion.h3>
//             <motion.div variants={itemVariants}>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) => isActive ? "block py-1.5 text-[#1976D2] font-medium text-xs font-poppins" : "block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium"}
//                 onClick={toggleSidebar}
//               >
//                 Home
//               </NavLink>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <NavLink
//                 to="/aboutus"
//                 className={({ isActive }) => isActive ? "block py-1.5 text-[#1976D2] font-medium text-xs font-poppins" : "block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium"}
//                 onClick={toggleSidebar}
//               >
//                 About Us
//               </NavLink>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <NavLink
//                 to="/shop"
//                 className={({ isActive }) => isActive ? "block py-1.5 text-[#1976D2] font-medium text-xs font-poppins" : "block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium"}
//                 onClick={toggleSidebar}
//               >
//                 Shop
//               </NavLink>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <NavLink
//                 to="/contact"
//                 className={({ isActive }) => isActive ? "block py-1.5 text-[#1976D2] font-medium text-xs font-poppins" : "block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium"}
//                 onClick={toggleSidebar}
//               >
//                 Contact Us
//               </NavLink>
//             </motion.div>
//           </div>

//           {/* Categories */}
//           <div>
//             <motion.h3
//               className="font-poppins font-medium mb-2 text-sm text-[#212121]"
//               variants={itemVariants}
//             >
//               Categories
//             </motion.h3>
//             {categories.map((category, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//               >
//                 <Link
//                   to={`/category/${category.replace(/\s/g, '-').toLowerCase()}`}
//                   className="block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium truncate"
//                   onClick={toggleSidebar}
//                 >
//                   {category}
//                 </Link>
//               </motion.div>
//             ))}
//           </div>

//           {/* Enquiry Button */}
//           <motion.div
//             className="mt-4"
//             variants={itemVariants}
//           >
//             <NavLink to="/enquiry" className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 py-1.5 rounded text-xs font-poppins font-medium w-full text-left block text-center">
//               Enquiry
//             </NavLink>
//           </motion.div>
//         </div>
//       </motion.div>

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-10"
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       {isSignInOpen && <SignInForm onClose={closeSignIn} />}
//       {isCompareOpen && (
//         <CompareSidebar
//           open={isCompareOpen}
//           onClose={() => setIsCompareOpen(false)}
//           compareList={getFromStorage(compareKey)}
//         />
//       )}
//       {isFavoritesOpen && (
//         <FavoritesSidebar
//           open={isFavoritesOpen}
//           onClose={() => setIsFavoritesOpen(false)}
//         />
//       )}
//       {isCartSidebarOpen && (
//         <CartSidebar
//           open={isCartSidebarOpen}
//           onClose={() => setIsCartSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Navbar;
















import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaShoppingCart, FaPhone, FaChevronDown, FaChartBar, FaHome, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { UserContext } from './context/UserContext';
import SignInForm from './Navbar/Signin';
import FavoritesSidebar from './Navbar/FavoritesSidebar';
import CompareSidebar from './Navbar/CompareSidebar';
import CartSidebar from './Navbar/CartSidebar';
import { getProducts } from '../utils/api';

// Utility function to get data from local storage
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error fetching ${key} from localStorage:`, error);
    return [];
  }
};

// Utility function to get current user from localStorage
const getCurrentUser = () => {
  try {
    const currentUserData = localStorage.getItem("currentUser");
    return currentUserData ? JSON.parse(currentUserData) : null;
  } catch (error) {
    console.error("Error accessing localStorage for currentUser:", error);
    return null;
  }
};

// Back Button Component
const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button on home page
  if (location.pathname === '/') return null;

  return (
    <div className="md:hidden bg-[#1976D2] text-white">
      <div className="container mx-auto px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-gray-100"
        >
          <FaArrowLeft className="text-xl mr-2" />
          <span className="text-sm font-medium">Back to Previous Page</span>
        </button>
      </div>
    </div>
  );
};

// User Profile Modal Component
const UserProfileModal = ({ open, onClose, user, cartItems, favoriteItems, compareItems }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#212121]">User Profile</h2>
          <button onClick={onClose} className="text-[#757575] hover:text-[#1976D2]">
            <FaTimes className="text-lg" />
          </button>
        </div>
        {user ? (
          <div className="space-y-4">
            {/* User Details */}
            <div>
              <h3 className="text-lg font-medium text-[#212121] mb-2">User Details</h3>
              <p className="text-sm text-[#757575]"><span className="font-medium">Name:</span> {user.name || 'N/A'}</p>
              <p className="text-sm text-[#757575]"><span className="font-medium">Email:</span> {user.email || 'N/A'}</p>
              <p className="text-sm text-[#757575]"><span className="font-medium">Role:</span> {user.role || 'N/A'}</p>
            </div>
            {/* Cart Items */}
            <div>
              <h3 className="text-lg font-medium text-[#212121] mb-2">Cart Items</h3>
              {cartItems.length > 0 ? (
                <ul className="space-y-2">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <img src={item.image || "https://placehold.co/50x50?text=No+Image"} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="text-sm text-[#212121] font-medium">{item.name || 'Unknown Product'}</p>
                        <p className="text-xs text-[#757575]">${item.price?.toFixed(2)} x {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#757575]">No items in cart.</p>
              )}
            </div>
            {/* Favorite Items */}
            <div>
              <h3 className="text-lg font-medium text-[#212121] mb-2">Favorites</h3>
              {favoriteItems.length > 0 ? (
                <ul className="space-y-2">
                  {favoriteItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <img src={item.image || "https://placehold.co/50x50?text=No+Image"} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="text-sm text-[#212121] font-medium">{item.name || 'Unknown Product'}</p>
                        <p className="text-xs text-[#757575]">${item.price?.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#757575]">No favorite items.</p>
              )}
            </div>
            {/* Compare Items */}
            <div>
              <h3 className="text-lg font-medium text-[#212121] mb-2">Comparison</h3>
              {compareItems.length > 0 ? (
                <ul className="space-y-2">
                  {compareItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <img src={item.image || "https://placehold.co/50x50?text=No+Image"} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="text-sm text-[#212121] font-medium">{item.name || 'Unknown Product'}</p>
                        <p className="text-xs text-[#757575]">${item.price?.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#757575]">No items in comparison.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#757575]">Unable to load profile.</p>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, logout } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [dynamicBudgetOptions, setDynamicBudgetOptions] = useState([]);
  const [dynamicOccasionOptions, setDynamicOccasionOptions] = useState([]);
  const [dynamicBrandsOptions, setDynamicBrandsOptions] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // New state for profile modal
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user data
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [favoriteItems, setFavoriteItems] = useState([]); // State for favorite items
  const [compareItems, setCompareItems] = useState([]); // State for compare items
  const dropdownTimeoutRef = useRef(null);

  const budgetRef = useRef(null);
  const occasionRef = useRef(null);
  const brandsRef = useRef(null);

  // Use user ID from UserContext
  const userId = user?.id || 'default-user';
  const wishlistKey = `wishlist_${userId}`;
  const compareKey = `compare_${userId}`;
  const cartKey = `cart_${userId}`;

  // Fetch counts and user data from localStorage
  const fetchCountsAndUser = () => {
    const favorites = getFromStorage(wishlistKey);
    const compareList = getFromStorage(compareKey);
    const cart = getFromStorage(cartKey);
    const userData = getCurrentUser();

    setFavoritesCount(favorites.length);
    setCompareCount(compareList.length);
    setCartCount(cart.length);
    setCurrentUser(userData);

    // Update state for profile modal
    setCartItems(cart);
    setFavoriteItems(favorites);
    setCompareItems(compareList);
  };

  // Fetch counts and user on mount and when user or location changes
  useEffect(() => {
    fetchCountsAndUser();
  }, [user, location, wishlistKey, compareKey, cartKey]);

  // Fetch products and generate dynamic budget options
  useEffect(() => {
    const fetchAndGenerateBudgetOptions = async () => {
      try {
        const products = await getProducts();
        if (products && products.length > 0) {
          const prices = products.map(product => product.price).filter(price => typeof price === 'number');
          if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const ranges = generatePriceRanges(minPrice, maxPrice);
            setDynamicBudgetOptions(ranges);
          } else {
            setDynamicBudgetOptions(["All Prices"]);
          }

          const categories = Array.from(new Set(products.map(product => product.category))).sort();
          setDynamicOccasionOptions(categories);
        } else {
          setDynamicBudgetOptions(["All Prices"]);
          setDynamicOccasionOptions(["All Occasions"]);
          setDynamicBrandsOptions(["All Brands"]);
        }
      } catch (error) {
        console.error("Error fetching products for options:", error);
        setDynamicBudgetOptions(["All Prices"]);
        setDynamicOccasionOptions(["All Occasions"]);
        setDynamicBrandsOptions(["All Brands"]);
      }
    };

    const dummyBrands = [
      "Fjallraven", "John", "WD", "Samsung", "SanDisk",
      "Acer", "BIYLACLESEN", "MBJ", "Rain", "Opna"
    ];
    setDynamicBrandsOptions(dummyBrands);
    fetchAndGenerateBudgetOptions();
  }, []);

  const generatePriceRanges = (min, max) => {
    const ranges = [];
    let lowerBound = 0;
    const step = 100;

    while (lowerBound <= max) {
      const upperBound = lowerBound + step - 1;
      if (lowerBound === 0) {
        ranges.push(`0 - ${upperBound}`);
      } else {
        ranges.push(`${lowerBound} - ${upperBound}`);
      }
      lowerBound += step;
    }
    if (ranges[ranges.length - 1].split(' - ')[1] < max) {
      ranges.push(`${lowerBound} & Above`);
    }
    if (max > parseInt(ranges[ranges.length - 1].split(' - ')[0]) && !ranges[ranges.length - 1].includes('& Above')) {
      ranges.push(`${parseInt(ranges[ranges.length - 2].split(' - ')[0]) + step} & Above`);
      ranges.splice(ranges.length - 2, 1);
    }
    return ranges;
  };

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsBudgetOpen(false);
    setIsOccasionOpen(false);
    setIsBrandsOpen(false);
    setIsFavoritesOpen(false);
    setIsCompareOpen(false);
    setIsSignInOpen(false);
    setIsProfileModalOpen(false); // Close profile modal on route change
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (budgetRef.current && !budgetRef.current.contains(event.target)) {
        setIsBudgetOpen(false);
      }
      if (occasionRef.current && !occasionRef.current.contains(event.target)) {
        setIsOccasionOpen(false);
      }
      if (brandsRef.current && !brandsRef.current.contains(event.target)) {
        setIsBrandsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleBudget = () => {
    setIsBudgetOpen(!isBudgetOpen);
  };

  const toggleOccasion = () => {
    setIsOccasionOpen(!isOccasionOpen);
  };

  const toggleBrands = () => {
    setIsBrandsOpen(!isBrandsOpen);
  };

  const handleBudgetMouseEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setIsBudgetOpen(true);
  };

  const handleBudgetMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsBudgetOpen(false);
    }, 200);
  };

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  const handleLogout = () => {
    console.log('Logging out, clearing user data from localStorage.');
    logout();
    setCurrentUser(null); // Clear current user state
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const categories = [
    "Apparels & Fashion",
    "Bags & Luggage",
    "By Budget",
    "Camera & Drone",
    "Car & Bike Accessories",
    "Cell Phones",
    "Clocks & Watches",
    "Combo Gift Set",
    "Computers",
    "Daily Deals",
    "Desktop Items",
    "Diaries & Planners",
    "Doctor's Utility",
  ];

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.05
      }
    },
    exit: { 
      x: '-100%',
      transition: { 
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { 
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  return (
    <div className="font-poppins font-medium text-[#212121]">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        {/* Top Navbar */}
        <div className="bg-white shadow-md">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 lg:px-8 gap-2 sm:gap-4 md:gap-4">
            {/* Logo and Hamburger */}
            <div className="flex items-center justify-between w-full sm:w-auto">
              <Link to="/" className="flex flex-col items-center">
                <div className="flex items-center space-x-1 sm:space-x-1.5">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#000000]">S</span>
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#212121]">-</span>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#1976D2]">STORE</span>
                </div>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-[#757575] mt-0.5 sm:mt-1"></span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="sm:hidden text-[#212121] hover:text-[#1976D2]"
                aria-label="Toggle Sidebar"
              >
                {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-grow w-full sm:w-auto mx-0 sm:mx-3 md:mx-4 lg:mx-6">
              <form onSubmit={handleSearch} className="relative w-full max-w-[260px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[400px] xl:max-w-[500px] mx-auto sm:mx-0">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-10 md:pl-12 pr-4 sm:pr-5 md:pr-6 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-xs sm:text-sm md:text-base font-poppins font-medium text-[#212121] placeholder:truncate placeholder:text-[#757575]"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 sm:px-4 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-r-md"
                >
                  <FaSearch className="text-sm sm:text-base md:text-lg" />
                </button>
              </form>
            </div>

            {/* Contact and Icons */}
            <div className="flex items-center space-x-1 sm:space-x-3 md:space-x-3 lg:space-x-4">
              <div className="hidden md:flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs md:text-sm lg:text-base border border-[#E0E0E0] rounded-md px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
                <FaPhone className="text-[#1976D2] text-xs sm:text-sm md:text-base lg:text-lg" />
                <span className="text-[#757575] font-medium hidden sm:inline">Need help? Call us:</span>
                <span className="text-[#212121] font-medium sm:ml-1">+91 95035 54800</span>
              </div>
              <button
                type="button"
                className="flex flex-col items-center text-[#757575] hover:text-[#1976D2] relative focus:outline-none"
                onClick={() => setIsCompareOpen(true)}
              >
                <FaChartBar className="text-base sm:text-lg md:text-xl lg:text-2xl" />
                <span className="absolute -top-1 -right-1 sm:-right-1 md:-right-1.5 bg-[#1976D2] text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full w-4 sm:w-4.5 md:w-5 lg:w-5.5 h-4 sm:h-4.5 md:h-5 lg:h-5.5 flex items-center justify-center">
                  {compareCount}
                </span>
                <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">Comparison</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center text-[#757575] hover:text-[#1976D2] relative focus:outline-none"
                onClick={() => setIsFavoritesOpen(true)}
              >
                <FaHeart className="text-base sm:text-lg md:text-xl lg:text-2xl" />
                <span className="absolute -top-1 -right-1 sm:-right-1 md:-right-1.5 bg-[#1976D2] text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full w-4 sm:w-4.5 md:w-5 lg:w-5.5 h-4 sm:h-4.5 md:h-5 lg:h-5.5 flex items-center justify-center">
                  {favoritesCount}
                </span>
                <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">Favorites</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center text-[#757575] hover:text-[#1976D2] relative focus:outline-none"
                onClick={() => setIsCartSidebarOpen(true)}
              >
                <FaShoppingCart className="text-base sm:text-lg md:text-xl lg:text-2xl" />
                <span className="absolute -top-1 -right-1 sm:-right-1 md:-right-1.5 bg-[#1976D2] text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full w-4 sm:w-4.5 md:w-5 lg:w-5.5 h-4 sm:h-4.5 md:h-5 lg:h-5.5 flex items-center justify-center">
                  {cartCount}
                </span>
                <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">My Cart</span>
              </button>
              {/* User Profile or Sign In - Moved to the far right */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex flex-col items-center text-[#757575] hover:text-[#1976D2]"
                    title="Profile"
                  >
                    <FaUser className="text-base sm:text-lg md:text-xl lg:text-2xl" />
                    <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">
                      {currentUser?.name || 'User'}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex flex-col items-center text-[#757575] hover:text-[#1976D2]"
                    title="Logout"
                  >
                    <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={openSignIn}
                  className="flex flex-col items-center text-[#757575] hover:text-[#1976D2]"
                  title="Sign In"
                >
                  <FaUser className="text-base sm:text-lg md:text-xl lg:text-2xl" />
                  <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white text-[#212121] border-t border-[#E0E0E0]">
          <div className="container mx-auto flex flex-wrap items-center justify-between py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 lg:px-8 gap-2 sm:gap-4 md:gap-4">
            <div className="relative" ref={budgetRef}>
              <button
                onClick={toggleSidebar}
                className="flex items-center bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded text-sm sm:text-base md:text-lg font-poppins font-medium"
              >
                <FaBars className="mr-1 sm:mr-2 md:mr-2.5 text-sm sm:text-base md:text-lg" />
                Browse Categories
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-4 gap-y-1 sm:gap-y-3 text-sm sm:text-base md:text-lg font-poppins font-medium">
              <NavLink to="/" className={({ isActive }) => isActive ? "text-[#1976D2] font-medium" : "text-[#212121] hover:text-[#1976D2]"}>Home</NavLink>
              <NavLink to="/aboutus" className={({ isActive }) => isActive ? "text-[#1976D2] font-medium" : "text-[#212121] hover:text-[#1976D2]"}>About Us</NavLink>
              <NavLink to="/shop" className={({ isActive }) => isActive ? "text-[#1976D2] font-medium" : "text-[#212121] hover:text-[#1976D2]"}>Shop</NavLink>

              <div className="relative" ref={budgetRef}
                onMouseEnter={handleBudgetMouseEnter}
                onMouseLeave={handleBudgetMouseLeave}
              >
                <button
                  onClick={toggleBudget}
                  className="flex items-center text-[#212121] hover:text-[#1976D2] font-poppins font-medium"
                >
                  By Budget
                  <FaChevronDown className="ml-1 sm:ml-1.5 md:ml-2 text-sm sm:text-base md:text-lg" />
                </button>
                {isBudgetOpen && (
                  <div
                    onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
                    onMouseLeave={handleBudgetMouseLeave}
                    className="absolute bg-white text-[#212121] shadow-lg rounded mt-2 sm:mt-2.5 md:mt-3 w-28 sm:w-32 md:w-36 lg:w-40 z-10"
                  >
                    {dynamicBudgetOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={`/shop?priceRange=${encodeURIComponent(option)}`}
                        className="block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins font-medium text-[#212121] hover:text-[#1976D2]"
                        onClick={() => setIsBudgetOpen(false)}
                      >
                        {option}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={occasionRef}
                onMouseEnter={() => setIsOccasionOpen(true)}
                onMouseLeave={() => dropdownTimeoutRef.current = setTimeout(() => setIsOccasionOpen(false), 200)}
              >
                <button
                  onClick={toggleOccasion}
                  className="flex items-center text-[#212121] hover:text-[#1976D2] font-poppins font-medium"
                >
                  By Occasion
                  <FaChevronDown className="ml-1 sm:ml-1.5 md:ml-2 text-sm sm:text-base md:text-lg" />
                </button>
                {isOccasionOpen && (
                  <div
                    onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
                    onMouseLeave={handleBudgetMouseLeave}
                    className="absolute bg-white text-[#212121] shadow-lg rounded mt-2 sm:mt-2.5 md:mt-3 w-28 sm:w-32 md:w-36 lg:w-40 z-10"
                  >
                    {dynamicOccasionOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={`/shop?occasion=${encodeURIComponent(option)}`}
                        className="block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins font-medium text-[#212121] hover:text-[#1976D2]"
                        onClick={() => setIsOccasionOpen(false)}
                      >
                        {option}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={brandsRef}>
                <button
                  onClick={toggleBrands}
                  onMouseEnter={() => setIsBrandsOpen(true)}
                  onMouseLeave={() => dropdownTimeoutRef.current = setTimeout(() => setIsBrandsOpen(false), 200)}
                  className="flex items-center text-[#212121] hover:text-[#1976D2] font-poppins font-medium"
                >
                  By Brands
                  <FaChevronDown className="ml-1 sm:ml-1.5 md:ml-2 text-sm sm:text-base md:text-lg" />
                </button>
                {isBrandsOpen && (
                  <div
                    onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
                    onMouseLeave={handleBudgetMouseLeave}
                    className="absolute bg-white text-[#212121] shadow-lg rounded mt-2 sm:mt-2.5 md:mt-3 w-28 sm:w-32 md:w-36 lg:w-40 z-10"
                  >
                    {dynamicBrandsOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={`/shop?brand=${encodeURIComponent(option)}`}
                        className="block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins font-medium text-[#212121] hover:text-[#1976D2]"
                        onClick={() => setIsBrandsOpen(false)}
                      >
                        {option}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#1976D2] font-medium" : "text-[#212121] hover:text-[#1976D2]"}>Contact Us</NavLink>
            </div>

            <div className="flex">
              <NavLink to="/enquiry" className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded text-sm sm:text-base md:text-lg font-poppins font-medium">Enquiry</NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        {/* Mobile Top Bar */}
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-1">
                <span className="text-2xl font-medium text-[#000000]">S</span>
                <span className="text-base font-medium text-[#212121]">-</span>
                <span className="text-2xl font-medium text-[#1976D2]">STORE</span>
              </Link>

              {/* Mobile Icons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsCartSidebarOpen(true)}
                  className="text-[#757575] hover:text-[#1976D2] relative flex flex-col items-center"
                >
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#1976D2] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <span className="text-xs mt-1">Cart</span>
                </button>
                <button
                  onClick={toggleSidebar}
                  className="text-[#757575] hover:text-[#1976D2] flex flex-col items-center"
                >
                  {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                  <span className="text-xs mt-1">Menu</span>
                </button>
                {/* User Profile or Sign In - Moved to the far right */}
                {user ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="text-[#757575] hover:text-[#1976D2] flex flex-col items-center"
                      title="Profile"
                    >
                      <FaUser className="text-xl" />
                      <span className="text-xs mt-1">{currentUser?.name || 'User'}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-[#757575] hover:text-[#1976D2] flex flex-col items-center"
                      title="Logout"
                    >
                      <span className="text-xs mt-1">Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openSignIn}
                    className="text-[#757575] hover:text-[#1976D2] flex flex-col items-center"
                    title="Sign In"
                  >
                    <FaUser className="text-xl" />
                    <span className="text-xs mt-1">Sign In</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#757575]" />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1976D2] hover:bg-[#1565C0] text-white px-4 py-2 rounded-r-md"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Back Button for Mobile - Now below navbar */}
        <BackButton />

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] z-10">
          <div className="flex items-center justify-around py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center ${isActive ? 'text-[#1976D2]' : 'text-[#757575]'}`
              }
            >
              <FaHome className="text-xl" />
              <span className="text-xs mt-1">Home</span>
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `flex flex-col items-center ${isActive ? 'text-[#1976D2]' : 'text-[#757575]'}`
              }
            >
              <FaShoppingBag className="text-xl" />
              <span className="text-xs mt-1">Shop</span>
            </NavLink>
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="flex flex-col items-center text-[#757575] relative"
            >
              <FaHeart className="text-xl" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1976D2] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
              <span className="text-xs mt-1">Favorites</span>
            </button>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex flex-col items-center text-[#757575] relative"
            >
              <FaChartBar className="text-xl" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1976D2] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
              <span className="text-xs mt-1">Compare</span>
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="fixed top-0 left-0 h-full w-[70%] sm:w-56 md:w-64 lg:w-72 bg-white shadow-lg z-20"
        initial="hidden"
        animate={isSidebarOpen ? "visible" : "hidden"}
        exit="exit"
        variants={sidebarVariants}
      >
        <div className="flex items-center justify-between p-3 border-b border-[#E0E0E0]">
          <h2 className="text-sm font-poppins font-medium text-[#212121]">Menu</h2>
          <button onClick={toggleSidebar} aria-label="Close Sidebar">
            <FaTimes className="text-base text-[#212121]" />
          </button>
        </div>
        <div className="p-3">
          {/* Navigation Links */}
          <div className="mb-4">
            <motion.h3
              className="font-poppins font-medium mb-2 text-sm text-[#212121]"
              variants={itemVariants}
            >
              Navigation
            </motion.h3>
            <motion.div variants={itemVariants}>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "block py-1.5 text-[#1976D2] font-medium text-xs font-poppins" : "block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium"}
                onClick={toggleSidebar}
              >
                Home
              </NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink
                to="/aboutus"
                className={({ isActive }) => isActive ? "block py-1.5 text-[#1976D2] font-medium text-xs font-poppins" : "block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium"}
                onClick={toggleSidebar}
              >
                About Us
              </NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink
                to="/shop"
                className={({ isActive }) => isActive ? "block py-1.5 text-[#1976D2] font-medium text-xs font-poppins" : "block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium"}
                onClick={toggleSidebar}
              >
                Shop
              </NavLink>
            </motion.div>
            <motion.div variants={itemVariants}>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? "block py-1.5 text-[#1976D2] font-medium text-xs font-poppins" : "block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium"}
                onClick={toggleSidebar}
              >
                Contact Us
              </NavLink>
            </motion.div>
          </div>

          {/* Categories */}
          <div>
            <motion.h3
              className="font-poppins font-medium mb-2 text-sm text-[#212121]"
              variants={itemVariants}
            >
              Categories
            </motion.h3>
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Link
                  to={`/category/${category.replace(/\s/g, '-').toLowerCase()}`}
                  className="block py-1.5 text-[#212121] hover:text-[#1976D2] text-xs font-poppins font-medium truncate"
                  onClick={toggleSidebar}
                >
                  {category}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Enquiry Button */}
          <motion.div
            className="mt-4"
            variants={itemVariants}
          >
            <NavLink to="/enquiry" className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 py-1.5 rounded text-xs font-poppins font-medium w-full text-left block text-center">
              Enquiry
            </NavLink>
          </motion.div>
        </div>
      </motion.div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {isSignInOpen && <SignInForm onClose={closeSignIn} />}
      {isCompareOpen && (
        <CompareSidebar
          open={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          compareList={getFromStorage(compareKey)}
        />
      )}
      {isFavoritesOpen && (
        <FavoritesSidebar
          open={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
        />
      )}
      {isCartSidebarOpen && (
        <CartSidebar
          open={isCartSidebarOpen}
          onClose={() => setIsCartSidebarOpen(false)}
        />
      )}
      {isProfileModalOpen && (
        <UserProfileModal
          open={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={currentUser}
          cartItems={cartItems}
          favoriteItems={favoriteItems}
          compareItems={compareItems}
        />
      )}
    </div>
  );
};

export default Navbar;