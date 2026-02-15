import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Settings, Package, DollarSign, Users, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useConfig } from '../contexts/ConfigContext';
import { products as initialProducts } from '../data/products';

const AdminPanel = () => {
  const { user, isAuthenticated } = useAuth();
  const { config, updateRazorpayConfig } = useConfig();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const [razorpayKey, setRazorpayKey] = useState(config.razorpay.keyId);
  const [razorpaySecret, setRazorpaySecret] = useState(config.razorpay.keySecret);

  useEffect(() => {
    // Check if user is admin
    if (!isAuthenticated || user?.email !== 'admin@techmart.com') {
      navigate('/');
      return;
    }

    // Load products from localStorage or use initial data
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
    }
  }, [isAuthenticated, user, navigate]);

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== productId);
      saveProducts(updated);
      console.log('🗑️ Product deleted:', productId);
    }
  };

  const handleSaveRazorpay = (e) => {
    e.preventDefault();
    updateRazorpayConfig(razorpayKey, razorpaySecret);
    alert('Razorpay configuration updated successfully!');
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: JSON.parse(localStorage.getItem('orders') || '[]').length,
    totalRevenue: JSON.parse(localStorage.getItem('orders') || '[]').reduce((sum, order) => sum + order.total, 0),
    totalUsers: JSON.parse(localStorage.getItem('users') || '[]').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-secondary-100 mt-2">Manage your e-commerce store</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-primary-600">{stats.totalProducts}</p>
              </div>
              <Package className="text-primary-600" size={40} />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="text-green-600" size={40} />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-600">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="text-purple-600" size={40} />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalUsers}</p>
              </div>
              <Users className="text-orange-600" size={40} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-6">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 font-semibold border-b-2 transition ${
                  activeTab === 'products'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 font-semibold border-b-2 transition ${
                  activeTab === 'settings'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Settings
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Products Management</h2>
                  <button className="btn-primary flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-4 font-semibold">Image</th>
                        <th className="text-left p-4 font-semibold">Name</th>
                        <th className="text-left p-4 font-semibold">Category</th>
                        <th className="text-left p-4 font-semibold">Price</th>
                        <th className="text-left p-4 font-semibold">Stock</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="p-4">
                            <div className="font-semibold">{product.name}</div>
                            <div className="text-sm text-gray-600 line-clamp-1">
                              {product.description}
                            </div>
                          </td>
                          <td className="p-4 capitalize">{product.category.replace('-', ' ')}</td>
                          <td className="p-4 font-semibold">${product.basePrice}</td>
                          <td className="p-4">
                            {product.variants.reduce((sum, v) => sum + v.stock, 0)} units
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Settings className="mr-2" />
                  Store Settings
                </h2>

                {/* Razorpay Configuration */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Razorpay Payment Gateway</h3>
                  <form onSubmit={handleSaveRazorpay} className="space-y-4 max-w-2xl">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Razorpay Key ID
                      </label>
                      <input
                        type="text"
                        value={razorpayKey}
                        onChange={(e) => setRazorpayKey(e.target.value)}
                        className="input-field"
                        placeholder="rzp_test_xxxxxxxxxxxxx"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Get your keys from Razorpay Dashboard
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Razorpay Key Secret
                      </label>
                      <input
                        type="password"
                        value={razorpaySecret}
                        onChange={(e) => setRazorpaySecret(e.target.value)}
                        className="input-field"
                        placeholder="xxxxxxxxxxxxxxxxxxxxxx"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Keep this secret and never share publicly
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button type="submit" className="btn-primary">
                        Save Configuration
                      </button>
                      <span className={`text-sm font-semibold ${
                        config.razorpay.enabled ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        Status: {config.razorpay.enabled ? '✓ Enabled' : '✗ Disabled'}
                      </span>
                    </div>
                  </form>
                </div>

                {/* Additional Settings */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">Shipping & Tax</h3>
                  <div className="space-y-4 max-w-2xl">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Standard Shipping Rate
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={config.shipping.standardRate}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Free Shipping Threshold
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={config.shipping.freeShippingThreshold}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={config.tax.rate * 100}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
