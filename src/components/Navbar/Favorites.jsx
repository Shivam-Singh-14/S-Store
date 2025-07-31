import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus } from "lucide-react";

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
const getWishlistFromStorage = (wishlistKey) => {
  try {
    const data = localStorage.getItem(wishlistKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error parsing wishlist from localStorage for ${wishlistKey}:`, error);
    return [];
  }
};

const saveWishlistToStorage = (wishlistKey, wishlist) => {
  try {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  } catch (error) {
    console.error(`Error saving wishlist to localStorage for ${wishlistKey}:`, error);
  }
};

const getCartFromStorage = (cartKey) => {
  try {
    const data = localStorage.getItem(cartKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error parsing cart from localStorage for ${cartKey}:`, error);
    return [];
  }
};

const saveCartToStorage = (cartKey, cart) => {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  } catch (error) {
    console.error(`Error saving cart to localStorage for ${cartKey}:`, error);
  }
};

const Favorites = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || null; // No default-user fallback
  const wishlistKey = userId ? `wishlist_${userId}` : null;
  const cartKey = userId ? `cart_${userId}` : null;
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState(""); // For user feedback messages

  useEffect(() => {
    // Ensure userId is available before attempting to load favorites
    if (!userId) {
      setFavorites([]);
      console.log("Favorites: Waiting for valid userId.");
      return;
    }

    console.log(`Favorites: Loading data for user: ${userId}`);

    const storedFavorites = getWishlistFromStorage(wishlistKey);
    // Ensure each item has quantity initialized to 1 if not set (though ProductCard saves full objects)
    const initializedFavorites = storedFavorites.map(item => ({
      ...item,
      quantity: typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 1 // Defensive check for quantity
    }));
    setFavorites(initializedFavorites);

    // Listen for changes to localStorage for the specific wishlist key
    const handleStorageChange = (event) => {
      if (event.key === wishlistKey) {
        console.log(`Favorites: Storage change detected for ${wishlistKey}`);
        const updatedFavorites = getWishlistFromStorage(wishlistKey);
        setFavorites(updatedFavorites);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userId, wishlistKey]); // Depend on userId and wishlistKey

  const subtotal = favorites.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0).toFixed(2);

  const increaseQuantity = (id) => {
    if (!userId) {
      setMessage("Please log in to modify your wishlist");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const updated = favorites.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setFavorites(updated);
    saveWishlistToStorage(wishlistKey, updated);
    // Dispatch storage event for in-tab updates
    window.dispatchEvent(new StorageEvent('storage', { key: wishlistKey, newValue: JSON.stringify(updated) }));
    setMessage("Quantity increased");
    setTimeout(() => setMessage(""), 3000);
  };

  const decreaseQuantity = (id) => {
    if (!userId) {
      setMessage("Please log in to modify your wishlist");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const updated = favorites.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setFavorites(updated);
    saveWishlistToStorage(wishlistKey, updated);
    // Dispatch storage event for in-tab updates
    window.dispatchEvent(new StorageEvent('storage', { key: wishlistKey, newValue: JSON.stringify(updated) }));
    setMessage("Quantity decreased");
    setTimeout(() => setMessage(""), 3000);
  };

  const removeFromFavorites = (id) => {
    if (!userId) {
      setMessage("Please log in to modify your wishlist");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const product = favorites.find((item) => item.id === id);
    if (!product) return;

    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    saveWishlistToStorage(wishlistKey, updated);
    // Dispatch storage event for in-tab updates
    window.dispatchEvent(new StorageEvent('storage', { key: wishlistKey, newValue: JSON.stringify(updated) }));
    setMessage(`${product.name} removed from wishlist`);
    setTimeout(() => setMessage(""), 3000);
  };

  const addToCart = (id) => {
    if (!userId) {
      setMessage("Please log in to add items to your cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const productToAdd = favorites.find((item) => item.id === id);
    if (productToAdd) {
      const storedCart = getCartFromStorage(cartKey);
      // Check if the product is already in the cart
      const existingProductIndex = storedCart.findIndex((item) => item.id === id);
      let updatedCart;
      if (existingProductIndex !== -1) {
        // Product exists, update quantity
        updatedCart = storedCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + productToAdd.quantity }
            : item
        );
      } else {
        // Product doesn't exist, add it with the current quantity
        updatedCart = [...storedCart, { ...productToAdd }];
      }
      // Save the updated cart to local storage
      saveCartToStorage(cartKey, updatedCart);
      // Dispatch storage event for in-tab updates
      window.dispatchEvent(new StorageEvent('storage', { key: cartKey, newValue: JSON.stringify(updatedCart) }));
      setMessage(`${productToAdd.name} added to cart`);
      setTimeout(() => setMessage(""), 3000);
    }
    // Navigate to cart page as before
    navigate(`/cart?productId=${id}`);
  };

  const handleCheckout = () => {
    if (!userId) {
      setMessage("Please log in to proceed to checkout");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    navigate("/checkout");
  };

  const continueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Your Wishlist</h1>
      {message && (
        <div className="mb-4 text-center text-sm text-gray-600">{message}</div>
      )}
      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">
            {userId ? "Your wishlist is empty." : "Please log in to view your wishlist."}
          </p>
          <button
            onClick={continueShopping}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 font-semibold text-gray-700">
              <div className="col-span-4">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>
            {favorites.map((item) => (
              <div key={item.id} className="border-t flex flex-col md:grid md:grid-cols-12 gap-4 p-4 items-center">
                <div className="col-span-4 flex items-center gap-4 w-full">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  </div>
                </div>
                <div className="col-span-2 text-center text-gray-700 md:mt-0 mt-2">
                  <span className="md:hidden font-semibold">Price: </span>${item.price.toFixed(2)}
                </div>
                <div className="col-span-2 flex items-center justify-center gap-2 md:mt-0 mt-2">
                  <span className="md:hidden font-semibold">Quantity: </span>
                  <button onClick={() => decreaseQuantity(item.id)} className="p-1 bg-gray-200 rounded hover:bg-gray-300" disabled={item.quantity === 1}>
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="col-span-2 text-center text-gray-700 md:mt-0 mt-2">
                  <span className="md:hidden font-semibold">Total: </span>${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="col-span-2 flex justify-center gap-2 md:mt-0 mt-4">
                  <button onClick={() => addToCart(item.id)} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-1 rounded text-sm">
                    Add to Cart
                  </button>
                  <button onClick={() => removeFromFavorites(item.id)} className="text-red-600 hover:text-red-700 flex items-center gap-1">
                    <X size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center md:items-end gap-4">
            <p className="text-lg font-semibold text-gray-800">
              Subtotal: <span className="text-teal-600">${subtotal}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={continueShopping} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded w-full sm:w-auto">
                Continue Shopping
              </button>
              <button onClick={handleCheckout} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded w-full sm:w-auto">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;