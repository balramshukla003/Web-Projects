import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);

  // Load orders when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserOrders();
    } else {
      setOrders([]);
    }
  }, [user, isAuthenticated]);

  // Load user orders from localStorage
  const loadUserOrders = () => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = allOrders.filter(order => order.userId === user.id);
      setOrders(userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  // Create new order
  const createOrder = async (orderData) => {
    try {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        userId: user?.id || 'guest',
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to localStorage
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      allOrders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(allOrders));

      // Update state if user is authenticated
      if (isAuthenticated && user) {
        setOrders(prev => [newOrder, ...prev]);
      }

      // Detailed console logging
      console.log('═══════════════════════════════════════════════════');
      console.log('🎉 ORDER PLACED SUCCESSFULLY');
      console.log('═══════════════════════════════════════════════════');
      console.log('\n📋 ORDER DETAILS:');
      console.log('Order ID:', newOrder.id);
      console.log('Order Date:', new Date(newOrder.createdAt).toLocaleString());
      console.log('Order Status:', newOrder.status.toUpperCase());
      console.log('\n👤 CUSTOMER INFORMATION:');
      console.log('Name:', orderData.customerInfo.name);
      console.log('Email:', orderData.customerInfo.email);
      console.log('Phone:', orderData.customerInfo.phone);
      console.log('\n📍 SHIPPING ADDRESS:');
      console.log('Street:', orderData.shippingAddress.street);
      console.log('City:', orderData.shippingAddress.city);
      console.log('State:', orderData.shippingAddress.state);
      console.log('ZIP Code:', orderData.shippingAddress.zipCode);
      console.log('Country:', orderData.shippingAddress.country);
      console.log('\n🛍️ ORDER ITEMS:');
      orderData.items.forEach((item, index) => {
        console.log(`\nItem ${index + 1}:`);
        console.log('  Product:', item.name);
        console.log('  Variant:', item.variant);
        console.log('  Quantity:', item.quantity);
        console.log('  Unit Price: $', item.price.toFixed(2));
        console.log('  Subtotal: $', (item.price * item.quantity).toFixed(2));
      });
      console.log('\n💰 PAYMENT SUMMARY:');
      console.log('Subtotal: $', orderData.subtotal.toFixed(2));
      console.log('Shipping: $', orderData.shipping.toFixed(2));
      console.log('Tax: $', orderData.tax.toFixed(2));
      console.log('═══════════════════════════════════════════════════');
      console.log('TOTAL AMOUNT: $', orderData.total.toFixed(2));
      console.log('═══════════════════════════════════════════════════');
      console.log('\n💳 PAYMENT INFORMATION:');
      console.log('Payment Method:', orderData.paymentMethod);
      if (orderData.paymentDetails) {
        console.log('Payment Status:', orderData.paymentDetails.status || 'Pending');
        if (orderData.paymentDetails.transactionId) {
          console.log('Transaction ID:', orderData.paymentDetails.transactionId);
        }
      }
      console.log('\n🚚 ESTIMATED DELIVERY:');
      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + 5);
      console.log('Estimated Delivery Date:', estimatedDate.toLocaleDateString());
      console.log('\n═══════════════════════════════════════════════════');
      console.log('📧 Order confirmation will be sent to:', orderData.customerInfo.email);
      console.log('═══════════════════════════════════════════════════\n');

      return { success: true, order: newOrder };
    } catch (error) {
      console.error('❌ Order Creation Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Get order by ID
  const getOrderById = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    return allOrders.find(order => order.id === orderId);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderIndex = allOrders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1) {
        allOrders[orderIndex].status = newStatus;
        allOrders[orderIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('orders', JSON.stringify(allOrders));

        if (isAuthenticated && user) {
          loadUserOrders();
        }

        console.log('📦 Order Status Updated:', {
          orderId,
          newStatus,
          timestamp: new Date().toISOString()
        });

        return { success: true };
      }
      
      throw new Error('Order not found');
    } catch (error) {
      console.error('❌ Order Update Error:', error);
      return { success: false, error: error.message };
    }
  };

  // Get order statistics
  const getOrderStats = () => {
    if (!isAuthenticated || !user) return null;

    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;

    return {
      totalOrders,
      totalSpent,
      pendingOrders,
      completedOrders
    };
  };

  const value = {
    orders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    getOrderStats,
    loadUserOrders
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
