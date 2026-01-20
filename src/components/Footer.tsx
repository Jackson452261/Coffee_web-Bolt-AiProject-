import React from 'react';
import { Coffee, Instagram, Facebook, Twitter, MapPin, Phone, Clock } from 'lucide-react';

interface FooterProps {
  footerVisible: boolean;
  scrollToSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ footerVisible, scrollToSection }) => (
  <footer id="footer" className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-16 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left side - Animated Shop Photo */}
        <div className={`transition-all duration-1000 ease-out ${
          footerVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Coffee shop interior"
              className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold text-white mb-2">Visit Our Café</h3>
              <p className="text-gray-200">Experience the warmth and aroma of freshly brewed coffee</p>
            </div>
          </div>
        </div>

        {/* Right side - Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <Coffee className="h-8 w-8 text-amber-400 mr-2 animate-pulse" />
              <span className="text-2xl font-bold">Artisan Brew</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              精心烘焙，手工打造的極致精品咖啡。每一杯都是藝術品。
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer transition-all duration-300 hover:scale-125" />
              <Facebook className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer transition-all duration-300 hover:scale-125" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer transition-all duration-300 hover:scale-125" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-amber-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('首頁')} className="text-gray-400 hover:text-white transition-colors duration-200">首頁</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('關於我們')} className="text-gray-400 hover:text-white transition-colors duration-200">關於我們</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('咖啡菜單')} className="text-gray-400 hover:text-white transition-colors duration-200">咖啡菜單</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('文章分享')} className="text-gray-400 hover:text-white transition-colors duration-200">文章分享</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('聯絡我們')} className="text-gray-400 hover:text-white transition-colors duration-200">聯絡我們</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-800">
        <div className="flex items-center justify-center md:justify-start">
          <MapPin className="h-5 w-5 text-amber-400 mr-3" />
          <span className="text-gray-400">123 Coffee Street, NY 10001</span>
        </div>
        <div className="flex items-center justify-center">
          <Phone className="h-5 w-5 text-amber-400 mr-3" />
          <span className="text-gray-400">(555) 123-4567</span>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Clock className="h-5 w-5 text-amber-400 mr-3" />
          <span className="text-gray-400">Mon-Fri: 6AM - 8PM</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center">
        <p className="text-gray-500">
          &copy; 2026 Crafted with <span className="text-amber-400">♥</span> for coffee lovers.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
