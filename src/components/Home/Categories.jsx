// import React, { useRef, useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);
//   const location = useLocation();
//   const scrollInterval = useRef(null);

//   const queryParams = new URLSearchParams(location.search);
//   const selectedCategory = queryParams.get('category');

//   const getCardWidth = () => {
//     const screenWidth = window.innerWidth;
//     if (screenWidth >= 1280) return 256;
//     if (screenWidth >= 1024) return 224;
//     if (screenWidth >= 768) return 192;
//     if (screenWidth >= 640) return 160;
//     return 144;
//   };

//   const [cardWidth, setCardWidth] = useState(getCardWidth());

//   useEffect(() => {
//     const handleResize = () => setCardWidth(getCardWidth());
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch('https://fakestoreapi.com/products/categories');
//         const cats = await res.json();
//         const catData = await Promise.all(
//           cats.map(async (cat) => {
//             const prodRes = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(cat)}`);
//             const products = await prodRes.json();
//             return {
//               name: cat.charAt(0).toUpperCase() + cat.slice(1),
//               image: products[0]?.image || '',
//               count: products.length,
//               id: cat,
//             };
//           })
//         );
//         setCategories(catData);
//       } catch (err) {
//         console.error('Failed to fetch categories:', err);
//         setCategories([]);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const repeatCount = 100;
//   const extendedCategories = Array(repeatCount).fill(categories).flat();
//   const gapWidth = window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 16 : window.innerWidth < 1024 ? 24 : 32;
//   const scrollDistance = cardWidth + gapWidth;
//   const originalSetWidth = (categories.length * cardWidth) + ((categories.length - 1) * gapWidth);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (scrollRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//         if (scrollLeft + clientWidth >= scrollWidth - scrollDistance) {
//           scrollRef.current.scrollLeft = 0;
//         }
//         else if (scrollLeft <= 0) {
//           scrollRef.current.scrollLeft = scrollWidth - clientWidth - scrollDistance;
//         }
//       }
//     };

//     const scrollElement = scrollRef.current;
//     if (scrollElement) {
//       scrollElement.scrollLeft = originalSetWidth;
//       scrollElement.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       if (scrollElement) {
//         scrollElement.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [categories, cardWidth, gapWidth, originalSetWidth, scrollDistance]);

//   const scrollCategoryLeft = () => {
//     console.log('scrollCategoryLeft called');
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
//       console.log('Scrolling left, scrollLeft:', scrollRef.current.scrollLeft);
//     } else {
//       console.log('scrollRef.current is null');
//     }
//   };

//   const scrollCategoryRight = () => {
//     console.log('scrollCategoryRight called');
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
//       console.log('Scrolling right, scrollLeft:', scrollRef.current.scrollLeft);
//     } else {
//       console.log('scrollRef.current is null');
//     }
//   };

//   const handleCardClick = (cat) => {
//     console.log('Navigating to category:', cat);
//     navigate(`/shop?category=${encodeURIComponent(cat)}`);
//   };

//   const CategoryCard = ({ title, image, count, onClick, id }) => (
//     <div
//       onClick={onClick}
//       className={`flex flex-col items-center w-36 sm:w-40 md:w-48 lg:w-56 xl:w-64 mx-2 transition-all duration-300 cursor-pointer flex-shrink-0 snap-center ${
//         selectedCategory === id ? 'border-2 border-blue-500 rounded-lg' : ''
//       }`}
//     >
//       <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
//         {image ? (
//           <img
//             src={image}
//             alt={title}
//             className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-110"
//             loading="lazy"
//           />
//         ) : (
//           <span className="text-4xl text-gray-400 font-bold">{title.charAt(0).toUpperCase()}</span>
//         )}
//       </div>
//       <h3 className="mt-2 text-center font-semibold text-base">{title}</h3>
//       <p className="text-sm text-gray-600">{count} product{count !== 1 ? 's' : ''}</p>
//     </div>
//   );

//   return (
//     <div className="py-8 relative">
//       <h2 className="text-2xl font-bold text-center mb-6">Categories</h2>
//       <div
//         className="relative px-2 sm:px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <button
//           onClick={scrollCategoryLeft}
//           onMouseDown={() => {
//             if (scrollRef.current) {
//               scrollRef.current.scrollBy({ left: -scrollDistance / 5, behavior: 'smooth' });
//               scrollInterval.current = setInterval(() => {
//                 if (scrollRef.current) {
//                   scrollRef.current.scrollBy({ left: -scrollDistance / 5, behavior: 'smooth' });
//                 }
//               }, 100);
//             }
//           }}
//           onMouseUp={() => {
//             clearInterval(scrollInterval.current);
//           }}
//           onMouseLeave={() => {
//             clearInterval(scrollInterval.current);
//           }}
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity duration-300 z-10 opacity-100"
//         >
//           {'<'}
//         </button>
//         <button
//           onClick={scrollCategoryRight}
//           onMouseDown={() => {
//             if (scrollRef.current) {
//               scrollRef.current.scrollBy({ left: scrollDistance / 5, behavior: 'smooth' });
//               scrollInterval.current = setInterval(() => {
//                 if (scrollRef.current) {
//                   scrollRef.current.scrollBy({ left: scrollDistance / 5, behavior: 'smooth' });
//                 }
//               }, 100);
//             }
//           }}
//           onMouseUp={() => {
//             clearInterval(scrollInterval.current);
//           }}
//           onMouseLeave={() => {
//             clearInterval(scrollInterval.current);
//           }}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity duration-300 z-10 opacity-100"
//         >
//           {'>'}
//         </button>
//         <div
//           id="category-scroll"
//           ref={scrollRef}
//           className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-2 sm:gap-4 md:gap-6"
//           style={{
//             WebkitOverflowScrolling: 'touch',
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none',
//           }}
//         >
//           <style>
//             {`
//               #category-scroll::-webkit-scrollbar {
//                 display: none;
//               }
//             `}
//           </style>
//           {extendedCategories.map((cat, index) => (
//             <CategoryCard
//               key={`${cat.id}-${index}`}
//               title={cat.name}
//               image={cat.image}
//               count={cat.count}
//               id={cat.id}
//               onClick={() => handleCardClick(cat.id)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const location = useLocation();
  const scrollInterval = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const cats = await res.json();
        const catData = await Promise.all(
          cats.map(async (cat) => {
            const prodRes = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(cat)}`);
            const products = await prodRes.json();
            return {
              name: cat.charAt(0).toUpperCase() + cat.slice(1),
              image: products[0]?.image || '',
              count: products.length,
              id: cat,
            };
          })
        );
        setCategories(catData);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const repeatCount = 100;
  const extendedCategories = Array(repeatCount).fill(categories).flat();
  const gapWidth = window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 16 : window.innerWidth < 1024 ? 24 : 32;
  const scrollDistance = cardWidth + gapWidth;
  const originalSetWidth = (categories.length * cardWidth) + ((categories.length - 1) * gapWidth);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - scrollDistance) {
          scrollRef.current.scrollLeft = 0;
        }
        else if (scrollLeft <= 0) {
          scrollRef.current.scrollLeft = scrollWidth - clientWidth - scrollDistance;
        }
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollLeft = originalSetWidth;
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [categories, cardWidth, gapWidth, originalSetWidth, scrollDistance]);

  const scrollCategoryLeft = () => {
    console.log('scrollCategoryLeft called');
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
      console.log('Scrolling left, scrollLeft:', scrollRef.current.scrollLeft);
    } else {
      console.log('scrollRef.current is null');
    }
  };

  const scrollCategoryRight = () => {
    console.log('scrollCategoryRight called');
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      console.log('Scrolling right, scrollLeft:', scrollRef.current.scrollLeft);
    } else {
      console.log('scrollRef.current is null');
    }
  };

  const handleCardClick = (cat) => {
    console.log('Navigating to category:', cat);
    navigate(`/shop?category=${encodeURIComponent(cat)}`);
  };

  const CategoryCard = ({ title, image, count, onClick, id }) => (
    <div
      onClick={onClick}
      className={`flex flex-col items-center w-36 sm:w-40 md:w-48 lg:w-56 xl:w-64 mx-2 transition-all duration-300 cursor-pointer flex-shrink-0 snap-center ${
        selectedCategory === id ? 'border-2 border-blue-500 rounded-lg' : ''
      }`}
    >
      <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
        ) : (
          <span className="text-4xl text-gray-400 font-bold">{title.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <h3 className="mt-2 text-center font-semibold text-base">{title}</h3>
      <p className="text-sm text-gray-600">{count} product{count !== 1 ? 's' : ''}</p>
    </div>
  );

  return (
    <div className="py-8 relative">
      <h2 className="text-2xl font-bold text-center mb-6">Categories</h2>
      <div
        className="relative px-4 sm:px-6 md:px-8 lg:px-10 w-full mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={scrollCategoryLeft}
          onMouseDown={() => {
            if (scrollRef.current) {
              scrollRef.current.scrollBy({ left: -scrollDistance / 5, behavior: 'smooth' });
              scrollInterval.current = setInterval(() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({ left: -scrollDistance / 5, behavior: 'smooth' });
                }
              }, 100);
            }
          }}
          onMouseUp={() => {
            clearInterval(scrollInterval.current);
          }}
          onMouseLeave={() => {
            clearInterval(scrollInterval.current);
          }}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity duration-300 z-10 opacity-100"
        >
          {'<'}
        </button>
        <button
          onClick={scrollCategoryRight}
          onMouseDown={() => {
            if (scrollRef.current) {
              scrollRef.current.scrollBy({ left: scrollDistance / 5, behavior: 'smooth' });
              scrollInterval.current = setInterval(() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({ left: scrollDistance / 5, behavior: 'smooth' });
                }
              }, 100);
            }
          }}
          onMouseUp={() => {
            clearInterval(scrollInterval.current);
          }}
          onMouseLeave={() => {
            clearInterval(scrollInterval.current);
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity duration-300 z-10 opacity-100"
        >
          {'>'}
        </button>
        <div
          id="category-scroll"
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-2 sm:gap-4 md:gap-6"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>
            {`
              #category-scroll::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {extendedCategories.map((cat, index) => (
            <CategoryCard
              key={`${cat.id}-${index}`}
              title={cat.name}
              image={cat.image}
              count={cat.count}
              id={cat.id}
              onClick={() => handleCardClick(cat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;