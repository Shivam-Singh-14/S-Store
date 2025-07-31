// import React, { useState, useRef, useEffect } from "react";
// import {
//     Heart,
//     ShoppingCart,
//     Star,
//     ArrowLeftRight,
//     ChevronLeft,
//     ChevronRight,
//     ThumbsUp,
//     ThumbsDown,
//     Edit,
//     PlayCircle,
// } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";
// import ProductCard from "../components/ProductCard";

// // Utility functions for localStorage
// const getCurrentUser = () => {
//     try {
//         const currentUserData = localStorage.getItem("currentUser");
//         const user = currentUserData ? JSON.parse(currentUserData) : null;
//         if (user && !user.userId) {
//             user.userId = user.email || user.username; // No default-user fallback
//         }
//         return user;
//     } catch (error) {
//         console.error("Error parsing currentUser from localStorage:", error);
//         return null;
//     }
// };

// const getCartFromStorage = (cartKey) => {
//     try {
//         const data = localStorage.getItem(cartKey);
//         if (data) return JSON.parse(data);
//     } catch (error) {
//         console.error(`Error parsing cart from localStorage for ${cartKey}:`, error);
//     }
//     return [];
// };

// const saveCartToStorage = (cartKey, cart) => {
//     try {
//         localStorage.setItem(cartKey, JSON.stringify(cart));
//     } catch (error) {
//         console.error(`Error saving cart to localStorage for ${cartKey}:`, error);
//     }
// };

// const getWishlistFromStorage = (wishlistKey) => {
//     try {
//         const data = localStorage.getItem(wishlistKey);
//         if (data) return JSON.parse(data);
//     } catch (error) {
//         console.error(`Error parsing wishlist from localStorage for ${wishlistKey}:`, error);
//     }
//     return [];
// };

// const saveWishlistToStorage = (wishlistKey, wishlist) => {
//     try {
//         localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
//     } catch (error) {
//         console.error(`Error saving wishlist to localStorage for ${wishlistKey}:`, error);
//     }
// };

// const getCompareFromStorage = (compareKey) => {
//     try {
//         const data = localStorage.getItem(compareKey);
//         if (data) return JSON.parse(data);
//     } catch (error) {
//         console.error("Error parsing compareList from localStorage:", error);
//     }
//     return [];
// };

// const saveCompareToStorage = (compareKey, compare) => {
//     try {
//         localStorage.setItem(compareKey, JSON.stringify(compare));
//     } catch (error) {
//         console.error("Error saving compareList to localStorage:", error);
//     }
// };

// const getReviewsFromStorage = (reviewKey) => {
//     try {
//         const data = localStorage.getItem(reviewKey);
//         if (data) return JSON.parse(data);
//     } catch (error) {
//         console.error(`Error parsing reviews from localStorage for ${reviewKey}:`, error);
//     }
//     return [];
// };

// const saveReviewsToStorage = (reviewKey, reviews) => {
//     try {
//         localStorage.setItem(reviewKey, JSON.stringify(reviews));
//     } catch (error) {
//         console.error(`Error saving reviews to localStorage for ${reviewKey}:`, error);
//     }
// };

// const getUserInteractionsFromStorage = (interactionKey) => {
//     try {
//         const data = localStorage.getItem(interactionKey);
//         if (data) return JSON.parse(data);
//     } catch (error) {
//         console.error(`Error parsing user interactions from localStorage for ${interactionKey}:`, error);
//     }
//     return {};
// };

// const saveUserInteractionsToStorage = (interactionKey, interactions) => {
//     try {
//         localStorage.setItem(interactionKey, JSON.stringify(interactions));
//     } catch (error) {
//         console.error(`Error saving user interactions to localStorage for ${interactionKey}:`, error);
//     }
// };

// const ProductPage = () => {
//     const { productId } = useParams();
//     const navigate = useNavigate();
//     const [product, setProduct] = useState(null);
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [reviews, setReviews] = useState([]);
//     const [description, setDescription] = useState("");
//     const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [cartMessage, setCartMessage] = useState("");
//     const [compareMessage, setCompareMessage] = useState("");
//     const [isWishlisted, setIsWishlisted] = useState(false);
//     const [isInCompareList, setIsInCompareList] = useState(false);
//     const [error, setError] = useState(null);

//     const [imgIdx, setImgIdx] = useState(0);
//     const [activeTab, setActiveTab] = useState("description");

//     const [reviewRating, setReviewRating] = useState(0);
//     const [reviewText, setReviewText] = useState("");
//     const [reviewName, setReviewName] = useState("");
//     const [reviewEmail, setReviewEmail] = useState("");
//     const [editingReviewId, setEditingReviewId] = useState(null);
//     const [errors, setErrors] = useState({});
//     const [helpfulCounts, setHelpfulCounts] = useState([]);
//     const [userInteractions, setUserInteractions] = useState({});

//     const isLocalStorageAvailable = () => typeof window !== "undefined" && window.localStorage;

//     const user = getCurrentUser();
//     const userId = user?.userId || null; // Remove default-user fallback
//     const cartKey = userId ? `cart_${userId}` : null;
//     const wishlistKey = userId ? `wishlist_${userId}` : null;
//     const compareKey = userId ? `compare_${userId}` : null;
//     const reviewKey = userId && productId ? `reviews_${productId}_${userId}` : null;
//     const interactionKey = userId && productId ? `interactions_${productId}_${userId}` : null;

//     const mapProductData = (apiProduct) => ({
//         id: apiProduct.id,
//         name: apiProduct.title,
//         brand: apiProduct.title.split(" ")[0] || "Unknown",
//         rating: Math.round(apiProduct.rating.rate),
//         price: apiProduct.price,
//         images: [apiProduct.image],
//         description: apiProduct.description,
//         category: apiProduct.category,
//     });

//     const mapRelatedProducts = (apiProducts) =>
//         apiProducts.map((prod) => ({
//             id: prod.id,
//             image: prod.image,
//             name: prod.title,
//             rating: Math.round(prod.rating.rate),
//             price: `$${prod.price.toFixed(2)}`,
//         }));

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (!productId) throw new Error("Product ID is missing");
//                 const productRes = await fetch(`https://fakestoreapi.com/products/${productId}`);
//                 if (!productRes.ok) throw new Error("Failed to fetch product");
//                 const productData = await productRes.json();

//                 const mappedProduct = mapProductData(productData);
//                 setProduct(mappedProduct);
//                 setDescription(productData.description);

//                 if (isLocalStorageAvailable() && userId) {
//                     const storedReviews = getReviewsFromStorage(reviewKey);
//                     setReviews(storedReviews);
//                     setHelpfulCounts(storedReviews.map((review) => ({
//                         up: review.up || 0,
//                         down: review.down || 0,
//                         user: null,
//                     })));

//                     const storedInteractions = getUserInteractionsFromStorage(interactionKey);
//                     setUserInteractions(storedInteractions);

//                     const wishlist = getWishlistFromStorage(wishlistKey);
//                     const compareList = getCompareFromStorage(compareKey);
//                     setIsWishlisted(wishlist.some((item) => item.id === productData.id));
//                     setIsInCompareList(compareList.some((item) => item.id === productData.id));
//                 }

//                 const relatedRes = await fetch(`https://fakestoreapi.com/products/category/${productData.category}?limit=8`);
//                 if (!relatedRes.ok) throw new Error("Failed to fetch related products");
//                 const relatedData = await relatedRes.json();
//                 const filteredRelated = relatedData.filter((prod) => prod.id !== productData.id);
//                 setRelatedProducts(mapRelatedProducts(filteredRelated));

//                 setError(null);
//             } catch (err) {
//                 console.error("Error fetching data:", err);
//                 setError("Failed to load product data. Please try again later.");
//             }
//         };
//         fetchData();
//     }, [productId, wishlistKey, compareKey, reviewKey, interactionKey]);

//     const handlePrevImg = () => setImgIdx((prev) => (prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1));
//     const handleNextImg = () => setImgIdx((prev) => (prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1));

//     const handleAddToCart = (quantityToAdd = quantity, discountPercentage = 0, redirect = false) => {
//         if (!userId) {
//             setCartMessage("Please log in to add items to your cart");
//             setTimeout(() => setCartMessage(""), 3000);
//             return;
//         }

//         if (!product || !product.id) {
//             setCartMessage("Error: Invalid product");
//             return;
//         }

//         let cart = getCartFromStorage(cartKey);
//         const productExists = cart.some((item) => item.id === product.id && item.discountPercentage === discountPercentage);
//         if (productExists) {
//             setCartMessage("Product with this offer already in cart");
//             return;
//         }

//         const discountedPrice = discountPercentage > 0
//             ? product.price * (1 - discountPercentage / 100)
//             : product.price;

//         const cartItem = {
//             ...product,
//             quantity: quantityToAdd,
//             price: discountedPrice,
//             originalPrice: product.price,
//             discountPercentage
//         };
//         const updatedCart = [...cart, cartItem];

//         try {
//             saveCartToStorage(cartKey, updatedCart);
//             setCartMessage(`Added ${quantityToAdd} item(s) to cart${discountPercentage > 0 ? ` with ${discountPercentage}% discount` : ""}`);
//             setTimeout(() => setCartMessage(""), 3000);
//             if (redirect) {
//                 navigate("/cart");
//             }
//         } catch (error) {
//             setCartMessage("Error: Failed to save cart");
//         }
//     };

//     const handleWishlistClick = () => {
//         if (!userId) {
//             setCartMessage("Please log in to add items to your wishlist");
//             setTimeout(() => setCartMessage(""), 3000);
//             return;
//         }

//         const wishlist = getWishlistFromStorage(wishlistKey);
//         let updatedWishlist;

//         if (isWishlisted) {
//             updatedWishlist = wishlist.filter((item) => item.id !== product.id);
//             setIsWishlisted(false);
//         } else {
//             updatedWishlist = [...wishlist, product];
//             setIsWishlisted(true);
//         }

//         saveWishlistToStorage(wishlistKey, updatedWishlist);
//     };

//     const handleCompareClick = () => {
//         if (!userId) {
//             setCompareMessage("Please log in to add items to your compare list");
//             setTimeout(() => setCompareMessage(""), 3000);
//             return;
//         }

//         if (!product || !product.id) {
//             setCompareMessage("Error: Invalid product");
//             return;
//         }

//         let compareList = getCompareFromStorage(compareKey);
//         let updatedCompareList;

//         if (isInCompareList) {
//             updatedCompareList = compareList.filter((item) => item.id !== product.id);
//             setIsInCompareList(false);
//         } else {
//             updatedCompareList = [...compareList, product];
//             setIsInCompareList(true);
//         }

//         saveCompareToStorage(compareKey, updatedCompareList);
//     };

//     const handleReviewSubmit = (e) => {
//         e.preventDefault();

//         if (!userId) {
//             setErrors({ general: "Please log in to submit a review" });
//             return;
//         }

//         const newErrors = {};
//         if (!reviewRating) newErrors.rating = "Rating is required";
//         if (!reviewText.trim()) newErrors.text = "Review is required";
//         if (!reviewName.trim()) newErrors.name = "Name is required";
//         if (!reviewEmail.trim()) newErrors.email = "Email is required";
//         setErrors(newErrors);

//         if (Object.keys(newErrors).length === 0) {
//             if (editingReviewId) {
//                 const updatedReviews = reviews.map((review) =>
//                     review.id === editingReviewId
//                         ? {
//                             ...review,
//                             user: reviewName,
//                             rating: reviewRating,
//                             content: reviewText,
//                             date: "12:33 PM IST on Tuesday, May 27, 2025", // Updated to current date and time
//                         }
//                         : review
//                 );
//                 setReviews(updatedReviews);
//                 saveReviewsToStorage(reviewKey, updatedReviews);
//             } else {
//                 const newReview = {
//                     id: Date.now(),
//                     user: reviewName,
//                     avatar: "https://via.placeholder.com/50?text=User",
//                     rating: reviewRating,
//                     date: "12:33 PM IST on Tuesday, May 27, 2025", // Updated to current date and time
//                     content: reviewText,
//                     images: [],
//                     up: 0,
//                     down: 0
//                 };
//                 const updatedReviews = [...reviews, newReview];
//                 setReviews(updatedReviews);
//                 saveReviewsToStorage(reviewKey, updatedReviews);
//                 setHelpfulCounts([...helpfulCounts, { up: 0, down: 0, user: null }]);
//             }
//             setReviewRating(0);
//             setReviewText("");
//             setReviewName("");
//             setReviewEmail("");
//             setEditingReviewId(null);
//             setErrors({});
//         }
//     };

//     const handleEditReview = (review) => {
//         if (!userId) {
//             setErrors({ general: "Please log in to edit a review" });
//             return;
//         }

//         setEditingReviewId(review.id);
//         setReviewRating(review.rating);
//         setReviewText(review.content);
//         setReviewName(review.user);
//         setReviewEmail("");
//         window.scrollTo({ top: document.getElementById("review-form").offsetTop, behavior: "smooth" });
//     };

//     const relatedScrollRef = useRef(null);

//     const handleRelatedPrev = () => {
//         if (relatedScrollRef.current) {
//             relatedScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//         }
//     };

//     const handleRelatedNext = () => {
//         if (relatedScrollRef.current) {
//             relatedScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//         }
//     };

//     const handleThumbs = (idx, type) => {
//         if (!userId) {
//             setErrors({ general: "Please log in to vote on reviews" });
//             return;
//         }

//         const reviewId = reviews[idx].id;
//         const currentVote = userInteractions[reviewId];

//         setHelpfulCounts((prev) =>
//             prev.map((item, i) =>
//                 i === idx
//                     ? {
//                         up:
//                             type === "up"
//                                 ? currentVote === "up"
//                                     ? item.up - 1
//                                     : currentVote === "down"
//                                         ? item.up + 1
//                                         : item.up + 1
//                                 : currentVote === "up"
//                                     ? item.up - 1
//                                     : item.up,
//                         down:
//                             type === "down"
//                                 ? currentVote === "down"
//                                     ? item.down - 1
//                                     : currentVote === "up"
//                                         ? item.down + 1
//                                         : item.down + 1
//                                 : currentVote === "down"
//                                     ? item.down - 1
//                                     : item.down,
//                         user:
//                             currentVote === type
//                                 ? null
//                                 : type,
//                     }
//                     : item
//             )
//         );

//         const updatedReviews = reviews.map((review, i) =>
//             i === idx
//                 ? {
//                     ...review,
//                     up: helpfulCounts[idx].up + (type === "up" ? (currentVote === "up" ? -1 : currentVote === "down" ? 1 : 1) : currentVote === "up" ? -1 : 0),
//                     down: helpfulCounts[idx].down + (type === "down" ? (currentVote === "down" ? -1 : currentVote === "up" ? 1 : 1) : currentVote === "down" ? -1 : 0),
//                 }
//                 : review
//         );
//         setReviews(updatedReviews);
//         saveReviewsToStorage(reviewKey, updatedReviews);

//         const updatedInteractions = {
//             ...userInteractions,
//             [reviewId]: currentVote === type ? null : type,
//         };
//         setUserInteractions(updatedInteractions);
//         saveUserInteractionsToStorage(interactionKey, updatedInteractions);
//     };

//     // Gallery items: product image and api.video video with real thumbnail
//     const galleryItems = [
//         { type: 'image', src: product?.images?.[0] },
//         { 
//             type: 'video', 
//             src: 'https://embed.api.video/vod/vi6MbhFzV9ZvEFDQGvoEv1tj', 
//             thumb: 'https://vod.api.video/vod/vi6MbhFzV9ZvEFDQGvoEv1tj/thumbnail.jpg' 
//         },
//     ];

//     if (!productId) {
//         return (
//             <div className="flex justify-center items-center min-h-[40vh]">
//                 <span className="text-lg text-red-500">
//                     Error: Product ID is missing. Please navigate to a valid product page (e.g., /products/1).
//                 </span>
//             </div>
//         );
//     }

//     if (!product) {
//         return (
//             <div className="flex justify-center items-center min-h-[40vh]">
//                 <span className="text-lg text-gray-500">Loading product...</span>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-2 sm:px-4 py-8">
//             {error && (
//                 <div className="mb-4 text-red-500 text-center">
//                     {error}
//                 </div>
//             )}
//             <div className="text-gray-500 text-sm mb-4">
//                 Home / {product.category} / <span className="text-black">{product.name}</span>
//             </div>
//             <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Vertical Gallery */}
//                 <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-1/2">
//                     <div className="flex flex-col gap-2">
//                         {galleryItems.map((item, idx) => (
//                             <div
//                                 key={idx}
//                                 className={`w-16 h-16 object-cover rounded-lg border cursor-pointer relative ${selectedGalleryIdx === idx ? "border-blue-500" : "border-gray-200"}`}
//                                 onClick={() => setSelectedGalleryIdx(idx)}
//                             >
//                                 {item.type === 'image' ? (
//                                     <img
//                                         src={item.src}
//                                         alt="product"
//                                         className="w-16 h-16 object-cover rounded-lg"
//                                     />
//                                 ) : (
//                                     <>
//                                         <img
//                                             src={item.thumb}
//                                             alt="video thumbnail"
//                                             className="w-16 h-16 object-cover rounded-lg"
//                                         />
//                                         <PlayCircle size={32} className="absolute top-2 left-2 text-white drop-shadow-lg" />
//                                     </>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="relative w-full">
//                         {/* Main Display Area: Show image or video */}
//                         {galleryItems[selectedGalleryIdx].type === 'image' ? (
//                             <img
//                                 src={galleryItems[selectedGalleryIdx].src}
//                                 alt="Selected"
//                                 className="w-full max-w-md h-96 object-contain rounded-xl border border-gray-200"
//                             />
//                         ) : (
//                             <iframe
//                                 width="100%"
//                                 height="360"
//                                 src={galleryItems[selectedGalleryIdx].src}
//                                 title="Product Video"
//                                 frameBorder="0"
//                                 allow="autoplay; fullscreen"
//                                 allowFullScreen
//                                 className="rounded-xl border border-gray-200 w-full max-w-md h-96"
//                             />
//                         )}
//                     </div>
//                 </div>
//                 <div className="w-full lg:w-1/2 flex flex-col">
//                     <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
//                     <div className="flex items-center gap-2 mb-2 flex-wrap">
//                         {[...Array(5)].map((_, i) =>
//                             i < product.rating ? (
//                                 <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
//                             ) : (
//                                 <Star key={i} size={18} className="text-yellow-400" />
//                             )
//                         )}
//                         <span className="text-sm text-gray-500">
//                             ({reviews.length} customer reviews)
//                         </span>
//                         <button
//                             onClick={handleWishlistClick}
//                             className={`ml-4 flex items-center gap-1 ${isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
//                         >
//                             <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
//                             <span className="text-xs">Wishlist</span>
//                         </button>
//                         <button
//                             className={`ml-4 flex items-center gap-1 ${isInCompareList ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}`}
//                             onClick={handleCompareClick}
//                         >
//                             <ArrowLeftRight size={18} className={isInCompareList ? "fill-blue-500" : ""} />
//                             <span className="text-xs">Compare</span>
//                         </button>
//                     </div>
//                     <div className="mb-2">
//                         <a href="#" className="text-blue-600 underline">
//                             Shipping
//                         </a>{" "}
//                         calculated at checkout.
//                     </div>
//                     <div className="text-xl font-bold mb-2">${product.price.toFixed(2)}</div>
//                     <div className="flex items-center gap-3 mb-4">
//                         <input
//                             type="number"
//                             min={1}
//                             value={quantity}
//                             onChange={(e) => setQuantity(Number(e.target.value))}
//                             className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
//                         />
//                         <button
//                             onClick={() => handleAddToCart()}
//                             className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded transition"
//                         >
//                             <ShoppingCart size={20} /> Add To Cart
//                         </button>
//                     </div>
//                     {cartMessage && <p className="text-sm text-gray-600 mb-4">{cartMessage}</p>}
//                     {compareMessage && <p className="text-sm text-gray-600 mb-4">{compareMessage}</p>}
//                     <button
//                         className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded text-lg font-semibold transition"
//                         onClick={() => handleAddToCart(quantity, 0, true)}
//                     >
//                         Buy Now
//                     </button>
//                     <div className="mt-8 bg-white rounded-lg shadow p-6">
//                         <div className="flex items-center mb-4">
//                             <span className="text-xl mr-2">🔥</span>
//                             <span className="font-semibold text-lg">
//                                 Buy More Save More!
//                             </span>
//                         </div>
//                         <div className="space-y-3 mb-6">
//                             <div className="flex items-center justify-between border rounded px-4 py-3">
//                                 <div>
//                                     <div className="font-medium">
//                                         Buy 3 items get 5% OFF
//                                     </div>
//                                     <div className="text-xs text-gray-500">
//                                         on each product
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={() => handleAddToCart(3, 5)}
//                                     className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded font-semibold transition"
//                                 >
//                                     + Add
//                                 </button>
//                             </div>
//                             <div className="flex items-center justify-between border rounded px-4 py-3">
//                                 <div>
//                                     <div className="font-medium">
//                                         Buy 6 items get 10% OFF
//                                     </div>
//                                     <div className="text-xs text-gray-500">
//                                         on each product
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={() => handleAddToCart(6, 10)}
//                                     className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded font-semibold transition"
//                                 >
//                                     + Add
//                                 </button>
//                             </div>
//                             <div className="flex items-center justify-between border rounded px-4 py-3">
//                                 <div>
//                                     <div className="font-medium">
//                                         Buy 10 items get 15% OFF
//                                     </div>
//                                     <div className="text-xs text-gray-500">
//                                         on each product
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={() => handleAddToCart(10, 15)}
//                                     className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded font-semibold transition"
//                                 >
//                                     + Add
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="mb-2 text-gray-700">
//                             <span className="font-semibold">
//                                 Estimated delivery:
//                             </span>{" "}
//                             3 days
//                         </div>
//                         <div className="mb-2 text-gray-700">
//                             <span className="font-semibold">SKU:</span> #
//                             {product.id.toString().padStart(6, "0")}
//                         </div>
//                         <div className="mb-2 text-gray-700">
//                             <span className="font-semibold">Tags:</span>{" "}
//                             {product.category}
//                         </div>
//                         <div className="mb-4 text-gray-700">
//                             <span className="font-semibold">Categories:</span>{" "}
//                             {product.category}
//                         </div>
//                         <hr className="my-4" />
//                         <div className="mb-2 text-gray-700">
//                             Have any Questions?
//                         </div>
//                         <div className="mb-4 text-sm">
//                             Feel free to{" "}
//                             <a href="#" className="text-blue-600 underline">
//                                 Get in touch
//                             </a>
//                         </div>
//                         <div className="flex items-center gap-4 mb-4">
//                             <a
//                                 href="#"
//                                 aria-label="Instagram"
//                                 className="text-gray-500 hover:text-black"
//                             >
//                                 <i className="fa-brands fa-instagram text-xl"></i>
//                             </a>
//                             <a
//                                 href="#"
//                                 aria-label="Facebook"
//                                 className="text-gray-500 hover:text-black"
//                             >
//                                 <i className="fa-brands fa-facebook text-xl"></i>
//                             </a>
//                             <a
//                                 href="#"
//                                 aria-label="YouTube"
//                                 className="text-gray-500 hover:text-black"
//                             >
//                                 <i className="fa-brands fa-youtube text-xl"></i>
//                             </a>
//                             <a
//                                 href="#"
//                                 aria-label="Telegram"
//                                 className="text-gray-500 hover:text-black"
//                             >
//                                 <i className="fa-brands fa-telegram text-xl"></i>
//                             </a>
//                         </div>
//                         <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
//                             <div className="flex gap-2 mb-2">
//                                 <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
//                                 <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="h-6" />
//                                 <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-6" />
//                                 <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="h-6" />
//                             </div>
//                             <div className="text-xs text-gray-600 font-medium text-center">
//                                 Guarantee Safe and Secure Payment Checkout
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-12 bg-white rounded-lg shadow p-6">
//                 <div className="border-b flex gap-8 mb-6">
//                     <button
//                         className={`pb-2 font-semibold ${activeTab === "description" ? "border-b-2 border-black" : "text-gray-500"}`}
//                         onClick={() => setActiveTab("description")}
//                     >
//                         Description
//                     </button>
//                     <button
//                         className={`pb-2 font-semibold ${activeTab === "reviews" ? "border-b-2 border-black" : "text-gray-500"}`}
//                         onClick={() => setActiveTab("reviews")}
//                     >
//                         Reviews ({reviews.length})
//                     </button>
//                 </div>
//                 {activeTab === "description" && (
//                     <div>
//                         <h3 className="text-xl font-bold mb-4 max-w-5xl mx-auto text-left leading-relaxed">
//                             About This Product
//                         </h3>
//                         <p className="text-gray-700 mb-6 max-w-5xl mx-auto text-left leading-relaxed">
//                             {description}
//                         </p>
//                         <img
//                             src={product.images[0]}
//                             alt={product.name}
//                             className="rounded-xl w-full max-w-md mx-auto mb-6 block"
//                         />
//                         <h4 className="font-semibold mb-2 mt-4 text-left max-w-5xl mx-auto">
//                             Product Information
//                         </h4>
//                         <ul className="list-disc pl-6 text-gray-700 max-w-5xl mx-auto text-left">
//                             <li>Category: {product.category}</li>
//                             <li>Price: ${product.price.toFixed(2)}</li>
//                         </ul>
//                     </div>
//                 )}
//                 {activeTab === "reviews" && (
//                     <div className="flex flex-col lg:flex-row gap-8">
//                         <div className="w-full lg:w-2/3">
//                             <div className="bg-gray-50 p-6 rounded mb-8">
//                                 <div className="flex items-center gap-4 mb-2">
//                                     <span className="text-5xl font-bold">{product.rating.toFixed(1)}</span>
//                                     <div>
//                                         <div className="flex items-center">
//                                             {[...Array(5)].map((_, i) => (
//                                                 <Star key={i} size={22} className={i < product.rating ? "inline fill-yellow-400 text-yellow-400" : "text-gray-300"} />
//                                             ))}
//                                         </div>
//                                         <div className="text-gray-500 text-sm mt-1">
//                                             Based on {reviews.length} review{reviews.length > 1 ? "s" : ""}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="space-y-1 mt-4">
//                                     {[5, 4, 3, 2, 1].map((star) => (
//                                         <div key={star} className="flex items-center gap-2">
//                                             <div className="flex">
//                                                 {[...Array(star)].map((_, i) => (
//                                                     <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
//                                                 ))}
//                                             </div>
//                                             <div className="w-48 h-2 bg-gray-200 rounded">
//                                                 <div
//                                                     className={`h-2 rounded ${star === product.rating ? "bg-teal-600" : "bg-gray-200"}`}
//                                                     style={{
//                                                         width: star === product.rating ? "100%" : "0%",
//                                                     }}
//                                                 />
//                                             </div>
//                                             <span className="text-gray-500 text-xs">{star === product.rating ? reviews.length : 0}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="mb-4 font-semibold text-xs text-gray-500 uppercase">
//                                 {reviews.length} Review{reviews.length !== 1 ? "s" : ""} for {product.name}
//                             </div>
//                             <div>
//                                 {reviews.map((review, idx) => (
//                                     <div
//                                         key={review.id}
//                                         className="mb-8 flex gap-4 flex-col sm:flex-row"
//                                     >
//                                         <img
//                                             src={review.avatar}
//                                             alt={review.user}
//                                             className="w-12 h-12 rounded-full object-cover"
//                                         />
//                                         <div className="flex-1">
//                                             <div className="flex items-center gap-2">
//                                                 <span className="font-semibold">{review.user}</span>
//                                                 <span className="text-gray-400 text-xs">{review.date}</span>
//                                             </div>
//                                             <div className="flex items-center mb-2">
//                                                 {[...Array(5)].map((_, i) => (
//                                                     <Star
//                                                         key={i}
//                                                         size={16}
//                                                         className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//                                                     />
//                                                 ))}
//                                             </div>
//                                             <div className="text-gray-700 mb-2">{review.content}</div>
//                                             <div className="flex gap-2 mb-2 flex-wrap">
//                                                 {review.images.map((img, idx) => (
//                                                     <img
//                                                         key={idx}
//                                                         src={img}
//                                                         alt=""
//                                                         className="w-16 h-16 rounded object-cover"
//                                                     />
//                                                 ))}
//                                             </div>
//                                             <div className="text-xs text-gray-500 flex items-center gap-2">
//                                                 Is it helpful?
//                                                 <button
//                                                     className={`flex items-center ml-2 ${helpfulCounts[idx]?.user === "up" ? "text-green-600" : "text-green-700"}`}
//                                                     onClick={() => handleThumbs(idx, "up")}
//                                                     type="button"
//                                                 >
//                                                     <ThumbsUp size={18} />
//                                                     <span className="ml-1">{helpfulCounts[idx]?.up ?? 0}</span>
//                                                 </button>
//                                                 <button
//                                                     className={`flex items-center ml-2 ${helpfulCounts[idx]?.user === "down" ? "text-red-600" : "text-red-600"}`}
//                                                     onClick={() => handleThumbs(idx, "down")}
//                                                     type="button"
//                                                 >
//                                                     <ThumbsDown size={18} />
//                                                     <span className="ml-1">{helpfulCounts[idx]?.down ?? 0}</span>
//                                                 </button>
//                                                 <button
//                                                     className="flex items-center ml-2 text-blue-600"
//                                                     onClick={() => handleEditReview(review)}
//                                                     type="button"
//                                                 >
//                                                     <Edit size={18} />
//                                                     <span className="ml-1">Edit</span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="w-full lg:w-1/3">
//                             <div id="review-form" className="font-semibold mb-4 uppercase text-sm">
//                                 {editingReviewId ? "Edit Your Review" : "Add a Review"}
//                             </div>
//                             <form
//                                 className="space-y-4 bg-gray-50 p-4 rounded"
//                                 onSubmit={handleReviewSubmit}
//                             >
//                                 <div className="text-xs text-gray-500 mb-2">
//                                     Your email address will not be published.
//                                     Required fields are marked
//                                 </div>
//                                 {errors.general && (
//                                     <div className="text-xs text-red-600 mb-2">
//                                         {errors.general}
//                                     </div>
//                                 )}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">
//                                         Your rating *
//                                     </label>
//                                     <div className="flex gap-1">
//                                         {[...Array(5)].map((_, i) => (
//                                             <Star
//                                                 key={i}
//                                                 size={20}
//                                                 className={i < reviewRating ? "text-yellow-400 fill-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
//                                                 onClick={() => setReviewRating(i + 1)}
//                                                 data-testid={`star-${i + 1}`}
//                                             />
//                                         ))}
//                                     </div>
//                                     {errors.rating && (
//                                         <div className="text-xs text-red-600 mt-1">
//                                             {errors.rating}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Your review *</label>
//                                     <textarea
//                                         value={reviewText}
//                                         onChange={(e) => setReviewText(e.target.value)}
//                                         className="w-full border border-gray-300 rounded p-2"
//                                     />
//                                     {errors.text && <div className="text-xs text-red-600 mt-1">{errors.text}</div>}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Name *</label>
//                                     <input
//                                         type="text"
//                                         value={reviewName}
//                                         onChange={(e) => setReviewName(e.target.value)}
//                                         className="w-full border border-gray-300 rounded p-2"
//                                     />
//                                     {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Email *</label>
//                                     <input
//                                         type="email"
//                                         value={reviewEmail}
//                                         onChange={(e) => setReviewEmail(e.target.value)}
//                                         className="w-full border border-gray-300 rounded p-2"
//                                     />
//                                     {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <input type="checkbox" />
//                                     <span className="text-xs text-gray-500">
//                                         Save my name, email, and website in this browser for the next time I comment.
//                                     </span>
//                                 </div>
//                                 <div className="bg-blue-700 text-white text-sm rounded p-2 text-center">
//                                     You have to be logged in to be able to add photos to your review.
//                                 </div>
//                                 <button className="w-full bg-black text-white py-2 rounded font-semibold mt-2" type="submit">
//                                     {editingReviewId ? "UPDATE" : "SUBMIT"}
//                                 </button>
//                                 {editingReviewId && (
//                                     <button
//                                         className="w-full bg-gray-500 text-white py-2 rounded font-semibold mt-2"
//                                         onClick={() => {
//                                             setEditingReviewId(null);
//                                             setReviewRating(0);
//                                             setReviewText("");
//                                             setReviewName("");
//                                             setReviewEmail("");
//                                             setErrors({});
//                                         }}
//                                         type="button"
//                                     >
//                                         CANCEL
//                                     </button>
//                                 )}
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <div className="my-16">
//                 <h2 className="text-2xl font-bold text-center mb-8">Related Products</h2>
//                 <div className="relative">
//                     <button
//                         className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2"
//                         onClick={handleRelatedPrev}
//                         aria-label="Scroll left"
//                         style={{ left: "-2rem" }}
//                         type="button"
//                     >
//                         <ChevronLeft size={24} />
//                     </button>
//                     <div
//                         ref={relatedScrollRef}
//                         className="flex overflow-x-auto no-scrollbar"
//                         style={{
//                             scrollBehavior: "smooth",
//                             gap: "2rem",
//                             paddingLeft: "2rem",
//                             paddingRight: "2rem",
//                         }}
//                     >
//                         {relatedProducts.map((prod, idx) => (
//                             <div
//                                 key={prod.id || idx}
//                                 style={{
//                                     minWidth: "260px",
//                                     maxWidth: "260px",
//                                     flex: "0 0 260px",
//                                     cursor: "pointer",
//                                 }}
//                                 onClick={() => navigate(`/products/${prod.id}`)}
//                             >
//                                 <ProductCard product={prod} />
//                             </div>
//                         ))}
//                     </div>
//                     <button
//                         className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2"
//                         onClick={handleRelatedNext}
//                         aria-label="Scroll right"
//                         style={{ right: "-2rem" }}
//                         type="button"
//                     >
//                         <ChevronRight size={24} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductPage;




























import React, { useState, useRef, useEffect } from "react";
import {
    Heart,
    ShoppingCart,
    Star,
    ArrowLeftRight,
    ChevronLeft,
    ChevronRight,
    ThumbsUp,
    ThumbsDown,
    Edit,
    PlayCircle,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// Utility functions for localStorage
const getCurrentUser = () => {
    try {
        const currentUserData = localStorage.getItem("currentUser");
        const user = currentUserData ? JSON.parse(currentUserData) : null;
        if (user && !user.userId) {
            user.userId = user.email || user.username; // No default-user fallback
        }
        return user;
    } catch (error) {
        console.error("Error parsing currentUser from localStorage:", error);
        return null;
    }
};

const getCartFromStorage = (cartKey) => {
    try {
        const data = localStorage.getItem(cartKey);
        if (data) return JSON.parse(data);
    } catch (error) {
        console.error(`Error parsing cart from localStorage for ${cartKey}:`, error);
    }
    return [];
};

const saveCartToStorage = (cartKey, cart) => {
    try {
        localStorage.setItem(cartKey, JSON.stringify(cart));
        window.dispatchEvent(new Event('localStorageChange')); // Trigger Navbar update
    } catch (error) {
        console.error(`Error saving cart to localStorage for ${cartKey}:`, error);
    }
};

const getWishlistFromStorage = (wishlistKey) => {
    try {
        const data = localStorage.getItem(wishlistKey);
        if (data) return JSON.parse(data);
    } catch (error) {
        console.error(`Error parsing wishlist from localStorage for ${wishlistKey}:`, error);
    }
    return [];
};

const saveWishlistToStorage = (wishlistKey, wishlist) => {
    try {
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
        window.dispatchEvent(new Event('localStorageChange')); // Trigger Navbar update
    } catch (error) {
        console.error(`Error saving wishlist to localStorage for ${wishlistKey}:`, error);
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
        window.dispatchEvent(new Event('localStorageChange')); // Trigger Navbar update
    } catch (error) {
        console.error("Error saving compareList to localStorage:", error);
    }
};

const getReviewsFromStorage = (reviewKey) => {
    try {
        const data = localStorage.getItem(reviewKey);
        if (data) return JSON.parse(data);
    } catch (error) {
        console.error(`Error parsing reviews from localStorage for ${reviewKey}:`, error);
    }
    return [];
};

const saveReviewsToStorage = (reviewKey, reviews) => {
    try {
        localStorage.setItem(reviewKey, JSON.stringify(reviews));
    } catch (error) {
        console.error(`Error saving reviews to localStorage for ${reviewKey}:`, error);
    }
};

const getUserInteractionsFromStorage = (interactionKey) => {
    try {
        const data = localStorage.getItem(interactionKey);
        if (data) return JSON.parse(data);
    } catch (error) {
        console.error(`Error parsing user interactions from localStorage for ${interactionKey}:`, error);
    }
    return {};
};

const saveUserInteractionsToStorage = (interactionKey, interactions) => {
    try {
        localStorage.setItem(interactionKey, JSON.stringify(interactions));
    } catch (error) {
        console.error(`Error saving user interactions to localStorage for ${interactionKey}:`, error);
    }
};

const ProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [description, setDescription] = useState("");
    const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [cartMessage, setCartMessage] = useState("");
    const [compareMessage, setCompareMessage] = useState("");
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isInCompareList, setIsInCompareList] = useState(false);
    const [error, setError] = useState(null);

    const [imgIdx, setImageIndex] = useState(0);
    const [activeTab, setTab] = useState("description");

    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewName, setReviewName] = useState("");
    const [reviewEmail, setReviewEmail] = useState("");
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [errors, setErrors] = useState({});
    const [helpfulCounts, setHelpfulCounts] = useState([]);
    const [userInteractions, setUserInteractions] = useState({});

    const isLocalStorageAvailable = () => typeof window !== "undefined" && window.localStorage;

    const user = getCurrentUser();
    const userId = user?.userId || null; // Remove default-user fallback
    const cartKey = userId ? `cart_${userId}` : null;
    const wishlistKey = userId ? `wishlist_${userId}` : null;
    const compareKey = userId ? `compare_${userId}` : null;
    const reviewKey = userId && productId ? `reviews_${productId}_${userId}` : null;
    const interactionKey = userId && productId ? `interactions_${productId}_${userId}` : null;

    const mapProductData = (apiProduct) => ({
        id: apiProduct.id,
        name: apiProduct.title,
        brand: apiProduct.title.split(" ")[0] || "Unknown",
        rating: Math.round(apiProduct.rating.rate),
        price: apiProduct.price,
        images: [apiProduct.image],
        description: apiProduct.description,
        category: apiProduct.category,
    });

    const mapRelatedProducts = (apiProducts) =>
        apiProducts.map((prod) => ({
            id: prod.id,
            image: prod.image,
            name: prod.title,
            rating: Math.round(prod.rating.rate),
            price: prod.price,
        }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!productId) throw new Error("Product ID is missing");
                const productRes = await fetch(`https://fakestoreapi.com/products/${productId}`);
                if (!productRes.ok) throw new Error("Failed to fetch product");
                const productData = await productRes.json();

                const mappedProduct = mapProductData(productData);
                setProduct(mappedProduct);
                setDescription(productData.description);

                if (isLocalStorageAvailable() && userId) {
                    const storedReviews = getReviewsFromStorage(reviewKey);
                    setReviews(storedReviews);
                    setHelpfulCounts(storedReviews.map((review) => ({
                        up: review.up || 0,
                        down: review.down || 0,
                        user: null,
                    })));

                    const storedInteractions = getUserInteractionsFromStorage(interactionKey);
                    setUserInteractions(storedInteractions);

                    const wishlist = getWishlistFromStorage(wishlistKey);
                    const compareList = getCompareFromStorage(compareKey);
                    setIsWishlisted(wishlist.some((item) => item.id === productData.id));
                    setIsInCompareList(compareList.some((item) => item.id === productData.id));
                }

                const relatedRes = await fetch(`https://fakestoreapi.com/products/category/${productData.category}?limit=8`);
                if (!relatedRes.ok) throw new Error("Failed to fetch related products");
                const relatedData = await relatedRes.json();
                const filteredRelated = relatedData.filter((prod) => prod.id !== productData.id);
                setRelatedProducts(mapRelatedProducts(filteredRelated));

                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load product data. Please try again later.");
            }
        };
        fetchData();
    }, [productId, wishlistKey, compareKey, reviewKey, interactionKey]);

    const handlePrevImg = () => setImageIndex((prev) => (prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1));
    const handleNextImg = () => setImageIndex((prev) => (prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1));

    const handleAddToCart = (quantityToAdd = quantity, discountPercentage = 0, redirect = false) => {
        if (!userId) {
            setCartMessage("Please log in to add items to your cart");
            setTimeout(() => setCartMessage(""), 3000);
            return;
        }

        if (!product || !product.id) {
            setCartMessage("Error: Invalid product");
            return;
        }

        let cart = getCartFromStorage(cartKey);
        const productExists = cart.some((item) => item.id === product.id && item.discountPercentage === discountPercentage);
        if (productExists) {
            setCartMessage("Product with this offer already in cart");
            return;
        }

        const discountedPrice = discountPercentage > 0
            ? product.price * (1 - discountPercentage / 100)
            : product.price;

        const cartItem = {
            ...product,
            quantity: quantityToAdd,
            price: discountedPrice,
            originalPrice: product.price,
            discountPercentage,
            totalPrice: discountedPrice * quantityToAdd, // Add total price for this item
        };
        const updatedCart = [...cart, cartItem];

        try {
            saveCartToStorage(cartKey, updatedCart);
            setCartMessage(`Added ${quantityToAdd} item(s) to cart${discountPercentage > 0 ? ` with ${discountPercentage}% discount` : ""}`);
            setTimeout(() => setCartMessage(""), 3000);
            if (redirect) {
                navigate("/cart");
            }
        } catch (error) {
            setCartMessage("Error: Failed to save cart");
        }
    };

    const handleWishlistClick = () => {
        if (!userId) {
            setCartMessage("Please log in to add items to your wishlist");
            setTimeout(() => setCartMessage(""), 3000);
            return;
        }

        const wishlist = getWishlistFromStorage(wishlistKey);
        let updatedWishlist;

        if (isWishlisted) {
            updatedWishlist = wishlist.filter((item) => item.id !== product.id);
            setIsWishlisted(false);
        } else {
            updatedWishlist = [...wishlist, product];
            setIsWishlisted(true);
        }

        saveWishlistToStorage(wishlistKey, updatedWishlist);
    };

    const handleCompareClick = () => {
        if (!userId) {
            setCompareMessage("Please log in to add items to your compare list");
            setTimeout(() => setCompareMessage(""), 3000);
            return;
        }

        if (!product || !product.id) {
            setCompareMessage("Error: Invalid product");
            return;
        }

        let compareList = getCompareFromStorage(compareKey);
        let updatedCompareList;

        if (isInCompareList) {
            updatedCompareList = compareList.filter((item) => item.id !== product.id);
            setIsInCompareList(false);
        } else {
            updatedCompareList = [...compareList, product];
            setIsInCompareList(true);
        }

        saveCompareToStorage(compareKey, updatedCompareList);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!userId) {
            setErrors({ general: "Please log in to submit a review" });
            return;
        }

        const newErrors = {};
        if (!reviewRating) newErrors.rating = "Rating is required";
        if (!reviewText.trim()) newErrors.textField = "Review is required";
        if (!reviewName.trim()) newErrors.nameField = "Name is required";
        if (!reviewEmail.trim()) newErrors.emailField = "Email is required";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if (editingReviewId) {
                const updatedReviews = reviews.map((review) =>
                    review.id === editingReviewId
                        ? {
                            ...review,
                            user: reviewName,
                            rating: reviewRating,
                            content: reviewText,
                            date: "02:50 PM IST on Wednesday, June 04, 2025", // Updated to current date and time
                        }
                        : review
                );
                setReviews(updatedReviews);
                saveReviewsToStorage(reviewKey, updatedReviews);
            } else {
                const newReview = {
                    id: Date.now(),
                    user: reviewName,
                    avatar: "https://via.placeholder.com/50?text=User",
                    rating: reviewRating,
                    date: "02:50 PM IST on Wednesday, June 04, 2025", // Updated to current date and time
                    content: reviewText,
                    images: [],
                    up: 0,
                    down: 0
                };
                const updatedReviews = [...reviews, newReview];
                setReviews(updatedReviews);
                saveReviewsToStorage(reviewKey, updatedReviews);
                setHelpfulCounts([...helpfulCounts, { up: 0, down: 0, user: null }]);
            }
            setReviewRating(0);
            setReviewText("");
            setReviewName("");
            setReviewEmail("");
            setEditingReviewId(null);
            setErrors({});
        }
    };

    const handleEditReview = (review) => {
        if (!userId) {
            setErrors({ general: "Please log in to edit a review" });
            return;
        }

        setEditingReviewId(review.id);
        setReviewRating(review.rating);
        setReviewText(review.content);
        setReviewName(review.user);
        setReviewEmail("");
        window.scrollTo({ top: document.getElementById("review-form").offsetTop, behavior: "smooth" });
    };

    const relatedScrollRef = useRef(null);

    const handleRelatedPrev = () => {
        if (relatedScrollRef.current) {
            relatedScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const handleRelatedNext = () => {
        if (relatedScrollRef.current) {
            relatedScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const handleThumbs = (idx, type) => {
        if (!userId) {
            setErrors({ general: "Please log in to vote on reviews" });
            return;
        }

        const reviewId = reviews[idx].id;
        const currentVote = userInteractions[reviewId];

        setHelpfulCounts((prev) =>
            prev.map((item, i) =>
                i === idx
                    ? {
                        up:
                            type === "up"
                                ? currentVote === "up"
                                    ? item.up - 1
                                    : currentVote === "down"
                                        ? item.up + 1
                                        : item.up + 1
                                : currentVote === "up"
                                    ? item.up - 1
                                    : item.up,
                        down:
                            type === "down"
                                ? currentVote === "down"
                                    ? item.down - 1
                                    : currentVote === "up"
                                        ? item.down + 1
                                        : item.down + 1
                                : currentVote === "down"
                                    ? item.down - 1
                                    : item.down,
                        user:
                            currentVote === type
                                ? null
                                : type,
                    }
                    : item
            )
        );

        const updatedReviews = reviews.map((review, i) =>
            i === idx
                ? {
                    ...review,
                    up: helpfulCounts[idx].up + (type === "up" ? (currentVote === "up" ? -1 : currentVote === "down" ? 1 : 1) : currentVote === "up" ? -1 : 0),
                    down: helpfulCounts[idx].down + (type === "down" ? (currentVote === "down" ? -1 : currentVote === "up" ? 1 : 1) : currentVote === "down" ? -1 : 0),
                }
                : review
        );
        setReviews(updatedReviews);
        saveReviewsToStorage(reviewKey, updatedReviews);

        const updatedInteractions = {
            ...userInteractions,
            [reviewId]: currentVote === type ? null : type,
        };
        setUserInteractions(updatedInteractions);
        saveUserInteractionsToStorage(interactionKey, updatedInteractions);
    };

    // Gallery items: product image and api.video video with real thumbnail
    const galleryItems = [
        { type: 'image', src: product?.images?.[0] },
        { 
            type: 'video', 
            src: 'https://embed.api.video/vod/vi6MbhFzV9ZvEFDQGvoEv1tj', 
            thumb: 'https://vod.api.video/vod/vi6MbhFzV9ZvEFDQGvoEv1tj/thumbnail.jpg' 
        },
    ];

    if (!productId) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <span className="text-lg text-red-500">
                    Error: Product ID is missing. Please navigate to a valid product page (e.g., /products/1).
                </span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <span className="text-lg text-gray-500">Loading product...</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-2 sm:px-4 py-8">
            {error && (
                <div className="mb-4 text-red-500 text-center">
                    {error}
                </div>
            )}
            <div className="text-gray-500 text-sm mb-4">
                Home / {product.category} / <span className="text-black">{product.name}</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Vertical Gallery */}
                <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-1/2">
                    <div className="flex flex-col gap-2">
                        {galleryItems.map((item, idx) => (
                            <div
                                key={idx}
                                className={`w-16 h-16 object-cover rounded-lg border cursor-pointer relative ${selectedGalleryIdx === idx ? "border-[#1976D2]" : "border-gray-200"}`}
                                onClick={() => setSelectedGalleryIdx(idx)}
                            >
                                {item.type === 'image' ? (
                                    <img
                                        src={item.src}
                                        alt="product"
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <img
                                            src={item.thumb}
                                            alt="video thumbnail"
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <PlayCircle size={32} className="absolute top-2 left-2 text-white drop-shadow-lg" />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="relative w-full">
                        {/* Main Display Area: Show image or video */}
                        {galleryItems[selectedGalleryIdx].type === 'image' ? (
                            <img
                                src={galleryItems[selectedGalleryIdx].src}
                                alt="Selected"
                                className="w-full max-w-md h-96 object-contain rounded-xl border border-gray-200"
                            />
                        ) : (
                            <iframe
                                width="100%"
                                height="360"
                                src={galleryItems[selectedGalleryIdx].src}
                                title="Product Video"
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                                className="rounded-xl border border-gray-200 w-full max-w-md h-96"
                            />
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col">
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {[...Array(5)].map((_, i) =>
                            i < product.rating ? (
                                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                            ) : (
                                <Star key={i} size={18} className="text-yellow-400" />
                            )
                        )}
                        <span className="text-sm text-gray-500">
                            ({reviews.length} customer reviews)
                        </span>
                        <button
                            onClick={handleWishlistClick}
                            className={`ml-4 flex items-center gap-1 ${isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                        >
                            <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
                            <span className="text-xs">Wishlist</span>
                        </button>
                        <button
                            className={`ml-4 flex items-center gap-1 ${isInCompareList ? "text-[#1976D2]" : "text-gray-500 hover:text-[#1976D2]"}`}
                            onClick={handleCompareClick}
                        >
                            <ArrowLeftRight size={18} className={isInCompareList ? "fill-[#1976D2]" : ""} />
                            <span className="text-xs">Compare</span>
                        </button>
                    </div>
                    <div className="mb-2">
                        <a href="#" className="text-[#1976D2] underline">
                            Shipping
                        </a>{" "}
                        calculated at checkout.
                    </div>
                    <div className="text-xl font-bold mb-2">${product.price.toFixed(2)}</div>
                    <div className="flex items-center gap-3 mb-4">
                        <button
        type="button"
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
        onClick={() => setQuantity(q => Math.max(1, q - 1))}
        aria-label="Decrease quantity"
    >-</button>
    <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="w-16 border border-gray-300 rounded px-2 py-1 text-center hide-number-arrows"
    />
    <button
        type="button"
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
        onClick={() => setQuantity(q => q + 1)}
        aria-label="Increase quantity"
    >+</button>
    <button
        onClick={() => handleAddToCart()}
        className="flex items-center gap-2 bg-[#1565C0] hover:bg-black text-white px-6 py-2 rounded transition"
    >
                            <ShoppingCart size={20} /> Add To Cart
                        </button>
                    </div>
                    {cartMessage && <p className="text-sm text-gray-600 mb-4">{cartMessage}</p>}
                    {compareMessage && <p className="text-sm text-gray-600 mb-4">{compareMessage}</p>}
                    <button
                        className="w-full bg-[#1565C0] hover:bg-black text-white py-3 rounded text-lg font-semibold transition"
                        onClick={() => handleAddToCart(quantity, 0, true)}
                    >
                        Buy Now
                    </button>
                    <div className="mt-8 bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <span className="text-xl mr-2">🔥</span>
                            <span className="font-semibold text-lg">
                                Buy More Save More!
                            </span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between border rounded px-4 py-3">
                                <div>
                                    <div className="font-medium">
                                        Buy 3 items get 5% OFF
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        on each product
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(3, 5)}
                                    className="bg-[#1565C0] hover:bg-black text-white px-5 py-2 rounded font-semibold transition"
                                >
                                    + Add
                                </button>
                            </div>
                            <div className="flex items-center justify-between border rounded px-4 py-3">
                                <div>
                                    <div className="font-medium">
                                        Buy 6 items get 10% OFF
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        on each product
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(6, 10)}
                                    className="bg-[#1565C0] hover:bg-black text-white px-5 py-2 rounded font-semibold transition"
                                >
                                    + Add
                                </button>
                            </div>
                            <div className="flex items-center justify-between border rounded px-4 py-3">
                                <div>
                                    <div className="font-medium">
                                        Buy 10 items get 15% OFF
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        on each product
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(10, 15)}
                                    className="bg-[#1565C0] hover:bg-black text-white px-5 py-2 rounded font-semibold transition"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                        <div className="mb-2 text-gray-700">
                            <span className="font-semibold">
                                Estimated delivery:
                            </span>{" "}
                            3 days
                        </div>
                        <div className="mb-2 text-gray-700">
                            <span className="font-semibold">SKU:</span> #
                            {product.id.toString().padStart(6, "0")}
                        </div>
                        <div className="mb-2 text-gray-700">
                            <span className="font-semibold">Tags:</span>{" "}
                            {product.category}
                        </div>
                        <div className="mb-4 text-gray-700">
                            <span className="font-semibold">Categories:</span>{" "}
                            {product.category}
                        </div>
                        <hr className="my-4" />
                        <div className="mb-2 text-gray-700">
                            Have any Questions?
                        </div>
                        <div className="mb-4 text-sm">
                            Feel free to{" "}
                            <a href="#" className="text-[#1976D2] underline">
                                Get in touch
                            </a>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-gray-500 hover:text-black"
                            >
                                <i className="fa-brands fa-instagram text-xl"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-gray-500 hover:text-black"
                            >
                                <i className="fa-brands fa-facebook text-xl"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="YouTube"
                                className="text-gray-500 hover:text-black"
                            >
                                <i className="fa-brands fa-youtube text-xl"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="Telegram"
                                className="text-gray-500 hover:text-black"
                            >
                                <i className="fa-brands fa-telegram text-xl"></i>
                            </a>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                            <div className="flex gap-2 mb-2">
                                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
                                <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="h-6" />
                                <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-6" />
                                <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="h-6" />
                            </div>
                            <div className="text-xs text-gray-600 font-medium text-center">
                                Guarantee Safe and Secure Payment Checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 bg-white rounded-lg shadow p-6">
                <div className="border-b flex gap-8 mb-6">
                    <button
                        className={`pb-2 font-semibold ${activeTab === "description" ? "border-b-2 border-black" : "text-gray-500"}`}
                        onClick={() => setTab("description")}
                    >
                        Description
                    </button>
                    <button
                        className={`pb-2 font-semibold ${activeTab === "reviews" ? "border-b-2 border-black" : "text-gray-500"}`}
                        onClick={() => setTab("reviews")}
                    >
                        Reviews ({reviews.length})
                    </button>
                </div>
                {activeTab === "description" && (
                    <div>
                        <h3 className="text-xl font-bold mb-4 max-w-5xl mx-auto text-left leading-relaxed">
                            About This Product
                        </h3>
                        <p className="text-gray-700 mb-6 max-w-5xl mx-auto text-left leading-relaxed">
                            {description}
                        </p>
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="rounded-xl w-full max-w-md mx-auto mb-6 block"
                        />
                        <h4 className="font-semibold mb-2 mt-4 text-left max-w-5xl mx-auto">
                            Product Information
                        </h4>
                        <ul className="list-disc pl-6 text-gray-700 max-w-5xl mx-auto text-left">
                            <li>Category: {product.category}</li>
                            <li>Price: ${product.price.toFixed(2)}</li>
                        </ul>
                    </div>
                )}
                {activeTab === "reviews" && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3">
                            <div className="bg-gray-50 p-6 rounded mb-8">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-bold">{product.rating.toFixed(1)}</span>
                                    <div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={22} className={i < product.rating ? "inline fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                                            ))}
                                        </div>
                                        <div className="text-gray-500 text-sm mt-1">
                                            Based on {reviews.length} review{reviews.length > 1 ? "s" : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1 mt-4">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-2">
                                            <div className="flex">
                                                {[...Array(star)].map((_, i) => (
                                                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <div className="w-48 h-2 bg-gray-200 rounded">
                                                <div
                                                    className={`h-2 rounded ${star === product.rating ? "bg-[#1976D2]" : "bg-gray-200"}`}
                                                    style={{
                                                        width: star === product.rating ? "100%" : "0%",
                                                    }}
                                                />
                                            </div>
                                            <span className="text-gray-500 text-xs">{star === product.rating ? reviews.length : 0}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4 font-semibold text-xs text-gray-500 uppercase">
                                {reviews.length} Review{reviews.length !== 1 ? "s" : ""} for {product.name}
                            </div>
                            <div>
                                {reviews.map((review, idx) => (
                                    <div
                                        key={review.id}
                                        className="mb-8 flex gap-4 flex-col sm:flex-row"
                                    >
                                        <img
                                            src={review.avatar}
                                            alt={review.user}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{review.user}</span>
                                                <span className="text-gray-400 text-xs">{review.date}</span>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-gray-700 mb-2">{review.content}</div>
                                            <div className="flex gap-2 mb-2 flex-wrap">
                                                {review.images.map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={img}
                                                        alt=""
                                                        className="w-16 h-16 rounded object-cover"
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center gap-2">
                                                Is it helpful?
                                                <button
                                                    className={`flex items-center ml-2 ${helpfulCounts[idx]?.user === "up" ? "text-green-600" : "text-green-700"}`}
                                                    onClick={() => handleThumbs(idx, "up")}
                                                    type="button"
                                                >
                                                    <ThumbsUp size={18} />
                                                    <span className="ml-1">{helpfulCounts[idx]?.up ?? 0}</span>
                                                </button>
                                                <button
                                                    className={`flex items-center ml-2 ${helpfulCounts[idx]?.user === "down" ? "text-red-600" : "text-red-600"}`}
                                                    onClick={() => handleThumbs(idx, "down")}
                                                    type="button"
                                                >
                                                    <ThumbsDown size={18} />
                                                    <span className="ml-1">{helpfulCounts[idx]?.down ?? 0}</span>
                                                </button>
                                                <button
                                                    className="flex items-center ml-2 text-[#1976D2]"
                                                    onClick={() => handleEditReview(review)}
                                                    type="button"
                                                >
                                                    <Edit size={18} />
                                                    <span className="ml-1">Edit</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3">
                            <div id="review-form" className="font-semibold mb-4 uppercase text-sm">
                                {editingReviewId ? "Edit Your Review" : "Add a Review"}
                            </div>
                            <form
                                className="space-y-4 bg-gray-50 p-4 rounded"
                                onSubmit={handleReviewSubmit}
                            >
                                <div className="text-xs text-gray-500 mb-2">
                                    Your email address will not be published.
                                    Required fields are marked
                                </div>
                                {errors.general && (
                                    <div className="text-xs text-red-600 mb-2">
                                        {errors.general}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Your rating *
                                    </label>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={20}
                                                className={i < reviewRating ? "text-yellow-400 fill-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
                                                onClick={() => setReviewRating(i + 1)}
                                                data-testid={`star-${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                    {errors.rating && (
                                        <div className="text-xs text-red-600 mt-1">
                                            {errors.rating}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Your review *</label>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    {errors.textField && <div className="text-xs text-red-600 mt-1">{errors.textField}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name *</label>
                                    <input
                                        type="text"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    {errors.nameField && <div className="text-xs text-red-600 mt-1">{errors.nameField}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email *</label>
                                    <input
                                        type="email"
                                        value={reviewEmail}
                                        onChange={(e) => setReviewEmail(e.target.value)}
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    {errors.emailField && <div className="text-xs text-red-600 mt-1">{errors.emailField}</div>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    <span className="text-xs text-gray-500">
                                        Save my name, email, and website in this browser for the next time I comment.
                                    </span>
                                </div>
                                <div className="bg-[#1976D2] text-white text-sm rounded p-2 text-center">
                                    You have to be logged in to be able to add photos to your review.
                                </div>
                                <button className="w-full bg-[#1565C0] hover:bg-black text-white py-2 rounded font-semibold mt-2" type="submit">
                                    {editingReviewId ? "UPDATE" : "SUBMIT"}
                                </button>
                                {editingReviewId && (
                                    <button
                                        className="w-full bg-gray-500 hover:bg-black text-white py-2 rounded font-semibold mt-2"
                                        onClick={() => {
                                            setEditingReviewId(null);
                                            setReviewRating(0);
                                            setReviewText("");
                                            setReviewName("");
                                            setReviewEmail("");
                                            setErrors({});
                                        }}
                                        type="button"
                                    >
                                        CANCEL
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className="my-16">
                <h2 className="text-2xl font-bold text-center mb-8">Related Products</h2>
                <div className="relative">
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2"
                        onClick={handleRelatedPrev}
                        aria-label="Scroll left"
                        style={{ left: "-2rem" }}
                        type="button"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div
                        ref={relatedScrollRef}
                        className="flex overflow-x-auto no-scrollbar"
                        style={{
                            scrollBehavior: "smooth",
                            gap: "2rem",
                            paddingLeft: "2rem",
                            paddingRight: "2rem",
                        }}
                    >
                        {relatedProducts.map((prod, idx) => (
                            <div
                                key={prod.id || idx}
                                style={{
                                    minWidth: "260px",
                                    maxWidth: "260px",
                                    flex: "0 0 260px",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate(`/products/${prod.id}`)}
                            >
                                <ProductCard product={prod} />
                            </div>
                        ))}
                    </div>
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2"
                        onClick={handleRelatedNext}
                        aria-label="Scroll right"
                        style={{ right: "-2rem" }}
                        type="button"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;