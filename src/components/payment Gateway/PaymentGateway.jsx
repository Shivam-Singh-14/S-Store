import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the base URL for the backend API
const BASE_URL = 'http://localhost:5000/api';

// Utility function to get data from localStorage
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error fetching ${key} from localStorage:`, error);
    return [];
  }
};

const PaymentGateway = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  // Assume user is stored in localStorage as in previous components
  const userId = getFromStorage('user')?.id || 'default-user';
  const cartKey = `cart_${userId}`;

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch cart data and calculate total
  useEffect(() => {
    const cartItems = getFromStorage(cartKey);
    if (cartItems.length === 0) {
      setError('Your cart is empty. Please add items to proceed.');
      setLoading(false);
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setCart(cartItems);
    setTotalAmount(total);
    setLoading(false);
  }, [cartKey]);

  // Handle payment initiation
  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError('Failed to load Razorpay SDK. Please check your internet connection.');
      return;
    }

    try {
      // Call backend to create Razorpay order using BASE_URL
      const response = await fetch(`${BASE_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const order = await response.json();
      if (!response.ok) {
        throw new Error(order.message || 'Failed to create order');
      }

      // Initialize Razorpay checkout
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID from dashboard
        amount: order.amount,
        currency: order.currency,
        name: 'X-STORE',
        description: 'Payment for your order',
        order_id: order.id,
        handler: async function (response) {
          // Verify payment on backend using BASE_URL
          const verifyResponse = await fetch(`${BASE_URL}/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verification = await verifyResponse.json();
          if (verifyResponse.ok) {
            // Clear cart on successful payment
            localStorage.setItem(cartKey, JSON.stringify([]));
            window.dispatchEvent(new Event('localStorageChange')); // Trigger Navbar update
            navigate('/order-success', { state: { orderId: order.id } });
          } else {
            setError(verification.message || 'Payment verification failed');
          }
        },
        prefill: {
          email: getFromStorage('user')?.email || '',
          contact: '9123456789', // Replace with actual user contact if available
        },
        theme: {
          color: '#1976D2',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message || 'An error occurred while processing your payment');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-medium text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-poppins">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#212121]">Checkout</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-semibold text-[#212121] mb-4">Order Summary</h3>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="text-md text-[#212121]">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
              </div>
              <p className="text-md font-medium text-[#212121]">
                ₹{(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <p className="text-lg font-semibold text-[#212121]">Total:</p>
            <p className="text-lg font-semibold text-[#212121]">₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePayment}
            className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-6 py-3 rounded-md text-md font-medium"
          >
            Pay Now with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;