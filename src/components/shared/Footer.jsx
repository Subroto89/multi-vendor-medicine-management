import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
        {/* Company Info / Logo */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-bold text-white mb-4">MediMart Store</h3>
          <p className="text-sm leading-relaxed">
            Your trusted partner for all your pharmaceutical needs. Providing quality medicines with care.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Facebook">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              {/* Use Link from react-router-dom if navigating internally */}
              <a href="/" className="text-sm hover:text-white transition-colors duration-200">Home</a>
            </li>
            <li>
              <a href="/categories" className="text-sm hover:text-white transition-colors duration-200">Categories</a>
            </li>
            <li>
              <a href="/discounted-products" className="text-sm hover:text-white transition-colors duration-200">Discounts</a>
            </li>
            <li>
              <a href="/about" className="text-sm hover:text-white transition-colors duration-200">About Us</a>
            </li>
            <li>
              <a href="/contact" className="text-sm hover:text-white transition-colors duration-200">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:text-white transition-colors duration-200">Online Pharmacy</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-white transition-colors duration-200">Prescription Refills</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-white transition-colors duration-200">Health Consultations</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-white transition-colors duration-200">Delivery Services</a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-white transition-colors duration-200">Wholesale Orders</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2">📍</span>
              <span className="text-sm">123 Health Ave, Wellness City, 12345</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📞</span>
              <span className="text-sm">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📧</span>
              <span className="text-sm">info@medistore.com</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">⏰</span>
              <span className="text-sm">Mon - Fri: 9 AM - 6 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MediStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
