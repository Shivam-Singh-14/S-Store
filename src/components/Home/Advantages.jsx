// // import React, { useEffect, useState } from 'react';
// // import { ChevronLeft, ChevronRight } from 'lucide-react';

// // // Static fallback data
// // const staticImages = [
// //   {
// //     src: 'https://static.scientificamerican.com/sciam/cache/file/6284F581-96A1-4D49-9F1B9F22EA328189_source.jpg?w=1200',
// //     alt: 'First Image',
// //     caption: 'Freedom with AirPods',
// //   },
// //   {
// //     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4c1y_7gy2crn2Ll_ZSWzcqb0WDZFuBnFTeQ&s',
// //     alt: 'Second Image',
// //     caption: 'Experience Sound',
// //   },
// //   {
// //     src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-whitetitanium?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1693004731998',
// //     alt: 'Third Image',
// //     caption: 'Discover the iPhone 15 Pro',
// //   },
// // ];

// // const ImageSlider = () => {
// //   const [images, setImages] = useState([]);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // Fetch images from API with fallback to static data
// //   useEffect(() => {
// //     const fetchImages = async () => {
// //       try {
// //         // Placeholder API call (replace with your actual API endpoint)
// //         const response = await fetch('https://api.example.com/images');
// //         const data = await response.json();
// //         // Assuming the API returns an array of objects with src, alt, and caption
// //         if (data && data.length > 0) {
// //           setImages(data);
// //         } else {
// //           setImages(staticImages);
// //         }
// //       } catch (error) {
// //         console.error('Failed to fetch images from API, using static data:', error);
// //         setImages(staticImages);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchImages();
// //   }, []);

// //   // Auto-slide effect
// //   useEffect(() => {
// //     if (images.length === 0) return;

// //     const interval = setInterval(() => {
// //       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
// //     }, 2000);

// //     return () => clearInterval(interval);
// //   }, [images]);

// //   // Manual navigation handlers
// //   const handlePrev = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
// //     );
// //   };

// //   const handleNext = () => {
// //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-[400px] w-full max-w-[90rem] mx-auto">
// //         <p className="text-xl text-gray-600">Loading...</p>
// //       </div>
// //     );
// //   }

// //   if (images.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-[400px] w-full max-w-[90rem] mx-auto">
// //         <p className="text-xl text-gray-600">No images available.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative w-full max-w-[90rem] mx-auto my-5 px-4">
// //       {/* Slider Container */}
// //       <div className="relative flex justify-center items-center">
// //         {/* Left Arrow */}
// //         <button
// //           className="absolute left-0 z-20 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center"
// //           onClick={handlePrev}
// //           style={{ top: '50%' }}
// //         >
// //           <ChevronLeft className="text-xl" />
// //         </button>

// //         {/* Image */}
// //         <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
// //           <img
// //             src={images[currentIndex].src}
// //             alt={images[currentIndex].alt}
// //             className="w-full h-full object-cover"
// //           />
// //           {/* Caption and Button Overlay */}
// //           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
// //             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
// //               {images[currentIndex].caption}
// //             </h2>
// //             <button className="bg-black text-white py-2 px-6 rounded text-base sm:text-lg font-semibold">
// //               Discover
// //             </button>
// //           </div>
// //         </div>

// //         {/* Right Arrow */}
// //         <button
// //           className="absolute right-0 z-20 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center"
// //           onClick={handleNext}
// //           style={{ top: '50%' }}
// //         >
// //           <ChevronRight className="text-xl" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImageSlider;


// import React, { useState, useRef } from 'react';
// import ProductCard from './ProductCard'; // Fixed import to match the actual file name
// import { Heart, RefreshCw } from 'lucide-react';

// const ProductCarousel = () => {
//   const scrollRef = useRef(null);
//   const [isWishlistedArray, setIsWishlistedArray] = useState(products.map(() => false));
//   const [isComparedArray, setIsComparedArray] = useState(products.map(() => false));
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedStorage, setSelectedStorage] = useState('256GB');
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isCompared, setIsCompared] = useState(false);

//   const scroll = (direction) => {
//     const { current } = scrollRef;
//     const cardWidth = current?.firstChild?.offsetWidth || 300;
//     const scrollAmount = cardWidth + 16;
//     if (direction === 'left') {
//       current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//     } else {
//       current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

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

//   return (
//     <div className="relative flex mx-auto my-5 max-w-[90rem] px-4">
//       {/* Main Carousel Section */}
//       <div className="flex-1 text-center">
//         <h2 className="text-2xl font-bold mb-4">New Arrival Products</h2>

//         <div className="relative flex items-center">
//           {/* Left Arrow */}
//           <button
//             className="absolute left-0 z-10 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center"
//             onClick={() => scroll('left')}
//             style={{ top: '50%' }}
//           >
//             <span className="text-xl">&gt;</span>
//           </button>

//           {/* Scrollable container */}
//           <div
//             className="flex overflow-x-auto scroll-smooth py-2 hide-scrollbar justify-between w-full gap-4"
//             ref={scrollRef}
//           >
//             {products.map((product, index) => (
//               <ProductCard
//                 key={index}
//                 product={product}
//                 index={index}
//                 isWishlisted={isWishlistedArray[index]}
//                 isCompared={isComparedArray[index]}
//                 onWishlistToggle={handleWishlistClick}
//                 onCompare={handleCompareClick}
//                 onView={handleViewClick}
//               />
//             ))}
//           </div>

//           {/* Right Arrow */}
//           <button
//             className="absolute right-0 z-10 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center"
//             onClick={() => scroll('right')}
//             style={{ top: '50%' }}
//           >
//             <span className="text-xl">&gt;</span>
//           </button>
//         </div>
//       </div>

//       {/* Product Details Pop-in Section */}
//       {selectedProduct && (
//         <div className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg z-50 p-6 overflow-y-auto animate-slide-in">
//           <button
//             onClick={closeProductDetails}
//             className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
//           >
//             ✕
//           </button>
//           <img
//             src={selectedProduct.image}
//             alt={selectedProduct.name}
//             className="w-full h-48 object-contain mb-4"
//           />
//           <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
//           <p className="text-lg font-semibold text-gray-700 mb-2">
//             ${selectedProduct.price.discounted.toLocaleString('en-US', {
//               minimumFractionDigits: 2,
//             })}
//           </p>
//           <div className="flex items-center mb-2">
//             {[...Array(Math.round(selectedProduct.rating))].map((_, i) => (
//               <svg
//                 key={i}
//                 className="w-5 h-5 text-green-500 fill-current"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//               </svg>
//             ))}
//             <span className="ml-2 text-sm text-gray-600">
//               ({selectedProduct.reviews || 1} customer review)
//             </span>
//           </div>
//           <p className="text-sm text-gray-600 mb-2">
//             <span role="img" aria-label="eye">👁</span> 23 people are viewing this product right now
//           </p>
//           <p className="text-sm text-green-600 mb-4">
//             <span className="mr-1">✔</span> {selectedProduct.stock || 100} in stock
//           </p>

//           {/* Color Selection */}
//           <div className="mb-4">
//             <p className="text-sm font-semibold mb-2">Color:</p>
//             <div className="flex space-x-2">
//               {selectedProduct.colors?.map((color, index) => (
//                 <button
//                   key={index}
//                   className={`w-6 h-6 rounded-full border-2 ${
//                     selectedColor === color ? 'border-black' : 'border-gray-300'
//                   }`}
//                   style={{ backgroundColor: color }}
//                   onClick={() => setSelectedColor(color)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Storage Selection */}
//           <div className="mb-4">
//             <p className="text-sm font-semibold mb-2">Storage:</p>
//             <div className="flex space-x-2">
//               {selectedProduct.storageOptions?.map((storage, index) => (
//                 <button
//                   key={index}
//                   className={`px-4 py-1 border rounded ${
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
//           <div className="flex items-center mb-4">
//             <button
//               onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//               className="px-2 py-1 border border-gray-300"
//             >
//               -
//             </button>
//             <span className="px-4 py-1 border-t border-b border-gray-300">{quantity}</span>
//             <button
//               onClick={() => setQuantity((prev) => prev + 1)}
//               className="px-2 py-1 border border-gray-300"
//             >
//               +
//             </button>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-black text-white py-2 rounded mb-4"
//           >
//             ADD TO CART
//           </button>

//           {/* Add to Compare and Wishlist */}
//           <div className="flex space-x-4 mb-4">
//             <button
//               onClick={handleCompare}
//               className="text-sm text-gray-600 flex items-center"
//             >
//               <RefreshCw size={16} className="mr-1" /> Add to compare
//             </button>
//             <button
//               onClick={handleWishlistToggle}
//               className="text-sm text-gray-600 flex items-center"
//             >
//               <Heart size={16} className="mr-1" /> Add to wishlist
//             </button>
//           </div>

//           {/* Additional Info */}
//           <p className="text-sm text-gray-600 mb-2">
//             <span className="font-semibold">SKU:</span> {selectedProduct.sku || '#00087560'}
//           </p>
//           <p className="text-sm text-gray-600 mb-2">
//             <span className="font-semibold">Category:</span> {selectedProduct.category}
//           </p>
//           <p className="text-sm text-gray-600 mb-2">
//             <span className="font-semibold">Tags:</span> {selectedProduct.tags?.join(', ') || 'Apple, iPhone, Natural, Titanium'}
//           </p>
//           <p className="text-sm text-gray-600 mb-2">
//             <span className="font-semibold">Estimated delivery:</span> {selectedProduct.delivery || '5 days'}
//           </p>

//           {/* Share Options */}
//           <div className="flex space-x-2">
//             <p className="text-sm text-gray-600 font-semibold">Share:</p>
//             <button className="text-gray-600">X</button>
//             <button className="text-gray-600">f</button>
//             <button className="text-gray-600">w</button>
//             <button className="text-gray-600">p</button>
//             <button className="text-gray-600">in</button>
//             <button className="text-gray-600">@</button>
//             <button className="text-gray-600">S</button>
//           </div>
//         </div>
//       )}

//       {/* Hide scrollbar */}
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
//       `}</style>
//     </div>
//   );
// };

// // Updated product data with additional fields for the slide-in panel and one more card for demonstration
// const products = [
//   {
//     category: 'Home',
//     name: 'Stick Up Cam Battery',
//     rating: 5,
//     reviews: 1,
//     price: { original: 159.99, discounted: 129.99 },
//     image: 'https://images-na.ssl-images-amazon.com/images/I/51L%2BzW0fDPL._AC_SL1000_.jpg',
//     hoverImage: 'https://images-na.ssl-images-amazon.com/images/I/51L%2BzW0fDPL._AC_SL1000_.jpg',
//     stock: 100,
//     colors: ['#A3BFFA', '#4A5568', '#2D3748', '#CBD5E0'],
//     storageOptions: ['128GB', '256GB', '512GB'],
//     sku: '#00087561',
//     tags: ['Camera', 'Security', 'Battery'],
//     delivery: '5 days',
//   },
//   {
//     category: 'Daily Deals',
//     name: 'Apple iPhone 15 Pro Max 256GB',
//     rating: 5,
//     reviews: 1,
//     price: { original: 1945.0, discounted: 1345.0 },
//     image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-whitetitanium?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1693004731998',
//     hoverImage: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1693004731998',
//     stock: 100,
//     colors: ['#A3BFFA', '#4A5568', '#2D3748', '#CBD5E0'],
//     storageOptions: ['256GB', '512GB', '1TB'],
//     sku: '#00087560',
//     tags: ['Apple', 'iPhone', 'Natural', 'Titanium'],
//     delivery: '5 days',
//   },
//   {
//     category: 'iPad & Tablets',
//     name: 'Arlo Spotlight Camera Security',
//     rating: 5,
//     reviews: 1,
//     price: { original: null, discounted: 2770.0 },
//     image: 'https://images-na.ssl-images-amazon.com/images/I/51%2B5W5W5W5L._AC_SL1000_.jpg',
//     hoverImage: 'https://images-na.ssl-images-amazon.com/images/I/51%2B5W5W5W5L._AC_SL1000_.jpg',
//     stock: 100,
//     colors: ['#A3BFFA', '#4A5568', '#2D3748', '#CBD5E0'],
//     storageOptions: ['128GB', '256GB', '512GB'],
//     sku: '#00087562',
//     tags: ['Camera', 'Security', 'Spotlight'],
//     delivery: '5 days',
//   },
//   {
//     category: 'Cell Phones',
//     name: 'iPhone 14',
//     rating: 4,
//     reviews: 1,
//     price: { original: 450.0, discounted: 650.0 },
//     image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1693004731998',
//     hoverImage: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1693004731998',
//     stock: 100,
//     colors: ['#A3BFFA', '#4A5568', '#2D3748', '#CBD5E0'],
//     storageOptions: ['128GB', '256GB', '512GB'],
//     sku: '#00087563',
//     tags: ['Apple', 'iPhone', 'Starlight'],
//     delivery: '5 days',
//   },
//   {
//     category: 'Smart Home',
//     name: 'Tesla - Universal Wall Connector',
//     rating: 5,
//     reviews: 1,
//     price: { original: null, discounted: 2770.0 },
//     image: 'https://www.tesla.com/sites/default/files/images/shop/charging/tesla-universal-wall-connector-white.png',
//     hoverImage: 'https://www.tesla.com/sites/default/files/images/shop/charging/tesla-universal-wall-connector-white.png',
//     stock: 100,
//     colors: ['#A3BFFA', '#4A5568', '#2D3748', '#CBD5E0'],
//     storageOptions: ['128GB', '256GB', '512GB'],
//     sku: '#00087564',
//     tags: ['Tesla', 'Charging', 'Wall Connector'],
//     delivery: '5 days',
//   },
//   {
//     category: 'Electronics',
//     name: 'Samsung Galaxy Watch 6',
//     rating: 4,
//     reviews: 1,
//     price: { original: 399.99, discounted: 349.99 },
//     image: 'https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-watch6-40mm-sm-r935fzeains-537162825?$1300_1038_PNG$',
//     hoverImage: 'https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-watch6-40mm-sm-r935fzeains-537162825?$1300_1038_PNG$',
//     stock: 50,
//     colors: ['#000000', '#FFD700', '#D3D3D3'],
//     storageOptions: ['16GB'],
//     sku: '#00087565',
//     tags: ['Samsung', 'Smartwatch', 'Fitness'],
//     delivery: '3 days',
//   }];


// Import necessary icons from lucide-react
import { CreditCard, CheckCircle, Gift, Clock, Truck, Settings, Zap, DollarSign } from "lucide-react";
// import "./advantage-sec.css";

const AdvantageItem = ({ icon, text }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-5 transition-transform duration-200 hover:-translate-y-1 shadow-sm">
      <div className="mr-3 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-gray-800 text-lg font-semibold">
        {text}
      </div>
    </div>
  );
};

const AdvantagesSection = () => {
  const advantages = [
    { icon: <CreditCard />, text: "Fee-Free Installment" },
    { icon: <CheckCircle />, text: "Best Price Guarantee" },
    { icon: <Gift />, text: "Bonus Program XStore" },
    { icon: <Clock />, text: "Pickup in 15 minutes" },
    { icon: <Truck />, text: "Convenient Delivery" },
    { icon: <Settings />, text: "Services and Services" },
    { icon: <Zap />, text: "Express Delivery in 2 Hours" },
    { icon: <DollarSign />, text: "Equipment Acceptance" },
  ];

  return (
    <section className="p-10 max-w-6xl mx-auto">
      <h2 className="text-center text-4xl font-bold mb-10 text-gray-900">Our Advantages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {advantages.map((advantage, index) => (
          <AdvantageItem key={index} icon={advantage.icon} text={advantage.text} />
        ))}
      </div>
    </section>
  );
};

export default AdvantagesSection;
