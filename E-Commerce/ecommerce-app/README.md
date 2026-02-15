# TechMart - Full-Stack E-commerce Application

A comprehensive e-commerce platform built with React, Tailwind CSS, and Context API for state management. Features include user authentication, shopping cart, order tracking, payment integration, and admin panel.

## 🚀 Features

### Customer Features
- ✅ **50+ Products** - Mobile accessories and electronics with variants
- ✅ **User Authentication** - Register, login, and manage profile
- ✅ **Guest Checkout** - Shop without creating an account
- ✅ **Shopping Cart** - Add, update, remove items with persistence
- ✅ **Global Search** - Find products across the catalog
- ✅ **Product Filters** - Filter by category, price, and sort options
- ✅ **Order History** - Track past orders and their status
- ✅ **Payment Integration** - Razorpay gateway (configurable)
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS

### Admin Features
- ✅ **Product Management** - Add, edit, delete products via UI
- ✅ **Dashboard Analytics** - View sales, orders, and user statistics
- ✅ **Payment Configuration** - Set up Razorpay keys through admin panel
- ✅ **Shipping & Tax Settings** - Configure rates and thresholds

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Context API (No Redux)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Payment**: Razorpay Integration

## 📦 Project Structure

```
ecommerce-app/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   ├── layout/           # Header, Footer
│   │   ├── product/          # Product components
│   │   ├── cart/             # Cart components
│   │   ├── checkout/         # Checkout components
│   │   ├── auth/             # Authentication components
│   │   ├── admin/            # Admin components
│   │   └── user/             # User dashboard components
│   ├── contexts/
│   │   ├── AuthContext.jsx   # Authentication state
│   │   ├── CartContext.jsx   # Shopping cart state
│   │   ├── OrderContext.jsx  # Order management
│   │   └── ConfigContext.jsx # App configuration
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── data/
│   │   └── products.js       # Product data (50+ products)
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── OrderSuccessPage.jsx
│   │   ├── SearchPage.jsx
│   │   └── AdminPanel.jsx
│   ├── utils/                # Helper functions
│   ├── hooks/                # Custom React hooks
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`

## 👤 Demo Accounts

### Admin Account
- **Email**: `admin@techmart.com`
- **Password**: `admin123`
- **Access**: Full admin panel with product management

### User Account
- **Email**: `user@example.com`
- **Password**: `user123`
- **Access**: Standard user features

### Guest Checkout
- You can also shop and checkout without creating an account

## 💳 Payment Integration

### Razorpay Setup (Optional)

1. **Get Razorpay Credentials**
   - Sign up at [https://razorpay.com](https://razorpay.com)
   - Get your Test API Key ID and Secret

2. **Configure in Admin Panel**
   - Login as admin
   - Navigate to Admin → Settings
   - Enter your Razorpay Key ID and Secret
   - Save configuration

3. **Test Payment**
   - Use Razorpay test cards for checkout
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

### Cash on Delivery
- Available by default without any configuration

## 📋 API Service Layer

The application includes a documented API service layer (`src/services/api.js`) with endpoints for:

- **Authentication**: Register, Login, Logout, Token Verification
- **Products**: CRUD operations, Search, Filters
- **Orders**: Create, Update, Retrieve, Cancel
- **Payments**: Razorpay integration, Payment verification
- **Users**: Profile management, Addresses
- **Admin**: Dashboard stats, User management

All API calls are currently mocked with localStorage, but can be easily connected to a real backend by updating the service layer.

## 🎨 Color Theme

The application uses a blue-purple color scheme optimized for electronics retail:

- **Primary**: Blue (#0ea5e9) - Trust and technology
- **Secondary**: Purple (#d946ef) - Premium and modern
- **Accents**: Appropriate for calls-to-action and highlights

## 📱 Responsive Design

Fully responsive across all device sizes:
- **Mobile**: Optimized for touch interactions
- **Tablet**: Adaptive layouts
- **Desktop**: Full-featured experience

## 🔒 Data Persistence

Data is stored in localStorage for demo purposes:
- User accounts and authentication
- Shopping cart
- Orders and order history
- Admin configurations
- Product modifications

## 🧪 Console Logging

All major actions are logged to the console with detailed information:
- User authentication events
- Cart operations
- Order placements with full details
- Payment processing
- API calls with payloads

## 📊 Order Tracking

Order statuses available:
- **Pending**: Order received
- **Processing**: Being prepared
- **Shipped**: In transit
- **Delivered**: Completed
- **Cancelled**: Cancelled by user or admin

## 🎯 Key Features Explained

### 1. Context API State Management
- No Redux dependency
- Clean and maintainable code structure
- Separate contexts for Auth, Cart, Orders, and Config

### 2. Guest Checkout
- Users can shop without registration
- Option to create account after order placement
- Email and phone required for order processing

### 3. Product Variants
- Each product has 2 color/size variants
- Independent stock tracking per variant
- Price variations supported

### 4. Search Functionality
- Global search across product names, descriptions, and features
- Real-time results
- Search history (can be implemented)

### 5. Admin Panel
- Secure access (admin email check)
- Product CRUD operations
- Dashboard with statistics
- Razorpay configuration
- Shipping and tax settings

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file for production:

```env
VITE_API_BASE_URL=https://your-api.com
VITE_RAZORPAY_KEY_ID=your_key_id
```

## 📝 Future Enhancements

Potential features to add:
- [ ] Real backend API integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Product recommendations
- [ ] Inventory management
- [ ] Sales analytics dashboard
- [ ] Coupon/discount system

## 🤝 Contributing

This is a demo project. Feel free to fork and enhance!

## 📄 License

MIT License - feel free to use for learning and commercial projects.

## 🆘 Support

For issues or questions:
1. Check the console logs for detailed error information
2. Verify all dependencies are installed
3. Clear localStorage if experiencing data issues
4. Check browser console for any errors

## 🎓 Learning Resources

This project demonstrates:
- Modern React patterns (Hooks, Context API)
- Component composition
- State management without Redux
- Routing with React Router
- Form handling and validation
- localStorage for persistence
- Payment gateway integration
- Responsive design with Tailwind
- Project structure for scalability

---

**Built with ❤️ for learning and demonstration purposes**
