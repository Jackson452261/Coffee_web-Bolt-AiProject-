import React from 'react';
import { Star, Quote } from 'lucide-react';

interface ReviewProps {
  onReviewClick?: () => void;
}

const reviews = [
  {
    id: 1,
    name: "張小明",
    role: "咖啡愛好者",
    rating: 5,
    comment: "這裡的拿鐵是我喝過最好喝的！奶泡綿密，咖啡香濃，每次來都讓我感到放鬆和滿足。",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "李美華",
    role: "上班族",
    rating: 5,
    comment: "環境舒適，咖啡品質一流。特別推薦他們的冰釀咖啡，口感順滑，是夏天的最佳選擇！",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2024-01-10"
  },
  {
    id: 3,
    name: "王大偉",
    role: "自由工作者",
    rating: 5,
    comment: "完美的工作空間！WiFi穩定，座位舒適，咖啡更是無可挑剔。已經成為我的第二個辦公室了。",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2024-01-08"
  },
  {
    id: 4,
    name: "陳雅婷",
    role: "設計師",
    rating: 5,
    comment: "店內裝潢很有品味，咖啡師非常專業。每一杯咖啡都能感受到他們的用心，強烈推薦！",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2024-01-05"
  },
  {
    id: 5,
    name: "林志豪",
    role: "企業主管",
    rating: 5,
    comment: "牙買加藍山咖啡真的值得一試！口感柔和，香氣迷人。這是我在城市裡找到的最棒的咖啡店。",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2024-01-02"
  },
  {
    id: 6,
    name: "黃詩涵",
    role: "學生",
    rating: 5,
    comment: "抹茶拿鐵超級好喝！價格合理，服務親切。和朋友約會的最佳地點，氛圍溫馨舒適。",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2023-12-28"
  }
];

const Review: React.FC<ReviewProps> = ({ onReviewClick }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">顧客評價</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            聽聽我們滿意的顧客怎麼說，他們的笑容是我們最大的動力
          </p>
          <div className="flex items-center justify-center mt-6 gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900 ml-2">5.0</span>
            <span className="text-gray-600 ml-2">來自 500+ 顧客評價</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-amber-200" />
              
              <div className="flex items-center mb-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-amber-100"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-4 italic">
                "{review.comment}"
              </p>

              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">想分享您的體驗嗎？</p>
          
        </div>
      </div>
    </section>
  );
};

export default Review;
