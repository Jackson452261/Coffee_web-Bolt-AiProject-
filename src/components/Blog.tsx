import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

interface BlogProps {
  onPostClick: (id: number) => void;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Pour-Over Coffee: A Complete Guide",
    excerpt: "Discover the secrets behind the perfect pour-over coffee. From water temperature to pouring technique, learn how to brew like a professional barista.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Brewing",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "From Bean to Cup: Our Coffee Journey",
    excerpt: "Follow the incredible journey of our coffee beans from sustainable farms around the world to your morning cup. Learn about our sourcing process.",
    author: "Michael Chen",
    date: "March 10, 2024",
    image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Origin",
    readTime: "7 min read"
  },
   
  {
    id: 3,
    title: "Latte Art Masterclass: Creating Beautiful Designs",
    excerpt: "Master the art of latte design with our step-by-step guide. Learn the techniques used by professional baristas to create stunning coffee art.",
    author: "James Wilson",
    date: "February 28, 2024",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Technique",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Seasonal Coffee Blends: What Makes Them Special",
    excerpt: "Discover why seasonal coffee blends offer unique flavors and how our roasters create limited-edition blends that capture the essence of each season.",
    author: "Lisa Thompson",
    date: "February 20, 2024",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Blends",
    readTime: "5 min read"
  },
   
];

export default function Blog({ onPostClick }: BlogProps) {
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Coffee Stories & Insights</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive deep into the world of coffee with our expert insights, brewing guides, and stories from the coffee community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => onPostClick(post.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm text-gray-700">
                  {post.readTime}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700 transition-colors duration-200">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}