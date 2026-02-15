import React, { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('appConfig');
    return saved ? JSON.parse(saved) : {
      razorpay: {
        keyId: '',
        keySecret: '',
        enabled: false
      },
      shipping: {
        standardRate: 9.99,
        freeShippingThreshold: 100
      },
      tax: {
        rate: 0.08 // 8% tax
      }
    };
  });

  // Update Razorpay configuration
  const updateRazorpayConfig = (keyId, keySecret) => {
    const newConfig = {
      ...config,
      razorpay: {
        keyId,
        keySecret,
        enabled: !!(keyId && keySecret)
      }
    };
    setConfig(newConfig);
    localStorage.setItem('appConfig', JSON.stringify(newConfig));
    
    console.log('💳 Razorpay Configuration Updated:', {
      enabled: newConfig.razorpay.enabled,
      keyId: keyId ? `${keyId.substring(0, 10)}...` : 'Not Set',
      timestamp: new Date().toISOString()
    });
  };

  // Update shipping configuration
  const updateShippingConfig = (standardRate, freeShippingThreshold) => {
    const newConfig = {
      ...config,
      shipping: {
        standardRate,
        freeShippingThreshold
      }
    };
    setConfig(newConfig);
    localStorage.setItem('appConfig', JSON.stringify(newConfig));
  };

  // Calculate shipping cost
  const calculateShipping = (subtotal) => {
    if (subtotal >= config.shipping.freeShippingThreshold) {
      return 0;
    }
    return config.shipping.standardRate;
  };

  // Calculate tax
  const calculateTax = (subtotal) => {
    return subtotal * config.tax.rate;
  };

  const value = {
    config,
    updateRazorpayConfig,
    updateShippingConfig,
    calculateShipping,
    calculateTax
  };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};
