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
const getCartFromStorage = (cartKey) => {
  try {
    const data = localStorage.getItem(cartKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error parsing cart from localStorage for ${cartKey}:`, error);
    return [];
  }
};

export default function CartSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || null;
  const cartKey = userId ? `cart_${userId}` : null;
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      return;
    }
    const cart = getCartFromStorage(cartKey);
    setCartItems(cart);
    const handleStorageChange = (event) => {
      if (event.key === cartKey) {
        const updatedCart = event.newValue ? JSON.parse(event.newValue) : [];
        setCartItems(updatedCart);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [cartKey, userId]);

  const handleViewCart = () => {
    if (!userId) {
      setMessage("Please log in to view your cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    onClose();
    navigate("/cart");
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);

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
            <span role="img" aria-label="cart">🛒</span>CART
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
              to view your cart.
            </div>
          ) : cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-6 cursor-pointer hover:bg-gray-50 p-2 rounded"
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
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#212121] truncate max-w-[170px]">{item.name}</div>
                  <div className="text-sm text-[#757575]">
                    {item.quantity || 1} × {item.price !== undefined && item.price !== null && !isNaN(Number(item.price))
                      ? `$${Number(item.price).toFixed(2)}`
                      : "No price"}
                  </div>
                  {item.sku && (
                    <div className="text-xs text-[#757575]">SKU: {item.sku}</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-[#757575] text-center mt-8">
              No items in cart.
            </div>
          )}
        </div>
        <div className="p-6 border-t border-[#E0E0E0] flex flex-col gap-3">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#757575] font-semibold">SUBTOTAL:</span>
            <span className="text-[#212121] font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-black hover:bg-[#2A74ED] text-white py-3 rounded-md font-semibold text-sm uppercase transition-colors duration-300"
            onClick={handleViewCart}
          >
            View cart
          </button>
        </div>
      </aside>
    </div>
  );
} 