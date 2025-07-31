
//LOCAL STORAGE LOGIN LOGIC
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

function SignInForm({ initialTab = 'login', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userId: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  

  // Redirect if user is already logged in and set isOpen
  useEffect(() => {
    if (user) {
      console.log('User already logged in:', user);
      setIsOpen(false);
      onClose();
      navigate('/');
    } else {
      console.log('SignInForm mounted, setting isOpen to true');
      setIsOpen(true);
    }

    return () => {
      console.log('SignInForm unmounting, clearing timeout');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user, onClose, navigate]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Submitting form, activeTab:', activeTab);

      try {
        if (activeTab === 'login') {


          if (
    formData.username === 'admin' &&
    formData.password === 'admin123'
  ) {
    const adminUser = {
      id: 'admin',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      token: crypto.randomUUID(),
    };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));
    setUser(adminUser);
    toast.success('Welcome back, admin!');
    setLoading(false);
    setIsOpen(false);
    onClose();
    navigate('/admin');
    return;
  }



          console.log('Attempting login with:', {
            username: formData.username,
            password: formData.password,
            userId: formData.userId,
          });

          // Temporary credentials for testing
          const tempCredentials = {
            admin: { username: 'admin', password: 'admin123', role: 'admin' },
            retailer: { username: 'retailer', password: 'retailer123', role: 'retailer' }
          };

          // Check temporary credentials first
          let user = null;
          for (const [key, cred] of Object.entries(tempCredentials)) {
            if (cred.username === formData.username && cred.password === formData.password) {
              user = {
                id: crypto.randomUUID(),
                username: cred.username,
                email: `${cred.username}@example.com`,
                role: cred.role,
                token: crypto.randomUUID(),
              };
              break;
            }
          }

          if (!user) {
            if (formData.userId) {
              const fetchResponse = await fetch(`https://api.restful-api.dev/objects/${formData.userId}`);
              if (!fetchResponse.ok) {
                throw new Error('Failed to fetch user data');
              }
              const userData = await fetchResponse.json();
              if (
                userData.name === 'user' &&
                (userData.data.username.toLowerCase() === formData.username.toLowerCase() ||
                  userData.data.email.toLowerCase() === formData.username.toLowerCase()) &&
                userData.data.password === formData.password
              ) {
                user = userData;
              }
            }
          }

          if (!user) {
            const fetchResponse = await fetch('https://api.restful-api.dev/objects');
            if (!fetchResponse.ok) {
              throw new Error('Failed to fetch users');
            }
            const objects = await fetchResponse.json();
            const users = objects.filter((obj) => obj.name === 'user');
            console.log('Fetched users:', users);

            user = users.find((u) => {
              const matchesUsername =
                u.data.username.toLowerCase() === formData.username.toLowerCase() ||
                u.data.email.toLowerCase() === formData.username.toLowerCase();
              const matchesPassword = u.data.password === formData.password;
              return matchesUsername && matchesPassword;
            });
          }

        if (!user) {
          throw new Error(
            'Invalid username/email or password. Note: This mock API may not persist user data long-term. Please try registering again.'
          );
        }

        const loginResponse = await fetch('https://api.restful-api.dev/objects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'login-session',
            data: {
              userId: user.id,
              username: user.data.username,
              email: user.data.email,
              timestamp: new Date().toISOString(),
            },
          }),
        });

        if (!loginResponse.ok) {
          throw new Error('Login failed: Unable to create login session');
        }

        const loginSession = await loginResponse.json();
        console.log('Login session created:', loginSession);

        const userData = {
          id: user.id,
          username: user.data ? user.data.username : user.username,
          email: user.data ? user.data.email : user.email,
          role: user.role ? user.role : (user.data ? user.data.role : 'user'),
          token: crypto.randomUUID(),
        };
        console.log('Login successful, setting user:', userData);

        // Save user data to localStorage (excluding password)
        localStorage.setItem('currentUser', JSON.stringify(userData));
        console.log('Saved user to localStorage:', userData);

        setUser(userData);
        toast.success(`Welcome back, ${userData.username}!`);
        setLoading(false);
        setIsOpen(false);
        onClose();

        // Role-based routing
        switch (userData.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'retailer':
            navigate('/retailer');
            break;
          default:
            navigate('/');
            break;
        }
      } 

      if (activeTab === 'register') {
        console.log('Registering with:', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        const checkResponse = await fetch('https://api.restful-api.dev/objects');
        if (!checkResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const objects = await checkResponse.json();
        const users = objects.filter((obj) => obj.name === 'user');

        if (
          users.some(
            (u) =>
              u.data.email.toLowerCase() === formData.email.toLowerCase() ||
              u.data.username.toLowerCase() === formData.username.toLowerCase()
          )
        ) {
          throw new Error('Username or email already registered');
        }

        const response = await fetch('https://api.restful-api.dev/objects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'user',
            data: {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const newUser = await response.json();
        console.log('Registration successful, new user:', newUser);

        toast.success(`Registered successfully, ${newUser.data.username}! Please log in.`);
        setFormData({
          username: newUser.data.username,
          email: '',
          password: '',
          userId: newUser.id,
        });
        setActiveTab('login');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
      setError(err.message || 'An error occurred. Please try again.');
      toast.error(err.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    console.log('handleClose called, closing form');
    setIsOpen(false);
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 350);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log('Overlay clicked, calling handleClose');
      handleClose();
    }
  };

  const isLoggedIn = !!user; // Check if user is logged in

  if (!isOpen && !loading) {
    console.log('SignInForm not open, rendering null');
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-opacity-50 z-50 flex justify-end h-screen"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white max-w-sm w-full h-screen p-6 overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#1565C0]">{isLoggedIn ? 'USER' : 'SIGN IN'}</h3>
          <button
            onClick={isLoggedIn ? logout : handleClose}
            className="text-[#1565C0] hover:text-black"
            title={isLoggedIn ? 'Logout' : 'Close'}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isLoggedIn ? (
                <>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </>
              ) : (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
        {!isLoggedIn && (
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-3 text-center font-medium text-sm uppercase tracking-wider ${
              activeTab === 'login' ? 'border-b-2 border-[#1565C0] text-[#1565C0]' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium text-sm uppercase tracking-wider ${
              activeTab === 'register' ? 'border-b-2 border-[#1565C0] text-[#1565C0]' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('register')}
          >
            REGISTER
          </button>
        </div>
        )}
        {isLoggedIn ? (
          <div className="space-y-4">
            <p className="text-gray-700">Welcome, {user.username}!</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 transition"
            >
              LOGOUT
            </button>
          </div>
        ) : activeTab === 'login' ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username or email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={loading}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  disabled={loading}
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-teal-600 hover:underline">
                Lost your password?
              </a>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
            type="submit"
            className="w-full bg-[#1565C0] text-white py-3 rounded-md font-medium hover:bg-black transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'LOGIN'}
          </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
            type="submit"
            className="w-full bg-[#1565C0] text-white py-3 rounded-md font-medium hover:bg-black transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'REGISTER'}
          </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignInForm;
