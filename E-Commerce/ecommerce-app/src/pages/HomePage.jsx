import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, TrendingUp, Award, Truck, Shield } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../contexts/CartContext';

const HomePage = () => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState({});

  const featuredProducts = products.slice(0, 8);

  const handleAddToCart = (product) => {
    const defaultVariant = product.variants[0];
    addToCart(product, defaultVariant, 1);
    
    setAddedToCart({ ...addedToCart, [product.id]: true });
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to TechMart
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Your Premium Destination for Mobile Accessories & Electronics
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <Truck className="text-primary-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <Award className="text-primary-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">Certified & authentic</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <TrendingUp className="text-primary-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">Competitive pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="card p-6 text-center hover:scale-105 transition duration-200"
              >
                <div className="text-primary-600 mb-3 flex justify-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                </div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-semibold">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400 mr-2">
                      <Star size={16} fill="currentColor" />
                      <span className="text-gray-900 text-sm ml-1">{product.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.basePrice}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addedToCart[product.id]}
                      className={`p-2 rounded-lg transition duration-200 ${
                        addedToCart[product.id]
                          ? 'bg-green-500 text-white'
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                      }`}
                    >
                      {addedToCart[product.id] ? '✓' : <ShoppingCart size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-primary-100 mb-8">
            Get the latest updates on new products and exclusive offers!
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
