import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/react';
import { supabase, Comment } from '../lib/supabase';
import { X, Star, Send, MessageSquare } from 'lucide-react';

interface Props {
  product: { id: number; name: string; image: string };
  onClose: () => void;
}

const CommentModal: React.FC<Props> = ({ product, onClose }) => {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [product.id]);

  const fetchComments = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('product_id', product.id)
      .order('created_at', { ascending: false });
    if (data) setComments(data as Comment[]);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    const userName = user?.fullName || user?.emailAddresses?.[0]?.emailAddress || '匿名用戶';
    const { error } = await supabase.from('comments').insert({
      user_id: userId,
      user_name: userName,
      product_id: product.id,
      product_name: product.name,
      rating,
      comment_text: text.trim(),
    });
    if (!error) {
      setText('');
      setRating(5);
      setSubmitted(true);
      fetchComments();
      setTimeout(() => setSubmitted(false), 2000);
    }
    setSubmitting(false);
  };

  const avgRating = comments.length
    ? (comments.reduce((s, c) => s + c.rating, 0) / comments.length).toFixed(1)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-3">
            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <h2 className="font-bold text-gray-900">{product.name}</h2>
              {avgRating && (
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{avgRating}</span>
                  <span className="text-gray-400">({comments.length} 則評論)</span>
                </div>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Comment Form */}
        {isSignedIn ? (
          <div className="p-5 border-b bg-amber-50">
            <p className="text-sm font-semibold text-gray-700 mb-3">寫下您的評論</p>
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 transition-colors duration-150 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">{rating} 顆星</span>
            </div>
            {/* Text Input */}
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="分享您對這款咖啡的感受..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              {submitted && <span className="text-green-600 text-sm font-medium">✓ 評論已送出！</span>}
              {!submitted && <span />}
              <button
                onClick={handleSubmit}
                disabled={submitting || !text.trim()}
                className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
              >
                <Send className="h-4 w-4" />
                {submitting ? '送出中...' : '送出評論'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border-b text-center text-sm text-gray-500">
            請先登入才能留下評論
          </div>
        )}

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-amber-400 border-t-transparent" />
            </div>
          )}
          {!loading && comments.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>還沒有評論，成為第一個留言的人！</p>
            </div>
          )}
          {!loading && comments.map(c => (
            <div key={c.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{c.user_name}</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${s <= c.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(c.created_at).toLocaleDateString('zh-TW')}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{c.comment_text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
