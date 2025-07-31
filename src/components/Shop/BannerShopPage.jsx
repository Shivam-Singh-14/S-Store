// import React from 'react';

// const BannerShopPage = () => {
//   return (
//     <div
//       className="relative w-full bg-[#1A3C34] bg-cover bg-center py-10 md:py-20"
//       style={{
//         backgroundImage: `url('https://xstore.8theme.com/elementor3/electronic-mega-market/wp-content/uploads/sites/4/2023/11/Image-min.png')`,
//       }}
//     >
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
//         {/* Text and Button Section */}
//         <div className="text-white flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
//           <p className="text-sm md:text-base uppercase tracking-widest mb-2">
//             Find the right keyboard for you
//           </p>
//           <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
//             Keyboards That Have <br /> You Covered.
//           </h1>
//           <p className="text-lg md:text-xl text-yellow-400 mb-4">
//             NOW 45% FLAT
//           </p>
//           <button className="px-6 py-3 bg-black text-white rounded-md text-sm md:text-base font-semibold hover:bg-white hover:text-[#1A3C34] transition-colors duration-300">
//             Shop Now
//           </button>
//         </div>

//         {/* Product Image Section */}
//         <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
//           <img
//             src="https://via.placeholder.com/600x400?text=Keyboard"
//             alt="Keyboard"
//             className="w-3/4 md:w-full max-w-md object-contain relative z-10"
//             style={{ transform: 'translateY(20%)' }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BannerShopPage;
import React from 'react';

const BannerShopPage = () => {
  return (
    <div className="relative w-full bg-[#1976D2] py-10 md:py-10 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Text and Button Section */}
        <div className="text-white flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
          <p className="text-sm md:text-base uppercase tracking-widest mb-2">
            Find the right keyboard for you
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Keyboards That Have <br /> You Covered.
          </h1>
          <p className="text-lg md:text-xl text-yellow-400 mb-4">
            NOW 45% FLAT
          </p>
          <button className="px-6 py-3 bg-black text-white rounded-md text-sm md:text-base font-semibold hover:bg-white hover:text-[#1976D2] transition-colors duration-300">
            Shop Now
          </button>
        </div>

        {/* Product Image Section with 3D Effect */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-3/4 md:w frequentemente max-w-md perspective-1000">
            <img
              src="https://xstore.8theme.com/elementor3/electronic-mega-market/wp-content/uploads/sites/4/2023/11/Image-min.png"
              alt="Keyboard"
              className="w-full object-contain relative z-index-Auto transform rotate-3d  transition-transform duration-300 hover:scale-105"
              style={{
                transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg) translateY(20%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerShopPage;