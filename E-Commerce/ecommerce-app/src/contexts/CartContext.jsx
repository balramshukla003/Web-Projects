import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, variant, quantity = 1) => {
    const cartItem = {
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      price: variant.price,
      image: product.image,
      variant: variant.color,
      quantity,
      addedAt: new Date().toISOString()
    };

    setCartItems(prevItems => {
      // Check if item already exists
      const existingIndex = prevItems.findIndex(
        item => item.productId === product.id && item.variantId === variant.id
      );

      if (existingIndex > -1) {
        // Update quantity
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        
        console.log('🛒 Cart Item Updated:', {
          product: product.name,
          variant: variant.color,
          newQuantity: newItems[existingIndex].quantity,
          price: variant.price,
          timestamp: new Date().toISOString()
        });
        
        return newItems;
      } else {
        // Add new item
        console.log('🛒 Item Added to Cart:', {
          product: product.name,
          variant: variant.color,
          quantity,
          price: variant.price,
          timestamp: new Date().toISOString()
        });
        
        return [...prevItems, cartItem];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, variantId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.productId === productId && i.variantId === variantId);
      
      console.log('🗑️ Item Removed from Cart:', {
        product: item?.name,
        variant: item?.variant,
        timestamp: new Date().toISOString()
      });
      
      return prevItems.filter(
        item => !(item.productId === productId && item.variantId === variantId)
      );
    });
  };

  // Update item quantity
  const updateQuantity = (productId, variantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.productId === productId && item.variantId === variantId) {
          console.log('📝 Cart Quantity Updated:', {
            product: item.name,
            variant: item.variant,
            oldQuantity: item.quantity,
            newQuantity: quantity,
            timestamp: new Date().toISOString()
          });
          
          return { ...item, quantity };
        }
        return item;
      });
      return newItems;
    });
  };

  // Clear cart
  const clearCart = () => {
    console.log('🧹 Cart Cleared:', {
      itemCount: cartItems.length,
      timestamp: new Date().toISOString()
    });
    
    setCartItems([]);
  };

  // Calculate totals
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
