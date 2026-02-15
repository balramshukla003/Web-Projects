import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About TechMart</h3>
            <p className="text-sm mb-4">
              Your one-stop shop for mobile accessories and electronics. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary-400"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary-400"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary-400"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary-400">Products</Link></li>
              <li><Link to="/cart" className="hover:text-primary-400">Cart</Link></li>
              <li><Link to="/orders" className="hover:text-primary-400">Orders</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary-400">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary-400">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-primary-400">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Tech Street, Digital City, CA 90210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>support@techmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 TechMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
