import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface ProductDetailProps {
  id?: string;
}

const menuItems = [
  { id: 1, name: "latte", description: "Bright and floral with notes of citrus and jasmine", price: "$18", image: "https://plus.unsplash.com/premium_photo-1674327105280-b86494dfc690?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGF0dGV8ZW58MHx8MHx8fDA%3D" },
  
  { id: 2, name: "Guatemala Antigua", description: "Full-bodied with smoky and spicy notes", price: "$17", image: "https://images.pexels.com/photos/1238141/pexels-photo-1238141.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 3, name: "Blue Mountain Jamaica", description: "Mild and sweet with exceptional clarity", price: "$32", image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 4, name: "House Blend", description: "Our signature blend of three premium origins", price: "$14", image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800" }
];

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = menuItems.find(item => item.id === Number(id));

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
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl font-semibold text-amber-700 mb-6">{product.price}</div>
          <button
            onClick={() => navigate(-1)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Back to Menu
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
