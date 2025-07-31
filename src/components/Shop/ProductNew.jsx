import React, { useEffect, useState, useMemo } from 'react';
import { Heart, RefreshCw, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Utility function to get current user from local storage
const getCurrentUser = () => {
  const usersData = localStorage.getItem('currentUser');
  console.log('Raw users data from localStorage:', usersData);
  const users = usersData ? JSON.parse(usersData) : null;
  console.log('Parsed user data:', users);
  const user = users; // Assuming 'currentUser' stores a single user object
  if (user && !user.userId) {
    user.userId = user.id || user.email || user.username || 'default-user';
  }
  console.log('Selected user:', user);
  return user;
};

// Utility function to manage wishlist in local storage
const manageWishlist = (product, userId, add) => {
  console.log('manageWishlist called with:', { product, userId, add });
  const wishlistKey = `wishlist_${userId}`;
  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  console.log('Current wishlist before update:', wishlist);

  if (add) {
    if (!wishlist.some(item => item.id === product.id)) {
      wishlist.push({
        ...product,
        addedAt: new Date().toISOString(),
      });
      console.log('Product added to wishlist:', product);
    } else {
      console.log('Product already in wishlist, not adding:', product);
    }
  } else {
    wishlist = wishlist.filter(item => item.id !== product.id);
    console.log('Product removed from wishlist:', product);
  }

  localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  console.log('Updated wishlist saved to localStorage:', wishlist);
  return wishlist;
};

// Utility function to manage compare in local storage
const manageCompare = (product, userId, add) => {
  const compareKey = `compare_${userId}`;
  let compare = JSON.parse(localStorage.getItem(compareKey)) || [];

  if (add) {
    if (!compare.some(item => item.id === product.id)) {
      compare.push({
        ...product,
        addedAt: new Date().toISOString(),
      });
    }
  } else {
    compare = compare.filter(item => item.id !== product.id);
  }

  localStorage.setItem(compareKey, JSON.stringify(compare));
  return compare;
};

// Utility function to get wishlist data (recent and all)
export const getWishlistData = (userId) => {
  const wishlistKey = `wishlist_${userId}`;
  const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentWishlist = wishlist.filter(
    item => new Date(item.addedAt) >= sevenDaysAgo
  );
  
  return {
    recentWishlist,
    allWishlist: wishlist,
  };
};

// Utility function to get compare data
export const getCompareData = (userId) => {
  const compareKey = `compare_${userId}`;
  const compare = JSON.parse(localStorage.getItem(compareKey)) || [];

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentCompare = compare.filter(
    item => new Date(item.addedAt) >= sevenDaysAgo
  );
  return {
    recentCompare,
    allCompare: compare,
  };
};

// Utility function to manage cart in local storage
const manageCart = (product, userId, quantity = 1) => {
  const cartKey = `cart_${userId}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  
  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex > -1) {
    // Update quantity if product exists
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Add new product to cart
    cart.push({
      ...product,
      quantity,
      addedAt: new Date().toISOString()
    });
  }
  
  localStorage.setItem(cartKey, JSON.stringify(cart));
  return cart;
};

// Utility function to get cart data
export const getCartData = (userId) => {
  const cartKey = `cart_${userId}`;
  return JSON.parse(localStorage.getItem(cartKey)) || [];
};

const ProductCard = ({ product, index, onWishlistToggle, onCompareToggle }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions?.[0] || null);

  // Fetch product details from API when modal opens
  useEffect(() => {
    if (isModalOpen && product?.id) {
      fetch(`https://fakestoreapi.com/products/${product.id}`)
        .then(res => res.json())
        .then(data => setModalProduct(data))
        .catch(error => console.error("Error fetching modal product details:", error));
    }
  }, [isModalOpen, product?.id]);

  const rating = Math.max(0, Math.round(Number(modalProduct?.rating?.rate) || Number(modalProduct?.rating) || 0));

  const handleWishlistClick = () => {
    const user = getCurrentUser();
    if (!user?.userId) {
      alert('Please login to manage wishlist');
      return;
    }
    const newIsWishlisted = !isWishlisted;
    setIsWishlisted(newIsWishlisted);
    manageWishlist(product, user.userId, newIsWishlisted);
  };

  const handleCompareClick = () => {
    const user = getCurrentUser();
    if (!user?.userId) {
      alert('Please login to compare products');
      return;
    }
    const newIsCompared = !isCompared;
    setIsCompared(newIsCompared);
    manageCompare(product, user.userId, newIsCompared);
  };

  const handleViewClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Simulated API call to add to cart
  const simulatedAddToCartApi = async (productToAdd, quantityToAdd) => {
    console.log("Attempting to add to cart via simulated API:", { productToAdd, quantityToAdd });
    return new Promise((resolve, reject) => {
      // Simulate a network request delay
      setTimeout(() => {
        // Simulate success or failure randomly
        const success = Math.random() > 0.2; // 80% chance of success
        if (success) {
          console.log("Simulated API success: Product added.");
          resolve({ success: true });
        } else {
          console.error("Simulated API failure: Could not add product.");
          reject(new Error("Simulated API failure"));
        }
      }, 500); // Simulate 500ms delay
    });
  };

  const handleAddToCart = async () => {
    const user = getCurrentUser();
    if (!user?.userId) {
      alert('Please login to add items to cart');
      return;
    }
    
    const productToAdd = modalProduct || product;

    try {
      // Attempt simulated API call
      await simulatedAddToCartApi(productToAdd, quantity);
      // If API succeeds, update local storage
      manageCart(productToAdd, user.userId, quantity);
      alert('Product added to cart!');
    } catch (error) {
      console.error("API call failed, falling back to local storage:", error);
      // Fallback to local storage
      manageCart(productToAdd, user.userId, quantity);
      alert('Product added to cart (local fallback)!');
    }

    closeModal();
  };

  return (
    <>
      <div 
        className="relative group flex-none w-full max-w-[200px] sm:max-w-[300px] mx-auto bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
        onClick={() => navigate(`/products/${product.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <div className="absolute top-3 left-3 bg-green-100 text-green-800 text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full z-index-Auto">
          {product.category}
        </div>
        <div className="relative w-full h-40 sm:h-60 flex items-center justify-center cursor-pointer bg-gray-50">
          <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 sm:p-6 transition-transform duration-300 transform group-hover:scale-105" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 sm:space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button onClick={e => { e.stopPropagation(); handleWishlistClick(); }} className={`p-1 sm:p-2 rounded-full ${isWishlisted ? 'bg-green-500 text-white' : 'bg-white text-gray-600'} shadow-lg hover:bg-green-600 hover:text-white transition-colors duration-200 border border-gray-200`}><Heart size={16} fill={isWishlisted ? 'white' : 'none'} /></button>
            <button onClick={e => { e.stopPropagation(); handleCompareClick(); }} className={`p-1 sm:p-2 rounded-full ${isCompared ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'} shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 border border-gray-200`}><RefreshCw size={16} /></button>
            <button onClick={e => { e.stopPropagation(); handleViewClick(); }} className="p-1 sm:p-2 rounded-full bg-white text-gray-600 shadow-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"><Eye size={16} /></button>
          </div>
        </div>
        <div className="p-3 sm:p-4 text-left">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-8 sm:h-12">{product.title || product.name}</h3>
          <div className="flex items-center mb-2">
            {[...Array(Math.min(5, Math.round(Number(product.rating?.rate) || Number(product.rating) || 0)))].map((_, i) => (
              <svg key={i} className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
            ))}
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">({product.rating?.count || 1} customer review)</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <p className="text-base sm:text-lg font-bold text-gray-800">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>
      {isModalOpen && modalProduct && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 p-6 overflow-y-auto animate-slide-in flex flex-col hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">✕</button>
          <img src={modalProduct.image} alt={modalProduct.title} className="w-full h-48 object-contain mb-4" />
          <h3 className="text-xl font-bold mb-2">{modalProduct.title || modalProduct.name}</h3>
          <p className="text-lg font-semibold text-gray-700 mb-2">${modalProduct.price}</p>
          <div className="flex items-center mb-2">
            {[...Array(Math.min(5, rating))].map((_, i) => (
              <svg key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
            ))}
            <span className="ml-2 text-xs sm:text-sm text-gray-600">({modalProduct.rating?.count || 1} customer review)</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">👁 45 people are viewing this product right now</p>
          <p className="text-xs sm:text-sm text-green-600 mb-4">✔ {modalProduct.rating?.count || 100} in stock</p>
          
          {/* Quantity selector */}
          <div className="flex items-center mb-4">
            <label className="text-sm font-medium mr-2">Quantity:</label>
            <div className="flex items-center border rounded">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-2 py-1 border-r hover:bg-gray-100"
              >-</button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-2 py-1 border-l hover:bg-gray-100"
              >+</button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 rounded mb-4 font-semibold hover:bg-blue-700 transition-colors"
          >
            Add to cart
          </button>
          
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={handleCompareClick}
              className="text-xs sm:text-sm text-gray-600 flex items-center hover:text-blue-600"
            >
              <RefreshCw size={14} className="mr-1" /> Add to compare
            </button>
            <button 
              onClick={handleWishlistClick}
              className="text-xs sm:text-sm text-gray-600 flex items-center hover:text-green-600"
            >
              <Heart size={14} className="mr-1" /> Add to wishlist
            </button>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-2"><span className="font-semibold">SKU:</span> #12345</p>
          <p className="text-xs sm:text-sm text-gray-600 mb-2"><span className="font-semibold">Category:</span> {modalProduct.category}</p>
          <p className="text-xs sm:text-sm text-gray-600 mb-2"><span className="font-semibold">Tags:</span> {modalProduct.category}</p>
          <p className="text-xs sm:text-sm text-gray-600 mb-2"><span className="font-semibold">Size:</span> M</p>
          <h4 className="text-sm sm:text-base font-semibold mt-4 mb-2">Overview</h4>
          <p className="text-xs sm:text-sm text-gray-700 mb-2">{modalProduct.description}</p>
        </div>
      )}
    </>
  );
};

export default ProductCard;
