
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// Constant for coupon storage key
const COUPON_KEY = "xstore-coupon";

// Utility function to get current user from local storage
const getCurrentUser = () => {
  try {
    const currentUserData = localStorage.getItem("currentUser");
    console.log("Fetching currentUser from localStorage:", currentUserData);
    const user = currentUserData ? JSON.parse(currentUserData) : null;
    if (user && !user.userId) {
      user.userId = user.email || user.username; // No default-user fallback
    }
    console.log("Current user:", user);
    return user;
  } catch (error) {
    console.error("Error accessing localStorage for currentUser:", error);
    return null;
  }
};

// Utility function to save cart to local storage
const saveCartToLocalStorage = (cartKey, cart) => {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    console.log(`Cart saved to localStorage under ${cartKey}:`, cart);
  } catch (error) {
    console.error(`Error saving cart to localStorage for ${cartKey}:`, error);
  }
};

// Utility function to save coupons to local storage
const saveCouponsToLocalStorage = (coupons) => {
  try {
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupons));
    console.log(`Coupons saved to localStorage under ${COUPON_KEY}:`, coupons);
  } catch (error) {
    console.error("Error saving coupons to localStorage:", error);
  }
};

// Utility function to fetch cart from local storage
const getCartFromStorage = (cartKey) => {
  try {
    const data = localStorage.getItem(cartKey);
    console.log(`Raw cart data from localStorage for ${cartKey}:`, data);
    if (data) return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing cart from localStorage for ${cartKey}:`, error);
  }
  return [];
};

// Utility function to fetch coupons from local storage
const getCouponsFromStorage = () => {
  try {
    const data = localStorage.getItem(COUPON_KEY);
    console.log("Raw coupons data from localStorage:", data);
    if (data) return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing coupons from localStorage:", error);
  }
  return [];
};

const Carts = () => {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const userId = currentUser?.userId || null; // No default-user fallback
  const cartKey = userId ? `cart_${userId}` : null;
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [message, setMessage] = useState(""); // For user feedback messages
  const [cleared, setCleared] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Fetch cart data from local storage on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      console.log("Fetching cart data...");
      if (!userId) {
        setCart([]); // No user, empty cart
        setCleared(true);
        setIsCartLoaded(true);
        return;
      }

      let fetchedCart = getCartFromStorage(cartKey);
      console.log(`Fetched cart from local storage for ${cartKey}:`, fetchedCart);

      // Normalize cart data
      fetchedCart = fetchedCart.map((item) => ({
        ...item,
        id: item.id || `temp-id-${Date.now()}`,
        name: item.name || "Unknown Product",
        // Handle both `image` and `images` for compatibility
        image: item.image || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : "https://placehold.co/100x100?text=No+Image"),
        price: typeof item.price === "number" ? item.price : 0,
        sku: item.sku || `SKU-${item.id.toString().padStart(6, "0")}`, // Use product ID for SKU if not present
        quantity: typeof item.quantity === "number" ? item.quantity : 1,
        storage: item.storage || "N/A",
        color: item.color || "N/A",
      }));

      console.log("Normalized cart data:", fetchedCart);
      setCart(fetchedCart);
      setCleared(fetchedCart.length === 0);
      setIsCartLoaded(true);
      saveCartToLocalStorage(cartKey, fetchedCart);
    };

    fetchCartData();
  }, [cartKey]);

  // Fetch coupons from API or local storage on component mount
  useEffect(() => {
    const fetchCouponsData = async () => {
      console.log("Fetching coupons data...");
      let fetchedCoupons = [];

      // Try fetching from API
      try {
        const response = await fetch("https://api.example.com/coupons");
        if (!response.ok) throw new Error("Failed to fetch coupons from API");
        fetchedCoupons = await response.json();
        console.log("Fetched coupons from API:", fetchedCoupons);
      } catch (error) {
        console.error("Error fetching coupons from API:", error);
        // Fall back to local storage
        fetchedCoupons = getCouponsFromStorage();
        console.log("Fetched coupons from local storage:", fetchedCoupons);
      }

      setCoupons(fetchedCoupons);
      saveCouponsToLocalStorage(fetchedCoupons);
    };

    fetchCouponsData();
  }, []);

  // Save cart to local storage whenever it changes, but only after initial load
  useEffect(() => {
    if (isCartLoaded && userId) {
      console.log(`Saving cart to localStorage after state change for ${cartKey}`);
      saveCartToLocalStorage(cartKey, cart);
    } else {
      console.log("Cart not yet loaded or no user, skipping save to localStorage");
    }
  }, [cart, isCartLoaded, cartKey, userId]);

  const handleQuantity = (type, id) => {
    if (!userId) {
      setMessage("Please log in to modify your cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? (item.quantity || 1) + 1
                  : (item.quantity || 1) > 1
                    ? (item.quantity || 1) - 1
                    : 1,
            }
          : item
      )
    );
    setMessage(type === "inc" ? "Quantity increased" : "Quantity decreased");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRemove = (id) => {
    if (!userId) {
      setMessage("Please log in to modify your cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setCart((prev) => prev.filter((item) => item.id !== id));
    setMessage("Item removed from cart");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleClear = () => {
    if (!userId) {
      setMessage("Please log in to clear your cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setCart([]);
    setCleared(true);
    saveCartToLocalStorage(cartKey, []); // Explicitly save empty cart to local storage
    setMessage("Cart cleared");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRedo = () => {
    if (!userId) {
      setMessage("Please log in to redo your cart");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const storedCart = getCartFromStorage(cartKey);
    const normalizedCart = storedCart.map((item) => ({
      ...item,
      id: item.id || `temp-id-${Date.now()}`,
      name: item.name || "Unknown Product",
      image: item.image || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : "https://placehold.co/100x100?text=No+Image"),
      price: typeof item.price === "number" ? item.price : 0,
      sku: item.sku || `SKU-${item.id.toString().padStart(6, "0")}`,
      quantity: typeof item.quantity === "number" ? item.quantity : 1,
      storage: item.storage || "N/A",
      color: item.color || "N/A",
    }));
    setCart(normalizedCart);
    setCleared(normalizedCart.length === 0);
    setMessage("Cart restored");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleApplyCoupon = () => {
    if (!userId) {
      setMessage("Please log in to apply a coupon");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (appliedCoupon) {
      setCouponMsg("Coupon already applied.");
      return;
    }

    const enteredCode = coupon.trim().toUpperCase();
    const validCoupon = coupons.find(
      (c) => c.code.toUpperCase() === enteredCode
    );

    if (validCoupon) {
      setAppliedCoupon(validCoupon);
      setCouponMsg(
        `Coupon applied! ${(validCoupon.discount * 100).toFixed(0)}% discount.`
      );
      setMessage("Coupon applied successfully");
    } else {
      setCouponMsg("Invalid coupon code.");
      setMessage("Invalid coupon code");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCheckoutNavigation = () => {
    if (!userId) {
      setMessage("Please log in to proceed to checkout");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    navigate("/Checkout");
  };

  const handleContinueShopping = () => {
    if (!userId) {
      setMessage("Please log in to continue shopping");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    navigate("/shop");
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const total = subtotal - discount;

  if (!userId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
        <p className="text-gray-500 text-sm sm:text-base">
          Please{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline font-semibold"
            aria-label="Navigate to login page"
          >
            login
          </button>{" "}
          to view cart.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Steps */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-4">
        <div className="flex items-center shopping-cart-step">
          <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black text-white font-bold text-sm sm:text-base mr-2">
            1
          </span>
          <Link to="/carts">
            <span className="font-semibold text-sm sm:text-lg">SHOPPING CART</span>
          </Link>
        </div>
        <div className="border-t border-gray-300 flex-1 mx-2 hidden sm:block"></div>
        <div className="flex items-center text-gray-400 checkout-step">
          <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-gray-300 text-sm sm:text-base mr-2">
            2
          </span>
          <Link to="/Checkout">
            <span className="font-semibold text-sm sm:text-lg">CHECKOUT</span>
          </Link>
        </div>
        <div className="border-t border-gray-300 flex-1 mx-2 hidden sm:block"></div>
        <div className="flex items-center text-gray-400 order-status-step">
          <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-gray-300 text-sm sm:text-base mr-2">
            3
          </span>
          <span className="font-semibold text-sm sm:text-lg">ORDER STATUS</span>
        </div>
      </div>

      {/* Custom CSS for Mobile View */}
      <style>
        {`
          @media (max-width: 639px) {
            .checkout-step, .order-status-step {
              display: none;
            }
            .shopping-cart-step {
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>

      <div className="text-center text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
        You are out of time! Checkout now to avoid losing your order!
      </div>

      {message && (
        <div className="mb-4 text-center text-sm text-gray-600">{message}</div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-left mb-4">
              <thead>
                <tr className="border-b text-sm sm:text-base">
                  <th className="py-2 sm:py-3">PRODUCT</th>
                  <th className="py-2 sm:py-3">PRICE</th>
                  <th className="py-2 sm:py-3">SKU</th>
                  <th className="py-2 sm:py-3">QUANTITY</th>
                  <th className="py-2 sm:py-3">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <tr key={item.id} className="border-b text-sm sm:text-base">
                      <td className="py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            Storage: {item.storage}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            Colour: <span className="text-black">{item.color}</span>
                          </div>
                        </div>
                        <button
                          className="text-gray-400 hover:text-red-500 p-2"
                          onClick={() => handleRemove(item.id)}
                          title="Remove"
                          aria-label={`Remove ${item.name}`}
                        >
                          🗑️
                        </button>
                      </td>
                      <td className="py-3 sm:py-4">${(item.price || 0).toFixed(2)}</td>
                      <td className="py-3 sm:py-4">{item.sku}</td>
                      <td className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <button
                            className="px-2 py-1 border rounded-l text-gray-500 text-sm sm:text-base"
                            onClick={() => handleQuantity("dec", item.id)}
                            disabled={(item.quantity || 1) === 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span className="px-2 sm:px-3 text-sm sm:text-base">{item.quantity || 1}</span>
                          <button
                            className="px-2 py-1 border rounded-r text-gray-500 text-sm sm:text-base"
                            onClick={() => handleQuantity("inc", item.id)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500 text-sm sm:text-base">
                      Your cart is empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="font-semibold text-sm">{item.name}</div>
                        <button
                          className="text-gray-400 hover:text-red-500 p-1"
                          onClick={() => handleRemove(item.id)}
                          title="Remove"
                          aria-label={`Remove ${item.name}`}
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="text-xs text-gray-500">Storage: {item.storage}</div>
                      <div className="text-xs text-gray-500">
                        Colour: <span className="text-black">{item.color}</span>
                      </div>
                      <div className="text-sm mt-2">
                        Price: ${(item.price || 0).toFixed(2)}
                      </div>
                      <div className="text-sm">SKU: {item.sku}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 border rounded-l-sm text-xs text-gray-700"
                        onClick={() => handleQuantity("dec", item.id)}
                        disabled={(item.quantity || 1) === 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="px-2 text-sm">{item.quantity || 1}</span>
                      <button
                        className="px-2 py-1 border rounded-r text-xs text-gray-700"
                        onClick={() => handleQuantity("inc", item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm font-semibold">
                      Subtotal: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 text-sm py-4">
                Your cart is empty.
              </div>
            )}
          </div>

          {/* Coupon and Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4">
            <div className="flex items-center w-full sm:w-auto">
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border rounded-l w-full sm:w-48 px-3 py-2 text-sm"
                disabled={!!appliedCoupon}
                aria-label="Enter coupon code"
              />
              <button
                className="bg-emerald-600 text-white px-3 sm:px-4 py-2 text-sm rounded-r"
                onClick={handleApplyCoupon}
                disabled={!!appliedCoupon}
                aria-label="Apply coupon"
              >
                OK
              </button>
            </div>
            <button
              className="border px-2 sm:px-4 py-2 text-sm rounded w-full sm:w-auto hover:bg-gray-100 flex items-center justify-center gap-2"
              onClick={handleClear}
              disabled={cart.length === 0}
              aria-label="Clear shopping cart"
            >
              🗑️ Clear
            </button>
            <button
              className="border px-2 sm:px-2 py-4 text-sm rounded w-full sm:w-auto hover:bg-gray-100 flex items-center justify-center gap-2"
              onClick={handleRedo}
              disabled={!cleared || cart.length > 0}
              aria-label="Redo cart"
            >
              🔄 Redo
            </button>
          </div>
          {couponMsg && (
            <div
              className={`mt-2 text-sm text-center sm:text-left ${
                appliedCoupon ? "text-green-600" : "text-red-600"
              }`}
            >
              {couponMsg}
            </div>
          )}
        </div>

        {/* Cart Totals */}
        <div className="w-full lg:w-80 border rounded-lg p-4 sm:p-6">
          <div className="font-semibold text-sm sm:text-sm mb-4">CART SUMMARY</div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between mb-2 text-sm text-green-600">
              <span>Discount ({appliedCoupon.code})</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base sm:text-xl mb-4">
            <span>TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckoutNavigation}
            className="w-full bg-black text-white py-2 rounded text-sm sm:text-base font-semibold hover:bg-gray-800 mb-3"
          >
            Proceed To Checkout
          </button>
          <button
            onClick={handleContinueShopping}
            className="w-full border py-2 rounded text-sm sm:text-base font-semibold hover:bg-gray-100"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="flex flex-col items-center mt-6 sm:mt-8">
        <div className="flex gap-2 sm:gap-3 mb-2">
          <img
            src="https://img.icons8.com/color/48/000000/visa.png"
            alt="Visa"
            className="h-6 sm:h-8"
          />
          <img
            src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
            alt="Mastercard"
            className="h-6 sm:h-8"
          />
          <img
            src="https://img.icons8.com/color/48/000000/paypal.png"
            alt="Paypal"
            className="h-6 sm:h-8"
          />
          <img
            src="https://img.icons8.com/color/48/000000/discover.png"
            alt="Discover"
            className="h-6 sm:h-8"
          />
          <img
            src="https://img.icons8.com/color/48/000000/visa.png"
            alt="Visa"
            className="h-6 sm:h-8"
          />
        </div>
        <div className="text-gray-500 text-xs sm:text-sm">
          Guarantee Safe and Secure Payment Checkout
        </div>
      </div>
    </div>
  );
};

export default Carts;