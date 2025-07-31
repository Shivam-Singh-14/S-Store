// // import React, { useState, useEffect } from "react";
// // import { X } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // // Utility function to get current user from local storage
// // const getCurrentUser = () => {
// //   try {
// //     const usersData = localStorage.getItem('users');
// //     console.log("Fetching users from localStorage:", usersData);
// //     const users = usersData ? JSON.parse(usersData) : [];
// //     const user = users.length > 0 ? users[0] : null;
// //     if (user && !user.userId) {
// //       user.userId = user.email || user.username || 'default-user';
// //     }
// //     console.log("Current user:", user);
// //     return user;
// //   } catch (error) {
// //     console.error("Error accessing localStorage for users:", error);
// //     return null;
// //   }
// // };

// // // Utility function to get compare list from local storage
// // const getCompareListFromStorage = () => {
// //   try {
// //     const compareListData = localStorage.getItem("compareList");
// //     console.log("Raw compareList data from localStorage:", compareListData);
// //     if (!compareListData) {
// //       // Initialize with default structure if not present
// //       const initialCompareList = [
// //         { id: 1, title: null, image: null, quantity: null, price: null, stock: null, brand: null, sku: null },
// //         { id: 2, title: null, image: null, quantity: null, price: null, stock: null, brand: null, sku: null },
// //         { id: 3, title: null, image: null, quantity: null, price: null, stock: null, brand: null, sku: null },
// //         { id: 4, title: null, image: null, quantity: null, price: null, stock: null, brand: null, sku: null },
// //       ];
// //       localStorage.setItem("compareList", JSON.stringify(initialCompareList));
// //       console.log("Initialized compareList in localStorage:", initialCompareList);
// //       return initialCompareList;
// //     }
// //     const compareList = JSON.parse(compareListData);
// //     console.log("Parsed compareList:", compareList);
// //     return compareList;
// //   } catch (error) {
// //     console.error("Error accessing localStorage for compareList:", error);
// //     return [
// //       { id: 1, title: null, image: null, quantity: null, price: null, stock: null, brand: null, sku: null },
// //       { id: 2, title: null, image: null, quantity: null, price: null, stock: null, brand: null, sku: null },
// //       { id: 3, title: null, image: null, quantity: null, price: null, stock: null, brand: null, sku: null },
// //       { id: 4, title: null, image: null, quantity: null, price: null, stock: null, brand: null, sku: null },
// //     ];
// //   }
// // };

// // export default function CompareSidebar({ open, onClose }) {
// //   const navigate = useNavigate();
// //   const currentUser = getCurrentUser();
// //   const [compareItems, setCompareItems] = useState([]);

// //   // Define fetchCompareList and compareListKey at the component level
// //   const user = getCurrentUser();
// //   const userId = user?.userId || "default-user";
// //   const compareListKey = `compare_${userId}`;

// //   const fetchCompareList = async () => {
// //     const compareListData = localStorage.getItem(compareListKey);
// //     let compareList = compareListData ? JSON.parse(compareListData) : [];
// //     compareList = compareList.filter(item => item && item.id);

// //     // Fetch details from fakestoreapi if missing
// //     const itemsWithDetails = await Promise.all(
// //       compareList.map(async (item) => {
// //         if (item.title && item.image && item.price !== undefined && item.price !== null) {
// //           return item;
// //         }
// //         // Fetch from fakestoreapi if details are missing
// //         try {
// //           const res = await fetch(`https://fakestoreapi.com/products/${item.id}`);
// //           if (!res.ok) return null;
// //           const data = await res.json();
// //           return {
// //             id: data.id,
// //             title: data.title,
// //             image: data.image,
// //             price: data.price,
// //             stock: 100,
// //             brand: data.category,
// //             sku: `#FAKE${data.id}`,
// //           };
// //         } catch {
// //           return null;
// //         }
// //       })
// //     );
// //     setCompareItems(itemsWithDetails.filter(Boolean));
// //   };

// //   // Fetch compareList on mount and set up event listener for storage changes
// //   useEffect(() => {
// //     fetchCompareList();

// //     const handleStorageChange = (event) => {
// //       if (event.key === compareListKey) {
// //         fetchCompareList();
// //       }
// //     };

// //     window.addEventListener('storage', handleStorageChange);

// //     return () => {
// //       window.removeEventListener('storage', handleStorageChange);
// //     };
// //   }, [compareListKey]);

// //   const handleViewCompare = () => {
// //     onClose();
// //     navigate("/comparison");
// //   };

// //   const handleClearCompare = () => {
// //     const compareListKey = "compare_l@gmail.com";
// //     localStorage.setItem(compareListKey, JSON.stringify([]));
// //     setCompareItems([]);
// //   };

// //   return (
// //     <div
// //       className={`fixed inset-0 z-[2000] flex justify-end transition-transform duration-300 ${open ? "" : "pointer-events-none"
// //         }`}
// //     >
// //       {/* Overlay */}
// //       <div
// //         className={`fixed inset-0 bg-opacity-20 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
// //           }`}
// //         onClick={onClose}
// //       />
// //       {/* Sidebar */}
// //       <aside
// //         className={`relative h-full w-full sm:w-[400px] max-w-full bg-white shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
// //           } flex flex-col`}
// //         style={{ maxWidth: 420 }}
// //       >
// //         <div className="flex items-center justify-between px-6 py-4 border-b">
// //           <span className="font-semibold text-lg flex items-center gap-2">
// //             <span role="img" aria-label="compare">⚖️ ({compareItems.length})</span>COMPARE
// //           </span>
// //           <button onClick={onClose} aria-label="Close sidebar">
// //             <X size={28} className="text-gray-600 hover:text-gray-800" />
// //           </button>
// //         </div>
// //         <div className="p-6 flex-1 overflow-y-auto">
// //           {compareItems.length > 0 ? (
// //             compareItems.map((item) => (
// //               <div key={item.id || item.sku} className="flex items-center gap-4 mb-6">
// //                 <img
// //                   src={item.image}
// //                   alt={item.title || "No title"}
// //                   className="w-16 h-16 object-contain rounded"
// //                 />
// //                 <div>
// //                   <div className="font-medium text-gray-800">{item.title || "No title"}</div>
// //                   <div className="text-sm text-gray-500">
// //                     {item.price !== undefined && item.price !== null && !isNaN(Number(item.price))
// //                       ? `$${Number(item.price).toFixed(2)}`
// //                       : "No price"}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="text-gray-500 text-center mt-8">No items to compare yet.</div>
// //           )}
// //         </div>
// //         <div className="p-6 border-t flex flex-col gap-3">
// //           <button
// //             className="w-full bg-black text-white py-3 rounded-md font-semibold text-sm uppercase"
// //             onClick={handleViewCompare}
// //             disabled={compareItems.length === 0}
// //           >
// //             VIEW COMPARISON
// //           </button>
// //           <button
// //             className="w-full bg-red-600 text-white py-3 rounded-md font-semibold text-sm uppercase"
// //             onClick={handleClearCompare}
// //             disabled={compareItems.length === 0}
// //           >
// //             CLEAR COMPARE LIST
// //           </button>
// //         </div>
// //       </aside>
// //     </div>
// //   );
// // }


// // import React, { useState, useEffect } from "react";
// // import { X } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // // Utility function to get current user from local storage
// // const getCurrentUser = () => {
// //   try {
// //     const currentUserData = localStorage.getItem('currentUser');
// //     console.log("Fetching currentUser from localStorage:", currentUserData);
// //     const user = currentUserData ? JSON.parse(currentUserData) : null;
// //     if (user && !user.userId) {
// //       user.userId = user.email || user.username; // No default-user fallback
// //     }
// //     console.log("Current user:", user);
// //     return user;
// //   } catch (error) {
// //     console.error("Error accessing localStorage for currentUser:", error);
// //     return null;
// //   }
// // };

// // // Utility function for localStorage
// // const getCompareFromStorage = (compareKey) => {
// //   try {
// //     const data = localStorage.getItem(compareKey);
// //     console.log(`Raw compare data from localStorage for ${compareKey}:`, data);
// //     const compareList = data ? JSON.parse(data) : [];
// //     console.log(`Parsed compare data for ${compareKey}:`, compareList);
// //     return compareList;
// //   } catch (error) {
// //     console.error(`Error parsing compare from localStorage for ${compareKey}:`, error);
// //     return [];
// //   }
// // };

// // export default function CompareSidebar({ open, onClose }) {
// //   const navigate = useNavigate();
// //   const currentUser = getCurrentUser();
// //   const userId = currentUser?.userId || null; // No default-user fallback
// //   const compareListKey = userId ? `compare_${userId}` : null;
// //   const [compareItems, setCompareItems] = useState([]);
// //   const [message, setMessage] = useState(""); // For user feedback messages

// //   const fetchCompareList = async () => {
// //     if (!userId) {
// //       setCompareItems([]); // No user, empty compare list
// //       return;
// //     }

// //     let compareList = getCompareFromStorage(compareListKey);
// //     compareList = compareList.filter(item => item && item.id);

// //     // Fetch details from fakestoreapi if missing
// //     const itemsWithDetails = await Promise.all(
// //       compareList.map(async (item) => {
// //         // Support both [1,2,3] and [{id:1,...},{id:2,...}]
// //         const itemId = typeof item === "object" && item !== null ? item.id : item;
// //         if (typeof item === "object" && item.title && item.image && item.price !== undefined && item.price !== null) {
// //           return item;
// //         }
// //         // Fetch from fakestoreapi if details are missing
// //         try {
// //           const res = await fetch(`https://fakestoreapi.com/products/${itemId}`);
// //           if (!res.ok) return null;
// //           const data = await res.json();
// //           return {
// //             id: data.id,
// //             title: data.title,
// //             image: data.image,
// //             price: data.price,
// //             stock: 100,
// //             brand: data.category,
// //             sku: `#FAKE${data.id}`,
// //           };
// //         } catch {
// //           return null;
// //         }
// //       })
// //     );
// //     setCompareItems(itemsWithDetails.filter(Boolean));
// //   };

// //   // Fetch compareList on mount and set up event listener for storage changes
// //   useEffect(() => {
// //     fetchCompareList();

// //     const handleStorageChange = (event) => {
// //       if (event.key === compareListKey) {
// //         fetchCompareList();
// //       }
// //     };

// //     window.addEventListener('storage', handleStorageChange);

// //     return () => {
// //       window.removeEventListener('storage', handleStorageChange);
// //     };
// //   }, [compareListKey]);

// //   const handleViewCompare = () => {
// //     if (!userId) {
// //       setMessage("Please log in to view your comparison");
// //       setTimeout(() => setMessage(""), 3000);
// //       return;
// //     }
// //     onClose();
// //     navigate("/comparison");
// //   };

// //   const handleClearCompare = () => {
// //     if (!userId) {
// //       setMessage("Please log in to clear your compare list");
// //       setTimeout(() => setMessage(""), 3000);
// //       return;
// //     }
// //     localStorage.setItem(compareListKey, JSON.stringify([]));
// //     setCompareItems([]);
// //     setMessage("Compare list cleared");
// //     setTimeout(() => setMessage(""), 3000);
// //   };

// //   return (
// //     <div
// //       className={`fixed inset-0 z-[2000] flex justify-end transition-transform duration-300 ${open ? "" : "pointer-events-none"}`}
// //     >
// //       {/* Overlay */}
// //       <div
// //         className={`fixed inset-0 bg-opacity-20 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
// //         onClick={onClose}
// //       />
// //       {/* Sidebar */}
// //       <aside
// //         className={`relative h-full w-full sm:w-[400px] max-w-full bg-white shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"} flex flex-col`}
// //         style={{ maxWidth: 420 }}
// //       >
// //         <div className="flex items-center justify-between px-6 py-4 border-b">
// //           <span className="font-semibold text-lg flex items-center gap-2">
// //             <span role="img" aria-label="compare">⚖️ ({compareItems.length})</span>COMPARE
// //           </span>
// //           <button onClick={onClose} aria-label="Close sidebar">
// //             <X size={28} className="text-gray-600 hover:text-gray-800" />
// //           </button>
// //         </div>
// //         {message && (
// //           <div className="px-6 py-2 text-center text-sm text-gray-600">{message}</div>
// //         )}
// //         <div className="p-6 flex-1 overflow-y-auto">
// //           {compareItems.length > 0 ? (
// //             compareItems.map((item) => (
// //               <div key={item.id || item.sku} className="flex items-center gap-4 mb-6">
// //                 <img
// //                   src={item.image}
// //                   alt={item.title || "No title"}
// //                   className="w-16 h-16 object-contain rounded"
// //                 />
// //                 <div>
// //                   <div className="font-medium text-gray-800">{item.title || "No title"}</div>
// //                   <div className="text-sm text-gray-500">
// //                     {item.price !== undefined && item.price !== null && !isNaN(Number(item.price))
// //                       ? `$${Number(item.price).toFixed(2)}`
// //                       : "No price"}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="text-gray-500 text-center mt-8">
// //               {userId ? "No items to compare yet." : "Please log in to view your compare list."}
// //             </div>
// //           )}
// //         </div>
// //         <div className="p-6 border-t flex flex-col gap-3">
// //           <button
// //             className="w-full bg-black text-white py-3 rounded-md font-semibold text-sm uppercase"
// //             onClick={handleViewCompare}
// //             disabled={compareItems.length === 0}
// //           >
// //             VIEW COMPARISON
// //           </button>
// //           <button
// //             className="w-full bg-red-600 text-white py-3 rounded-md font-semibold text-sm uppercase"
// //             onClick={handleClearCompare}
// //             disabled={compareItems.length === 0}
// //           >
// //             CLEAR COMPARE LIST
// //           </button>
// //         </div>
// //       </aside>
// //     </div>
// //   );
// // }




// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // Utility function to get current user from local storage
// const getCurrentUser = () => {
//   try {
//     const currentUserData = localStorage.getItem('currentUser');
//     console.log("Fetching currentUser from localStorage:", currentUserData);
//     const user = currentUserData ? JSON.parse(currentUserData) : null;
//     if (user && !user.userId) {
//       user.userId = user.email || user.username; // No default-user fallback
//     }
//     console.log("Current user:", user);
//     return user;
//   } catch (error) {
//     console.error("Error accessing localStorage for currentUser:", error);
//     return null;
//   }
// };

// // Utility function for localStorage
// const getCompareFromStorage = (compareKey) => {
//   try {
//     const data = localStorage.getItem(compareKey);
//     console.log(`Raw compare data from localStorage for ${compareKey}:`, data);
//     const compareList = data ? JSON.parse(data) : [];
//     console.log(`Parsed compare data for ${compareKey}:`, compareList);
//     return compareList;
//   } catch (error) {
//     console.error(`Error parsing compare from localStorage for ${compareKey}:`, error);
//     return [];
//   }
// };

// export default function CompareSidebar({ open, onClose }) {
//   const navigate = useNavigate();
//   const currentUser = getCurrentUser();
//   const userId = currentUser?.userId || null; // No default-user fallback
//   const compareListKey = userId ? `compare_${userId}` : null;
//   const [compareItems, setCompareItems] = useState([]);
//   const [message, setMessage] = useState(""); // For user feedback messages

//   const fetchCompareList = async () => {
//     if (!userId) {
//       setCompareItems([]); // No user, empty compare list
//       return;
//     }

//     let compareList = getCompareFromStorage(compareListKey);
//     compareList = compareList.filter(item => item && item.id);

//     // Fetch details from fakestoreapi if missing
//     const itemsWithDetails = await Promise.all(
//       compareList.map(async (item) => {
//         // Support both [1,2,3] and [{id:1,...},{id:2,...}]
//         const itemId = typeof item === "object" && item !== null ? item.id : item;
//         if (typeof item === "object" && item.title && item.image && item.price !== undefined && item.price !== null) {
//           return item;
//         }
//         // Fetch from fakestoreapi if details are missing
//         try {
//           const res = await fetch(`https://fakestoreapi.com/products/${itemId}`);
//           if (!res.ok) return null;
//           const data = await res.json();
//           return {
//             id: data.id,
//             title: data.title,
//             image: data.image,
//             price: data.price,
//             stock: 100,
//             brand: data.category,
//             sku: `#FAKE${data.id}`,
//           };
//         } catch {
//           return null;
//         }
//       })
//     );
//     setCompareItems(itemsWithDetails.filter(Boolean));
//   };

//   // Fetch compareList on mount and set up event listener for storage changes
//   useEffect(() => {
//     fetchCompareList();

//     const handleStorageChange = (event) => {
//       if (event.key === compareListKey) {
//         fetchCompareList();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [compareListKey]);

//   const handleViewCompare = () => {
//     if (!userId) {
//       setMessage("Please log in to view your comparison");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }
//     onClose();
//     navigate("/comparison");
//   };

//   const handleClearCompare = () => {
//     if (!userId) {
//       setMessage("Please log in to clear your compare list");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }
//     localStorage.setItem(compareListKey, JSON.stringify([]));
//     setCompareItems([]);
//     setMessage("Compare list cleared");
//     setTimeout(() => setMessage(""), 3000);
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-[2000] flex justify-end transition-transform duration-300 ${open ? "" : "pointer-events-none"}`}
//     >
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-opacity-20 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         onClick={onClose}
//       />
//       {/* Sidebar */}
//       <aside
//         className={`relative h-full w-full sm:w-[400px] max-w-full bg-white shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"} flex flex-col`}
//         style={{ maxWidth: 420 }}
//       >
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <span className="font-semibold text-lg flex items-center gap-2">
//             <span role="img" aria-label="compare">⚖️ ({compareItems.length})</span>COMPARE
//           </span>
//           <button onClick={onClose} aria-label="Close sidebar">
//             <X size={28} className="text-gray-600 hover:text-gray-800" />
//           </button>
//         </div>
//         {message && (
//           <div className="px-6 py-2 text-center text-sm text-gray-600">{message}</div>
//         )}
//         <div className="p-6 flex-1 overflow-y-auto">
//           {!userId ? (
//             <div className="text-gray-500 text-center mt-8">
//               Please{" "}
//               <button
//                 onClick={() => navigate("/")}
//                 className="text-blue-600 hover:underline font-semibold"
//                 aria-label="Navigate to login page"
//               >
//                 login
//               </button>{" "}
//               to view compare list.
//             </div>
//           ) : compareItems.length > 0 ? (
//             compareItems.map((item) => (
//               <div key={item.id || item.sku} className="flex items-center gap-4 mb-6">
//                 <img
//                   src={item.image}
//                   alt={item.title || "No title"}
//                   className="w-16 h-16 object-contain rounded"
//                 />
//                 <div>
//                   <div className="font-medium text-gray-800">{item.title || "No title"}</div>
//                   <div className="text-sm text-gray-500">
//                     {item.price !== undefined && item.price !== null && !isNaN(Number(item.price))
//                       ? `$${Number(item.price).toFixed(2)}`
//                       : "No price"}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-gray-500 text-center mt-8">
//               No items to compare yet.
//             </div>
//           )}
//         </div>
//         <div className="p-6 border-t flex flex-col gap-3">
//           <button
//             className="w-full bg-black text-white py-3 rounded-md font-semibold text-sm uppercase"
//             onClick={handleViewCompare}
//             disabled={compareItems.length === 0}
//           >
//             VIEW COMPARISON
//           </button>
//           <button
//             className="w-full bg-red-600 text-white py-3 rounded-md font-semibold text-sm uppercase"
//             onClick={handleClearCompare}
//             disabled={compareItems.length === 0}
//           >
//             CLEAR COMPARE LIST
//           </button>
//         </div>
//       </aside>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Utility function to get current user from local storage
const getCurrentUser = () => {
  try {
    const currentUserData = localStorage.getItem('currentUser');
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

// Utility function for localStorage
const getCompareFromStorage = (compareKey) => {
  try {
    const data = localStorage.getItem(compareKey);
    console.log(`Raw compare data from localStorage for ${compareKey}:`, data);
    const compareList = data ? JSON.parse(data) : [];
    console.log(`Parsed compare data for ${compareKey}:`, compareList);
    return compareList;
  } catch (error) {
    console.error(`Error parsing compare from localStorage for ${compareKey}:`, error);
    return [];
  }
};

export default function CompareSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || null; // No default-user fallback
  const compareListKey = userId ? `compare_${userId}` : null;
  const [compareItems, setCompareItems] = useState([]);
  const [message, setMessage] = useState(""); // For user feedback messages

  const fetchCompareList = async () => {
    if (!userId) {
      setCompareItems([]); // No user, empty compare list
      return;
    }

    let compareList = getCompareFromStorage(compareListKey);
    compareList = compareList.filter(item => item && item.id);

    // Fetch details from fakestoreapi if missing
    const itemsWithDetails = await Promise.all(
      compareList.map(async (item) => {
        // Support both [1,2,3] and [{id:1,...},{id:2,...}]
        const itemId = typeof item === "object" && item !== null ? item.id : item;
        if (typeof item === "object" && item.title && item.image && item.price !== undefined && item.price !== null) {
          return item;
        }
        // Fetch from fakestoreapi if details are missing
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${itemId}`);
          if (!res.ok) return null;
          const data = await res.json();
          return {
            id: data.id,
            title: data.title,
            image: data.image,
            price: data.price,
            stock: 100,
            brand: data.category,
            sku: `#FAKE${data.id}`,
          };
        } catch {
          return null;
        }
      })
    );
    setCompareItems(itemsWithDetails.filter(Boolean));
  };

  // Fetch compareList on mount and set up event listener for storage changes
  useEffect(() => {
    fetchCompareList();

    const handleStorageChange = (event) => {
      if (event.key === compareListKey) {
        fetchCompareList();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [compareListKey]);

  const handleViewCompare = () => {
    if (!userId) {
      setMessage("Please log in to view your comparison");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    onClose();
    navigate("/comparison");
  };

  const handleClearCompare = () => {
    if (!userId) {
      setMessage("Please log in to clear your compare list");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    localStorage.setItem(compareListKey, JSON.stringify([]));
    setCompareItems([]);
    setMessage("Compare list cleared");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div
      className={`fixed inset-0 z-[2000] flex justify-end transition-transform duration-300 ${open ? "" : "pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-opacity-20 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside
        className={`relative h-full w-full sm:w-[400px] max-w-full bg-white shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"} flex flex-col`}
        style={{ maxWidth: 420 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-semibold text-lg flex items-center gap-2">
            <span role="img" aria-label="compare">⚖️ ({compareItems.length})</span>COMPARE
          </span>
          <button onClick={onClose} aria-label="Close sidebar">
            <X size={28} className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>
        {message && (
          <div className="px-6 py-2 text-center text-sm text-gray-600">{message}</div>
        )}
        <div className="p-6 flex-1 overflow-y-auto">
          {!userId ? (
            <div className="text-gray-500 text-center mt-8">
              Please{" "}
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 hover:underline font-semibold"
                aria-label="Navigate to login page"
              >
                login
              </button>{" "}
              to view compare list.
            </div>
          ) : compareItems.length > 0 ? (
            compareItems.map((item) => (
              <div key={item.id || item.sku} className="flex items-center gap-4 mb-6">
                <img
                  src={item.image}
                  alt={item.title || "No title"}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <div className="font-medium text-gray-800">{item.title || "No title"}</div>
                  <div className="text-sm text-gray-500">
                    {item.price !== undefined && item.price !== null && !isNaN(Number(item.price))
                      ? `$${Number(item.price).toFixed(2)}`
                      : "No price"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-8">
              No items to compare yet.
            </div>
          )}
        </div>
        <div className="p-6 border-t flex flex-col gap-3">
          <button
            className="w-full bg-black text-white py-3 rounded-md font-semibold text-sm uppercase"
            onClick={handleViewCompare}
            disabled={compareItems.length === 0}
          >
            VIEW COMPARISON
          </button>
          <button
            className="w-full bg-red-600 text-white py-3 rounded-md font-semibold text-sm uppercase"
            onClick={handleClearCompare}
            disabled={compareItems.length === 0}
          >
            CLEAR COMPARE LIST
          </button>
        </div>
      </aside>
    </div>
  );
}