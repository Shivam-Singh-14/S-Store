import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Contact Info Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center mb-4">
            <div className="text-4xl font-bold text-blue-600">S-Store</div>
            <div className="ml-2 text-sm text-gray-600"></div>
          </div>
          <p className="text-gray-700">Contact Us at</p>
          <p className="text-gray-700 font-semibold">+91 95035 54800</p>
          <p className="text-gray-700">hello@sirmiti.com</p>
        </div>

        {/* Browse Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse</h3>
          <ul className="space-y-2">
            {["About us", "Shop", "Contact us", "Blog"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories Section - Split into Two Columns */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
              <ul className="space-y-2">
                {[
                  "Electronics",
                  "Desktop Items",
                  "Office Utility & Stationary",
                  "Combo Gift Set",
                  "Drinkware",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
              <ul className="space-y-2">
                {[
                  "Diaries & Planners",
                  "Bags",
                  "Rewards & Recognition",
                  "Eco Friendly",
                  "Pens",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Policies</h3>
          <ul className="space-y-2">
            {["Terms & Condition", "Privacy Policy", "Shipping Policy"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex space-x-4 mt-4">
            {/* Facebook Icon */}
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            {/* Instagram Icon */}
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.058 2.595.278 3.53.737a7.122 7.122 0 012.38 1.662 7.122 7.122 0 011.662 2.38c.459.935.679 2.164.737 3.53.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.366-.278 2.595-.737 3.53a7.122 7.122 0 01-1.662 2.38 7.122 7.122 0 01-2.38 1.662c-.935.459-2.164.679-3.53.737-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.058-2.595-.278-3.53-.737a7.122 7.122 0 01-2.38-1.662 7.122 7.122 0 01-1.662-2.38c-.459-.935-.679-2.164-.737-3.53-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.366.278-2.595.737-3.53a7.122 7.122 0 011.662-2.38 7.122 7.122 0 012.38-1.662c.935-.459 2.164-.679 3.53-.737 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.072-1.378.059-2.658.287-3.623.772a9.286 9.286 0 00-3.355 2.19 9.286 9.286 0 00-2.19 3.355c-.485.965-.713 2.245-.772 3.623-.06 1.28-.072 1.688-.072 4.947s.012 3.667.072 4.947c.059 1.378.287 2.658.772 3.623a9.286 9.286 0 002.19 3.355 9.286 9.286 0 003.355 2.19c.965.485 2.245.713 3.623.772 1.28.06 1.688.072 4.947.072s3.667-.012 4.947-.072c1.378-.059 2.658-.287 3.623-.772a9.286 9.286 0 003.355-2.19 9.286 9.286 0 002.19-3.355c.485-.965.713-2.245.772-3.623.06-1.28.072-1.688.072-4.947s-.012-3.667-.072-4.947c-.059-1.378-.287-2.658-.772-3.623a9.286 9.286 0 00-2.19-3.355 9.286 9.286 0 00-3.355-2.19c-.965-.485-2.245-.713-3.623-.772-1.28-.06-1.688-.072-4.947-.072zm0 5.838c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
              </svg>
            </a>
            {/* Email Icon */}
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 1.99 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-1.99-2zm0 14H4V8l8 5 8-5v10z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        © 2025 SIRMITI ONE. ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;