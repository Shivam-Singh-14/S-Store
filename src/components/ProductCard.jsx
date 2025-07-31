import React, { useState } from "react";
import { Heart, RefreshCw, Eye } from "lucide-react";

// Utility function to get current user from local storage
const getCurrentUser = () => {
  const usersData = localStorage.getItem("users");
  const users = usersData ? JSON.parse(usersData) : [];
  const user = users.length > 0 ? users[0] : null;
  if (user && !user.userId) {
    user.userId = user.email || user.username || "default-user";
  }
  return user;
};

// Utility function to get wishlist from local storage
const getWishlistFromStorage = (wishlistKey) => {
  try {
    const data = localStorage.getItem(wishlistKey);
    if (data) return JSON.parse(data);
  } catch (error) {
    // ignore
  }
  return [];
};

// Utility function to save wishlist to local storage
const saveWishlistToStorage = (wishlistKey, wishlist) => {
  try {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  } catch (error) {
    // ignore
  }
};

const getCompareFromStorage = (compareKey) => {
    try {
        const data = localStorage.getItem(compareKey);
        if (data) return JSON.parse(data);
    } catch (error) {
        console.error("Error parsing compareList from localStorage:", error);
    }
    return [];
};

const saveCompareToStorage = (compareKey, compare) => {
    try {
        localStorage.setItem(compareKey, JSON.stringify(compare));
    } catch (error) {
        console.error(`[ProductPage] Error saving compareList to localStorage for ${compareKey}:`, error);
        throw new Error("Failed to save compare list to localStorage");
    }
};

const ProductCard = ({ product }) => {
  const user = getCurrentUser();
  const userId = user?.userId || "default-user";
  const wishlistKey = `wishlist_${userId}`;
  const compareKey = `compare_${userId}`;

  // Initialize wishlist state based on local storage
  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist = getWishlistFromStorage(wishlistKey);
    return wishlist.some((item) => item.id === product.id);
  });
  const [isCompared, setIsCompared] = useState(() => {
    const compare = getCompareFromStorage(compareKey);
    return compare.some((item) => item.id === product.id);
  });

  const handleWishlistClick = () => {
    const wishlist = getWishlistFromStorage(wishlistKey);
    let updatedWishlist;

    if (isWishlisted) {
      // Remove from wishlist
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      // Add to wishlist
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
    }

    saveWishlistToStorage(wishlistKey, updatedWishlist);
  };

  const handleCompareClick = () => {
    const compare = getCompareFromStorage(compareKey);
    let updatedCompare;

    if (isCompared) {
      // Remove from wishlist
      updatedCompare = compare.filter((item) => item.id !== product.id);
      setIsCompared(false);
    } else {
      // Add to wishlist
      updatedCompare = [...compare, product];
      setIsCompared(true);
    }

    saveCompareToStorage(compareKey, updatedCompare);
  };

  const handleViewClick = () => {
    // No navigation as per your instruction
  };

  const rating = Math.round(
    typeof product.rating === "number" && !isNaN(product.rating) ? product.rating : 0
  );

  return (
    <div className="relative group w-full max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
      {/* Category Tag */}
      <div className="absolute top-4 left-4 bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
        {product.category}
      </div>

      {/* Icons on Hover */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleWishlistClick}
          className={`p-2 rounded-full ${isWishlisted ? "bg-green-500 text-white" : "bg-white text-gray-600"} shadow-md hover:bg-green-600 hover:text-white transition-colors duration-200`}
        >
          <Heart size={20} />
        </button>
        <button
          onClick={handleCompareClick}
          className={`p-2 rounded-full ${isCompared ? "bg-blue-500 text-white" : "bg-white text-gray-600"} shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-200`}
        >
          <RefreshCw size={20} />
        </button>
        <button
          onClick={handleViewClick}
          className="p-2 rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-200 transition-colors duration-200"
        >
          <Eye size={20} />
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 text-center flex flex-col h-32">
        <h3 className="text-base font-semibold text-gray-800 mb-1 leading-snug break-words whitespace-normal overflow-hidden text-ellipsis line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-center mb-1 mt-auto">
          {[...Array(rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <p className="text-lg font-bold text-gray-700">{product.priceRange}</p>
        {isCompared && (
          <p className="text-sm text-blue-600 mt-1">Added to Compare List</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;