import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrder();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderData = getOrderById(orderId);
    setOrder(orderData);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="card p-8 text-center">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
            <CheckCircle className="text-green-600" size={64} />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-bold">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-primary-600 text-xl">
                  ${order.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold capitalize">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Order Items:</h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 text-left">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
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

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <p className="text-primary-800">
              📧 A confirmation email has been sent to <strong>{order.customerInfo.email}</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders" className="btn-primary flex items-center justify-center space-x-2">
              <Package size={20} />
              <span>View Orders</span>
            </Link>
            <Link to="/" className="btn-secondary flex items-center justify-center space-x-2">
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
