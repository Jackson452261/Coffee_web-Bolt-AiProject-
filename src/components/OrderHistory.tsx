import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import { supabase, Order } from '../lib/supabase';
import Navbar from './Navbar';
import { Coffee, Clock, ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';

const OrderHistory: React.FC = () => {
  const { userId, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [isSignedIn, userId]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setLoading(false);
  };

  const deleteOrder = async (orderId: string) => {
    setDeletingId(orderId);
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId)
      .eq('user_id', userId);

    if (!error) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    }
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            返回首頁
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-amber-100 p-3 rounded-xl">
            <ShoppingBag className="h-7 w-7 text-amber-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">訂單紀錄</h1>
            <p className="text-gray-500 text-sm mt-1">您所有的咖啡訂單</p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Coffee className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">尚無訂單紀錄</h3>
            <p className="text-gray-400 mb-6">點擊菜單中的「加入訂單」開始選購</p>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              瀏覽菜單
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">共 {orders.length} 筆訂單</p>
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex"
              >
                <img
                  src={order.product_image}
                  alt={order.product_name}
                  className="w-28 h-28 object-cover flex-shrink-0"
                />
                <div className="flex-1 p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{order.product_name}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">{order.product_description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-amber-600 font-bold text-lg">{order.product_price}</span>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock className="h-3 w-3" />
                        {new Date(order.created_at).toLocaleString('zh-TW', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    disabled={deletingId === order.id}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 flex-shrink-0"
                  >
                    {deletingId === order.id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-400 border-t-transparent" />
                    ) : (
                      <Trash2 className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
