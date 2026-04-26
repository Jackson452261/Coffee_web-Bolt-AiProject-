import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { supabase, Comment } from '../lib/supabase';
import { Star, MessageSquare } from 'lucide-react';

interface ProductDetailProps {
  id?: string;
}

const menuItems = [
  { id: 1, name: "拿鐵", description: "明亮芬芳，帶有柑橘和茉莉的香氣", price: "$18", roastLevel: 60, image: "https://plus.unsplash.com/premium_photo-1674327105280-b86494dfc690?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGF0dGV8ZW58MHx8MHx8fDA%3D" },
  { id: 2, name: "卡布奇諾", description: "濃郁的義式濃縮咖啡配上綿密奶泡", price: "$16", roastLevel: 75, image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 3, name: "美式咖啡", description: "經典濃郁的黑咖啡，口感純淨", price: "$12", roastLevel: 70, image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 4, name: "摩卡咖啡", description: "巧克力與濃縮咖啡的完美結合", price: "$19", roastLevel: 70, image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 5, name: "焦糖瑪奇朵", description: "香甜焦糖搭配濃郁咖啡與奶泡", price: "$20", roastLevel: 65, image: "https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 6, name: "冰釀咖啡", description: "冷萃12小時，口感順滑清爽", price: "$15", roastLevel: 50, image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 7, name: "牙買加藍山", description: "口感柔和甜美，清澈度極佳。", price: "$32", roastLevel: 55, image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 8, name: "招牌混合", description: "我們獨家調配的三種優質原料", price: "$14", roastLevel: 65, image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 9, name: "濃縮咖啡", description: "經典義式濃縮，濃郁香醇", price: "$10", roastLevel: 85, image: "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 10, name: "白咖啡", description: "溫和順滑，奶香濃郁", price: "$17", roastLevel: 60, image: "https://images.pexels.com/photos/1446318/pexels-photo-1446318.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 11, name: "抹茶拿鐵", description: "日式抹茶與牛奶的完美融合", price: "$18", roastLevel: 40, image: "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 12, name: "維也納咖啡", description: "頂部覆蓋鮮奶油的經典咖啡", price: "$19", roastLevel: 68, image: "https://images.pexels.com/photos/1120575/pexels-photo-1120575.jpeg?auto=compress&cs=tinysrgb&w=800" }
];

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = menuItems.find(item => item.id === Number(id));
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchComments = async () => {
      setLoadingComments(true);
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('product_id', Number(id))
        .order('created_at', { ascending: false });
      if (data) setComments(data as Comment[]);
      setLoadingComments(false);
    };
    fetchComments();
  }, [id]);

  const avgRating = comments.length
    ? (comments.reduce((s, c) => s + c.rating, 0) / comments.length).toFixed(1)
    : null;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full bg-gray-50 rounded-2xl shadow-xl p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          
          {/* Roast Level Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">烘焙程度</span>
              <span className="text-sm font-semibold text-amber-600">{product.roastLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-700 h-3 rounded-full transition-all duration-500"
                style={{ width: `${product.roastLevel}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">淺焙</span>
              <span className="text-xs text-gray-500">深焙</span>
            </div>
          </div>

          <div className="text-2xl font-semibold text-amber-700 mb-6">{product.price}</div>
          <button
            onClick={() => navigate(-1)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Back to Menu
          </button>
        </div>

        {/* Comments Section */}
        <div className="max-w-xl w-full mt-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-5 w-5 text-amber-600" />
            <h3 className="text-xl font-bold text-gray-900">顧客評論</h3>
            {avgRating && (
              <div className="flex items-center gap-1 ml-auto">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-600">{avgRating}</span>
                <span className="text-gray-400 text-sm">({comments.length} 則)</span>
              </div>
            )}
          </div>

          {loadingComments && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-amber-400 border-t-transparent" />
            </div>
          )}

          {!loadingComments && comments.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-2xl text-gray-400">
              <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-30" />
              <p>尚無評論，趕快成為第一個留言的人！</p>
            </div>
          )}

          <div className="space-y-4">
            {comments.map(c => (
              <div key={c.id} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{c.user_name}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`h-4 w-4 ${s <= c.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(c.created_at).toLocaleDateString('zh-TW')}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{c.comment_text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
