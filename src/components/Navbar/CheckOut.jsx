
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

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

const CheckOut = () => {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const userId = currentUser?.userId || null; // No default-user fallback
  const cartKey = userId ? `cart_${userId}` : null; // e.g., cart_l@gmail.com
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "India",
    address: "",
    address2: "",
    city: "",
    state: "Select an option...",
    phone: "",
    zip: "",
    email: "",
  });
  const [orderNotes, setOrderNotes] = useState("");
  const [payment, setPayment] = useState("bank");
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);

  const countries = ["United States (US)", "Canada", "United Kingdom", "India"];
  const states = ["Select an option...", "California", "Texas", "New York", "Florida", "Illinois", "Maharashtra"];
  const paymentMethods = [
    {
      label: "Cash on delivery",
      value: "cod",
      description: "Pay with cash upon delivery.",
    },
    {
      label: "Online Payment",
      value: "online",
      description: "Pay securely using our online payment gateway.",
    },
  ];

  // Fetch cart data from local storage on component mount
  useEffect(() => {
    const fetchCartData = () => {
      console.log("Fetching cart data for checkout...");
      if (!userId) {
        setCart([]); // No user, empty cart
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
    };

    fetchCartData();
  }, [cartKey]);

  // Fetch applied coupon from local storage
  useEffect(() => {
    const fetchCouponsData = () => {
      console.log("Fetching coupons data for checkout...");
      const fetchedCoupons = getCouponsFromStorage();
      console.log("Fetched coupons from local storage:", fetchedCoupons);
      // Assuming the applied coupon is the first one (simplified logic)
      if (fetchedCoupons.length > 0) {
        setAppliedCoupon(fetchedCoupons[0]);
      }
    };

    fetchCouponsData();
  }, []);

  // Sync with cart changes in localStorage (from Cart page or other tabs)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === cartKey) {
        setCart(getCartFromStorage(cartKey));
      }
      if (event.key === COUPON_KEY) {
        setAppliedCoupon(getCouponsFromStorage());
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Also poll for in-tab changes
    const interval = setInterval(() => {
      const latestCart = getCartFromStorage(cartKey);
      setCart((prev) => {
        return JSON.stringify(prev) !== JSON.stringify(latestCart) ? latestCart : prev;
      });
      const latestCoupon = getCouponsFromStorage();
      setAppliedCoupon((prev) => {
        return JSON.stringify(prev) !== JSON.stringify(latestCoupon) ? latestCoupon : prev;
      });
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [cartKey]);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0),
    [cart]
  );
  const discount = useMemo(
    () => (appliedCoupon && typeof appliedCoupon.discount === "number" ? subtotal * appliedCoupon.discount : 0),
    [appliedCoupon, subtotal]
  );
  const total = useMemo(
    () => Math.max(0, subtotal - discount),
    [subtotal, discount]
  );

  // Stepper navigation
  const goToStep = (step) => setActiveStep(step);

  // Quantity change (also update localStorage)
  const handleQuantity = (type, id) => {
    const updated = cart.map((item) =>
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
    );
    setCart(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  // Remove item from cart (also update localStorage)
  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  // Place order handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setShowOrderPlaced(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Order Placed Popup */}
      {showOrderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center max-w-xs w-full mx-2">
            <div className="text-green-600 text-5xl mb-3">✔️</div>
            <div className="font-bold text-lg mb-2 text-center">Order placed successfully!</div>
            <button
              className="mt-4 bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 text-xs"
              onClick={() => {
                setShowOrderPlaced(false);
                // Optionally clear cart or redirect here
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-4">
        <div className="flex items-center shopping-cart-step">
          <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black text-white font-bold text-sm sm:text-base mr-2">
            1
          </span>
          <Link to="/cart">
            <span className="font-semibold text-sm sm:text-lg">SHOPPING CART</span>
          </Link>
        </div>
        <div className="border-t border-gray-300 flex-1 mx-2 hidden sm:block"></div>
        <div className="flex items-center text-gray-400 checkout-step">
          <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-gray-300 text-sm sm:text-base mr-2">
            2
          </span>
          <Link to="/Checkout">
            <span className="font-semibold text-lg sm:text-2xl text-gray-900">CHECKOUT</span>          
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
            .shopping-cart-step, .order-status-step {
              display: none;
            }
            .checkout-step {
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Checkout Form */}
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Checkout</h2>
          <div className="border rounded-lg p-4 sm:p-6">
            {/* Step 1: Billing Details */}
            <div className="mb-2">
              <button
                className="flex items-center gap-2 font-bold mb-2 focus:outline-none text-sm"
                onClick={() => goToStep(1)}
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full ${
                    activeStep === 1 ? "bg-black text-white" : "border border-gray-400 text-black"
                  } text-xs`}
                >
                  1
                </span>
                <span className="font-bold">BILLING DETAILS</span>
              </button>
              {activeStep === 1 && (
                <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); goToStep(2); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="First Name *"
                        className="border px-3 py-2 rounded w-full text-sm"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name *"
                        className="border px-3 py-2 rounded w-full text-sm"
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="company">
                        Company Name (optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Company Name"
                        className="border px-3 py-2 rounded w-full text-sm"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="country">
                        Country / Region *
                      </label>
                      <select
                        id="country"
                        className="border px-3 py-2 rounded w-full text-sm"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        required
                      >
                        {countries.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                        Street address *
                      </label>
                      <input
                        id="address"
                        type="text"
                        placeholder="Street address *"
                        className="border px-3 py-2 rounded w-full text-sm"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="address2">
                        Address line 2
                      </label>
                      <input
                        id="address2"
                        type="text"
                        placeholder="Address line 2"
                        className="border px-3 py-2 rounded w-full text-sm"
                        value={form.address2}
                        onChange={(e) => setForm({ ...form, address2: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="city">
                        Town / City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="Town / City *"
                        className="border px-3 py-2 rounded w-full text-sm"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="state">
                        State *
                      </label>
                      <select
                        id="state"
                        className="border px-3 py-2 rounded w-full text-sm"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        required
                      >
                        {states.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        type="text"
                        placeholder="Phone *"
                        className="border px-3 py-2 rounded w-full text-sm"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="zip">
                        PIN Code *
                      </label>
                      <input
                        id="zip"
                        type="text"
                        placeholder="PIN Code *"
                        className="border px-3 py-2 rounded w-full text-sm"
                        required
                        value={form.zip}
                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email Address *"
                        className="border px-3 py-2 rounded w-full text-sm"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                    <Link to="/cart" className="text-gray-600 underline text-sm">
                      &lt; Return to cart
                    </Link>
                    <button
                      type="submit"
                      className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 text-sm w-full sm:w-auto"
                    >
                      Continue to Order notes {'>'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Step 2: Additional Information */}
            <div className="mb-2">
              <button
                className="flex items-center gap-2 font-bold mb-2 focus:outline-none text-sm"
                onClick={() => goToStep(2)}
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full ${
                    activeStep === 2 ? "bg-black text-white" : "border border-gray-400 text-black"
                  } text-xs`}
                >
                  2
                </span>
                <span className="font-bold">ADDITIONAL INFORMATION</span>
              </button>
              {activeStep === 2 && (
                <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); goToStep(3); }}>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-700 mb-1">Order Notes (optional)</label>
                    <textarea
                      className="border px-3 py-2 rounded w-full text-sm"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      rows={3}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                    <button
                      type="button"
                      className="text-gray-600 underline text-sm"
                      onClick={() => goToStep(1)}
                    >
                      &lt; Return to billing
                    </button>
                    <button
                      type="submit"
                      className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 text-sm w-full sm:w-auto"
                    >
                      Continue to Payments {'>'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Step 3: Payment */}
            <div className="mb-2">
              <button
                className="flex items-center gap-2 font-bold mb-2 focus:outline-none text-sm"
                onClick={() => goToStep(3)}
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full ${
                    activeStep === 3 ? "bg-black text-white" : "border border-gray-400 text-black"
                  } text-xs`}
                >
                  3
                </span>
                <span className="font-bold">PAYMENT</span>
              </button>
              {activeStep === 3 && (
                <form className="space-y-4" onSubmit={handlePlaceOrder}>
                  <div className="border-b pb-2 mb-2">
                    {paymentMethods.map((pm) => (
                      <div key={pm.value} className="flex items-start gap-2 mb-1">
                        <input
                          type="radio"
                          name="payment"
                          value={pm.value}
                          checked={payment === pm.value}
                          onChange={() => setPayment(pm.value)}
                          className="mt-1 accent-blue-600"
                        />
                        <div>
                          <span className="font-medium text-sm">{pm.label}</span>
                          {payment === pm.value && pm.description && (
                            <div className="text-gray-600 text-sm mt-1">{pm.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 text-sm tracking-wide"
                    onClick={(e) => {
                      e.preventDefault();
                      if (payment === "online") {
                        // Navigate to PaymentGateway page
                        window.location.href = "/payment-gateway";
                      } else {
                        // Proceed with order placement for COD
                        handlePlaceOrder(e);
                      }
                    }}
                  >
                    PLACE ORDER
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Cart Totals */}
        <div className="w-full lg:w-80 border rounded-lg p-4 sm:p-6">
          <div className="font-semibold text-sm sm:text-sm mb-4">ORDER SUMMARY</div>
          {cart.length === 0 ? (
            <div className="text-sm text-gray-500 mb-4">Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 mb-2">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                <div>
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="border px-2 py-1 rounded-l text-gray-500 text-sm"
                      onClick={() => handleQuantity("dec", item.id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="px-2 text-sm">{item.quantity}</span>
                    <button
                      className="border px-2 py-1 rounded-r text-gray-500 text-sm"
                      onClick={() => handleQuantity("inc", item.id)}
                    >
                      +
                    </button>
                    <span className="ml-2 text-sm">× ${item.price?.toFixed(2)}</span>
                  </div>
                  {item.storage && <div className="text-sm text-gray-500">Storage: {item.storage}</div>}
                  {item.color && (
                    <div className="text-sm text-gray-500">
                      Colour: <span className="text-black">{item.color}</span>
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="text-red-600 underline text-sm mt-1"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
          <hr className="my-4" />
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

export default CheckOut;