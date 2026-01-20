import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Menu as MenuIcon, 
  X,
  Instagram,
  Facebook,
  Twitter,
  Search
} from 'lucide-react';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import ProductDetail from './components/ProductDetail';
import Review from './components/Review';
import Footer from './components/Footer';

function BlogDetailWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <BlogDetail 
      postId={parseInt(id || '1')} 
      onBack={() => navigate('/')} 
    />
  );
}

import emailjs from 'emailjs-com';

function HomePage() {
  const contactFormRef = useRef<HTMLFormElement>(null);
  const [contactSending, setContactSending] = useState(false);
  const [contactResult, setContactResult] = useState<{success: boolean, message: string} | null>(null);

  // Use EmailJS values from environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
  
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSending(true);
    setContactResult(null);
    if (!contactFormRef.current) return;
    console.log({
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      EMAILJS_USER_ID
    });
    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      contactFormRef.current,
      EMAILJS_USER_ID
    )
    .then(() => {
      setContactSending(false);
      setContactResult({success: true, message: 'Message sent successfully!'});
      contactFormRef.current?.reset();
    })
    .catch(() => {
      setContactSending(false)
      setContactResult({success: false, message: 'Failed to send message. Please try again.'});
      console.log('EmailJS error:', error);
    });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const footer = document.getElementById('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (footerTop < windowHeight * 0.8) {
          setFooterVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToSection = (item: string) => {
    const sectionId = getSectionId(item);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleBlogPostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  // Menu items for search
  const menuItems = [
    { id: 1, name: "Ethiopia Yirgacheffe", type: "menu", description: "Bright and floral with notes of citrus and jasmine", price: "$18" },
    { id: 2, name: "Colombian Supremo", type: "menu", description: "Rich and balanced with chocolate and caramel undertones", price: "$16" },
    { id: 3, name: "Hawaiian Kona", type: "menu", description: "Smooth and mellow with a hint of nuttiness", price: "$24" },
    { id: 4, name: "Guatemala Antigua", type: "menu", description: "Full-bodied with smoky and spicy notes", price: "$17" },
    { id: 5, name: "Blue Mountain Jamaica", type: "menu", description: "Mild and sweet with exceptional clarity", price: "$32" },
    { id: 6, name: "House Blend", type: "menu", description: "Our signature blend of three premium origins", price: "$14" }
  ];

  // Blog posts for search
  const blogPosts = [
    { id: 1, name: "The Art of Pour-Over Coffee: A Complete Guide", type: "blog", description: "Discover the secrets behind the perfect pour-over coffee" },
    { id: 2, name: "From Bean to Cup: Our Coffee Journey", type: "blog", description: "Follow the incredible journey of our coffee beans" },
    { id: 3, name: "5 Health Benefits of Drinking Quality Coffee", type: "blog", description: "Explore the surprising health benefits of drinking high-quality coffee" },
    { id: 4, name: "Latte Art Masterclass: Creating Beautiful Designs", type: "blog", description: "Master the art of latte design with our step-by-step guide" },
    { id: 5, name: "Seasonal Coffee Blends: What Makes Them Special", type: "blog", description: "Discover why seasonal coffee blends offer unique flavors" },
    { id: 6, name: "Coffee Cupping: How to Taste Like a Professional", type: "blog", description: "Learn the professional technique of coffee cupping" }
  ];

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const allItems = [...menuItems, ...blogPosts];
    const filtered = allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowSearchResults(true);
  }, [searchQuery]);

  const handleSearchResultClick = (item: any) => {
    if (item.type === 'blog') {
      navigate(`/blog/${item.id}`);
    } else {
      scrollToSection('menu');
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowSearchResults(false), 200);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Coffee className={`h-8 w-8 ${scrolled ? 'text-amber-700' : 'text-white'} mr-2`} />
              <span className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Artisan Brew
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* Search Input */}
                <div className="relative">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      scrolled ? 'text-gray-400' : 'text-white/70'
                    }`} />
                    <input
                      type="text"
                      placeholder="Search menu or blog..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery && setShowSearchResults(true)}
                      onBlur={handleSearchBlur}
                      className={`pl-10 pr-4 py-2 w-64 rounded-lg text-sm transition-all duration-200 ${
                        scrolled 
                          ? 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500' 
                          : 'bg-white/10 border border-white/20 text-white placeholder-white/70 focus:bg-white/20 focus:border-white/40'
                      } focus:outline-none`}
                    />
                  </div>
                  
                  {/* Search Results Dropdown */}
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                      {searchResults.map((item, index) => (
                        <div
                          key={`${item.type}-${item.id}`}
                          onClick={() => handleSearchResultClick(item)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  item.type === 'blog' 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {item.type === 'blog' ? 'Blog' : 'Menu'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                            </div>
                            {item.price && (
                              <span className="text-sm font-semibold text-amber-600 ml-2">{item.price}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* No Results */}
                  {showSearchResults && searchQuery && searchResults.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                      <p className="text-sm text-gray-500 text-center">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>

                {['首頁', '關於我們', '咖啡菜單', '文章分享', '聯絡我們'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-amber-700' 
                        : 'text-white hover:text-amber-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search menu or blog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    onBlur={handleSearchBlur}
                    className="pl-10 pr-4 py-2 w-full rounded-lg text-sm bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                
                {/* Mobile Search Results */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                    {searchResults.map((item, index) => (
                      <div
                        key={`mobile-${item.type}-${item.id}`}
                        onClick={() => handleSearchResultClick(item)}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">{item.name}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.type === 'blog' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                {item.type === 'blog' ? 'Blog' : 'Menu'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-1">{item.description}</p>
                          </div>
                          {item.price && (
                            <span className="text-sm font-semibold text-amber-600 ml-2">{item.price}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {['Home', 'About', 'Menu', 'Blog', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-700 w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
       <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
    咖啡拿鐵
    <span className="block text-amber-400"> </span>
  </h1>
  <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
    於城市中心，品嚐精心烘焙、手工打造的極致精品咖啡。
  </p>
  <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button 
              onClick={() => scrollToSection('menu')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              探索菜單
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
             聯絡我們
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">開店</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Artisan Brew 創立於 2015 年，最初是兩位咖啡愛好者出於熱愛而創立的項目，

他們相信，優質的咖啡能夠將人們凝聚在一起。我們直接從世界各地的永續農場採購咖啡豆，

確保每一杯咖啡都講述著品質與用心的故事。
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
               我們的專業烘焙師運用傳統技藝結合現代精準技術，打造出獨特的風味，充分展現每種咖啡豆的產地與特性。
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">8+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">15</div>
                  <div className="text-sm text-gray-600">Coffee Origins</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">5K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Coffee roasting process"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <p className="text-sm text-gray-600 mt-1">Rated 5/5 by customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">我們的 菜單</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             探索我們精心挑選的精品咖啡，每一款都有其獨特的個性和故事。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "拿鐵",
                description: "明亮芬芳，帶有柑橘和茉莉的香氣",
                price: "$18",
                image: "https://plus.unsplash.com/premium_photo-1674327105280-b86494dfc690?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGF0dGV8ZW58MHx8MHx8fDA%3D"
              },
              {
                id: 2,
                name: "卡布奇諾",
                description: "濃郁的義式濃縮咖啡配上綿密奶泡",
                price: "$16",
                image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
             
              {
                id: 4,
                name: "摩卡咖啡",
                description: "巧克力與濃縮咖啡的完美結合",
                price: "$19",
                image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
             
              {
                id: 6,
                name: "冰釀咖啡",
                description: "冷萃12小時，口感順滑清爽",
                price: "$15",
                image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                id: 7,
                name: "牙買加藍山",
                description: "口感柔和甜美，清澈度極佳。",
                price: "$32",
                image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                id: 8,
                name: "招牌混合",
                description: "我們獨家調配的三種優質原料",
                price: "$14",
                image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                id: 9,
                name: "濃縮咖啡",
                description: "經典義式濃縮，濃郁香醇",
                price: "$10",
                image: "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
             
              {
                id: 11,
                name: "抹茶拿鐵",
                description: "日式抹茶與牛奶的完美融合",
                price: "$18",
                image: "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                id: 12,
                name: "維也納咖啡",
                description: "頂部覆蓋鮮奶油的經典咖啡",
                price: "$19",
                image: "https://images.pexels.com/photos/1120575/pexels-photo-1120575.jpeg?auto=compress&cs=tinysrgb&w=800"
              }
            ].map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                    <span className="text-amber-700 font-bold">{product.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  <button
                    className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog">
        <Blog onPostClick={handleBlogPostClick} />
      </section>

      {/* Review Section */}
      <Review />

      {/* Contact Section */}
      

      {/* Footer */}
      <Footer footerVisible={footerVisible} scrollToSection={scrollToSection} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetailWrapper />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;