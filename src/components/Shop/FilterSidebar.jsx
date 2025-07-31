import React, { useState, useEffect } from 'react';
import { Search, ChevronUp, Star } from 'lucide-react';

const FilterSidebar = ({ onFilterChange, categories = [], products = [] }) => {
  const [categorySearch, setCategorySearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [customerReview, setCustomerReview] = useState(0);
  const [showMoreSellers, setShowMoreSellers] = useState(false);
  const [deliveryDay, setDeliveryDay] = useState([]);
  const [status, setStatus] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]); // New state for multiple price ranges

  // Brand and seller options from products
  const brandOptions = React.useMemo(() => {
    const brandsSet = new Set(products.map(p => (p.brand || (p.name ? p.name.split(' ')[0] : 'Unknown'))));
    return Array.from(brandsSet).map(name => ({
      name,
      count: products.filter(p => (p.brand || (p.name ? p.name.split(' ')[0] : 'Unknown')) === name).length
    }));
  }, [products]);

  const sellerOptions = React.useMemo(() => {
    const sellersSet = new Set(products.map(p => p.seller || 'Unknown'));
    return Array.from(sellersSet).map(name => ({ name }));
  }, [products]);

  // Price ranges (static)
  const priceRanges = [
    { range: '$0 - $50', min: 0, max: 50 },
    { range: '$50 - $100', min: 50, max: 100 },
    { range: '$100 - $200', min: 100, max: 200 },
    { range: '$200+', min: 200, max: 10000 },
  ];

  // Colors (static)
  const colorOptions = [
    { name: 'Black', code: 'bg-black' },
    { name: 'White', code: 'bg-gray-200' },
    { name: 'Blue', code: 'bg-blue-400' },
    { name: 'Red', code: 'bg-red-400' },
    { name: 'Yellow', code: 'bg-yellow-300' },
    { name: 'Green', code: 'bg-green-400' },
  ];

  // Filtered categories and brands for search
  const filteredCategories = categories
    .filter(cat =>
      cat.toLowerCase().includes(categorySearch.toLowerCase())
    )
    .map(cat => ({
      name: cat,
      count: products.filter(p => p.category === cat).length
    }));
  const displayedCategories = showMoreCategories ? filteredCategories : filteredCategories.slice(0, 9);

  const filteredBrands = brandOptions.filter(brand =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );
  const displayedSellers = showMoreSellers ? sellerOptions : sellerOptions.slice(0, 5);

  // Update filters and call parent
  const updateFilters = (updatedFilters) => {
    // Compute the overall min and max from selected price ranges
    let overallMin = 0;
    let overallMax = 10000;

    if (selectedPriceRanges.length > 0) {
      const minValues = selectedPriceRanges.map(range => range.min);
      const maxValues = selectedPriceRanges.map(range => range.max);
      overallMin = Math.min(...minValues);
      overallMax = Math.max(...maxValues);
    }

    // Override with manual min/max if provided
    if (minPrice || maxPrice) {
      overallMin = minPrice ? parseFloat(minPrice) || 0 : overallMin;
      overallMax = maxPrice ? parseFloat(maxPrice) || 10000 : overallMax;
    }

    onFilterChange({
      priceRange: [overallMin, overallMax],
      rating: customerReview,
      status,
      colors,
      brands,
      sellers,
      deliveryDay,
      payOnDelivery,
      categories: selectedCategories,
      ...updatedFilters
    });
  };

  // Ensure updateFilters runs after selectedCategories or selectedPriceRanges changes
  useEffect(() => {
    updateFilters({});
    // eslint-disable-next-line
  }, [selectedCategories, selectedPriceRanges]);

  // Handle category selection (just update state)
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceApply = () => {
    updateFilters({});
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges(prev =>
      prev.some(r => r.range === range.range)
        ? prev.filter(r => r.range !== range.range)
        : [...prev, range]
    );
  };

  const handleDeliveryChange = (value) => {
    const updatedDelivery = deliveryDay.includes(value)
      ? deliveryDay.filter((d) => d !== value)
      : [...deliveryDay, value];
    setDeliveryDay(updatedDelivery);
    updateFilters({ deliveryDay: updatedDelivery });
  };

  const handleStatusChange = (value) => {
    const updatedStatus = status.includes(value)
      ? status.filter((s) => s !== value)
      : [...status, value];
    setStatus(updatedStatus);
    updateFilters({ status: updatedStatus });
  };

  const handleColorChange = (color) => {
    const updatedColors = colors.includes(color)
      ? colors.filter((c) => c !== color)
      : [...colors, color];
    setColors(updatedColors);
    updateFilters({ colors: updatedColors });
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = brands.includes(brand)
      ? brands.filter((b) => b !== brand)
      : [...brands, brand];
    setBrands(updatedBrands);
    updateFilters({ brands: updatedBrands });
  };

  const handleSellerChange = (seller) => {
    const updatedSellers = sellers.includes(seller)
      ? sellers.filter((s) => s !== seller)
      : [...sellers, seller];
    setSellers(updatedSellers);
    updateFilters({ sellers: updatedSellers });
  };

  const handlePayOnDeliveryChange = () => {
    setPayOnDelivery(prev => !prev);
    updateFilters({ payOnDelivery: !payOnDelivery });
  };

  const handleReviewChange = (star) => {
    setCustomerReview(star);
    updateFilters({ rating: star });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-xs md:max-w-sm z-50">
      {/* Delivery Day */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Delivery Day</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="delivery-tomorrow"
              checked={deliveryDay.includes('Tomorrow')}
              onChange={() => handleDeliveryChange('Tomorrow')}
              className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
            />
            <label htmlFor="delivery-tomorrow" className="ml-2 text-sm text-gray-700">
              Get It by Tomorrow
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="delivery-2days"
              checked={deliveryDay.includes('2 Days')}
              onChange={() => handleDeliveryChange('2 Days')}
              className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
            />
            <label htmlFor="delivery-2days" className="ml-2 text-sm text-gray-700">
              Get It in 2 Days
            </label>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3 text-gray-800">All Categories</h2>
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Find a category"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <div className="space-y-2">
          {displayedCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                  className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <label htmlFor={`category-${index}`} className="ml-2 text-sm text-gray-700">
                  {category.name}
                </label>
              </div>
              <span className="text-xs text-gray-500">{category.count}</span>
            </div>
          ))}
        </div>

        {filteredCategories.length > 9 && (
          <button
            className="flex items-center text-sm text-green-600 mt-2 font-medium"
            onClick={() => setShowMoreCategories(!showMoreCategories)}
          >
            {showMoreCategories ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> Less
              </>
            ) : (
              <>
                +{filteredCategories.length - 9} more
              </>
            )}
          </button>
        )}
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Price */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Filter By Price</h2>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`price-${index}`}
                checked={selectedPriceRanges.some(r => r.range === range.range)}
                onChange={() => handlePriceRangeChange(range)}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <label htmlFor={`price-${index}`} className="ml-2 text-sm text-gray-700">
                {range.range}
              </label>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex-1 min-w-[100px]">
            <input
              type="text"
              placeholder="Min"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[100px]">
            <input
              type="text"
              placeholder="Max"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <button
            onClick={handlePriceApply}
            className="bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            APPLY
          </button>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Brands */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Brands</h2>
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Find a brand"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <div className="space-y-2">
          {filteredBrands.map((brand, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${index}`}
                  checked={brands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                  className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <label htmlFor={`brand-${index}`} className="ml-2 text-sm text-gray-700">
                  {brand.name}
                </label>
              </div>
              <span className="text-xs text-gray-500">{brand.count}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Customer Reviews */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Customer Reviews</h2>
        <div className="flex items-center group">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`Filter ${star} stars & up`}
              onClick={() => handleReviewChange(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-5 w-5 transition-colors ${star <= customerReview ? 'text-orange-500 fill-orange-500' : 'text-orange-500'}`}
                fill={star <= customerReview ? 'currentColor' : 'none'}
                stroke="currentColor"
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-700 group-hover:text-green-600">& Up</span>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Colors */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Filter By Color</h2>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(color.name)}
              className={`h-8 w-8 rounded-full ${color.code} border ${colors.includes(color.name) ? 'border-green-600 ring-2 ring-green-600/30' : 'border-gray-300'}`}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Sellers */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Seller</h2>
        <div className="space-y-2">
          {displayedSellers.map((seller, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`seller-${index}`}
                checked={sellers.includes(seller.name)}
                onChange={() => handleSellerChange(seller.name)}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <label htmlFor={`seller-${index}`} className="ml-2 text-sm text-gray-700">
                {seller.name}
              </label>
            </div>
          ))}
        </div>
        {sellerOptions.length > 5 && (
          <button
            className="flex items-center text-sm text-green-600 mt-2 font-medium"
            onClick={() => setShowMoreSellers(!showMoreSellers)}
          >
            {showMoreSellers ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> See Less
              </>
            ) : (
              <>
                +{sellerOptions.length - 5} more
              </>
            )}
          </button>
        )}
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Pay On Delivery */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Pay On Delivery</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="pay-on-delivery"
            checked={payOnDelivery}
            onChange={handlePayOnDeliveryChange}
            className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
          />
          <label htmlFor="pay-on-delivery" className="ml-2 text-sm text-gray-700">
            Eligible for Pay On Delivery
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;