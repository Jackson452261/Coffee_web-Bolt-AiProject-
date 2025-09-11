import React from 'react';
import { Coffee, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-black text-white py-12 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Coffee className="h-8 w-8 text-amber-400 mr-2" />
          <span className="text-xl font-bold">Artisan Brew</span>
        </div>
        <div className="flex space-x-6">
          <Instagram className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" />
          <Facebook className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" />
          <Twitter className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" />
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Artisan Brew. All rights reserved. Crafted with passion for coffee lovers.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
