import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Star, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    if (query) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.features.some(f => f.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
    }
  }, [query]);

  const handleAddToCart = (product) => {
    addToCart(product, product.variants[0], 1);
    setAddedToCart({ ...addedToCart, [product.id]: true });
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600">
            {searchResults.length > 0
              ? `Found ${searchResults.length} results for "${query}"`
              : `No results found for "${query}"`}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
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
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center mb-3">
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
        ) : (
          <div className="text-center py-12">
            <Search size={80} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse our categories
            </p>
            <Link to="/products" className="btn-primary">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
