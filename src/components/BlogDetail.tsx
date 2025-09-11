import React from 'react';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, MessageCircle } from 'lucide-react';

interface BlogDetailProps {
  postId: number;
  onBack: () => void;
}

const blogContent: { [key: number]: any } = {
  1: {
    title: "The Art of Pour-Over Coffee: A Complete Guide",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Brewing",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: `
      <p>Pour-over coffee has become the gold standard for coffee enthusiasts who want to experience the full flavor potential of their beans. This brewing method gives you complete control over every variable, from water temperature to extraction time.</p>
      
      <h3>What You'll Need</h3>
      <ul>
        <li>Pour-over dripper (V60, Chemex, or Kalita Wave)</li>
        <li>Paper filters</li>
        <li>Gooseneck kettle</li>
        <li>Digital scale</li>
        <li>Timer</li>
        <li>Freshly ground coffee beans</li>
      </ul>
      
      <h3>The Perfect Pour-Over Technique</h3>
      <p>Start by heating your water to 195-205°F (90-96°C). While the water heats, place a filter in your dripper and rinse it with hot water. This removes any papery taste and preheats your brewing vessel.</p>
      
      <p>Grind your coffee to a medium-fine consistency, similar to table salt. Use a ratio of 1:15 to 1:17 (coffee to water). For example, 25g of coffee to 375g of water.</p>
      
      <h3>The Brewing Process</h3>
      <p>Place your dripper on the scale, add the ground coffee, and create a small well in the center. Start your timer and begin with the bloom phase - pour twice the weight of water as coffee (50g water for 25g coffee) in a circular motion, starting from the center and spiraling outward.</p>
      
      <p>Wait 30-45 seconds for the coffee to bloom, then continue pouring in slow, steady circles, keeping the water level consistent. Complete your pour by 2:30-3:00 minutes.</p>
      
      <h3>Pro Tips for Perfect Pour-Over</h3>
      <p>Consistency is key. Practice your pouring technique and keep detailed notes about grind size, water temperature, and timing. Small adjustments can make a significant difference in your final cup.</p>
      
      <p>Remember, the best pour-over coffee starts with quality beans. Choose freshly roasted, single-origin beans to truly appreciate the nuances this brewing method can reveal.</p>
    `
  },
  2: {
    title: "From Bean to Cup: Our Coffee Journey",
    author: "Michael Chen",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Origin",
    image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: `
      <p>Every cup of coffee tells a story that begins thousands of miles away in the highlands of coffee-growing regions around the world. At Artisan Brew, we believe in transparency and sustainability throughout our entire supply chain.</p>
      
      <h3>Our Sourcing Philosophy</h3>
      <p>We work directly with coffee farmers and cooperatives, building long-term relationships that benefit both the growers and our customers. This direct trade approach ensures fair compensation for farmers while giving us access to the highest quality beans.</p>
      
      <p>Our sourcing team travels to origin countries multiple times per year, visiting farms, cupping coffees, and working with farmers to improve processing methods and quality standards.</p>
      
      <h3>The Growing Process</h3>
      <p>Coffee grows best in the "coffee belt" - the area between 25°N and 30°S latitude. Our partner farms are located at high altitudes where cooler temperatures slow the maturation process, allowing beans to develop complex flavors.</p>
      
      <p>The journey from seed to harvest takes 3-5 years. Coffee plants produce white, jasmine-scented flowers that develop into cherries containing the coffee beans we know and love.</p>
      
      <h3>Processing and Quality Control</h3>
      <p>After harvest, coffee cherries undergo processing to remove the fruit and reveal the green coffee beans inside. We work with farms that use both washed and natural processing methods, each contributing unique flavor characteristics.</p>
      
      <p>Our quality control process begins at origin with rigorous cupping sessions. Only coffees that score 84+ points on the Specialty Coffee Association scale make it into our selection.</p>
      
      <h3>Roasting Excellence</h3>
      <p>Once the green beans arrive at our roastery, our master roasters develop custom roast profiles for each coffee. We use small-batch roasting techniques that highlight each coffee's unique characteristics while ensuring consistency across every bag.</p>
      
      <p>From farm to cup, this journey represents our commitment to quality, sustainability, and the incredible people who make exceptional coffee possible.</p>
    `
  },
  3: {
    title: "5 Health Benefits of Drinking Quality Coffee",
    author: "Dr. Emily Rodriguez",
    date: "March 5, 2024",
    readTime: "4 min read",
    category: "Health",
    image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: `
      <p>Coffee has been enjoyed for centuries, and modern research continues to reveal the numerous health benefits of this beloved beverage. When consumed in moderation, high-quality coffee can be a valuable addition to a healthy lifestyle.</p>
      
      <h3>1. Rich in Antioxidants</h3>
      <p>Coffee is one of the largest sources of antioxidants in the Western diet. These powerful compounds help protect your cells from damage caused by free radicals, potentially reducing the risk of chronic diseases and supporting overall health.</p>
      
      <h3>2. Enhanced Cognitive Function</h3>
      <p>The caffeine in coffee blocks adenosine, a neurotransmitter that makes you feel tired. This leads to improved focus, alertness, and cognitive performance. Studies show that moderate coffee consumption may also help protect against neurodegenerative diseases.</p>
      
      <h3>3. Improved Physical Performance</h3>
      <p>Caffeine stimulates the nervous system and increases adrenaline levels, preparing your body for physical exertion. It also helps break down body fat, making fatty acids available as fuel for your muscles.</p>
      
      <h3>4. Liver Protection</h3>
      <p>Regular coffee consumption has been linked to a reduced risk of liver diseases, including cirrhosis and liver cancer. The protective compounds in coffee help maintain healthy liver function and may slow the progression of liver disease.</p>
      
      <h3>5. Heart Health Benefits</h3>
      <p>Contrary to old beliefs, moderate coffee consumption may actually support heart health. Studies suggest that drinking 3-4 cups per day may reduce the risk of heart disease and stroke, thanks to coffee's anti-inflammatory properties.</p>
      
      <h3>Quality Matters</h3>
      <p>To maximize these health benefits, choose high-quality, freshly roasted coffee beans. Avoid adding excessive sugar or artificial creamers, which can negate coffee's positive effects. Remember, moderation is key - aim for 3-4 cups per day maximum.</p>
    `
  },
  4: {
    title: "Latte Art Masterclass: Creating Beautiful Designs",
    author: "James Wilson",
    date: "February 28, 2024",
    readTime: "6 min read",
    category: "Technique",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: `
      <p>Latte art transforms a simple coffee drink into a work of art. This skill combines technical precision with creative expression, turning every cup into a canvas for beautiful designs.</p>
      
      <h3>The Foundation: Perfect Milk Texture</h3>
      <p>Great latte art starts with properly steamed milk. The goal is to create microfoam - tiny, velvety bubbles that integrate seamlessly with the milk. Use cold, fresh milk and a clean steam wand for best results.</p>
      
      <p>Start steaming with the wand just below the surface, creating foam for the first few seconds. Then plunge the wand deeper to heat and texture the milk, aiming for a final temperature of 140-150°F.</p>
      
      <h3>Essential Techniques</h3>
      <p>The key to latte art is controlling the flow rate and height of your pour. Start high and slow to penetrate the crema, then bring your pitcher closer to the surface as you increase flow rate.</p>
      
      <h3>Basic Patterns to Master</h3>
      <p><strong>The Heart:</strong> Pour steadily into the center, then quickly draw through with a swift motion to create the heart's point.</p>
      
      <p><strong>The Rosetta (Leaf):</strong> Start with a steady pour, then wiggle the pitcher side to side while slowly drawing back to create the leaf pattern.</p>
      
      <p><strong>The Tulip:</strong> Create multiple hearts stacked on top of each other, finishing with a line drawn through the center.</p>
      
      <h3>Practice Makes Perfect</h3>
      <p>Latte art requires patience and practice. Start with basic patterns and focus on consistency before attempting complex designs. Remember, even imperfect latte art adds a personal touch that customers appreciate.</p>
      
      <p>The most important element is the quality of your espresso and milk. Beautiful art on a poorly made latte won't impress anyone, but a well-crafted drink with simple art will always satisfy.</p>
    `
  },
  5: {
    title: "Seasonal Coffee Blends: What Makes Them Special",
    author: "Lisa Thompson",
    date: "February 20, 2024",
    readTime: "5 min read",
    category: "Blends",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: `
      <p>Seasonal coffee blends offer a unique way to experience the changing flavors throughout the year. These limited-edition creations capture the essence of each season while showcasing the creativity of our master roasters.</p>
      
      <h3>The Art of Seasonal Blending</h3>
      <p>Creating seasonal blends requires careful consideration of flavor profiles that complement the time of year. Spring blends might feature bright, floral notes, while winter blends often emphasize rich, warming spices and chocolate undertones.</p>
      
      <p>Our roasters work months in advance, experimenting with different combinations and roast levels to achieve the perfect balance for each season.</p>
      
      <h3>Spring: Renewal and Brightness</h3>
      <p>Spring blends celebrate renewal with light, bright flavors. We often incorporate Central American coffees with their clean acidity and floral notes, sometimes adding a touch of African coffee for complexity.</p>
      
      <h3>Summer: Light and Refreshing</h3>
      <p>Summer calls for coffees that shine when served cold. Our summer blends feature beans that maintain their character when iced, with emphasis on fruit-forward flavors and clean finishes.</p>
      
      <h3>Fall: Warm and Comforting</h3>
      <p>As temperatures drop, our fall blends embrace warming spices and nutty undertones. These blends often feature beans from Indonesia and Brazil, creating rich, full-bodied cups perfect for cozy mornings.</p>
      
      <h3>Winter: Rich and Indulgent</h3>
      <p>Winter blends are our most indulgent, featuring deep chocolate notes and warming spices. These blends are designed to provide comfort during the coldest months, often incorporating our darkest roasted beans.</p>
      
      <h3>Limited Availability</h3>
      <p>The limited nature of seasonal blends makes them special. We produce small batches using the finest beans available during each season, ensuring freshness and exclusivity for our customers.</p>
    `
  },
  6: {
    title: "Coffee Cupping: How to Taste Like a Professional",
    author: "Robert Martinez",
    date: "February 15, 2024",
    readTime: "8 min read",
    category: "Tasting",
    image: "https://images.pexels.com/photos/1776653/pexels-photo-1776653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: `
      <p>Coffee cupping is the professional method for evaluating coffee quality and flavor characteristics. This standardized tasting technique allows coffee professionals to assess beans objectively and identify unique flavor notes.</p>
      
      <h3>What is Coffee Cupping?</h3>
      <p>Cupping involves brewing coffee in a specific way and tasting it systematically to evaluate aroma, flavor, acidity, body, and overall quality. This method eliminates variables introduced by different brewing methods, allowing for consistent evaluation.</p>
      
      <h3>Setting Up Your Cupping</h3>
      <p>You'll need freshly roasted coffee beans, a grinder, cupping bowls or wide-mouth cups, hot water (200°F), cupping spoons, and a timer. Use a coffee-to-water ratio of 1:18 (about 8.25g coffee to 150ml water).</p>
      
      <h3>The Cupping Process</h3>
      <p><strong>Step 1: Dry Fragrance</strong> - Grind the coffee and immediately smell the dry grounds. Note any aromas you detect.</p>
      
      <p><strong>Step 2: Wet Aroma</strong> - Pour hot water over the grounds and let steep for 4 minutes. Break the crust that forms on top and inhale the released aromas.</p>
      
      <p><strong>Step 3: Tasting</strong> - After 8-10 minutes, use a cupping spoon to taste the coffee. Slurp loudly to aerate the coffee and spread it across your palate.</p>
      
      <h3>What to Look For</h3>
      <p><strong>Aroma:</strong> Both dry and wet aromas provide clues about the coffee's character and quality.</p>
      
      <p><strong>Flavor:</strong> The overall taste impression, including sweetness, acidity, and any specific flavor notes.</p>
      
      <p><strong>Acidity:</strong> The bright, tangy quality that adds liveliness to coffee.</p>
      
      <p><strong>Body:</strong> The weight and texture of the coffee in your mouth.</p>
      
      <p><strong>Balance:</strong> How well all elements work together harmoniously.</p>
      
      <h3>Developing Your Palate</h3>
      <p>Like wine tasting, coffee cupping requires practice to develop your palate. Start by cupping different single-origin coffees to understand how origin affects flavor. Keep detailed notes and cup regularly to improve your skills.</p>
      
      <p>Remember, there are no wrong answers in cupping - everyone's palate is different. The goal is to develop your ability to identify and articulate what you taste.</p>
    `
  }
};

export default function BlogDetail({ postId, onBack }: BlogDetailProps) {
  const post = blogContent[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
          <button
            onClick={onBack}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-8 left-8">
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
              <Heart className="h-5 w-5" />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </button>
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author}</h3>
              <p className="text-gray-600 leading-relaxed">
                {post.author} is a coffee expert and passionate writer who brings years of experience 
                in the coffee industry to every article. Their expertise helps coffee lovers discover 
                new techniques and deepen their appreciation for this beloved beverage.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}