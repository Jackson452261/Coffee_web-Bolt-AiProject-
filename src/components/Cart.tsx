import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import { supabase, CartItem } from '../lib/supabase';
import Navbar from './Navbar';
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';

const Cart: React.FC = () => {
  const { userId, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    if (!isSignedIn) { navigate('/'); return; }
    fetchCart();
  }, [isSignedIn, userId]);

  const fetchCart = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (data) setCartItems(data as CartItem[]);
    setLoading(false);
  };

  const updateQuantity = async (item: CartItem, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      removeItem(item.product_id);
      return;
    }
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('user_id', userId)
      .eq('product_id', item.product_id);
    if (!error) {
      setCartItems(prev =>
        prev.map(i => i.product_id === item.product_id ? { ...i, quantity: newQty } : i)
      );
    }
  };

  const removeItem = async (productId: number) => {
    await supabase.from('cart_items').delete().eq('user_id', userId).eq('product_id', productId);
    setCartItems(prev => prev.filter(i => i.product_id !== productId));
  };

  const parsePrice = (price: string) => parseFloat(price.replace('$', '')) || 0;

  const total = cartItems.reduce((sum, item) => sum + parsePrice(item.product_price) * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const checkout = async () => {
    if (cartItems.length === 0) return;
    setCheckingOut(true);
    const orders = cartItems.map(item => ({
      user_id: userId,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      product_image: item.product_image,
      product_description: item.product_description,
    }));
    const { error } = await supabase.from('orders').insert(orders);
    if (!error) {
      await supabase.from('cart_items').delete().eq('user_id', userId);
      setCartItems([]);
      setCheckedOut(true);
    }
    setCheckingOut(false);
  };

  if (checkedOut) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">訂單已成立！</h2>
          <p className="text-gray-500 mb-8">感謝您的購買，您的咖啡正在準備中 ☕</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              繼續購物
            </button>
            <button onClick={() => navigate('/order-history')} className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              查看訂單
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors duration-200 mb-8">
          <ArrowLeft className="h-5 w-5" />
          返回首頁
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-amber-100 p-3 rounded-xl">
            <ShoppingCart className="h-7 w-7 text-amber-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">購物車</h1>
            <p className="text-gray-500 text-sm mt-1">共 {totalItems} 件商品</p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
          </div>
        )}

        {!loading && cartItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <ShoppingCart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">購物車是空的</h3>
            <p className="text-gray-400 mb-6">快去菜單選購您喜愛的咖啡吧！</p>
            <button onClick={() => navigate('/')} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              瀏覽菜單
            </button>
          </div>
        )}

        {!loading && cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex">
                  <img src={item.product_image} alt={item.product_name} className="w-28 h-28 object-cover flex-shrink-0" />
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{item.product_name}</h3>
                        <p className="text-gray-500 text-sm line-clamp-1">{item.product_description}</p>
                      </div>
                      <button onClick={() => removeItem(item.product_id)} className="text-gray-300 hover:text-red-400 transition-colors duration-200 ml-2">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-amber-600 font-bold">{item.product_price}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item, -1)} className="bg-gray-100 hover:bg-amber-100 text-gray-700 rounded-full p-1 transition-colors duration-200">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-semibold text-gray-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item, 1)} className="bg-gray-100 hover:bg-amber-100 text-gray-700 rounded-full p-1 transition-colors duration-200">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">訂單摘要</h3>
                <div className="space-y-3 mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span>{item.product_name} × {item.quantity}</span>
                      <span>${(parsePrice(item.product_price) * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-900">總計</span>
                  <span className="text-xl font-bold text-amber-600">${total.toFixed(0)}</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={checkingOut}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold transition-colors duration-200"
                >
                  {checkingOut ? '結帳中...' : '立即結帳'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
