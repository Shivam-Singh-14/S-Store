import React, { useEffect, useState } from 'react';
import DealsSection from './Deals';

const HomeBanner = () => {
    const [bannerData, setBannerData] = useState([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API endpoint URL
    const apiUrl = 'https://fakestoreapi.com/products';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                
                // Transform the API data into our banner format
                const transformedData = data.slice(0, 3).map(product => ({
                    subtitle: product.category,
                    title: product.title,
                    description: product.description,
                    buttonText: `Buy Now - $${product.price}`,
                    buttonLink: "#",
                    imageUrl: product.image
                }));

                setBannerData(transformedData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch banner data.');
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    // Auto-change banner every 3 seconds
    useEffect(() => {
        if (bannerData.length > 0) {
            const interval = setInterval(() => {
                setCurrentBannerIndex((prevIndex) => 
                    (prevIndex + 1) % bannerData.length
                );
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [bannerData]);

    if (loading) return <div className="text-center py-10">Loading banner...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="w-full px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Banner Section - Full width */}
                <div className="w-full relative bg-white rounded-lg overflow-hidden shadow-lg">
                    <div
                        className="relative h-[320px] md:h-[400px] transition-all duration-500 ease-in-out"
                        style={{
                            backgroundImage: `url(${bannerData[currentBannerIndex]?.imageUrl})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: '#f8f9fa'
                        }}
                    >
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-xs text-center md:text-left p-1 md:p-2 bg-white/80 backdrop-blur-sm rounded-lg mx-1">
                                <p className="text-xs md:text-sm uppercase text-gray-600 mb-1 md:mb-2 transition-all duration-500 ease-in-out transform translate-y-0 opacity-100">
                                    {bannerData[currentBannerIndex]?.subtitle}
                                </p>
                                <h1 className="text-xl md:text-3xl font-extrabold text-gray-800 mb-2 md:mb-3 leading-tight transition-all duration-500 ease-in-out transform translate-y-0 opacity-100 line-clamp-2">
                                    {bannerData[currentBannerIndex]?.title}
                                </h1>
                                <p className="text-gray-600 mb-4 md:mb-5 transition-all duration-500 ease-in-out transform translate-y-0 opacity-100 line-clamp-3 text-xs md:text-base">
                                    {bannerData[currentBannerIndex]?.description}
                                </p>
                                <a
                                    href={bannerData[currentBannerIndex]?.buttonLink}
                                    className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 md:px-5 md:py-3 rounded-md hover:bg-blue-700 transition-all duration-500 ease-in-out transform translate-y-0 opacity-100 text-xs md:text-base"
                                >
                                    <svg
                                        className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                                        <circle cx="7" cy="21" r="1" />
                                        <circle cx="17" cy="21" r="1" />
                                    </svg>
                                    {bannerData[currentBannerIndex]?.buttonText}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deals Section - Below banner on small screens, beside on large screens */}
                <div className="w-full lg:w-2/5">
                    <div className="h-[320px] md:h-[400px] flex flex-col">
                        <DealsSection />
                    </div>
                </div>
            </div>

            {/* Banner Navigation Dots */}
            <div className="flex justify-center mt-3 space-x-2">
                {bannerData.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentBannerIndex === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentBannerIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeBanner;