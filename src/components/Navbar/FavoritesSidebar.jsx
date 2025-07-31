
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Utility function to get current user from local storage
const getCurrentUser = () => {
  try {
    const currentUserData = localStorage.getItem('currentUser');
    const user = currentUserData ? JSON.parse(currentUserData) : null;
    if (user && !user.userId) {
      user.userId = user.email || user.username;
    }
    return user;
  } catch (error) {
    console.error('Error parsing currentUser from localStorage:', error);
    return null;
  }
};

// Utility function for localStorage
const getWishlistFromStorage = (wishlistKey) => {
  try {
    const data = localStorage.getItem(wishlistKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error parsing wishlist from localStorage for ${wishlistKey}:`, error);
    return [];
  }
};

export default function FavoritesSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || null;
  const wishlistKey = userId ? `wishlist_${userId}` : null;
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch wishlist from local storage when component mounts or userId changes
  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      return;
    }

    const wishlist = getWishlistFromStorage(wishlistKey);
    setFavorites(wishlist);

    // Add event listener for real-time localStorage changes
    const handleStorageChange = (event) => {
      if (event.key === wishlistKey) {
        const updatedWishlist = event.newValue ? JSON.parse(event.newValue) : [];
        setFavorites(updatedWishlist);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [wishlistKey]);

  const handleViewWishlist = () => {
    if (!userId) {
      setMessage("Please log in to view your wishlist");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    onClose();
    navigate("/favorites");
  };

  const handleAddAllToCart = () => {
    if (!userId) {
      setMessage("Please log in to view your cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    onClose();
    navigate("/cart");
  };

  return (
    <div
      className={`fixed inset-0 z-[2000] flex justify-end transition-transform duration-300 ${open ? "" : "pointer-events-none"}`}
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Sidebar */}
      <aside
        className={`relative h-full w-full sm:w-[400px] max-w-full bg-white shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"} flex flex-col`}
        style={{ maxWidth: 420 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0]">
          <span className="font-semibold text-lg flex items-center gap-2 text-[#212121]">
            <span role="img" aria-label="heart">❤️ ({favorites.length})</span>FAVORITES
          </span>
          <button onClick={onClose} aria-label="Close sidebar" className="text-[#212121] hover:text-[#1976D2]">
            <X size={28} />
          </button>
        </div>
        {message && (
          <div className="px-6 py-2 text-center text-sm text-[#757575]">{message}</div>
        )}
        <div className="p-6 flex-1 overflow-y-auto">
          {!userId ? (
            <div className="text-[#757575] text-center mt-8">
              Please{" "}
              <button
                onClick={() => navigate("/")}
                className="text-[#1976D2] hover:text-[#1565C0] font-semibold"
                aria-label="Navigate to login page"
              >
                login
              </button>{" "}
              to view wishlist.
            </div>
          ) : favorites && favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-6 cursor-pointer"
                onClick={() => {
                  onClose();
                  navigate(`/products/${item.id}`);
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <div className="font-medium text-gray-800">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.price !== undefined && item.price !== null && !isNaN(Number(item.price))
                      ? `$${Number(item.price).toFixed(2)}`
                      : "No price"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-[#757575] text-center mt-8">
              No favorites yet.
            </div>
          )}
        </div>
        <div className="p-6 border-t border-[#E0E0E0] flex flex-col gap-3">
          <button
            className="w-full bg-[#2A74ED] hover:bg-black text-white py-3 rounded-md font-semibold text-sm uppercase transition-colors duration-300"
            onClick={handleViewWishlist}
          >
            VIEW WISHLIST
          </button>
          <button
            className="w-full bg-[#2A74ED] hover:bg-black text-white py-3 rounded-md font-semibold text-sm uppercase transition-colors duration-300"
            onClick={handleAddAllToCart}
          >
            VIEW CART
          </button>
        </div>
      </aside>
    </div>
  );
}