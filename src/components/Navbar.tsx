import React from 'react';
import { Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [showAuthDropdown, setShowAuthDropdown] = React.useState(false);

  // Map Chinese navigation items to English section IDs
  const getSectionId = (item: string): string => {
    const mapping: { [key: string]: string } = {
      '首頁': 'home',
      '關於我們': 'about',
      '咖啡菜單': 'menu',
      '文章分享': 'blog',
      '聯絡我們': 'contact'
    };
    return mapping[item] || item.toLowerCase();
  };

  // For scrolling to sections on the homepage
  const handleNav = (item: string) => {
    const sectionId = getSectionId(item);
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation before scrolling
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
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
          <div className="hidden md:flex ml-10 space-x-8 items-center">
            {['首頁', '關於我們', '咖啡菜單', '文章分享', '聯絡我們'].map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors duration-200"
              >
                {item}
              </button>
            ))}

            {/* Clerk Auth Buttons */}
            <div className="relative flex items-center">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <>
                  <button
                    onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                    className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center gap-1"
                  >
                    登入
                    <svg className={`w-4 h-4 transition-transform duration-200 ${showAuthDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showAuthDropdown && (
                    <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                      <SignInButton mode="modal">
                        <button
                          onClick={() => setShowAuthDropdown(false)}
                          className="w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 text-left"
                        >
                          登入
                        </button>
                      </SignInButton>
                      <div className="border-t border-gray-100" />
                      <SignUpButton mode="modal">
                        <button
                          onClick={() => setShowAuthDropdown(false)}
                          className="w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 text-left"
                        >
                          註冊
                        </button>
                      </SignUpButton>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
