// import React, { useState, useEffect, useMemo } from 'react';
// import BannerShopPage from '../components/Shop/BannerShopPage';
// import Category from '../components/Shop/Category';
// import SortBy from '../components/Shop/SortBy';
// import ProductCard from '../components/Shop/ProductNew';
// import FilterSidebar from '../components/Shop/FilterSidebar';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Menu } from 'lucide-react';

// const dummyProducts = [
//   { id: 1, name: 'iPhone 16 Pro', price: 1199.99, priceRange: '$1,199.99', image: 'https://xstore.b-cdn.net/elementor3/electronic-mega-market/wp-content/uploads/sites/4/2023/11/Image-product-12.2-min-600x600.jpg', category: 'New Arrivals', rating: 5, popularity: 95, date: '2025-05-01', status: 'In Stock', color: 'Black', brand: 'Apple', seller: 'Clicktech Retail Private Ltd', deliveryDay: 'Tomorrow', payOnDelivery: true },
//   // ... more dummy products ...
// ];  

// const Shop = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [viewMode, setViewMode] = useState('grid');
//   const [columns, setColumns] = useState(4);
//   const [itemsToShow, setItemsToShow] = useState(12);
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     priceRange: [0, 4000],
//     rating: 0,
//     status: [],
//     colors: [],
//     brands: [],
//     sellers: [],
//     deliveryDay: [],
//     payOnDelivery: false,
//     categories: [],
//   });
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Get search and category from URL
//   const searchParams = new URLSearchParams(location.search);
//   const searchTerm = searchParams.get('search')?.toLowerCase() || '';
//   const category = searchParams.get('category')?.toLowerCase() || '';

//   // Map API product to local structure
//   const mapApiProduct = (apiProduct) => {
//     const mockSellers = [
//       'Clicktech Retail Private Ltd', 'Global Decor IN', 'Hamilton Housewares',
//       'SachdevaEnterprises1', 'Tech Solutions', 'Urban Mart', 'Gadget World',
//       'Home Essentials', 'BestBuy Electronics'
//     ];
//     const mockColors = ['Black', 'White', 'Gray', 'Silver', 'Blue'];
//     const mockDeliveryDays = ['Tomorrow', '2 Days'];
//     const mockStatus = apiProduct.price < 200 ? 'On Sale' : 'In Stock';
//     const mockDate = `2025-${String(Math.floor(Math.random() * 5) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
//     return {
//       id: apiProduct.id,
//       name: apiProduct.title,
//       price: apiProduct.price,
//       priceRange: `$${apiProduct.price.toFixed(2)}`,
//       image: apiProduct.image,
//       category: apiProduct.category.charAt(0).toUpperCase() + apiProduct.category.slice(1),
//       rating: Math.round(apiProduct.rating.rate),
//       popularity: Math.min(80 + Math.floor(apiProduct.rating.count / 10), 95),
//       date: mockDate,
//       status: mockStatus,
//       color: mockColors[Math.floor(Math.random() * mockColors.length)],
//       brand: apiProduct.title.split(' ')[0] || 'Unknown',
//       seller: mockSellers[Math.floor(Math.random() * mockSellers.length)],
//       deliveryDay: mockDeliveryDays[Math.floor(Math.random() * mockDeliveryDays.length)],
//       payOnDelivery: Math.random() > 0.5,
//     };
//   };

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch('https://fakestoreapi.com/products');
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();
//         const mappedProducts = data.map(mapApiProduct);
//         setAllProducts(mappedProducts);
//       } catch (err) {
//         setError('Failed to load products from API. Using fallback data.');
//         setAllProducts(dummyProducts);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Extract unique categories
//   const categories = useMemo(
//     () => Array.from(new Set(allProducts.map(p => p.category))).sort(),
//     [allProducts]
//   );

//   // Initialize filters.categories based on URL category parameter
//   useEffect(() => {
//     if (category) {
//       // Capitalize category to match product.category format
//       const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
//       if (categories.includes(formattedCategory) && !filters.categories.includes(formattedCategory)) {
//         setFilters(prev => ({
//           ...prev,
//           categories: [formattedCategory], // Set single category from URL
//         }));
//       }
//     } else {
//       // Clear category filter if no category in URL
//       setFilters(prev => ({
//         ...prev,
//         categories: [],
//       }));
//     }
//   }, [category, categories]);

//   // Apply filters and search
//   useEffect(() => {
//     let updatedProducts = [...allProducts];

//     // Filter by search term
//     if (searchTerm) {
//       const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
//       updatedProducts = updatedProducts.filter((product) => {
//         const searchableText = [
//           product.name,
//           product.category,
//           product.brand,
//           product.seller,
//           product.status,
//           product.color
//         ].map(text => (text || '').toLowerCase()).join(' ');
        
//         return searchTerms.every(term => searchableText.includes(term));
//       });
//     }

//     // Apply filters
//     updatedProducts = updatedProducts.filter((product) => {
//       const { priceRange, rating, status, colors, brands, sellers, deliveryDay, payOnDelivery, categories: selectedCategories } = filters;
//       const [minPrice, maxPrice] = priceRange;
//       return (
//         (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
//         product.price >= minPrice &&
//         product.price <= maxPrice &&
//         (rating === 0 || product.rating >= rating) &&
//         (status.length === 0 || status.includes(product.status)) &&
//         (colors.length === 0 || colors.includes(product.color)) &&
//         (brands.length === 0 || brands.includes(product.brand)) &&
//         (sellers.length === 0 || sellers.includes(product.seller)) &&
//         (deliveryDay.length === 0 || deliveryDay.includes(product.deliveryDay)) &&
//         (!payOnDelivery || product.payOnDelivery)
//       );
//     });

//     setFilteredProducts(updatedProducts);
//     setDisplayedProducts(updatedProducts);
//   }, [allProducts, filters, searchTerm]);

//   const handleViewChange = (mode) => {
//     setViewMode(mode);
//     console.log(`Shop: View mode updated to ${mode}`);
//   };

//   const handleColumnsChange = (numColumns) => {
//     setColumns(numColumns);
//     console.log(`Shop: Columns updated to ${numColumns}`);
//   };

//   const handleItemsChange = (numItems) => {
//     setItemsToShow(numItems);
//     console.log(`Shop: Items to show updated to ${numItems}`);
//   };

//   const handleSortChange = (sortedProducts) => {
//     setDisplayedProducts(sortedProducts);
//     console.log('Shop: Products sorted');
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//     console.log('Shop: Filters updated');
//   };

//   const finalProducts = itemsToShow === 'All' ? displayedProducts : displayedProducts.slice(0, itemsToShow);

//   const renderStars = (rating) => (
//     <div className="flex items-center">
//       {[...Array(5)].map((_, i) => (
//         <svg
//           key={i}
//           className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//         </svg>
//       ))}
//       <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">({rating}.0)</span>
//     </div>
//   );

//   return (
//     <div className="w-full bg-gray-100 min-h-screen">
//       <BannerShopPage />
//       <Category />
//       <div className="w-full mx-auto px-2 sm:px-4 lg:px-[60px] py-4 flex flex-col lg:flex-row gap-4 lg:gap-8">
//         <div className="lg:hidden flex justify-between items-center mb-4">
//           <button
//             className="flex items-center px-3 py-2 border border-gray-400 rounded text-gray-700"
//             onClick={() => setSidebarOpen(true)}
//             aria-label="Open filters"
//           >
//             <Menu className="w-5 h-5 mr-2" />
//             Filters
//           </button>
//         </div>
//         <div className="hidden lg:block w-full lg:w-1/4 mb-4 lg:mb-0">
//           <FilterSidebar
//             onFilterChange={handleFilterChange}
//             categories={categories}
//             products={allProducts}
//           />
//         </div>
//         {sidebarOpen && (
//           <div className="fixed inset-0 z-40 flex">
//             <div
//               className="fixed inset-0 bg-transparent"
//               onClick={() => setSidebarOpen(false)}
//             />
//             <div className="relative w-4/5 max-w-xs bg-white shadow-lg h-full p-4 overflow-y-auto z-50">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="font-bold text-lg">Filters</span>
//                 <button
//                   className="text-gray-600 text-2xl font-bold"
//                   onClick={() => setSidebarOpen(false)}
//                   aria-label="Close filters"
//                 >
//                   ×
//                 </button>
//               </div>
//               <FilterSidebar
//                 onFilterChange={handleFilterChange}
//                 categories={categories}
//                 products={allProducts}
//               />
//             </div>
//           </div>
//         )}
//         <div className="w-full lg:w-3/4">
//           <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
//             {category 
//               ? `Products in ${category.charAt(0).toUpperCase() + category.slice(1)}` 
//               : searchTerm 
//                 ? `Search Results for "${searchTerm}" (${filteredProducts.length} products)` 
//                 : 'Shop All'}
//           </h1>
//           <SortBy
//             onViewChange={handleViewChange}
//             onColumnsChange={handleColumnsChange}
//             onItemsChange={handleItemsChange}
//             onSortChange={handleSortChange}
//             products={filteredProducts}
//           />
//           {loading && (
//             <div className="text-center p-4">
//               <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//               <p className="mt-2 text-gray-600">Loading products...</p>
//             </div>
//           )}
//           {error && !loading && (
//             <p className="text-center text-red-600 p-4">{error}</p>
//           )}
//           {!loading && !error && (
//             <>
//               {finalProducts.length > 0 ? (
//                 <div className="p-0 sm:p-2">
//                   {viewMode === 'list' ? (
//                     <div className="space-y-4">
//                       {finalProducts.map((product) => (
//                         <div
//                           key={product.id}
//                           className="flex flex-col sm:flex-row items-start bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//                         >
//                           <div className="flex items-start w-full sm:w-1/2 mb-4 sm:mb-0">
//                             <img
//                               onClick={() => navigate(`/products/${product.id}`)}
//                               src={product.image}
//                               alt={product.name}
//                               className="w-24 h-24 sm:w-32 sm:h-32 object-contain mr-4"
//                             />
//                             <div className="flex flex-col">
//                               <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
//                                 {product.name}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-green-600 mb-1">{product.category}</p>
//                               {renderStars(product.rating)}
//                             </div>
//                           </div>
//                           <div className="w-full sm:w-1/2 text-left sm:text-right">
//                             <p className="text-base sm:text-lg font-bold text-gray-800 mb-2">
//                               ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-500 mb-1">
//                               Delivery by <span className="font-medium">{product.deliveryDay}</span>
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-500 mb-1">
//                               Status: <span className="font-medium">{product.status}</span>
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-500">
//                               Pay on Delivery:{' '}
//                               <span className="font-medium">{product.payOnDelivery ? 'Yes' : 'No'}</span>
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div
//                       className={`grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-${columns} lg:grid-cols-${columns}`}
//                     >
//                       {finalProducts.map((product) => (
//                         <div
//                           key={product.id}
//                           className="flex flex-col bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//                           onClick={() => navigate(`/products/${product.id}`)}
//                         >
//                           <ProductCard product={product} />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-center text-gray-600 p-4">
//                   {category ? `No products found in "${category.charAt(0).toUpperCase() + category.slice(1)}"` : searchTerm ? `No products found for "${searchTerm}"` : 'No products found matching your filters.'}
//                 </p>
//               )}
//               {finalProducts.length > 0 && finalProducts.length < displayedProducts.length && (
//                 <div className="text-center mt-6">
//                   <button
//                     onClick={() => setItemsToShow(itemsToShow + 12)}
//                     className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm sm:text-base"
//                   >
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;
import React, { useState, useEffect, useMemo } from 'react';
import BannerShopPage from '../components/Shop/BannerShopPage';
import Category from '../components/Shop/Category';
import SortBy from '../components/Shop/SortBy';
import ProductCard from '../components/Shop/ProductNew';
import FilterSidebar from '../components/Shop/FilterSidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const dummyProducts = [
  { id: 1, name: 'iPhone 16 Pro', price: 1199.99, priceRange: '$1,199.99', image: 'https://xstore.b-cdn.net/elementor3/electronic-mega-market/wp-content/uploads/sites/4/2023/11/Image-product-12.2-min-600x600.jpg', category: 'New Arrivals', rating: 5, popularity: 95, date: '2025-05-01', status: 'In Stock', color: 'Black', brand: 'Apple', seller: 'Clicktech Retail Private Ltd', deliveryDay: 'Tomorrow', payOnDelivery: true },
  // ... more dummy products ...
];  

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid');
  const [columns, setColumns] = useState(4);
  const [itemsToShow, setItemsToShow] = useState(12);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 4000],
    rating: 0,
    status: [],
    colors: [],
    brands: [],
    sellers: [],
    deliveryDay: [],
    payOnDelivery: false,
    categories: [],
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get search, category, and brand from URL
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';
  const brand = searchParams.get('brand') || ''; // Get brand from URL

  // Extract unique categories
  const categories = useMemo(
    () => Array.from(new Set(allProducts.map(p => p.category))).sort(),
    [allProducts]
  );

  // Initialize filters.categories based on URL category parameter
  useEffect(() => {
    if (category) {
      // Capitalize category to match product.category format
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      if (categories.includes(formattedCategory) && !filters.categories.includes(formattedCategory)) {
        setFilters(prev => ({
          ...prev,
          categories: [formattedCategory], // Set single category from URL
        }));
      }
    } else {
      // Clear category filter if no category in URL
      setFilters(prev => ({
        ...prev,
        categories: [],
      }));
    }
  }, [category, categories]);

  // Initialize filters.brands based on URL brand parameter
  useEffect(() => {
    if (brand) {
      // Ensure brand matches the product.brand format
      const formattedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
      if (!filters.brands.includes(formattedBrand)) {
        setFilters(prev => ({
          ...prev,
          brands: [formattedBrand], // Set single brand from URL
        }));
      }
    } else {
      // Clear brand filter if no brand in URL
      setFilters(prev => ({
        ...prev,
        brands: [],
      }));
    }
  }, [brand]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        const mappedProducts = data.map(mapApiProduct);
        setAllProducts(mappedProducts);
      } catch (err) {
        setError('Failed to load products from API. Using fallback data.');
        setAllProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Map API product to local structure
  const mapApiProduct = (apiProduct) => {
    const mockSellers = [
      'Clicktech Retail Private Ltd', 'Global Decor IN', 'Hamilton Housewares',
      'SachdevaEnterprises1', 'Tech Solutions', 'Urban Mart', 'Gadget World',
      'Home Essentials', 'BestBuy Electronics'
    ];
    const mockColors = ['Black', 'White', 'Gray', 'Silver', 'Blue'];
    const mockDeliveryDays = ['Tomorrow', '2 Days'];
    const mockStatus = apiProduct.price < 200 ? 'On Sale' : 'In Stock';
    const mockDate = `2025-${String(Math.floor(Math.random() * 5) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    return {
      id: apiProduct.id,
      name: apiProduct.title,
      price: apiProduct.price,
      priceRange: `$${apiProduct.price.toFixed(2)}`,
      image: apiProduct.image,
      category: apiProduct.category.charAt(0).toUpperCase() + apiProduct.category.slice(1),
      rating: Math.round(apiProduct.rating.rate),
      popularity: Math.min(80 + Math.floor(apiProduct.rating.count / 10), 95),
      date: mockDate,
      status: mockStatus,
      color: mockColors[Math.floor(Math.random() * mockColors.length)],
      brand: apiProduct.title.split(' ')[0] || 'Unknown',
      seller: mockSellers[Math.floor(Math.random() * mockSellers.length)],
      deliveryDay: mockDeliveryDays[Math.floor(Math.random() * mockDeliveryDays.length)],
      payOnDelivery: Math.random() > 0.5,
    };
  };

  // Apply filters and search
  useEffect(() => {
    let updatedProducts = [...allProducts];

    // Filter by search term
    if (searchTerm) {
      const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
      updatedProducts = updatedProducts.filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.brand,
          product.seller,
          product.status,
          product.color
        ].map(text => (text || '').toLowerCase()).join(' ');
        
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Apply filters
    updatedProducts = updatedProducts.filter((product) => {
      const { priceRange, rating, status, colors, brands, sellers, deliveryDay, payOnDelivery, categories: selectedCategories } = filters;
      const [minPrice, maxPrice] = priceRange;
      return (
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (rating === 0 || product.rating >= rating) &&
        (status.length === 0 || status.includes(product.status)) &&
        (colors.length === 0 || colors.includes(product.color)) &&
        (brands.length === 0 || brands.includes(product.brand)) &&
        (sellers.length === 0 || sellers.includes(product.seller)) &&
        (deliveryDay.length === 0 || deliveryDay.includes(product.deliveryDay)) &&
        (!payOnDelivery || product.payOnDelivery)
      );
    });

    setFilteredProducts(updatedProducts);
    setDisplayedProducts(updatedProducts);
  }, [allProducts, filters, searchTerm]);

  const handleViewChange = (mode) => {
    setViewMode(mode);
    console.log(`Shop: View mode updated to ${mode}`);
  };

  const handleColumnsChange = (numColumns) => {
    setColumns(numColumns);
    console.log(`Shop: Columns updated to ${numColumns}`);
  };

  const handleItemsChange = (numItems) => {
    setItemsToShow(numItems);
    console.log(`Shop: Items to show updated to ${numItems}`);
  };

  const handleSortChange = (sortedProducts) => {
    setDisplayedProducts(sortedProducts);
    console.log('Shop: Products sorted');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    console.log('Shop: Filters updated');
  };

  const finalProducts = itemsToShow === 'All' ? displayedProducts : displayedProducts.slice(0, itemsToShow);

  const renderStars = (rating) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">({rating}.0)</span>
    </div>
  );

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <BannerShopPage />
      <Category />
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-[60px] py-4 flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button
            className="flex items-center px-3 py-2 border border-gray-400 rounded text-gray-700"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open filters"
          >
            <Menu className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
        <div className="hidden lg:block w-full lg:w-1/4 mb-4 lg:mb-0">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            categories={categories}
            products={allProducts}
          />
        </div>
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-transparent"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-4/5 max-w-xs bg-white shadow-lg h-full p-4 overflow-y-auto z-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Filters</span>
                <button
                  className="text-gray-600 text-2xl font-bold"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close filters"
                >
                  ×
                </button>
              </div>
              <FilterSidebar
                onFilterChange={handleFilterChange}
                categories={categories}
                products={allProducts}
              />
            </div>
          </div>
        )}
        <div className="w-full lg:w-3/4">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
            {category 
              ? `Products in ${category.charAt(0).toUpperCase() + category.slice(1)}` 
              : searchTerm 
                ? `Search Results for "${searchTerm}" (${filteredProducts.length} products)` 
                : 'Shop All'}
          </h1>
          <SortBy
            onViewChange={handleViewChange}
            onColumnsChange={handleColumnsChange}
            onItemsChange={handleItemsChange}
            onSortChange={handleSortChange}
            products={filteredProducts}
          />
          {loading && (
            <div className="text-center p-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          )}
          {error && !loading && (
            <p className="text-center text-red-600 p-4">{error}</p>
          )}
          {!loading && !error && (
            <>
              {finalProducts.length > 0 ? (
                <div className="p-0 sm:p-2">
                  {viewMode === 'list' ? (
                    <div className="space-y-4">
                      {finalProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex flex-col sm:flex-row items-start bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                          <div className="flex items-start w-full sm:w-1/2 mb-4 sm:mb-0">
                            <img
                              onClick={() => navigate(`/products/${product.id}`)}
                              src={product.image}
                              alt={product.name}
                              className="w-24 h-24 sm:w-32 sm:h-32 object-contain mr-4"
                            />
                            <div className="flex flex-col">
                              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                                {product.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-green-600 mb-1">{product.category}</p>
                              {renderStars(product.rating)}
                            </div>
                          </div>
                          <div className="w-full sm:w-1/2 text-left sm:text-right">
                            <p className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mb-1">
                              Delivery by <span className="font-medium">{product.deliveryDay}</span>
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mb-1">
                              Status: <span className="font-medium">{product.status}</span>
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Pay on Delivery:{' '}
                              <span className="font-medium">{product.payOnDelivery ? 'Yes' : 'No'}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-${columns} lg:grid-cols-${columns}`}
                    >
                      {finalProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex flex-col bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-600 p-4">
                  {category ? `No products found in "${category.charAt(0).toUpperCase() + category.slice(1)}"` : searchTerm ? `No products found for "${searchTerm}"` : 'No products found matching your filters.'}
                </p>
              )}
              {finalProducts.length > 0 && finalProducts.length < displayedProducts.length && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setItemsToShow(itemsToShow + 12)}
                    className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm sm:text-base"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;