import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';

const OrdersPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { orders, loadUserOrders } = useOrder();

  useEffect(() => {
    if (isAuthenticated) {
      loadUserOrders();
    }
  }, [isAuthenticated]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={24} />;
      case 'processing':
        return <Package className="text-blue-500" size={24} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={24} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'cancelled':
        return <X className="text-red-500" size={24} />;
      default:
        return <Package className="text-gray-500" size={24} />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={80} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your orders</p>
          <Link to="/login" className="btn-primary">
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={80} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to place your first order!</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="mb-4 lg:mb-0">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-bold text-lg">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Items:</h4>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold">{item.name}</h5>
                        <p className="text-sm text-gray-600">
                          {item.variant} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-t mt-4 pt-4">
                <h4 className="font-semibold mb-2">Shipping Address:</h4>
                <p className="text-gray-700">
                  {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state} {order.shippingAddress.zipCode},{' '}
                  {order.shippingAddress.country}
                </p>
              </div>

              {/* Order Summary */}
              <div className="border-t mt-4 pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold ml-2">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold ml-2">
                      {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-semibold ml-2">${order.tax.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment:</span>
                    <span className="font-semibold ml-2 capitalize">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
