import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import brand logos from assets
import samsungLogo from '../../assets/brand-01.webp';
import dellLogo from '../../assets/brand-02.webp';
import sonyLogo from '../../assets/brand-03.webp';
import lgLogo from '../../assets/brand-04.webp';
import boseLogo from '../../assets/brand-05.webp';
import asusLogo from '../../assets/brand-06.webp';

const Brands = () => {
  const brandData = [
    { name: 'Samsung', logo: samsungLogo, path: '/shop/samsung' },
    { name: 'Dell', logo: dellLogo, path: '/shop/dell' },
    { name: 'Sony', logo: sonyLogo, path: '/shop/sony' },
    { name: 'LG', logo: lgLogo, path: '/shop/lg' },
    { name: 'Bose', logo: boseLogo, path: '/shop/bose' },
    { name: 'Asus', logo: asusLogo, path: '/shop/asus' },
  ];

  // State to track the current brand index for mobile view
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);

  // Effect to auto-cycle brands on mobile every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandIndex((prevIndex) => 
        (prevIndex + 1) % brandData.length
      );
    }, 1500); // 1.5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [brandData.length]);

  return (
    <div className="flex justify-center items-center space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-16 p-4 bg-white">
      {/* Mobile view: Show only the current brand */}
      <div className="block sm:hidden">
        <Link 
          to={brandData[currentBrandIndex].path} 
          className="hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <img 
            src={brandData[currentBrandIndex].logo} 
            alt={`${brandData[currentBrandIndex].name} logo`} 
            className="w-[200px] h-[110px] object-contain mx-auto"
          />
        </Link>
      </div>

      {/* Larger screens: Show all brands in a single line */}
      <div className="hidden sm:flex sm:justify-center sm:items-center sm:space-x-8 md:space-x-12 lg:space-x-16">
        {brandData.map((brand) => (
          <Link to={brand.path} key={brand.name} className="hover:opacity-80 transition-opacity flex-shrink-0">
            <img 
              src={brand.logo} 
              alt={`${brand.name} logo`} 
              className="w-[100px] h-[55px] md:w-[140px] md:h-[77px] lg:w-[187px] lg:h-[103px] object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brands;