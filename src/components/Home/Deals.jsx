// import React, { useState, useEffect, useRef } from 'react';
// import { Heart, RefreshCw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // DealCard component with fixed size and shape
// const DealCard = ({ product, index, isWishlisted, isCompared, onWishlistToggle, onCompare, onView, timeLeft }) => {
//   const [isImageHovered, setIsImageHovered] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const totalStock = 200; // Assumed total stock for percentage calculation
//   const available = product.stock;
//   const sold = totalStock - available;
//   const availablePercentage = (available / totalStock) * 100;
//   const soldPercentage = (sold / totalStock) * 100;
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     setIsClicked(!isClicked); // Toggle icon visibility in mobile view
//     navigate(`/product/${product.id}`); // Navigate to product view page
//   };

//   return (
//     <div
//       className="relative w-32 xs:w-36 sm:w-40 md:w-44 p-1 xs:p-2 sm:p-2 md:p-2 rounded-md flex-shrink-0 cursor-pointer snap-center bg-white flex flex-col"
//       style={{ minWidth: '128px', maxWidth: '176px', height: 'auto' }}
//       onClick={handleCardClick}
//       onMouseEnter={() => setIsImageHovered(true)}
//       onMouseLeave={() => setIsImageHovered(false)}
//     >
//       <div className="w-full h-36 xs:h-44 sm:h-48 md:h-52 overflow-hidden relative bg-white">
//         <div className="w-full h-full" style={{ aspectRatio: '1 / 1' }}>
//           <img
//             src={isImageHovered ? product.hoverImage : product.image}
//             alt={product.name}
//             className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//             style={{ objectFit: 'cover' }}
//           />
//         </div>
//         <div
//           className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 xs:space-x-3 sm:space-x-3 md:space-x-3 transition-opacity duration-300 ${
//             isImageHovered || isClicked ? 'opacity-100' : 'opacity-0'
//           } md:${isImageHovered ? 'opacity-100' : 'opacity-0'}`}
//         >
//           <button
//             onClick={(e) => { e.stopPropagation(); onWishlistToggle(index); }}
//             className="text-gray-600 bg-white bg-opacity-75 rounded-full p-1 xs:p-2"
//             aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
//           >
//             <Heart size={20} xs={{ size: 24 }} sm={{ size: 24 }} md={{ size: 28 }} className={isWishlisted ? 'text-red-500 fill-current' : ''} />
//           </button>
//           <button
//             onClick={(e) => { e.stopPropagation(); onCompare(index); }}
//             className="text-gray-600 bg-white bg-opacity-75 rounded-full p-1 xs:p-2"
//             aria-label="Add to compare"
//           >
//             <RefreshCw size={20} xs={{ size: 24 }} sm={{ size: 24 }} md={{ size: 28 }} className={isCompared ? 'text-blue-500' : ''} />
//           </button>
//           <button
//             onClick={(e) => { e.stopPropagation(); onView(product); }}
//             className="text-gray-600 bg-white bg-opacity-75 rounded-full p-1 xs:p-2"
//             aria-label="View product details"
//           >
//             <Eye size={20} xs={{ size: 24 }} sm={{ size: 24 }} md={{ size: 28 }} />
//           </button>
//         </div>
//         <span className="absolute top-1 xs:top-2 left-1 xs:left-2 bg-white/30 text-red-500 text-[10px] xs:text-xs font-semibold px-1 xs:px-2 py-0.5 xs:py-1 rounded">
//           SALE!
//         </span>
//       </div>
//       <div className="text-left flex-1">
//         <h3 className="text-sm xs:text-base sm:text-base md:text-base font-semibold line-clamp-2">{product.name}</h3>
//         <div className="flex gap-1 xs:gap-1.5 sm:gap-1.5 md:gap-1.5 mt-0.5 xs:mt-1">
//           <span className="text-gray-600 text-[10px] xs:text-xs sm:text-xs md:text-xs line-through">
//             ${product.price.original.toFixed(2)}
//           </span>
//           <span className="text-sm xs:text-base sm:text-base md:text-base font-semibold">
//             ${product.price.discounted.toFixed(2)}
//           </span>
//         </div>
//         <div className="flex justify-between text-gray-600 text-[10px] xs:text-xs sm:text-xs md:text-xs mt-0.5 xs:mt-1">
//           <p>Available: {product.stock}</p>
//           <p>Sold: {sold}</p>
//         </div>
//         <div className="flex w-full bg-gray-200 h-1.5 xs:h-2 rounded mt-0.5 xs:mt-1">
//           <div
//             className="bg-gray-400 h-1.5 xs:h-2 rounded-l"
//             style={{ width: `${availablePercentage}%` }}
//           ></div>
//           <div
//             className="bg-black h-1.5 xs:h-2 rounded-r"
//             style={{ width: `${soldPercentage}%` }}
//           ></div>
//         </div>
//         <div className="flex justify-between mt-1 xs:mt-2">
//           <div className="text-center">
//             <span className="block text-sm xs:text-base sm:text-base md:text-base font-semibold">
//               {timeLeft.days.toString().padStart(2, '0')}
//             </span>
//             <p className="text-gray-600 text-[10px] xs:text-xs">Days</p>
//           </div>
//           <div className="text-center">
//             <span className="block text-sm xs:text-base sm:text-base md:text-base font-semibold">
//               {timeLeft.hours.toString().padStart(2, '0')}
//             </span>
//             <p className="text-gray-600 text-[10px] xs:text-xs">Hours</p>
//           </div>
//           <div className="text-center">
//             <span className="block text-sm xs:text-base sm:text-base md:text-base font-semibold">
//               {timeLeft.minutes.toString().padStart(2, '0')}
//             </span>
//             <p className="text-gray-600 text-[10px] xs:text-xs">Mins</p>
//           </div>
//           <div className="text-center">
//             <span className="block text-sm xs:text-base sm:text-base md:text-base font-semibold">
//               {timeLeft.seconds.toString().padStart(2, '0')}
//             </span>
//             <p className="text-gray-600 text-[10px] xs:text-xs">Secs</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DealsSection = () => {
//   const scrollRef = useRef(null);
//   const isScrolling = useRef(false);
//   const [timeLeft, setTimeLeft] = useState({
//     days: 10,
//     hours: 5,
//     minutes: 56,
//     seconds: 59,
//   });
//   const [productsData, setProductsData] = useState([]);
//   const [isWishlistedArray, setIsWishlistedArray] = useState([]);
//   const [isComparedArray, setIsComparedArray] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedStorage, setSelectedStorage] = useState('256GB');
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isCompared, setIsCompared] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   // Countdown timer logic
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         const { days, hours, minutes, seconds } = prevTime;
//         if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
//           clearInterval(timer);
//           return prevTime;
//         }
//         let newSeconds = seconds - 1;
//         let newMinutes = minutes;
//         let newHours = hours;
//         let newDays = days;
//         if (newSeconds < 0) {
//           newSeconds = 59;
//           newMinutes -= 1;
//         }
//         if (newMinutes < 0) {
//           newMinutes = 59;
//           newHours -= 1;
//         }
//         if (newHours < 0) {
//           newHours = 23;
//           newDays -= 1;
//         }
//         if (newDays < 0) {
//           newDays = 0;
//           newHours = 0;
//           newMinutes = 0;
//           newSeconds = 0;
//         }
//         return { days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds };
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Fetch data from Fake Store API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('https://fakestoreapi.com/products?limit=6', {
//           method: 'GET',
//         });
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();

//         // Map API data to the expected structure
//         const mappedProducts = data.map((product) => ({
//           id: product.id.toString(),
//           category: product.category,
//           name: product.title,
//           rating: Math.round(product.rating.rate),
//           reviews: product.rating.count,
//           price: {
//             original: product.price,
//             discounted: product.price * 0.8,
//           },
//           image: product.image,
//           hoverImage: product.image,
//           stock: 189,
//           colors: ['#A3BFFA', '#4A5568', '#2D3748', '#CBD5E0'],
//           storageOptions: ['128GB', '256GB', '512GB'],
//           sku: '#00087561',
//           tags: ['Camera', 'Security', 'Battery'],
//           delivery: '5 days',
//         }));

//         setProductsData(mappedProducts);
//         setIsWishlistedArray(mappedProducts.map(() => false));
//         setIsComparedArray(mappedProducts.map(() => false));
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setProductsData([]);
//         setIsWishlistedArray([]);
//         setIsComparedArray([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Infinite loop setup with dynamic card width
//   const repeatCount = 10;
//   const extendedProducts = Array(repeatCount).fill(productsData).flat();

//   const getCardWidth = () => {
//     const screenWidth = window.innerWidth;
//     if (screenWidth >= 768) return 224; // md:w-56 (56 * 4px = 224px)
//     if (screenWidth >= 376) return 176; // xs:w-44 (44 * 4px = 176px)
//     return 160; // w-40 (40 * 4px = 160px)
//   };

//   const getGapWidth = () => {
//     const screenWidth = window.innerWidth;
//     if (screenWidth >= 640) return 12; // sm:gap-3 (3 * 4px = 12px)
//     if (screenWidth >= 376) return 12; // xs:gap-3 (3 * 4px = 12px)
//     return 8; // gap-2 (2 * 4px = 8px)
//   };

//   const [cardWidth, setCardWidth] = useState(getCardWidth());
//   const [gapWidth, setGapWidth] = useState(getGapWidth());

//   useEffect(() => {
//     const handleResize = () => {
//       setCardWidth(getCardWidth());
//       setGapWidth(getGapWidth());
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Initialize scroll position and handle infinite scroll
//   const scrollDistance = cardWidth + gapWidth;
//   const originalSetWidth = (productsData.length * cardWidth) + ((productsData.length - 1) * gapWidth);

//   useEffect(() => {
//     if (scrollRef.current && productsData.length > 0) {
//       const middleSetIndex = Math.floor(repeatCount / 2);
//       const initialScrollPosition = middleSetIndex * originalSetWidth;
//       scrollRef.current.scrollTo({ left: initialScrollPosition, behavior: 'auto' });
//     }
//   }, [productsData, originalSetWidth]);

//   const handleScroll = () => {
//     if (!scrollRef.current || isScrolling.current) return;

//     const scrollContainer = scrollRef.current;
//     const currentScrollLeft = scrollContainer.scrollLeft;
//     const maxScrollLeft = (repeatCount - 1) * originalSetWidth;

//     if (currentScrollLeft <= originalSetWidth) {
//       isScrolling.current = true;
//       const newScrollLeft = currentScrollLeft + originalSetWidth;
//       scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'auto' });
//       isScrolling.current = false;
//     } else if (currentScrollLeft >= maxScrollLeft - originalSetWidth) {
//       isScrolling.current = true;
//       const newScrollLeft = currentScrollLeft - originalSetWidth;
//       scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'auto' });
//       isScrolling.current = false;
//     }
//   };

//   const scrollLeft = () => {
//     if (!scrollRef.current || isScrolling.current) return;
//     isScrolling.current = true;

//     const scrollContainer = scrollRef.current;
//     const currentScrollLeft = scrollContainer.scrollLeft;

//     if (currentScrollLeft <= originalSetWidth) {
//       const newScrollLeft = currentScrollLeft + originalSetWidth;
//       scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'auto' });
//       setTimeout(() => {
//         scrollContainer.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
//         isScrolling.current = false;
//       }, 0);
//     } else {
//       scrollContainer.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
//       setTimeout(() => {
//         isScrolling.current = false;
//       }, 300);
//     }
//   };

//   const scrollRight = () => {
//     if (!scrollRef.current || isScrolling.current) return;
//     isScrolling.current = true;

//     const scrollContainer = scrollRef.current;
//     const currentScrollLeft = scrollContainer.scrollLeft;
//     const maxScrollLeft = (repeatCount - 1) * originalSetWidth;

//     if (currentScrollLeft >= maxScrollLeft - originalSetWidth) {
//       const newScrollLeft = currentScrollLeft - originalSetWidth;
//       scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'auto' });
//       setTimeout(() => {
//         scrollContainer.scrollBy({ left: scrollDistance, behavior: 'smooth' });
//         isScrolling.current = false;
//       }, 0);
//     } else {
//       scrollContainer.scrollBy({ left: scrollDistance, behavior: 'smooth' });
//       setTimeout(() => {
//         isScrolling.current = false;
//       }, 300);
//     }
//   };

//   // Event handlers
//   const handleWishlistClick = (index) => {
//     setIsWishlistedArray((prev) =>
//       prev.map((item, i) => (i === index ? !item : item))
//     );
//   };

//   const handleCompareClick = (index) => {
//     setIsComparedArray((prev) =>
//       prev.map((item, i) => (i === index ? true : item))
//     );
//   };

//   const handleViewClick = (product) => {
//     setSelectedProduct(product);
//     setQuantity(1);
//     setSelectedColor(product.colors?.[0] || null);
//     setSelectedStorage(product.storageOptions?.includes('256GB') ? '256GB' : product.storageOptions?.[0] || null);
//     setIsWishlisted(false);
//     setIsCompared(false);
//   };

//   const handleAddToCart = () => {
//     console.log(`Added ${quantity} ${selectedProduct.name} to cart`);
//   };

//   const handleWishlistToggle = () => {
//     setIsWishlisted(!isWishlisted);
//     console.log(`${selectedProduct.name} ${isWishlisted ? 'removed from' : 'added to'} wishlist`);
//   };

//   const handleCompare = () => {
//     setIsCompared(true);
//     console.log(`${selectedProduct.name} added to compare`);
//   };

//   const closeProductDetails = () => {
//     setSelectedProduct(null);
//   };

//   if (loading) {
//     return <div className="text-center py-4">Loading deals...</div>;
//   }

//   return (
//     <div className="w-full max-w-screen-xl mx-auto my-1 -mt-8 px-2 sm:px-4">
//       {/* Deals of the Day Section */}
//       <div
//         className={`w-full text-center min-h-[320px] sm:min-h-[480px] transition-all duration-300 ${
//           isHovered ? 'border-[1.2px] border-solid border-black rounded-xl' : ''
//         }`}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-3 xs:mb-4 mt-4 xs:mt-5 sm:mt-6">Deals of the Day</h2>
//         <div className="relative flex items-center h-[calc(100%-2rem)] xs:h-[calc(100%-2.5rem)]">
//           <button
//             className="absolute left-0 z-10 transform -translate-y-1/2 bg-white rounded-full w-8 xs:w-9 sm:w-10 md:w-12 h-8 xs:h-9 sm:h-10 md:h-12 shadow-md flex items-center justify-center"
//             onClick={scrollLeft}
//             style={{ top: '50%' }}
//           >
//             <ChevronLeft className="text-base xs:text-lg sm:text-xl md:text-2xl" />
//           </button>
//           <div
//             className="flex overflow-x-auto scroll-smooth pt-3 xs:pt-4 hide-scrollbar snap-x snap-mandatory w-[320px] xs:w-[360px] sm:w-[384px] md:w-[476px] mx-auto"
//             ref={scrollRef}
//             onScroll={handleScroll}
//           >
//             <div className="flex gap-2 xs:gap-3 sm:gap-3 md:gap-3">
//               {extendedProducts.map((product, idx) => (
//                 <DealCard
//                   key={`${product.id}-${idx}`}
//                   product={product}
//                   index={idx % productsData.length}
//                   isWishlisted={isWishlistedArray[idx % productsData.length]}
//                   isCompared={isComparedArray[idx % productsData.length]}
//                   onWishlistToggle={handleWishlistClick}
//                   onCompare={handleCompareClick}
//                   onView={handleViewClick}
//                   timeLeft={timeLeft}
//                 />
//               ))}
//             </div>
//           </div>
//           <button
//             className="absolute right-0 z-10 transform -translate-y-1/2 bg-white rounded-full w-8 xs:w-9 sm:w-10 md:w-12 h-8 xs:h-9 sm:h-10 md:h-12 shadow-md flex items-center justify-center"
//             onClick={scrollRight}
//             style={{ top: '50%' }}
//           >
//             <ChevronRight className="text-base xs:text-lg sm:text-xl md:text-2xl" />
//           </button>
//         </div>
//       </div>

//       {/* Product Details Pop-in Section */}
//       {selectedProduct && (
//         <div className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg z-50 p-4 sm:p-6 overflow-y-auto animate-slide-in">
//           <button
//             onClick={closeProductDetails}
//             className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-800 bg-white bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
//           >
//             ✕
//           </button>
//           <img
//             src={selectedProduct.image}
//             alt={selectedProduct.name}
//             className="w-full h-40 sm:h-48 object-contain mb-3 sm:mb-4"
//           />
//           <h3 className="text-lg sm:text-xl font-bold mb-2">{selectedProduct.name}</h3>
//           <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
//             ${selectedProduct.price.discounted.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//           </p>
//           <div className="flex items-center mb-2">
//             {[...Array(Math.round(selectedProduct.rating))].map((_, i) => (
//               <svg
//                 key={i}
//                 className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 fill-current"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//               </svg>
//             ))}
//             <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
//               ({selectedProduct.reviews || 1} customer review)
//             </span>
//           </div>
//           <p className="text-xs sm:text-sm text-gray-600 mb-2">
//             <span role="img" aria-label="eye">👁</span> 23 people are viewing this product right now
//           </p>
//           <p className="text-xs sm:text-sm text-green-600 mb-3 sm:mb-4">
//             <span className="mr-1">✔</span> {selectedProduct.stock || 100} in stock
//           </p>

//           {/* Color Selection */}
//           <div className="mb-3 sm:mb-4">
//             <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Color:</p>
//             <div className="flex space-x-1 sm:space-x-2">
//               {selectedProduct.colors?.map((color, index) => (
//                 <button
//                   key={index}
//                   className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 ${
//                     selectedColor === color ? 'border-black' : 'border-gray-300'
//                   }`}
//                   style={{ backgroundColor: color }}
//                   onClick={() => setSelectedColor(color)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Storage Selection */}
//           <div className="mb-3 sm:mb-4">
//             <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Storage:</p>
//             <div className="flex space-x-1 sm:space-x-2 flex-wrap gap-1 sm:gap-2">
//               {selectedProduct.storageOptions?.map((storage, index) => (
//                 <button
//                   key={index}
//                   className={`px-2 sm:px-4 py-0.5 sm:py-1 border rounded text-xs sm:text-sm ${
//                     selectedStorage === storage
//                       ? 'border-black bg-gray-100'
//                       : 'border-gray-300'
//                   }`}
//                   onClick={() => setSelectedStorage(storage)}
//                 >
//                   {storage}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity Selector */}
//           <div className="flex items-center mb-3 sm:mb-4">
//             <button
//               onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//               className="px-1 sm:px-2 py-1 border border-gray-300"
//             >
//               -
//             </button>
//             <span className="px-3 sm:px-4 py-1 border-t border-b border-gray-300 text-xs sm:text-sm">{quantity}</span>
//             <button
//               onClick={() => setQuantity((prev) => prev + 1)}
//               className="px-1 sm:px-2 py-1 border border-gray-300"
//             >
//               +
//             </button>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-black text-white py-1 sm:py-2 rounded mb-3 sm:mb-4 text-xs sm:text-sm"
//           >
//             ADD TO CART
//           </button>

//           {/* Add to Compare and Wishlist */}
//           <div className="flex space-x-2 sm:space-x-4 mb-3 sm:mb-4">
//             <button
//               onClick={handleCompare}
//               className="text-xs sm:text-sm text-gray-600 flex items-center"
//             >
//               <RefreshCw size={14} sm:size={16} className="mr-1" /> Add to compare
//             </button>
//             <button
//               onClick={handleWishlistToggle}
//               className="text-xs sm:text-sm text-gray-600 flex items-center"
//             >
//               <Heart size={14} sm:size={16} className="mr-1" /> Add to wishlist
//             </button>
//           </div>

//           {/* Additional Info */}
//           <p className="text-xs sm:text-sm text-gray-600 mb-2">
//             <span className="font-semibold">SKU:</span> {selectedProduct.sku || '#00087560'}
//           </p>
//           <p className="text-xs sm:text-sm text-gray-600 mb-2">
//             <span className="font-semibold">Category:</span> {selectedProduct.category}
//           </p>
//           <p className="text-xs sm:text-sm text-gray-600 mb-2">
//             <span className="font-semibold">Tags:</span> {selectedProduct.tags?.join(', ') || 'Camera, Security, Battery'}
//           </p>
//           <p className="text-xs sm:text-sm text-gray-600 mb-2">
//             <span className="font-semibold">Estimated delivery:</span> {selectedProduct.delivery || '5 days'}
//           </p>

//           {/* Share Options */}
//           <div className="flex space-x-1 sm:space-x-2">
//             <p className="text-xs sm:text-sm text-gray-600 font-semibold">Share:</p>
//             <button className="text-gray-600 text-xs sm:text-sm">X</button>
//             <button className="text-gray-600 text-xs sm:text-sm">f</button>
//             <button className="text-gray-600 text-xs sm:text-sm">w</button>
//             <button className="text-gray-600 text-xs sm:text-sm">p</button>
//             <button className="text-gray-600 text-xs sm:text-sm">in</button>
//             <button className="text-gray-600 text-xs sm:text-sm">@</button>
//             <button className="text-gray-600 text-xs sm:text-sm">S</button>
//           </div>
//         </div>
//       )}

//       {/* Styles */}
//       <style>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         @keyframes slide-in {
//           from {
//             transform: translateX(100%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out forwards;
//         }
//         .snap-x {
//           scroll-snap-type: x mandatory;
//         }
//         .snap-mandatory {
//           scroll-snap-stop: always;
//         }
//         .snap-center {
//           scroll-snap-align: center;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DealsSection;

import React, { useState, useEffect, useRef } from 'react';
import { Heart, RefreshCw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// DealCard component with fixed size and shape
const DealCard = ({ product, index, isWishlisted, isCompared, onWishlistToggle, onCompare, onView, timeLeft }) => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const totalStock = 200; // Assumed total stock for percentage calculation
  const available = product.stock;
  const sold = totalStock - available;
  const availablePercentage = (available / totalStock) * 100;
  const soldPercentage = (sold / totalStock) * 100;
  const navigate = useNavigate();

  const handleCardClick = () => {
    setIsClicked(!isClicked); // Toggle icon visibility in mobile view
    navigate(`/products/${product.id}`); // Navigate to product view page
  };

  return (
    <div
      className="relative w-32 xs:w-36 sm:w-40 md:w-44 p-1 xs:p-2 sm:p-2 md:p-2 rounded-md flex-shrink-0 cursor-pointer snap-center bg-white flex flex-col"
      style={{ minWidth: '128px', maxWidth: '176px', height: 'auto' }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsImageHovered(true)}
      onMouseLeave={() => setIsImageHovered(false)}
    >
      <div className="w-full h-36 xs:h-44 sm:h-48 md:h-52 overflow-hidden relative bg-white">
        <div className="w-full h-full" style={{ aspectRatio: '1 / 1' }}>
          <img
            src={isImageHovered ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 xs:space-x-3 sm:space-x-3 md:space-x-3 transition-opacity duration-300 ${
            isImageHovered || isClicked ? 'opacity-100' : 'opacity-0'
          } md:${isImageHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onWishlistToggle(index); }}
            className="text-gray-600 bg-white bg-opacity-75 rounded-full p-1 xs:p-2"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={20} xs={{ size: 24 }} sm={{ size: 24 }} md={{ size: 28 }} className={isWishlisted ? 'text-red-500 fill-current' : ''} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onCompare(index); }}
            className="text-gray-600 bg-white bg-opacity-75 rounded-full p-1 xs:p-2"
            aria-label="Add to compare"
          >
            <RefreshCw size={20} xs={{ size: 24 }} sm={{ size: 24 }} md={{ size: 28 }} className={isCompared ? 'text-blue-500' : ''} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onView(product); }}
            className="text-gray-600 bg-white bg-opacity-75 rounded-full p-1 xs:p-2"
            aria-label="View product details"
          >
            <Eye size={20} xs={{ size: 24 }} sm={{ size: 24 }} md={{ size: 28 }} />
          </button>
        </div>
        <span className="absolute top-1 xs:top-2 left-1 xs:left-2 bg-white/30 text-red-500 text-[10px] xs:text-xs font-semibold px-1 xs:px-2 py-0.5 xs:py-1 rounded">
          SALE!
        </span>
      </div>
      <div className="text-left flex-1">
        <h3 className="text-sm xs:text-base sm:text-base md:text-base font-semibold line-clamp-2">{product.name}</h3>
        <div className="flex gap-1 xs:gap-1.5 sm:gap-1.5 md:gap-1.5 mt-0.5 xs:mt-1">
          <span className="text-gray-600 text-[10px] xs:text-xs sm:text-xs md:text-xs line-through">
            ${product.price.original.toFixed(2)}
          </span>
          <span className="text-sm xs:text-base sm:text-base md:text-base font-semibold">
            ${product.price.discounted.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 text-[10px] xs:text-xs sm:text-xs md:text-xs mt-0.5 xs:mt-1">
          <p>Available: {product.stock}</p>
          <p>Sold: {sold}</p>
        </div>
        <div className="flex w-full bg-gray-200 h-1.5 xs:h-2 rounded mt-0.5 xs:mt-1">
          <div
            className="bg-gray-400 h-1.5 xs:h-2 rounded-l"
            style={{ width: `${availablePercentage}%` }}
          ></div>
          <div
            className="bg-black h-1.5 xs:h-2 rounded-r"
            style={{ width: `${soldPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 xs:mt-2">
          <div className="text-center">
            <span className="block text-sm xs:text-base sm:text-base md:text-base font-semibold">
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <p className="text-gray-600 text-[10px] xs:text-xs">Days</p>
          </div>
          <div className="text-center">
            <span className="block text-sm xs:text-base sm:text-base md:text-base font-semibold">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <p className="text-gray-600 text-[10px] xs:text-xs">Hours</p>
          </div>
          <div className="text-center">
            <span className="block text-sm xs:text-base sm:text-base md:text-base font-semibold">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <p className="text-gray-600 text-[10px] xs:text-xs">Mins</p>
          </div>
          <div className="text-center">
            <span className="block text-sm xs:text-base sm:text-base md:text-base font-semibold">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <p className="text-gray-600 text-[10px] xs:text-xs">Secs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DealsSection = () => {
  const scrollRef = useRef(null);
  const isScrolling = useRef(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 5,
    minutes: 56,
    seconds: 59,
  });
  const [productsData, setProductsData] = useState([]);
  const [isWishlistedArray, setIsWishlistedArray] = useState([]);
  const [isComparedArray, setIsComparedArray] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { days, hours, minutes, seconds } = prevTime;
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        let newDays = days;
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }
        if (newDays < 0) {
          newDays = 0;
          newHours = 0;
          newMinutes = 0;
          newSeconds = 0;
        }
        return { days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=6', {
          method: 'GET',
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        // Map API data to the expected structure
        const mappedProducts = data.map((product) => ({
          id: product.id.toString(),
          category: product.category,
          name: product.title,
          rating: Math.round(product.rating.rate),
          reviews: product.rating.count,
          price: {
            original: product.price,
            discounted: product.price * 0.8,
          },
          image: product.image,
          hoverImage: product.image,
          stock: 189,
          colors: ['#A3BFFA', '#4A5568', '#2D3748', '#CBD5E0'],
          storageOptions: ['128GB', '256GB', '512GB'],
          sku: '#00087561',
          tags: ['Camera', 'Security', 'Battery'],
          delivery: '5 days',
        }));

        setProductsData(mappedProducts);
        setIsWishlistedArray(mappedProducts.map(() => false));
        setIsComparedArray(mappedProducts.map(() => false));
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductsData([]);
        setIsWishlistedArray([]);
        setIsComparedArray([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Infinite loop setup with dynamic card width
  const repeatCount = 10;
  const extendedProducts = Array(repeatCount).fill(productsData).flat();

  const getCardWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) return 224; // md:w-56 (56 * 4px = 224px)
    if (screenWidth >= 376) return 176; // xs:w-44 (44 * 4px = 176px)
    return 160; // w-40 (40 * 4px = 160px)
  };

  const getGapWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 640) return 12; // sm:gap-3 (3 * 4px = 12px)
    if (screenWidth >= 376) return 12; // xs:gap-3 (3 * 4px = 12px)
    return 8; // gap-2 (2 * 4px = 8px)
  };

  const [cardWidth, setCardWidth] = useState(getCardWidth());
  const [gapWidth, setGapWidth] = useState(getGapWidth());

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth());
      setGapWidth(getGapWidth());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize scroll position and handle infinite scroll
  const scrollDistance = cardWidth + gapWidth;
  const originalSetWidth = (productsData.length * cardWidth) + ((productsData.length - 1) * gapWidth);

  useEffect(() => {
    if (scrollRef.current && productsData.length > 0) {
      const middleSetIndex = Math.floor(repeatCount / 2);
      const initialScrollPosition = middleSetIndex * originalSetWidth;
      scrollRef.current.scrollTo({ left: initialScrollPosition, behavior: 'auto' });
    }
  }, [productsData, originalSetWidth]);

  const handleScroll = () => {
    if (!scrollRef.current || isScrolling.current) return;

    const scrollContainer = scrollRef.current;
    const currentScrollLeft = scrollContainer.scrollLeft;
    const maxScrollLeft = (repeatCount - 1) * originalSetWidth;

    if (currentScrollLeft <= originalSetWidth) {
      isScrolling.current = true;
      const newScrollLeft = currentScrollLeft + originalSetWidth;
      scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'auto' });
      isScrolling.current = false;
    } else if (currentScrollLeft >= maxScrollLeft - originalSetWidth) {
      isScrolling.current = true;
      const newScrollLeft = currentScrollLeft - originalSetWidth;
      scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'auto' });
      isScrolling.current = false;
    }
  };

  const scrollLeft = () => {
    if (!scrollRef.current || isScrolling.current) return;
    isScrolling.current = true;

    const scrollContainer = scrollRef.current;
    const currentScrollLeft = scrollContainer.scrollLeft;

    if (currentScrollLeft <= originalSetWidth) {
      const newScrollLeft = currentScrollLeft + originalSetWidth;
      scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'auto' });
      setTimeout(() => {
        scrollContainer.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        isScrolling.current = false;
      }, 0);
    } else {
      scrollContainer.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
      setTimeout(() => {
        isScrolling.current = false;
      }, 300);
    }
  };

  const scrollRight = () => {
    if (!scrollRef.current || isScrolling.current) return;
    isScrolling.current = true;

    const scrollContainer = scrollRef.current;
    const currentScrollLeft = scrollContainer.scrollLeft;
    const maxScrollLeft = (repeatCount - 1) * originalSetWidth;

    if (currentScrollLeft >= maxScrollLeft - originalSetWidth) {
      const newScrollLeft = currentScrollLeft - originalSetWidth;
      scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'auto' });
      setTimeout(() => {
        scrollContainer.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        isScrolling.current = false;
      }, 0);
    } else {
      scrollContainer.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      setTimeout(() => {
        isScrolling.current = false;
      }, 300);
    }
  };

  // Event handlers
  const handleWishlistClick = (index) => {
    setIsWishlistedArray((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  const handleCompareClick = (index) => {
    setIsComparedArray((prev) =>
      prev.map((item, i) => (i === index ? true : item))
    );
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedColor(product.colors?.[0] || null);
    setSelectedStorage(product.storageOptions?.includes('256GB') ? '256GB' : product.storageOptions?.[0] || null);
    setIsWishlisted(false);
    setIsCompared(false);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${selectedProduct.name} to cart`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    console.log(`${selectedProduct.name} ${isWishlisted ? 'removed from' : 'added to'} wishlist`);
  };

  const handleCompare = () => {
    setIsCompared(true);
    console.log(`${selectedProduct.name} added to compare`);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <div className="text-center py-4">Loading deals...</div>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto my-1 -mt-8 px-2 sm:px-4">
      {/* Deals of the Day Section */}
      <div
        className={`w-full text-center min-h-[320px] sm:min-h-[480px] transition-all duration-300 ${
          isHovered ? 'border-[1.2px] border-solid border-black rounded-xl' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-3 xs:mb-4 mt-4 xs:mt-5 sm:mt-6">Deals of the Day</h2>
        <div className="relative flex items-center h-[calc(100%-2rem)] xs:h-[calc(100%-2.5rem)]">
          <button
            className="absolute left-0 z-10 transform -translate-y-1/2 bg-white rounded-full w-8 xs:w-9 sm:w-10 md:w-12 h-8 xs:h-9 sm:h-10 md:h-12 shadow-md flex items-center justify-center"
            onClick={scrollLeft}
            style={{ top: '50%' }}
          >
            <ChevronLeft className="text-base xs:text-lg sm:text-xl md:text-2xl" />
          </button>
          <div
            className="flex overflow-x-auto scroll-smooth pt-3 xs:pt-4 hide-scrollbar snap-x snap-mandatory w-[320px] xs:w-[360px] sm:w-[384px] md:w-[476px] mx-auto"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            <div className="flex gap-2 xs:gap-3 sm:gap-3 md:gap-3">
              {extendedProducts.map((product, idx) => {
                const originalIndex = idx % productsData.length; // Map back to original product index
                return (
                  <DealCard
                    key={`${product.id}-${idx}`} // Unique key for React rendering
                    product={productsData[originalIndex]} // Pass the original product data
                    index={originalIndex} // Pass the original index for wishlist/compare
                    isWishlisted={isWishlistedArray[originalIndex]}
                    isCompared={isComparedArray[originalIndex]}
                    onWishlistToggle={handleWishlistClick}
                    onCompare={handleCompareClick}
                    onView={handleViewClick}
                    timeLeft={timeLeft}
                  />
                );
              })}
            </div>
          </div>
          <button
            className="absolute right-0 z-10 transform -translate-y-1/2 bg-white rounded-full w-8 xs:w-9 sm:w-10 md:w-12 h-8 xs:h-9 sm:h-10 md:h-12 shadow-md flex items-center justify-center"
            onClick={scrollRight}
            style={{ top: '50%' }}
          >
            <ChevronRight className="text-base xs:text-lg sm:text-xl md:text-2xl" />
          </button>
        </div>
      </div>

      {/* Product Details Pop-in Section */}
      {selectedProduct && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg z-50 p-4 sm:p-6 overflow-y-auto animate-slide-in">
          <button
            onClick={closeProductDetails}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-800 bg-white bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            ✕
          </button>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-40 sm:h-48 object-contain mb-3 sm:mb-4"
          />
          <h3 className="text-lg sm:text-xl font-bold mb-2">{selectedProduct.name}</h3>
          <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
            ${selectedProduct.price.discounted.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center mb-2">
            {[...Array(Math.round(selectedProduct.rating))].map((_, i) => (
              <svg
                key={i}
                className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
              ({selectedProduct.reviews || 1} customer review)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            <span role="img" aria-label="eye">👁</span> 23 people are viewing this product right now
          </p>
          <p className="text-xs sm:text-sm text-green-600 mb-3 sm:mb-4">
            <span className="mr-1">✔</span> {selectedProduct.stock || 100} in stock
          </p>

          {/* Color Selection */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Color:</p>
            <div className="flex space-x-1 sm:space-x-2">
              {selectedProduct.colors?.map((color, index) => (
                <button
                  key={index}
                  className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 ${
                    selectedColor === color ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Storage Selection */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Storage:</p>
            <div className="flex space-x-1 sm:space-x-2 flex-wrap gap-1 sm:gap-2">
              {selectedProduct.storageOptions?.map((storage, index) => (
                <button
                  key={index}
                  className={`px-2 sm:px-4 py-0.5 sm:py-1 border rounded text-xs sm:text-sm ${
                    selectedStorage === storage
                      ? 'border-black bg-gray-100'
                      : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-3 sm:mb-4">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-1 sm:px-2 py-1 border border-gray-300"
            >
              -
            </button>
            <span className="px-3 sm:px-4 py-1 border-t border-b border-gray-300 text-xs sm:text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-1 sm:px-2 py-1 border border-gray-300"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-1 sm:py-2 rounded mb-3 sm:mb-4 text-xs sm:text-sm"
          >
            ADD TO CART
          </button>

          {/* Add to Compare and Wishlist */}
          <div className="flex space-x-2 sm:space-x-4 mb-3 sm:mb-4">
            <button
              onClick={handleCompare}
              className="text-xs sm:text-sm text-gray-600 flex items-center"
            >
              <RefreshCw size={14} sm:size={16} className="mr-1" /> Add to compare
            </button>
            <button
              onClick={handleWishlistToggle}
              className="text-xs sm:text-sm text-gray-600 flex items-center"
            >
              <Heart size={14} sm:size={16} className="mr-1" /> Add to wishlist
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            <span className="font-semibold">SKU:</span> {selectedProduct.sku || '#00087560'}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            <span className="font-semibold">Category:</span> {selectedProduct.category}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            <span className="font-semibold">Tags:</span> {selectedProduct.tags?.join(', ') || 'Camera, Security, Battery'}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            <span className="font-semibold">Estimated delivery:</span> {selectedProduct.delivery || '5 days'}
          </p>

          {/* Share Options */}
          <div className="flex space-x-1 sm:space-x-2">
            <p className="text-xs sm:text-sm text-gray-600 font-semibold">Share:</p>
            <button className="text-gray-600 text-xs sm:text-sm">X</button>
            <button className="text-gray-600 text-xs sm:text-sm">f</button>
            <button className="text-gray-600 text-xs sm:text-sm">w</button>
            <button className="text-gray-600 text-xs sm:text-sm">p</button>
            <button className="text-gray-600 text-xs sm:text-sm">in</button>
            <button className="text-gray-600 text-xs sm:text-sm">@</button>
            <button className="text-gray-600 text-xs sm:text-sm">S</button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-mandatory {
          scroll-snap-stop: always;
        }
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </div>
  );
};

export default DealsSection;