import React from 'react';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';

interface BlogDetailProps {
  postId: number;
  onBack: () => void;
}

const blogContent: { [key: number]: any } = {
  1: {
    title: "手沖咖啡的 指南",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Brewing",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: `
      <p>手沖咖啡已成為咖啡愛好者體驗咖啡豆全部風味的黃金標準。這種沖泡方法讓您可以完全掌控每個變量，從水溫到萃取時間。</p>
      
      <h3>所需物品:</h3>
      <ul>
        <li>手沖濾杯 (V60, Chemex, or Kalita Wave)</li>
        <li>濾紙</li>
        <li>細嘴壺  </li>
        <li>電子秤</li>
        <li>計時器</li>
        <li>新鮮研磨的咖啡豆</li>
      </ul>
      
      <h3>手沖步驟</h3>
      <p> 先將水加熱至 90-96°C (195-205°F)。在水加熱的同時，將濾紙放入濾杯中，並用熱水沖洗。</p>
      
      <p> 將咖啡粉研磨至中等偏細的程度，類似食鹽的粗細。使用 1:15 至 1:17 的咖啡粉與水的比例。例如，25 克咖啡粉配 375 克水</p>
      
      <h3>沖泡過程</h3>
      <p>將滴濾器放在電子秤上，加入咖啡粉，並在中心挖一個小凹槽。開始計時，先進行悶蒸階段－以畫圈的方式，從中心向外螺旋式地倒入兩倍於咖啡粉重量的水（例如，25 克咖啡粉配 50 克水）。</p>
      
      <p>等待 30-45 秒，讓咖啡粉充分悶蒸，然後繼續以緩慢、穩定的畫圈方式註水，保持水位穩定。.</p>
      
       
    `
  },
  2:{
  title: "從咖啡豆到咖啡杯：我們的職人工藝之旅",
  author: "Michael Chen",
  date: "2024 年 3 月 10 日",
  readTime: "閱讀時間約 7 分鐘",
  category: "咖啡產地",
  image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  content: `
    <p>每一杯咖啡，都承載著來自遙遠高地的故事。從咖啡樹生長的山坡，到你手中那杯溫潤香氣，我們在 Artisan Brew 堅信：透明、永續與尊重，是打造優質咖啡的核心。</p>
    
    <h3>我們的採豆理念</h3>
    <p>我們與全球咖啡農與合作社建立直接貿易關係，維持長期合作，使農民能獲得合理報酬，同時也讓我們取得品質卓越的咖啡豆。</p>
    
    <p>團隊每年多次前往原產地拜訪農園、進行杯測，並與農民一同研究更佳的處理方式與品質改善方法，確保每一批咖啡都精益求精。</p>
    
    <h3>咖啡的生長旅程</h3>
    <p>咖啡最適合生長於「咖啡帶」——北緯 25° 至南緯 30° 之間。我們合作的農園多位於高海拔地區，涼爽的氣候讓果實成熟得更慢，使豆子能形成更深層、更多層次的風味。</p>
    
    <p>從種植到採收，咖啡樹需 3 到 5 年的時間。咖啡樹先綻放茉莉香氣的白色花朵，再結成鮮紅的果實——也就是包覆著我們熟悉咖啡豆的咖啡櫻桃。</p>
    
    <h3>處理法與品質控管</h3>
    <p>採收後，咖啡櫻桃需經過處理，去除果肉以露出綠色生豆。我們與採用水洗與日曬處理法的農園合作，各自賦予咖啡獨特的風味特色。</p>
    
    <p>品質控管從產地便開始：透過嚴格的杯測流程，我們僅挑選在 SCA（精品咖啡協會）評分中達 84 分以上的咖啡進入選項。</p>
    
    <h3>烘焙的精準藝術</h3>
    <p>當生豆抵達烘焙室後，我們的烘豆師會為每一隻豆子量身打造專屬的烘焙曲線。採用小批量烘焙，不僅能凸顯各款咖啡獨有的風味，也確保你每次品嚐到的品質都同樣出色。</p>
    
    <p>從農園到你的咖啡杯，這段旅程代表了我們對品質、永續與人文價值的承諾，也是所有熱愛咖啡的人共同的故事。</p>
  `
},
  3: {
  title: "優質咖啡的 5 大健康益處",
  author: "Dr. Emily Rodriguez",
  date: "2024 年 3 月 5 日",
  readTime: "閱讀時間約 4 分鐘",
  category: "健康",
  image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  content: `
    <p>咖啡已流傳數百年，而現代研究更揭示出它所帶來的多種健康益處。在適量攝取的前提下，高品質咖啡不僅能提升日常表現，也能成為健康生活方式的一部分。</p>
    
    <h3>1. 富含抗氧化物</h3>
    <p>咖啡是西方飲食中最重要的抗氧化來源之一。這些抗氧化成分能協助保護細胞，減少自由基造成的損害，進而降低慢性疾病風險並維持整體健康。</p>
    
    <h3>2. 增強認知功能</h3>
    <p>咖啡中的咖啡因會阻斷腺苷（一種讓人感到疲倦的神經傳導物質），從而提升專注力、警覺性與認知表現。研究也指出，適量飲用咖啡可能有助減緩神經退化性疾病的發生風險。</p>
    
    <h3>3. 改善運動表現</h3>
    <p>咖啡因能刺激中樞神經系統、提升腎上腺素水平，讓身體為運動做好準備。同時，它也會促進脂肪分解，使脂肪酸能作為肌肉的能量來源，提高運動效率。</p>
    
    <h3>4. 保護肝臟健康</h3>
    <p>研究發現，經常飲用咖啡與降低多種肝臟疾病的風險相關，包括肝硬化與肝癌。咖啡中的保護性化合物有助維持良好的肝功能，並可能減緩肝病的惡化。</p>
    
    <h3>5. 有助心血管健康</h3>
    <p>與過去的觀念不同，適量飲用咖啡或許對心臟反而有益。研究顯示，每日飲用 3–4 杯咖啡可能降低心臟病與中風風險，這與咖啡的抗發炎特性有關。</p>
    
    <h3>為何選擇優質咖啡很重要</h3>
    <p>想要真正享受咖啡的健康功效，務必選用高品質、且新鮮烘焙的咖啡豆。同時避免過量添加糖與人工奶精，以免抵銷咖啡本身的益處。記得一切適量為原則——每日 3–4 杯即可。</p>
  `
},
  4: {
  title: "拉花大師課：打造迷人咖啡藝術",
  author: "James Wilson",
  date: "2024 年 2 月 28 日",
  readTime: "閱讀時間約 6 分鐘",
  category: "技法",
  image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  content: `
    <p>拉花，是將一杯普通的拿鐵轉化為藝術品的過程。這門技藝結合了精準技術與創意表達，使每一杯咖啡都成為專屬的美麗畫布。</p>
    
    <h3>基礎功：完美奶泡質地</h3>
    <p>出色的拉花始於細緻的奶泡。目標是製作「微泡」——細小、絲滑、能與牛奶完美融合的綿密氣泡。使用冰涼、新鮮的牛奶與乾淨的蒸汽棒，能大幅提升穩定性。</p>
    
    <p>蒸奶時，先讓蒸汽棒停在奶面下方，前幾秒進行打泡；接著將蒸汽棒深入牛奶中加熱並調整質地，目標溫度為 140–150°F（約 60–65°C）。</p>
    
    <h3>關鍵技巧</h3>
    <p>拉花的核心在於掌控「流速」與「高度」。開局時以高、慢的方式倒入，以穿透咖啡油脂（crema）；之後逐漸降低高度並提高流速，以便在表面作畫。</p>
    
    <h3>初學必練三大圖形</h3>
    <p><strong>心形：</strong> 從中心穩定倒入奶泡，最後快速往下拉出一道線，即可形成心形尖端。</p>
    
    <p><strong>玫瑰葉（Rosetta）：</strong> 持續穩定倒入，手腕左右小幅擺動，並慢慢往後退，即能呈現葉片紋理。</p>
    
    <p><strong>鬱金香（Tulip）：</strong> 以多個連續的「心形」堆疊，最後用一道直線收尾，完成立體層次感。</p>
    
    <h3>熟能生巧</h3>
    <p>拉花講究耐心與練習。從基礎圖形開始，先追求一致性，再挑戰複雜款式。記住：即使不是完美的拉花，也能為咖啡增添溫度與個性，顧客往往會感受到你的用心。</p>
    
    <p>最重要的是：拉花美不美，其實比不上咖啡本身的品質。若底層的濃縮與奶泡不理想，即使花樣漂亮也難以令人滿意；反之，紮實的咖啡與簡單的圖形，一樣能帶來極佳的飲用體驗。</p>
  `
}
,
  5: {
  title: "季節限定咖啡混豆：為何如此特別？",
  author: "Lisa Thompson",
  date: "2024 年 2 月 20 日",
  readTime: "閱讀時間約 5 分鐘",
  category: "混豆",
  image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  content: `
    <p>季節限定咖啡混豆，是一年四季風味變化最迷人的體現。這些限量版本不僅捕捉每個季節的靈魂，也展現了烘豆師的創意與技藝。</p>
    
    <h3>季節調配的藝術</h3>
    <p>打造季節混豆，是一門精準掌握風味的藝術。春季的配方傾向明亮、花香調；冬季則更重視溫暖濃郁的香料與巧克力風味。</p>
    
    <p>烘豆師通常會提前數個月開始研發，不斷嘗試不同的產區組合與烘焙程度，力求為每個季節找到最和諧、最具代表性的風味平衡。</p>
    
    <h3>春季：清新與新生</h3>
    <p>春季混豆象徵新生，風味輕盈、明亮。我們常選用中美洲咖啡，以其清爽酸質與花香調為主體，再加入少許非洲豆提升層次感。</p>
    
    <h3>夏季：輕盈與清爽</h3>
    <p>夏季咖啡講究冰飲也好喝。我們的夏季混豆多選用能在冷萃或冰咖啡中依舊保持鮮明特色的豆子，風味以果香、乾淨尾韻為重點。</p>
    
    <h3>秋季：溫暖與療癒</h3>
    <p>氣溫轉涼時，秋季混豆便以溫暖香料與堅果調為主角。常見選用印尼與巴西豆，呈現醇厚飽滿的口感，尤其適合舒適的早晨時光。</p>
    
    <h3>冬季：濃郁與沉靜</h3>
    <p>冬季混豆通常是最具 indulgence 的風味組合，擁有深層巧克力、暖心香料與更深焙的基調，為寒冬帶來最紮實的慰藉。</p>
    
    <h3>限量的珍貴</h3>
    <p>季節混豆之所以特別，部分原因在於它們的限量特性。我們依照當季可取得的最佳生豆小批量製作，確保新鮮度與獨特性，讓每位咖啡愛好者都能享受這份專屬的風味體驗。</p>
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
            回到首頁
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
              回到首頁
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
                {post.author} 是一位咖啡專家和充滿熱情的作家 。
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}