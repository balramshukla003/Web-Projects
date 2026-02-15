import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize demo data
const initializeDemoData = () => {
  // Create demo admin user if not exists
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const adminExists = users.some(u => u.email === 'admin@techmart.com');
  
  if (!adminExists) {
    users.push({
      id: 'admin-001',
      name: 'Admin User',
      email: 'admin@techmart.com',
      password: 'admin123',
      phone: '+1 (555) 000-0000',
      createdAt: new Date().toISOString()
    });
  }

  // Create demo regular user if not exists
  const userExists = users.some(u => u.email === 'user@example.com');
  if (!userExists) {
    users.push({
      id: 'user-001',
      name: 'Demo User',
      email: 'user@example.com',
      password: 'user123',
      phone: '+1 (555) 123-4567',
      createdAt: new Date().toISOString()
    });
  }

  localStorage.setItem('users', JSON.stringify(users));

  console.log('🎉 Welcome to TechMart E-commerce Application!');
  console.log('');
  console.log('📝 Demo Accounts Available:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 Admin Account:');
  console.log('   Email: admin@techmart.com');
  console.log('   Password: admin123');
  console.log('');
  console.log('👤 User Account:');
  console.log('   Email: user@example.com');
  console.log('   Password: user123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('✨ Features Available:');
  console.log('• 50+ Products across 10 categories');
  console.log('• User Authentication & Registration');
  console.log('• Shopping Cart with persistence');
  console.log('• Guest Checkout option');
  console.log('• Order History & Tracking');
  console.log('• Razorpay Payment Integration (configurable)');
  console.log('• Admin Panel for product management');
  console.log('• Global Search functionality');
  console.log('• Responsive design with Tailwind CSS');
  console.log('');
};

initializeDemoData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
