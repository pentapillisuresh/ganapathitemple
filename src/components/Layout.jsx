import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/activities', label: 'Activities' },
    { path: '/ganapathis32', label: '32 Ganapathis' },
    { path: '/banquetHalls', label: 'Banquet Halls' },
    { path: '/idols', label: 'Idols' },
    { path: '/blog', label: 'Blog' },
  ];

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header with scrolling effect - Transparent to White */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - With better styling */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-secondary shadow-lg">
                <img 
                  src="/images/logo.jpg" 
                  alt="Ganapathi Temple Logo" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="hidden sm:block">
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  శ్రీ చింతామణి గణపతి దత్త క్షేత్రము
                </h1>
                <p className={`text-xs tracking-wide font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-secondary' : 'text-white/90'
                }`}>
                  Divine Blessings & Spiritual Harmony
                </p>
              </div>
            </Link>

            {/* Navigation - Professional horizontal menu with rounded buttons */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-secondary text-white shadow-lg scale-105'
                      : isScrolled 
                        ? 'text-gray-700 hover:bg-secondary hover:text-white hover:shadow-md'
                        : 'text-white hover:bg-white/20 hover:shadow-md'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Donate Button with proper color fix */}
              <Link
                to="/donation"
                className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-bold shadow-lg ${
                  location.pathname === '/donation'
                    ? 'bg-secondary text-white transform scale-105 shadow-xl'
                    : 'bg-secondary text-white hover:bg-secondary-600 hover:shadow-xl hover:transform hover:-translate-y-0.5'
                }`}
              >
                Donate Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className={`lg:hidden p-2 rounded-full transition-colors duration-300 ${
              isScrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/20 text-white'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation (visible on smaller screens) */}
          <div className="lg:hidden mt-4">
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    location.pathname === item.path
                      ? 'bg-secondary text-white shadow-md'
                      : isScrolled 
                        ? 'bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white'
                        : 'bg-white/20 text-white hover:bg-secondary hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/donation"
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  location.pathname === '/donation'
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-secondary text-white hover:bg-secondary-600'
                }`}
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with padding for fixed header */}
      <main className="">
        {children}
      </main>
    </div>
  );
};

export default Layout;