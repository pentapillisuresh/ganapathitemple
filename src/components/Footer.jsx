import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaHeart
} from 'react-icons/fa';
import { Phone, Mail, MapPin, Clock, ChevronRight, Code } from 'lucide-react';

const Footer = () => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/activities', label: 'Activities' },
    { path: '/banquetHalls', label: 'Banquet Halls' },
    { path: '/ganapathis32', label: '32 Ganapathis' },
    { path: '/idols', label: 'Sacred Idols' },
    { path: '/donation', label: 'Donations' },
    { path: '/blog', label: 'Blog' },
  ];

  const quickLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/sitemap', label: 'Sitemap' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaYoutube />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-primary border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Temple Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ganapathi Temple</h3>
            <p className="text-gray-600 text-sm mb-4">
              A sacred space for worship, rituals, and spiritual growth. Experience divine blessings through authentic Vedic ceremonies.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-secondary text-sm transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 text-secondary/60 group-hover:text-secondary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Temple Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span>info@ganapathitemple.com</span>
              </li>
            </ul>
          </div>

          {/* Temple Timings */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Temple Timings</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Morning Darshan</p>
                  <p>6:00 AM - 12:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Evening Darshan</p>
                  <p>4:00 PM - 9:00 PM</p>
                </div>
              </li>
              <li className="mt-3 pt-3 border-t border-gray-200">
                <p className="font-medium text-gray-900">Special Days:</p>
                <p className="text-xs">Extended hours on festivals</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Stay Updated</h4>
              <p className="text-gray-600 text-sm">
                Subscribe to receive spiritual insights and temple updates
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
                <button className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-[#C2410C] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <div className="mb-4 md:mb-0">
              <p className="flex items-center flex-wrap gap-2">
                <span>
                  © {new Date().getFullYear()} Ganapathi Temple. All rights reserved.
                </span>
                <span className="text-gray-400">|</span>
                <span className="flex items-center gap-1">
                  {/* <Code className="w-3 h-3 text-secondary" /> */}
                  Developed by 
                 <a
  href="https://esotericprojects.tech"
  target="_blank"
  rel="noopener noreferrer"
  className="font-semibold text-secondary ml-1 cursor-pointer"
>
  esotericprojects.tech
</a>

                </span>
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Registered as a Charitable Trust under the Societies Registration Act, 1860
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {quickLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;