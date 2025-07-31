import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Utility function to get current user from local storage (reused from CheckOut)
const getCurrentUser = () => {
  try {
    const currentUserData = localStorage.getItem("currentUser");
    const user = currentUserData ? JSON.parse(currentUserData) : null;
    if (user && !user.userId) {
      user.userId = user.email || user.username;
    }
    return user;
  } catch (error) {
    console.error("Error accessing localStorage for currentUser:", error);
    return null;
  }
};

// Utility function to clear cart from local storage
const clearCartFromStorage = (cartKey) => {
  try {
    localStorage.setItem(cartKey, JSON.stringify([]));
    console.log(`Cart cleared from localStorage for ${cartKey}`);
  } catch (error) {
    console.error(`Error clearing cart from localStorage for ${cartKey}:`, error);
  }
};

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || null;
  const cartKey = userId ? `cart_${userId}` : null;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get cart and total from navigation state
  const { cart = [], total = 0 } = location.state || {};

  // Clear cart after order is placed (optional, depending on business logic)
  useEffect(() => {
    if (cartKey && cart.length > 0) {
      clearCartFromStorage(cartKey);
    }
  }, [cartKey, cart]);

  useEffect(() => {
    // Get order details from localStorage
    const storedOrder = localStorage.getItem('currentOrderForPayment');
    if (storedOrder) {
      try {
        const orderData = JSON.parse(storedOrder);
        setOrderDetails(orderData);
        setLoading(false);
        // Clear order data from localStorage after reading
        localStorage.removeItem('currentOrderForPayment');
      } catch (error) {
        console.error('Failed to parse order data from localStorage:', error);
        setOrderDetails(null);
        setLoading(false);
        // Redirect to checkout if data is invalid
        navigate('/checkout');
      }
    } else {
      // If no order data in localStorage, redirect to checkout
      navigate('/checkout');
    }
  }, [navigate]); // Depend on navigate

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!orderDetails) return; // Prevent payment if orderDetails is null

    try {
      const res = await initializeRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load');
        return;
      }

      // Create order on your backend
      const { data } = await axios.post('/api/create-order', {
        amount: orderDetails.totalAmount * 100, // Convert to paise
        currency: 'INR',
        receipt: `order_${orderDetails.orderId}`,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Your Store Name',
        description: 'Payment for your order',
        order_id: data.id,
        handler: async function (response) {
          try {
            // Verify payment on your backend
            await axios.post('/api/verify-payment', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderDetails.orderId,
            });

            // Redirect to success page
            navigate('/payment-success', {
              state: {
                orderId: orderDetails.orderId,
                paymentId: response.razorpay_payment_id,
              },
            });
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: orderDetails.customerName,
          email: orderDetails.customerEmail,
          contact: orderDetails.customerPhone,
        },
        theme: {
          color: '#1565C0',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Failed to initialize payment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!orderDetails) {
     return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
         Could not load order details. Please return to checkout.
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-blue-600">
            <h2 className="text-xl font-semibold text-white">Order Confirmation</h2>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                <div className="border-t border-gray-200">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>₹{orderDetails.totalAmount.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>

              {/* Payment Button */}
              <div className="mt-6">
                <button
                  onClick={handlePayment}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;