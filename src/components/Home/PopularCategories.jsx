// import React, { useState, useEffect, useRef } from 'react';
// import { FaShoppingCart, FaHeart, FaSyncAlt, FaEye } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import ProductNew from '../Shop/ProductNew';

// // Utility functions for local storage
// const getCurrentUser = () => {
//   const usersData = localStorage.getItem("users");
//   const users = usersData ? JSON.parse(usersData) : [];
//   const user = users.length > 0 ? users[0] : null;
//   if (user && !user.userId) {
//     user.userId = user.email || user.username || "default-user";
//   }
//   return user;
// };

// const getWishlistFromStorage = (wishlistKey) => {
//   try {
//     const data = localStorage.getItem(wishlistKey);
//     return data ? JSON.parse(data) : [];
//   } catch (error) {
//     console.error("Error parsing wishlist from localStorage:", error);
//     return [];
//   }
// };

// const saveWishlistToStorage = (wishlistKey, wishlist) => {
//   try {
//     localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
//   } catch (error) {
//     console.error("Error saving wishlist to localStorage:", error);
//   }
// };

// const getCompareFromStorage = (compareKey) => {
//   try {
//     const data = localStorage.getItem(compareKey);
//     return data ? JSON.parse(data) : [];
//   } catch (error) {
//     console.error("Error parsing compareList from localStorage:", error);
//     return [];
//   }
// };

// const saveCompareToStorage = (compareKey, compare) => {
//   try {
//     localStorage.setItem(compareKey, JSON.stringify(compare));
//   } catch (error) {
//     console.error(`Error saving compareList to localStorage for ${compareKey}:`, error);
//   }
// };

// const getCartFromStorage = (cartKey) => {
//   try {
//     const data = localStorage.getItem(cartKey);
//     return data ? JSON.parse(data) : [];
//   } catch (error) {
//     console.error("Error parsing cart from localStorage:", error);
//     return [];
//   }
// };

// const saveCartToStorage = (cartKey, cart) => {
//   try {
//     localStorage.setItem(cartKey, JSON.stringify(cart));
//   } catch (error) {
//     console.error(`Error saving cart to localStorage for ${cartKey}:`, error);
//   }
// };

// const PopularCategories = () => {
//   const [products, setProducts] = useState([]);
//   const scrollContainerRef = useRef(null);
//   const scrollInterval = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [hoveredProductId, setHoveredProductId] = useState(null);
//   const navigate = useNavigate();
//   // Add a ref to store the debounce timeout for dots indicator
//   const debounceTimeout = useRef(null);

//   // Get user and initialize keys
//   const user = getCurrentUser();
//   const userId = user?.userId || "default-user";
//   const wishlistKey = `wishlist_${userId}`;
//   const compareKey = `compare_${userId}`;
//   const cartKey = `cart_${userId}`;

//   // Initialize states for wishlist, compare, and cart for all products
//   const [wishlistStates, setWishlistStates] = useState({});
//   const [compareStates, setCompareStates] = useState({});
//   const [cartStates, setCartStates] = useState({});

//   // Fetch products and initialize states
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://fakestoreapi.com/products?limit=4');
//         const data = await response.json();
//         const repeatedProducts = [...data, ...data, ...data, ...data]; // Quadruple for smoother looping
//         setProducts(repeatedProducts);

//         // Initialize states for each product
//         const wishlist = getWishlistFromStorage(wishlistKey);
//         const compare = getCompareFromStorage(compareKey);
//         const cart = getCartFromStorage(cartKey);

//         const initialWishlistStates = {};
//         const initialCompareStates = {};
//         const initialCartStates = {};

//         // Initialize states for each instance of the repeated products
//         repeatedProducts.forEach((product, index) => {
//           const key = `${product.id}-${index}`;
//           initialWishlistStates[key] = wishlist.some(item => item.id === product.id);
//           initialCompareStates[key] = compare.some(item => item.id === product.id);
//           initialCartStates[key] = cart.some(item => item.id === product.id);
//         });

//         setWishlistStates(initialWishlistStates);
//         setCompareStates(initialCompareStates);
//         setCartStates(initialCartStates);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setProducts([]);
//       }
//     };

//     fetchProducts();
//   }, [wishlistKey, compareKey, cartKey]);

//   // Calculate card width dynamically based on screen size
//   const getCardWidth = () => {
//     const screenWidth = window.innerWidth;
//     if (screenWidth >= 1280) return 256; // xl
//     if (screenWidth >= 1024) return 224; // lg
//     if (screenWidth >= 768) return 192;  // md
//     if (screenWidth >= 640) return 160;  // sm
//     return 144; // default
//   };

//   const [cardWidth, setCardWidth] = useState(getCardWidth());

//   useEffect(() => {
//     const handleResize = () => setCardWidth(getCardWidth());
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle infinite scroll behavior
//   const gapWidth = 16; // Corresponds to space-x-4 (16px)
//   const scrollDistance = cardWidth + gapWidth;
//   const originalSetWidth = (products.length / 4 * cardWidth) + ((products.length / 4 - 1) * gapWidth);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (scrollContainerRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//         if (scrollLeft + clientWidth >= scrollWidth - scrollDistance) {
//           scrollContainerRef.current.scrollLeft = originalSetWidth;
//         } else if (scrollLeft <= 0) {
//           scrollContainerRef.current.scrollLeft = scrollWidth - clientWidth - scrollDistance;
//         }
//         // Update currentIndex based on scroll position with debounce
//         const newIndex = Math.round(scrollLeft / scrollDistance) % (products.length / 4);
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           setCurrentIndex(newIndex);
//         }, 50); // 50ms debounce delay
//       }
//     };

//     const scrollElement = scrollContainerRef.current;
//     if (scrollElement) {
//       scrollElement.scrollLeft = originalSetWidth;
//       scrollElement.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       if (scrollElement) {
//         scrollElement.removeEventListener('scroll', handleScroll);
//       }
//       // Cleanup debounce timeout on unmount
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [products, cardWidth, gapWidth, originalSetWidth, scrollDistance]);

//   // Scroll handlers for left and right buttons
//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
//     }
//   };

//   // Handle dot click to scroll to specific product
//   const handleDotClick = (index) => {
//     if (scrollContainerRef.current) {
//       const originalLength = products.length / 4;
//       const targetIndex = index + originalLength;
//       const scrollPosition = targetIndex * scrollDistance;
//       scrollContainerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
//       setCurrentIndex(index);
//     }
//   };

//   // Handlers for hover buttons
//   const handleWishlistClick = (product, key) => {
//     const wishlist = getWishlistFromStorage(wishlistKey);
//     let updatedWishlist;

//     if (wishlistStates[key]) {
//       updatedWishlist = wishlist.filter(item => item.id !== product.id);
//     } else {
//       updatedWishlist = [...wishlist, product];
//     }

//     saveWishlistToStorage(wishlistKey, updatedWishlist);

//     // Update state for all instances of this product
//     const newWishlistStates = { ...wishlistStates };
//     products.forEach((p, idx) => {
//       if (p.id === product.id) {
//         const pKey = `${p.id}-${idx}`;
//         newWishlistStates[pKey] = !wishlistStates[key];
//       }
//     });
//     setWishlistStates(newWishlistStates);
//   };

//   const handleCompareClick = (product, key) => {
//     const compare = getCompareFromStorage(compareKey);
//     let updatedCompare;

//     if (compareStates[key]) {
//       updatedCompare = compare.filter(item => item.id !== product.id);
//     } else {
//       updatedCompare = [...compare, product];
//     }

//     saveCompareToStorage(compareKey, updatedCompare);

//     // Update state for all instances of this product
//     const newCompareStates = { ...compareStates };
//     products.forEach((p, idx) => {
//       if (p.id === product.id) {
//         const pKey = `${p.id}-${idx}`;
//         newCompareStates[pKey] = !compareStates[key];
//       }
//     });
//     setCompareStates(newCompareStates);
//   };

//   const handleCartClick = (product, key) => {
//     const cart = getCartFromStorage(cartKey);
//     let updatedCart;

//     if (cartStates[key]) {
//       updatedCart = cart.filter(item => item.id !== product.id);
//     } else {
//       updatedCart = [...cart, product];
//     }

//     saveCartToStorage(cartKey, updatedCart);

//     // Update state for all instances of this product
//     const newCartStates = { ...cartStates };
//     products.forEach((p, idx) => {
//       if (p.id === product.id) {
//         const pKey = `${p.id}-${idx}`;
//         newCartStates[pKey] = !cartStates[key];
//       }
//     });
//     setCartStates(newCartStates);
//   };

//   const handleViewClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <div className="py-8 px-4 sm:px-6 lg:px-8">
//       {/* Section Title */}
//       <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
//         Shop Our Trending Items
//         <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
//       </h2>

//       {/* Carousel Container */}
//       <div className="relative max-w-screen-xl mx-auto">
//         {/* Left Scroll Button */}
//         <button
//           onClick={scrollLeft}
//           onMouseDown={() => {
//             if (scrollContainerRef.current) {
//               scrollContainerRef.current.scrollBy({ left: -scrollDistance / 5, behavior: 'smooth' });
//               scrollInterval.current = setInterval(() => {
//                 if (scrollContainerRef.current) {
//                   scrollContainerRef.current.scrollBy({ left: -scrollDistance / 5, behavior: 'smooth' });
//                 }
//               }, 100);
//             }
//           }}
//           onMouseUp={() => clearInterval(scrollInterval.current)}
//           onMouseLeave={() => clearInterval(scrollInterval.current)}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
//         >
//           <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
//           </svg>
//         </button>

//         {/* Product Cards */}
//         <div
//           ref={scrollContainerRef}
//           className="flex space-x-4 overflow-x-hidden snap-x snap-mandatory"
//         >
//           {products.map((product, index) => {
//             const key = `${product.id}-${index}`;
//             return (
//               <ProductNew
//                 key={key}
//                 product={product}
//                 index={index}
//               />
//             );
//           })}
//         </div>

//         {/* Right Scroll Button */}
//         <button
//           onClick={scrollRight}
//           onMouseDown={() => {
//             if (scrollContainerRef.current) {
//               scrollContainerRef.current.scrollBy({ left: scrollDistance / 5, behavior: 'smooth' });
//               scrollInterval.current = setInterval(() => {
//                 if (scrollContainerRef.current) {
//                   scrollContainerRef.current.scrollBy({ left: scrollDistance / 5, behavior: 'smooth' });
//                 }
//               }, 100);
//             }
//           }}
//           onMouseUp={() => clearInterval(scrollInterval.current)}
//           onMouseLeave={() => clearInterval(scrollInterval.current)}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
//         >
//           <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//           </svg>
//         </button>
//       </div>

//       {/* Dots Indicator */}
//       <div className="flex justify-center mt-4 space-x-2">
//         {products.slice(0, products.length / 4).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
//           ></button>
//         ))}
//       </div>

//       {/* Web Visits and Buy Now Buttons (Top Right) */}
      
//     </div>
//   );
// };

// export default PopularCategories;
import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaHeart, FaSyncAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProductNew from '../Shop/ProductNew';

// Utility functions for local storage
const getCurrentUser = () => {
  const usersData = localStorage.getItem("users");
  const users = usersData ? JSON.parse(usersData) : [];
  const user = users.length > 0 ? users[0] : null;
  if (user && !user.userId) {
    user.userId = user.email || user.username || "default-user";
  }
  return user;
};

const getWishlistFromStorage = (wishlistKey) => {
  try {
    const data = localStorage.getItem(wishlistKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing wishlist from localStorage:", error);
    return [];
  }
};

const saveWishlistToStorage = (wishlistKey, wishlist) => {
  try {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error);
  }
};

const getCompareFromStorage = (compareKey) => {
  try {
    const data = localStorage.getItem(compareKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing compareList from localStorage:", error);
    return [];
  }
};

const saveCompareToStorage = (compareKey, compare) => {
  try {
    localStorage.setItem(compareKey, JSON.stringify(compare));
  } catch (error) {
    console.error(`Error saving compareList to localStorage for ${compareKey}:`, error);
  }
};

const getCartFromStorage = (cartKey) => {
  try {
    const data = localStorage.getItem(cartKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
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

const PopularCategories = () => {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);
  const scrollInterval = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);

  const user = getCurrentUser();
  const userId = user?.userId || "default-user";
  const wishlistKey = `wishlist_${userId}`;
  const compareKey = `compare_${userId}`;
  const cartKey = `cart_${userId}`;

  const [wishlistStates, setWishlistStates] = useState({});
  const [compareStates, setCompareStates] = useState({});
  const [cartStates, setCartStates] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=4');
        const data = await response.json();
        const repeatedProducts = [...data, ...data, ...data, ...data];
        setProducts(repeatedProducts);

        const wishlist = getWishlistFromStorage(wishlistKey);
        const compare = getCompareFromStorage(compareKey);
        const cart = getCartFromStorage(cartKey);

        const initialWishlistStates = {};
        const initialCompareStates = {};
        const initialCartStates = {};

        repeatedProducts.forEach((product, index) => {
          const key = `${product.id}-${index}`;
          initialWishlistStates[key] = wishlist.some(item => item.id === product.id);
          initialCompareStates[key] = compare.some(item => item.id === product.id);
          initialCartStates[key] = cart.some(item => item.id === product.id);
        });

        setWishlistStates(initialWishlistStates);
        setCompareStates(initialCompareStates);
        setCartStates(initialCartStates);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [wishlistKey, compareKey, cartKey]);

  const getCardWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) return 256;
    if (screenWidth >= 1024) return 224;
    if (screenWidth >= 768) return 192;
    if (screenWidth >= 640) return 160;
    return 144;
  };

  const [cardWidth, setCardWidth] = useState(getCardWidth());

  useEffect(() => {
    const handleResize = () => setCardWidth(getCardWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gapWidth = 16;
  const scrollDistance = cardWidth + gapWidth;
  const originalSetWidth = (products.length / 4 * cardWidth) + ((products.length / 4 - 1) * gapWidth);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - scrollDistance) {
          scrollContainerRef.current.scrollLeft = originalSetWidth;
        } else if (scrollLeft <= 0) {
          scrollContainerRef.current.scrollLeft = scrollWidth - clientWidth - scrollDistance;
        }
        const newIndex = Math.round(scrollLeft / scrollDistance) % (products.length / 4);
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
          setCurrentIndex(newIndex);
        }, 50);
      }
    };

    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.scrollLeft = originalSetWidth;
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [products, cardWidth, gapWidth, originalSetWidth, scrollDistance]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  const handleDotClick = (index) => {
    if (scrollContainerRef.current) {
      const originalLength = products.length / 4;
      const targetIndex = index + originalLength;
      const scrollPosition = targetIndex * scrollDistance;
      scrollContainerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  const handleWishlistClick = (product, key) => {
    const wishlist = getWishlistFromStorage(wishlistKey);
    let updatedWishlist;

    if (wishlistStates[key]) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    saveWishlistToStorage(wishlistKey, updatedWishlist);

    const newWishlistStates = { ...wishlistStates };
    products.forEach((p, idx) => {
      if (p.id === product.id) {
        const pKey = `${p.id}-${idx}`;
        newWishlistStates[pKey] = !wishlistStates[key];
      }
    });
    setWishlistStates(newWishlistStates);
  };

  const handleCompareClick = (product, key) => {
    const compare = getCompareFromStorage(compareKey);
    let updatedCompare;

    if (compareStates[key]) {
      updatedCompare = compare.filter(item => item.id !== product.id);
    } else {
      updatedCompare = [...compare, product];
    }

    saveCompareToStorage(compareKey, updatedCompare);

    const newCompareStates = { ...compareStates };
    products.forEach((p, idx) => {
      if (p.id === product.id) {
        const pKey = `${p.id}-${idx}`;
        newCompareStates[pKey] = !compareStates[key];
      }
    });
    setCompareStates(newCompareStates);
  };

  const handleCartClick = (product, key) => {
    const cart = getCartFromStorage(cartKey);
    let updatedCart;

    if (cartStates[key]) {
      updatedCart = cart.filter(item => item.id !== product.id);
    } else {
      updatedCart = [...cart, product];
    }

    saveCartToStorage(cartKey, updatedCart);

    const newCartStates = { ...cartStates };
    products.forEach((p, idx) => {
      if (p.id === product.id) {
        const pKey = `${p.id}-${idx}`;
        newCartStates[pKey] = !cartStates[key];
      }
    });
    setCartStates(newCartStates);
  };

  const handleViewClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="py-8 px-6 sm:px-8 lg:px-12">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Shop Our Trending Items
        <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
      </h2>

      <div className="relative w-full mx-auto">
        <button
          onClick={scrollLeft}
          onMouseDown={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({ left: -scrollDistance / 20, behavior: 'smooth' });
              scrollInterval.current = setInterval(() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: -scrollDistance / 20, behavior: 'smooth' });
                }
              }, 30);
            }
          }}
          onMouseUp={() => clearInterval(scrollInterval.current)}
          onMouseLeave={() => clearInterval(scrollInterval.current)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-hidden snap-x snap-mandatory scroll-smooth px-8 sm:px-10 lg:px-12"
        >
          {products.map((product, index) => {
            const key = `${product.id}-${index}`;
            return (
              <ProductNew
                key={key}
                product={product}
                index={index}
              />
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          onMouseDown={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({ left: scrollDistance / 20, behavior: 'smooth' });
              scrollInterval.current = setInterval(() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: scrollDistance / 20, behavior: 'smooth' });
                }
              }, 30);
            }
          }}
          onMouseUp={() => clearInterval(scrollInterval.current)}
          onMouseLeave={() => clearInterval(scrollInterval.current)}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {products.slice(0, products.length / 4).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;