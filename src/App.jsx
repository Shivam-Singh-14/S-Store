import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Scroll from './components/ScrollToTop'; // <-- Import Scroll
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import Categories from './components/Home/Categories';
import Enquiry from './pages/Enquiry';
import Contact from './pages/Contact';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import ProductPage from './components/ProductPage';
import Shop  from './pages/Shop';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ProductManagement from './pages/admin/ProductManagement';
import RetailerManagement from './pages/admin/RetailerManagement';
import DealsManagement from './pages/admin/DealsManagement';
import OrderManagement from './pages/admin/OrderManagement';
import Carts from './components/Navbar/Carts'; // Import the Carts component from its correct location
import Favorites from './components/Navbar/Favorites';
import Compare from './components/Navbar/Compare'; // Import the Compare component
import CheckOut from './components/Navbar/CheckOut'; // Import the CheckOut component
import Banners from './pages/admin/banners'; // Import the Banners component
import Videos from './pages/admin/Videos'; // Import the Videos component
import EnquiryManagement from './pages/admin/EnquiryManagement'; // Import the EnquiryManagement component

// Initialize users in localStorage
const initializeData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
};

// Layout component with Navbar and Footer
const MainLayout = ({ isShopHoverOpen, setIsShopHoverOpen }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar
      isShopHoverOpen={isShopHoverOpen}
      setIsShopHoverOpen={setIsShopHoverOpen}
    />
    <main className="w-full mx-auto px-4 py-8 flex-grow">
      <Outlet />
      <Scroll />
    </main>
    <Footer />
  </div>
);

const App = () => {
  // State for controlling ShopHover visibility
  const [isShopHoverOpen, setIsShopHoverOpen] = useState(false);

  // Initialize data on app load
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Router>
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route
            element={
              <ErrorBoundary>
                <MainLayout
                  isShopHoverOpen={isShopHoverOpen}
                  setIsShopHoverOpen={setIsShopHoverOpen}
                />
              </ErrorBoundary>
            }
          >
            {/* Add your actual page components here, not Navbar */}
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/enquiry" element={<Enquiry/>}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<Carts />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/comparison" element={<Compare />} />
            <Route path="/Checkout" element={<CheckOut />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="retailers" element={<RetailerManagement />} />
            <Route path="deals" element={<DealsManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="banners" element={<Banners />} />
            <Route path="videos" element={<Videos />} />
            <Route path="enquiries" element={<EnquiryManagement />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
