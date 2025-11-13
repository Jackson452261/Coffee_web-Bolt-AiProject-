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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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

                {['Home', 'About', 'Menu', 'Blog', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
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
            Crafted with
            <span className="block text-amber-400">Passion</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Experience the finest artisan coffee, carefully roasted and brewed to perfection in the heart of the city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('menu')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Visit Us
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2015, Artisan Brew began as a passion project between two coffee enthusiasts 
                who believed that exceptional coffee could bring communities together. We source our beans 
                directly from sustainable farms around the world, ensuring every cup tells a story of 
                quality and care.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our expert roasters use traditional techniques combined with modern precision to create 
                unique flavor profiles that celebrate the origin and character of each bean.
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Signature Menu</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of artisan coffees, each with its own unique character and story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "latte",
                description: "Bright and floral with notes of citrus and jasmine",
                price: "$18",
                image: "https://plus.unsplash.com/premium_photo-1674327105280-b86494dfc690?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGF0dGV8ZW58MHx8MHx8fDA%3D"
              },
             
              
              {
                name: "Guatemala Antigua",
                description: "Full-bodied with smoky and spicy notes",
                price: "$17",
                image: "https://images.pexels.com/photos/1238141/pexels-photo-1238141.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                name: "Blue Mountain Jamaica",
                description: "Mild and sweet with exceptional clarity",
                price: "$32",
                image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                name: "House Blend",
                description: "Our signature blend of three premium origins",
                price: "$14",
                image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800"
              }
            ].map((coffee, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={coffee.image}
                    alt={coffee.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                    <span className="text-amber-700 font-bold">{coffee.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{coffee.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{coffee.description}</p>
                  <button
                    className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                    onClick={() => navigate(`/product/${index + 1}`)}
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
      <Blog onPostClick={handleBlogPostClick} />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Visit Our Café</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the warmth of our café and taste the difference that passion makes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <img
                  src="https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Coffee shop interior"
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Location</h3>
                    <p className="text-gray-300">123 Coffee Street<br />Downtown District, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 6:00 AM - 8:00 PM<br />
                      Saturday - Sunday: 7:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Contact</h3>
                    <p className="text-gray-300">
                      Phone: (555) 123-4567<br />
                      Email: hello@artisanbrew.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">聯絡我們</h3>
                {/*   <form 
                ref={contactFormRef}
                className="space-y-6"
                onSubmit={handleContactSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Your Name"
                    required
                    className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <input
                    type="text"
                    name="to_name"
                    placeholder="Recipient Name"
                    required
                    className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email Address"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-amber-400 transition-colors"
                />
                <input
                  type="text"
                  name="from_phone"
                  placeholder="Your Phone Number"
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-amber-400 transition-colors"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-amber-400 transition-colors resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  disabled={contactSending}
                >
                  {contactSending ? 'Sending...' : 'Send Message'}
                </button>
                {contactResult && (
                  <div className={`text-center text-sm mt-2 ${contactResult.success ? 'text-green-500' : 'text-red-500'}`}>{contactResult.message}</div>
                )}
              </form> 
               */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
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