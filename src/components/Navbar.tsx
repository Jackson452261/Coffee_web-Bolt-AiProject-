import React from 'react';
import { Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // For scrolling to sections on the homepage
  const handleNav = (section: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation before scrolling
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/') }>
            <Coffee className="h-8 w-8 text-amber-700 mr-2" />
            <span className="text-xl font-bold text-gray-900">Artisan Brew</span>
          </div>
          <div className="hidden md:flex ml-10 space-x-8">
            {['首頁', '關於我們', '咖啡菜單', '文章分享', '聯絡我們'].map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item.toLowerCase())}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
