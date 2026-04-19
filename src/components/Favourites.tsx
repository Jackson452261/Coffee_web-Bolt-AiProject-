import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import { supabase, Favourite } from '../lib/supabase';
import Navbar from './Navbar';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';

const Favourites: React.FC = () => {
  const { userId, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    if (!isSignedIn) { navigate('/'); return; }
    fetchFavourites();
  }, [isSignedIn, userId]);

  const fetchFavourites = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('favourites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (data) setFavourites(data as Favourite[]);
    setLoading(false);
  };

  const removeFavourite = async (productId: number) => {
    setRemovingId(productId);
    await supabase.from('favourites').delete().eq('user_id', userId).eq('product_id', productId);
    setFavourites(prev => prev.filter(f => f.product_id !== productId));
    setRemovingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          返回首頁
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-100 p-3 rounded-xl">
            <Heart className="h-7 w-7 text-red-500 fill-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">我的收藏</h1>
            <p className="text-gray-500 text-sm mt-1">您收藏的咖啡品項</p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-400 border-t-transparent"></div>
          </div>
        )}

        {!loading && favourites.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Heart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">尚無收藏品項</h3>
            <p className="text-gray-400 mb-6">點擊菜單中的 ❤️ 按鈕加入收藏</p>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              瀏覽菜單
            </button>
          </div>
        )}

        {!loading && favourites.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-4">共 {favourites.length} 項收藏</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favourites.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
                  <div className="relative">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => removeFavourite(item.product_id)}
                      disabled={removingId === item.product_id}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                    >
                      {removingId === item.product_id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-red-400" />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900">{item.product_name}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.product_description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-amber-600 font-bold text-lg">{item.product_price}</span>
                      <Heart className="h-4 w-4 text-red-400 fill-red-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favourites;
