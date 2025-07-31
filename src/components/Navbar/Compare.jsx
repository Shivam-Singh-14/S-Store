// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
// import toast from "react-hot-toast";
// import { XCircle } from "lucide-react";

// const API_BASE = 'https://fakestoreapi.com';

// // Utility function to get current user from local storage
// const getCurrentUser = () => {
//   const usersData = localStorage.getItem('users');
//   const users = usersData ? JSON.parse(usersData) : [];
//   const user = users.length > 0 ? users[0] : null;
//   if (user && !user.userId) {
//     user.userId = user.email || user.username || 'default-user';
//   }
//   return user;
// };

// // Utility function to get compare list from local storage
// const getCompareFromStorage = (compareKey) => {
//   try {
//     const data = localStorage.getItem(compareKey);
//     if (data) return JSON.parse(data);
//   } catch (error) {
//     console.error("Compare: Error parsing compareList from localStorage:", error);
//   }
//   return [];
// };

// // Utility function to save compare list to local storage
// const saveCompareToStorage = (compareKey, compare) => {
//   try {
//     localStorage.setItem(compareKey, JSON.stringify(compare));
//     // Dispatch a custom storage event to potentially notify other components
//     window.dispatchEvent(new StorageEvent('storage', { key: compareKey, newValue: JSON.stringify(compare) }));
//   } catch (error) {
//     console.error(`Compare: Error saving compareList to localStorage for ${compareKey}:`, error);
//     throw new Error("Failed to save compare list to localStorage");
//   }
// };

// // Utility function for API call with local storage fallback (for GET operations)
// const safeFetch = async (url, localStorageKey) => {
//   try {
//     console.log(`Compare: Attempting API GET from ${url}`);
//     // For compare list, we primarily rely on local storage as Fake Store API has no dedicated endpoint.
//     // A real backend API call would go here.

//     console.warn(`Compare: API GET for ${url} (compare list) skipped due to Fake Store API limitations. Reading from local storage.`);
    
//     // Always attempt local storage read for compare lists in this Fake Store API context
//     try {
//       const localData = localStorage.getItem(localStorageKey);
//       console.log(`Compare: Successfully retrieved from local storage for ${localStorageKey}`);
//       return { success: true, local: true, data: localData ? JSON.parse(localData) : [] };
//     } catch (lsError) {
//       console.error(`Compare: Failed to retrieve from local storage for ${localStorageKey}:`, lsError);
//       return { success: false, error: 'Local storage read failed.' };
//     }

//   } catch (apiError) {
//      console.warn(`Compare: API GET for ${url} failed (likely due to limitations):`, apiError, `. Reading from local storage as intended.`);
//     // Fallback to local storage on any API errors as well
//     try {
//       const localData = localStorage.getItem(localStorageKey);
//       console.log(`Compare: Successfully retrieved from local storage for ${localStorageKey}`);
//       return { success: true, local: true, data: localData ? JSON.parse(localData) : [] };
//     } catch (lsError) {
//       console.error(`Compare: Failed to retrieve from local storage for ${localStorageKey}:`, lsError);
//       return { success: false, error: 'Local storage read failed.' };
//     }
//   }
// };

// // Utility function for API call with local storage fallback (for send operations - POST, PUT, DELETE)
// // Note: Fake Store API has limitations for granular compare list updates via API.
// // This function will primarily handle local storage updates for compare list modifications.
// const safeSend = async (url, method, data, localStorageKey) => {
//   try {
//     console.log(`Compare: Attempting API ${method} to ${url} with data:`, data);
//     // For Fake Store API compare list updates, we'll mostly rely on local storage as API support is limited.
//     // A real backend API call would go here.

//     console.warn(`Compare: API ${method} for ${url} (compare list modification) skipped due to Fake Store API limitations. Updating local storage.`);
    
//     // Always attempt local storage update for compare list modifications in this Fake Store API context
//     try {
//       localStorage.setItem(localStorageKey, JSON.stringify(data));
//       console.log(`Compare: Successfully updated local storage for ${localStorageKey}`);
//       // Dispatch a custom storage event to potentially notify other components
//       window.dispatchEvent(new StorageEvent('storage', { key: localStorageKey, newValue: JSON.stringify(data) }));
//       return { success: true, local: true }; // Indicate local success
//     } catch (lsError) {
//       console.error(`Compare: Failed to update local storage for ${localStorageKey}:`, lsError);
//       return { success: false, error: 'Local storage update failed.' };
//     }

//   } catch (apiError) {
//      console.warn(`Compare: API ${method} for ${url} failed (likely due to limitations):`, apiError, `. Updating local storage as intended.`);
//     // Fallback to local storage on any API errors as well
//     try {
//       localStorage.setItem(localStorageKey, JSON.stringify(data));
//       console.log(`Compare: Successfully updated local storage for ${localStorageKey}`);
//        // Dispatch a custom storage event to potentially notify other components
//       window.dispatchEvent(new StorageEvent('storage', { key: localStorageKey, newValue: JSON.stringify(data) }));
//       return { success: true, local: true }; // Indicate local success
//     } catch (lsError) {
//       console.error(`Compare: Failed to update local storage for ${localStorageKey}:`, lsError);
//       return { success: false, error: 'Local storage update failed.' };
//     }
//   }
// };

// const Compare = () => {
//   const user = getCurrentUser();
//   const userId = user?.userId || "default-user";
//   const compareKey = `compare_${userId}`;

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [message, setMessage] = useState(""); // For user feedback messages
//   const tableRef = useRef(null);
//   const navigate = useNavigate();

//   // Check if localStorage is available
//   const isLocalStorageAvailable = () => typeof window !== "undefined" && window.localStorage;

//   // Fetch product details from API by IDs
//   const fetchProductsByIds = async (ids) => {
//     if (!ids || ids.length === 0) return []; // Allow empty compare list
//     try {
//       const requests = ids.map(id =>
//         fetch(`${API_BASE}/products/${id}`).then(res => res.json())
//       );
//       const data = await Promise.all(requests);

//       return data.map(item => ({
//         id: item.id,
//         title: item.title,
//         image: item.image,
//         quantity: 1,
//         price: item.price,
//         totalPrice: item.price * 1,
//         stock: 100,
//         brand: item.category,
//         sku: `#SKU${item.id}`,
//       }));
//     } catch (err) {
//       throw err;
//     }
//   };

//   // Effect to handle compare list loading and syncing based on userId
//   useEffect(() => {
//     // Ensure userId is available before attempting to load compare list
//     if (!userId || userId === "default-user") {
//       setProducts([]);
//       setError(null); // No error for empty list due to no user
//       setLoading(false);
//       console.log("Compare useEffect: Waiting for valid userId.");
//       return;
//     }

//     console.log(`Compare useEffect: Setting up compare logic for user: ${userId} with key ${compareKey}`);

//     const fetchProductsFromLocalStorage = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!isLocalStorageAvailable()) {
//           throw new Error("Local storage is not available in this environment.");
//         }

//         // Use safeFetch to get compare list data (will use local storage fallback)
//         const apiEndpoint = `/api/compare?userId=${userId}`; // Placeholder API endpoint
//         const result = await safeFetch(apiEndpoint, compareKey);

//         if (result.success) {
//              let compareList = result.data; // Get data from successful fetch (local storage)
//              console.log("Compare: fetchProductsFromLocalStorage - Raw data from storage: ", compareList);

//             // Filter out any null or undefined items and ensure they have an ID
//              compareList = compareList.filter(item => item && item.id);

//             // Check if items are full product objects or just IDs
//             // If they are just IDs, fetch full details (fallback for older storage format)
//             if (compareList.length > 0 && typeof compareList[0] === 'number') { // Assuming IDs are numbers
//                 console.log("Compare: Detected old storage format (IDs only), fetching full details...");
//                 const productIds = compareList;
//                 const fetchedDetails = await fetchProductsByIds(productIds);
//                 setProducts(fetchedDetails);
//             } else {
//                  // Assume they are full product objects saved by ProductCard
//                  // Ensure each item has necessary properties if missing (defensive)
//                  const normalizedProducts = compareList.map(item => ({
//                      ...item,
//                      id: item.id || `temp-id-${Date.now()}`,
//                      name: item.name || 'Unknown Product',
//                      image: item.image || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : 'https://placehold.co/100x100?text=No+Image'),
//                      price: typeof item.price === 'number' ? item.price : 0,
//                      sku: item.sku || `SKU-${(item.id)?.toString().padStart(6, '0')}`,
//                      quantity: typeof item.quantity === 'number' ? item.quantity : 1, // Add quantity for consistency if needed
//                      storage: item.storage || 'N/A',
//                      color: item.color || 'N/A',
//                  }));
//                  setProducts(normalizedProducts);
//                  console.log("Compare: Using full product objects from storage.");
//             }

//         } else {
//             console.error("Compare: Failed to fetch compare data:", result.error);
//              setError(result.error);
//              setProducts([]); // Ensure products array is empty on failure
//         }
//         setLoading(false);

//       } catch (error) {
//         console.error("Compare: Error fetching products from local storage:", error);
//         setError("Failed to load comparison list.");
//         setProducts([]); // Ensure products array is empty on error
//         setLoading(false);
//       }
//     };

//     // Initial fetch
//     fetchProductsFromLocalStorage();

//      // Listen for changes to localStorage for the specific compare key
//     const handleStorageChange = (event) => {
//       if (event.key === compareKey) {
//         console.log(`Compare: Storage change detected for key: ${compareKey}`, event);
//         // Re-fetch the data when local storage changes
//         fetchProductsFromLocalStorage();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     // Cleanup function
//     return () => {
//       console.log("Compare useEffect: Cleaning up storage listener.");
//       window.removeEventListener('storage', handleStorageChange);
//     };

//   }, [userId, compareKey]); // Re-run effect if userId or compareKey changes

//   const handleRemoveFromCompare = async (id) => {
//      if (!userId || userId === "default-user") {
//       setMessage("Please log in to remove items from compare list");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     console.log(`Compare: handleRemoveFromCompare - Removing item ${id} for user: ${userId}`);

//     // Get current compare list state to update
//     const currentCompare = getCompareFromStorage(compareKey);
//     const updatedCompare = currentCompare.filter(item => item.id !== id);

//     // Use safeSend to attempt API update and fallback to local storage
//     const apiEndpoint = `/api/compare/${id}?userId=${userId}`; // Placeholder: Assuming an endpoint for removing item by ID
//     const method = 'DELETE';
//      const payload = { productId: id }; // Example payload

//     const result = await safeSend(apiEndpoint, method, updatedCompare, compareKey); // Send updated compare array, use updatedCompare for local fallback

//     if (result.success) {
//         setProducts(updatedCompare); // Update UI state immediately on success (either API or local)
//         console.log('Compare: Item removal successful:', result);
//          setMessage("Item removed from compare list");
//         setTimeout(() => setMessage(""), 3000);
//     } else {
//         console.error('Compare: Item removal failed:', result.error);
//          setMessage("Failed to remove item. Please try again.");
//         setTimeout(() => setMessage(""), 3000);
//         // Optionally revert UI state if necessary
//     }
//   };

//   const handleClearCompare = async () => {
//      if (!userId || userId === "default-user") {
//       setMessage("Please log in to clear your compare list");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//      console.log(`Compare: handleClearCompare - Clearing list for user: ${userId}`);

//     // Use safeSend to attempt API update and fallback to local storage
//     const apiEndpoint = `/api/compare?userId=${userId}`; // Placeholder: Assuming an endpoint for clearing compare list
//     const method = 'DELETE'; // Or 'PUT' with empty array
//     const payload = { userId: userId }; // Example payload for clearing

//      const result = await safeSend(apiEndpoint, method, [], compareKey); // Send empty array, use empty array for local fallback

//     if (result.success) {
//         setProducts([]);
//         console.log('Compare: Compare list cleared successfully:', result);
//         setMessage("Compare list cleared");
//         setTimeout(() => setMessage(""), 3000);
//     } else {
//         console.error('Compare: Compare list clear failed:', result.error);
//          setMessage("Failed to clear compare list. Please try again.");
//         setTimeout(() => setMessage(""), 3000);
//         // Optionally revert UI state if necessary
//     }
//   };

//   const handleQuantityChange = (id, delta) => {
//     if (!userId) {
//       setMessage("Please log in to modify your compare list");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     const updatedProducts = products.map(product => {
//       if (product.id === id) {
//         const newQuantity = Math.max(1, (product.quantity || 1) + delta);
//         return {
//           ...product,
//           quantity: newQuantity,
//           totalPrice: product.price * newQuantity // Update totalPrice
//         };
//       }
//       return product;
//     });
//     setProducts(updatedProducts);
//     saveCompareToStorage(compareKey, updatedProducts);
//     setMessage(delta > 0 ? "Quantity increased" : "Quantity decreased");
//     setTimeout(() => setMessage(""), 3000);
//   };

//   const addToCart = (id) => {
//     if (!userId) {
//       setMessage("Please log in to add items to your cart");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     setMessage(`Product ${id} added to cart!`);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   const handleSelectProduct = (id) => {
//     if (!userId) {
//       setMessage("Please log in to select products");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     setSelectedProducts(prev =>
//       prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
//     );
//   };

//   const scrollTable = (direction) => {
//     const scrollAmount = direction === 'left' ? -200 : 200;
//     if (tableRef.current) {
//       tableRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Navigate to Shop Now page
//   const handleCompareMore = () => {
//     if (!userId) {
//       setMessage("Please log in to compare more products");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }
//     navigate('/shop');
//   };

//   if (loading) {
//     return <div className="text-center py-10 text-lg">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-xl sm:text-2xl font-bold text-center my-6 sm:my-8">Compare</h1>
//       {message && (
//         <div className="mb-4 text-center text-sm text-gray-600">{message}</div>
//       )}
//       {error && products.length === 0 ? (
//         <div className="text-center py-10 text-gray-500 text-base sm:text-lg">{error}</div>
//       ) : (
//         <div className="relative">
//           <button
//             onClick={() => scrollTable('left')}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 z-10 sm:left-[-20px] lg:left-[-40px]"
//           >
//             <ChevronLeft size={20} className="sm:size-24" />
//           </button>
//           <button
//             onClick={() => scrollTable('right')}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 z-10 sm:right-[-20px] lg:right-[-40px]"
//           >
//             <ChevronRight size={20} className="sm:size-24" />
//           </button>

//           <div className="overflow-x-auto" ref={tableRef}>
//             <table className="w-full min-w-[300px] sm:min-w-[600px] lg:w-[1200px] border-collapse table-fixed hidden md:table mx-auto">
//               <tbody>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Action</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
//                       {product.title && (
//                         <button
//                           className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-xs sm:text-sm"
//                           onClick={() => handleRemoveFromCompare(product.id)}
//                         >
//                           <Trash2 size={14} className="sm:size-16" />
//                           <span>Delete</span>
//                         </button>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Image</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
//                       {product.image && <img src={product.image} alt={product.title || "Product image"} className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto object-contain" />}
//                     </td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Title</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm truncate">{product.title}</td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Quantity</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
//                       {product.quantity && (
//                         <div className="flex items-center justify-center space-x-2 sm:space-x-3">
//                           <button
//                             onClick={() => handleQuantityChange(product.id, -1)}
//                             className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded text-xs sm:text-sm"
//                           >
//                             -
//                           </button>
//                           <span className="text-xs sm:text-sm">{product.quantity}</span>
//                           <button
//                             onClick={() => handleQuantityChange(product.id, 1)}
//                             className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded text-xs sm:text-sm"
//                           >
//                             +
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Price</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm">
//                       {product.totalPrice && `$${product.totalPrice.toFixed(2)}`}
//                     </td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Button</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
//                       {product.title && (
//                         <button
//                           onClick={() => addToCart(product.id)}
//                           className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-green-600 w-full text-xs sm:text-sm"
//                         >
//                           Add to Cart
//                         </button>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Stock Status</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm">
//                       {product.stock !== undefined && product.stock !== null && (
//                         <span className="text-green-600 flex items-center">
//                           <span className="mr-1">✔</span>
//                           {product.stock} in stock
//                         </span>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Brand</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm">{product.brand}</td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">SKU</td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm">{product.sku}</td>
//                   ))}
//                 </tr>
//                 <tr>
//                   <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">
//                     <div className="flex justify-center items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         checked={selectedProducts.length === products.length && products.length > 0}
//                         onChange={(e) => {
//                           const allSelectable = products.map(p => p.id);
//                           setSelectedProducts(e.target.checked ? allSelectable : []);
//                         }}
//                         className="h-4 w-4 sm:h-5 sm:w-5"
//                       />
//                       <span className="text-xs sm:text-sm">Select</span>
//                     </div>
//                   </td>
//                   {products.map(product => (
//                     <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
//                       {product.title && (
//                         <input
//                           type="checkbox"
//                           checked={selectedProducts.includes(product.id)}
//                           onChange={() => handleSelectProduct(product.id)}
//                           className="h-4 w-4 sm:h-5 sm:w-5 mx-auto block"
//                         />
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               </tbody>
//             </table>

//             <div className="md:hidden space-y-6">
//               {products.map(product => (
//                 <div key={product.id} className="border rounded-lg p-4 sm:p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-semibold text-sm sm:text-base truncate">{product.title}</h3>
//                     <button
//                       className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-xs sm:text-sm"
//                       onClick={() => handleRemoveFromCompare(product.id)}
//                     >
//                       <Trash2 size={14} className="sm:size-16" />
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                   <img src={product.image} alt={product.title || "Product image"} className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 object-contain" />
//                   <div className="space-y-3 text-xs sm:text-sm">
//                     <p><span className="font-semibold">Quantity:</span></p>
//                     <div className="flex items-center justify-center space-x-2 sm:space-x-3">
//                       <button
//                         onClick={() => handleQuantityChange(product.id, -1)}
//                         className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded"
//                       >
//                         -
//                       </button>
//                       <span>{product.quantity}</span>
//                       <button
//                         onClick={() => handleQuantityChange(product.id, 1)}
//                         className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <p><span className="font-semibold">Price:</span> ${product.totalPrice.toFixed(2)}</p>
//                     <button
//                       onClick={() => addToCart(product.id)}
//                       className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded w-full hover:bg-green-600"
//                     >
//                       Add to Cart
//                     </button>
//                     <p>
//                       <span className="font-semibold">Stock Status:</span>{" "}
//                       <span className="text-green-600 flex items-center">
//                         <span className="mr-1">✔</span>
//                         {product.stock} in stock
//                       </span>
//                     </p>
//                     <p><span className="font-semibold">Brand:</span> {product.brand}</p>
//                     <p><span className="font-semibold">SKU:</span> {product.sku}</p>
//                     <div className="flex items-center justify-center space-x-2 mt-4">
//                       <span className="font-semibold">Select</span>
//                       <input type="checkbox" disabled className="h-4 w-4 sm:h-5 sm:w-5" />
//                     </div>
//                     <div className="flex items-center justify-center space-x-2 mt-2">
//                       <input
//                         type="checkbox"
//                         checked={selectedProducts.includes(product.id)}
//                         onChange={() => handleSelectProduct(product.id)}
//                         className="h-4 w-4 sm:h-5 sm:w-5"
//                       />
//                       <span>Select Product</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
//         <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
//           <select className="border rounded p-2 text-xs sm:text-sm w-full sm:w-40">
//             <option>Add to cart</option>
//             <option>Remove</option>
//           </select>
//           <button className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-gray-800 text-xs sm:text-sm w-full sm:w-auto">
//             Apply
//           </button>
//         </div>
//         <button
//           className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-gray-800 text-xs sm:text-sm w-full sm:w-auto"
//           onClick={handleCompareMore}
//         >
//           Compare More Products
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Compare;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE = 'https://fakestoreapi.com';

// Utility function to get current user from local storage
const getCurrentUser = () => {
  try {
    const currentUserData = localStorage.getItem('currentUser');
    const user = currentUserData ? JSON.parse(currentUserData) : null;
    if (user && !user.userId) {
      user.userId = user.email || user.username; // No default-user fallback
    }
    return user;
  } catch (error) {
    console.error('Error parsing currentUser from localStorage:', error);
    return null;
  }
};

// Utility functions for localStorage
const getCompareFromStorage = (compareKey) => {
  try {
    const data = localStorage.getItem(compareKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error parsing compare from localStorage for ${compareKey}:`, error);
    return [];
  }
};

const saveCompareToStorage = (compareKey, compare) => {
  try {
    localStorage.setItem(compareKey, JSON.stringify(compare));
  } catch (error) {
    console.error(`Error saving compare to localStorage for ${compareKey}:`, error);
  }
};

// Use a static user id or get from your auth logic
const user = getCurrentUser();
const userId = user?.userId || null; // No default-user fallback
const compareKey = userId ? `compare_${userId}` : null;

const Compare = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [message, setMessage] = useState(""); // For user feedback messages
  const tableRef = useRef(null);
  const navigate = useNavigate();

  // Check if localStorage is available
  const isLocalStorageAvailable = () => typeof window !== "undefined" && window.localStorage;

  // Fetch product details from API by IDs
  const fetchProductsByIds = async (ids) => {
    if (!ids || ids.length === 0) return []; // Allow empty compare list
    try {
      const requests = ids.map(id =>
        fetch(`${API_BASE}/products/${id}`).then(res => res.json())
      );
      const data = await Promise.all(requests);

      return data.map(item => ({
        id: item.id,
        title: item.title,
        image: item.image,
        quantity: 1,
        price: item.price,
        totalPrice: item.price * 1,
        stock: 100,
        brand: item.category,
        sku: `#SKU${item.id}`,
      }));
    } catch (err) {
      throw err;
    }
  };

  const fetchProductsFromLocalStorage = async () => {
    try {
      if (!isLocalStorageAvailable()) {
        throw new Error("Local storage is not available in this environment.");
      }

      if (!userId) {
        setProducts([]); // No user, empty compare list
        setError(null);
        setLoading(false);
        return;
      }

      let compareList = getCompareFromStorage(compareKey);

      // Support both [1,2,3] and [{id:1,...},{id:2,...}]
      const validIds = compareList
        .map(item => (typeof item === "object" && item !== null ? item.id : item))
        .filter(id => !!id && (typeof id === "number" || typeof id === "string"));

      // Allow routing to compare page even if no products are added
      if (validIds.length === 0) {
        setProducts([]);
        setError(null); // No error, just empty
        setLoading(false);
        return;
      }

      // Fetch product details from API
      const productDetails = await fetchProductsByIds(validIds);
      setProducts(productDetails);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load products from local storage.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchProductsFromLocalStorage();
  }, []);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage && event.key === compareKey) {
        fetchProductsFromLocalStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sync products state with localStorage whenever it changes
  const syncWithLocalStorage = () => {
    if (isLocalStorageAvailable()) {
      try {
        // Only store product IDs in localStorage
        const ids = products.map(p => p.id);
        saveCompareToStorage(compareKey, ids);
      } catch (err) {
        console.error("Error syncing to localStorage:", err);
      }
    }
  };

  const handleDelete = (id) => {
    if (!userId) {
      setMessage("Please log in to modify your compare list");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (!isLocalStorageAvailable()) {
      setMessage("Local storage is not available in this environment.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      let compareList = getCompareFromStorage(compareKey);
      // Support both [1,2,3] and [{id:1,...},{id:2,...}]
      compareList = compareList.filter(item => {
        if (typeof item === "object" && item !== null) {
          return item.id !== id;
        }
        return item !== id;
      });
      saveCompareToStorage(compareKey, compareList);
      setProducts(prev => prev.filter(product => product.id !== id));
      setSelectedProducts(prev => prev.filter(pid => pid !== id));
      if (compareList.length === 0) {
        setError("No products found in the comparison list. Add products to compare.");
      } else {
        setError(null);
      }
      setMessage("Product removed from compare list");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting product:", err);
      setMessage("Failed to delete product. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleQuantityChange = (id, delta) => {
    if (!userId) {
      setMessage("Please log in to modify your compare list");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const updatedProducts = products.map(product => {
      if (product.id === id) {
        const newQuantity = Math.max(1, (product.quantity || 1) + delta);
        return {
          ...product,
          quantity: newQuantity,
          totalPrice: product.price * newQuantity // Update totalPrice
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    syncWithLocalStorage();
    setMessage(delta > 0 ? "Quantity increased" : "Quantity decreased");
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    syncWithLocalStorage();
  }, [products]);

  const addToCart = (id) => {
    if (!userId) {
      setMessage("Please log in to add items to your cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setMessage(`Product ${id} added to cart!`);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSelectProduct = (id) => {
    if (!userId) {
      setMessage("Please log in to select products");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const scrollTable = (direction) => {
    const scrollAmount = direction === 'left' ? -200 : 200;
    if (tableRef.current) {
      tableRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Navigate to Shop Now page
  const handleCompareMore = () => {
    if (!userId) {
      setMessage("Please log in to compare more products");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    navigate('/shop');
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-center my-6 sm:my-8">Compare</h1>
      {message && (
        <div className="mb-4 text-center text-sm text-gray-600">{message}</div>
      )}
      {error && products.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-base sm:text-lg">{error}</div>
      ) : (
        <div className="relative">
          <button
            onClick={() => scrollTable('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 z-10 sm:left-[-20px] lg:left-[-40px]"
          >
            <ChevronLeft size={20} className="sm:size-24" />
          </button>
          <button
            onClick={() => scrollTable('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 z-10 sm:right-[-20px] lg:right-[-40px]"
          >
            <ChevronRight size={20} className="sm:size-24" />
          </button>

          <div className="overflow-x-auto" ref={tableRef}>
            <table className="w-full min-w-[300px] sm:min-w-[600px] lg:w-[1200px] border-collapse table-fixed hidden md:table mx-auto">
              <tbody>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Action</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
                      {product.title && (
                        <button
                          className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-xs sm:text-sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 size={14} className="sm:size-16" />
                          <span>Delete</span>
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Image</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
                      {product.image && <img src={product.image} alt={product.title || "Product image"} className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto object-contain" />}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Title</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm truncate">{product.title}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Quantity</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
                      {product.quantity && (
                        <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded text-xs sm:text-sm"
                          >
                            -
                          </button>
                          <span className="text-xs sm:text-sm">{product.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded text-xs sm:text-sm"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Price</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm">
                      {product.totalPrice && `$${product.totalPrice.toFixed(2)}`}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Button</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
                      {product.title && (
                        <button
                          onClick={() => addToCart(product.id)}
                          className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-green-600 w-full text-xs sm:text-sm"
                        >
                          Add to Cart
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Stock Status</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm">
                      {product.stock !== undefined && product.stock !== null && (
                        <span className="text-green-600 flex items-center">
                          <span className="mr-1">✔</span>
                          {product.stock} in stock
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">Brand</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm">{product.brand}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">SKU</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px] text-xs sm:text-sm">{product.sku}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 sm:p-6 font-semibold border w-[150px] sm:w-[200px] lg:w-[250px] text-sm sm:text-base">
                    <div className="flex justify-center items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === products.length && products.length > 0}
                        onChange={(e) => {
                          const allSelectable = products.map(p => p.id);
                          setSelectedProducts(e.target.checked ? allSelectable : []);
                        }}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                      <span className="text-xs sm:text-sm">Select</span>
                    </div>
                  </td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 sm:p-6 border w-[150px] sm:w-[200px] lg:w-[250px]">
                      {product.title && (
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="h-4 w-4 sm:h-5 sm:w-5 mx-auto block"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            <div className="md:hidden space-y-6">
              {products.map(product => (
                <div key={product.id} className="border rounded-lg p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{product.title}</h3>
                    <button
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-xs sm:text-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 size={14} className="sm:size-16" />
                      <span>Delete</span>
                    </button>
                  </div>
                  <img src={product.image} alt={product.title || "Product image"} className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 object-contain" />
                  <div className="space-y-3 text-xs sm:text-sm">
                    <p><span className="font-semibold">Quantity:</span></p>
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                    <p><span className="font-semibold">Price:</span> ${product.totalPrice.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded w-full hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                    <p>
                      <span className="font-semibold">Stock Status:</span>{" "}
                      <span className="text-green-600 flex items-center">
                        <span className="mr-1">✔</span>
                        {product.stock} in stock
                      </span>
                    </p>
                    <p><span className="font-semibold">Brand:</span> {product.brand}</p>
                    <p><span className="font-semibold">SKU:</span> {product.sku}</p>
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <span className="font-semibold">Select</span>
                      <input type="checkbox" disabled className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                      <span>Select Product</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
          <select className="border rounded p-2 text-xs sm:text-sm w-full sm:w-40">
            <option>Add to cart</option>
            <option>Remove</option>
          </select>
          <button className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-gray-800 text-xs sm:text-sm w-full sm:w-auto">
            Apply
          </button>
        </div>
        <button
          className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-gray-800 text-xs sm:text-sm w-full sm:w-auto"
          onClick={handleCompareMore}
        >
          Compare More Products
        </button>
      </div>
    </div>
  );
};

export default Compare;