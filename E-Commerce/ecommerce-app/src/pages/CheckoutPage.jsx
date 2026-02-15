import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';
import { useConfig } from '../contexts/ConfigContext';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { createOrder } = useOrder();
  const { config, calculateShipping, calculateTax } = useConfig();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const subtotal = getCartTotal();
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  const handleCustomerInfoSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: cartItems,
        customerInfo,
        shippingAddress,
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod
      };

      if (paymentMethod === 'razorpay' && config.razorpay.enabled) {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          const options = {
            key: config.razorpay.keyId,
            amount: Math.round(total * 100), // Amount in paise
            currency: 'USD',
            name: 'TechMart',
            description: 'Purchase from TechMart',
            handler: async function (response) {
              // Payment successful
              const result = await createOrder({
                ...orderData,
                paymentDetails: {
                  transactionId: response.razorpay_payment_id,
                  status: 'success'
                }
              });

              if (result.success) {
                clearCart();
                navigate(`/order-success/${result.order.id}`);
              }
            },
            prefill: {
              name: customerInfo.name,
              email: customerInfo.email,
              contact: customerInfo.phone
            },
            theme: {
              color: '#0ea5e9'
            }
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
          setLoading(false);
        };
      } else {
        // Cash on Delivery or other payment methods
        const result = await createOrder({
          ...orderData,
          paymentDetails: {
            status: 'pending'
          }
        });

        if (result.success) {
          clearCart();
          navigate(`/order-success/${result.order.id}`);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-semibold hidden sm:inline">Customer Info</span>
            </div>
            <div className={`w-20 h-1 mx-2 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-semibold hidden sm:inline">Shipping</span>
            </div>
            <div className={`w-20 h-1 mx-2 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-300'
              }`}>
                3
              </div>
              <span className="ml-2 font-semibold hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Information */}
            {step === 1 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-6">Customer Information</h2>
                <form onSubmit={handleCustomerInfoSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="input-field"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-6">
                    Continue to Shipping
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {step === 2 && (
              <div className="card p-6">
                <div className="flex items-center mb-6">
                  <button onClick={() => setStep(1)} className="text-primary-600 mr-4">
                    ← Back
                  </button>
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                </div>
                <form onSubmit={handleShippingSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        className="input-field"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          className="input-field"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">State *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                          className="input-field"
                          placeholder="NY"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                          className="input-field"
                          placeholder="10001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Country *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-6">
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="card p-6">
                <div className="flex items-center mb-6">
                  <button onClick={() => setStep(2)} className="text-primary-600 mr-4">
                    ← Back
                  </button>
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>
                <form onSubmit={handlePayment}>
                  <div className="space-y-4 mb-6">
                    {config.razorpay.enabled && (
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-600 transition">
                        <input
                          type="radio"
                          name="payment"
                          value="razorpay"
                          checked={paymentMethod === 'razorpay'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-4"
                        />
                        <CreditCard className="mr-3 text-primary-600" />
                        <div>
                          <div className="font-semibold">Razorpay</div>
                          <div className="text-sm text-gray-600">Credit/Debit Card, UPI, Wallet</div>
                        </div>
                      </label>
                    )}
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-600 transition">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-4"
                      />
                      <Truck className="mr-3 text-primary-600" />
                      <div>
                        <div className="font-semibold">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when you receive</div>
                      </div>
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-lg disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-3 pb-3 border-b">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-600">{item.variant}</p>
                      <p className="text-sm">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
